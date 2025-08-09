// Enhanced Review Storage with Cross-Device Sync (No Backend Required)
console.log('🔗 Loading Enhanced Review Storage...');

class ReviewStorage {
    constructor() {
        this.storageKey = 'visualVibeReviews';
        this.syncKey = 'reviewSync';
        this.lastSyncKey = 'lastReviewSync';
        
        // Initialize with existing reviews
        this.initializeStorage();
        
        // Set up cross-tab synchronization
        this.setupCrossTabSync();
        
        // Set up periodic cleanup
        this.setupCleanup();
    }

    initializeStorage() {
        try {
            const existing = this.getAllReviews();
            
            // If no reviews exist, initialize with default ones
            if (existing.length === 0) {
                const defaultReviews = [
                    {
                        id: 'default_1',
                        name: 'Sarah Johnson',
                        businessType: 'Local Restaurant Owner',
                        reviewText: 'Visual Vibe Studio created an amazing website for our business. Professional, fast, and exactly what we wanted!',
                        rating: 5,
                        timestamp: '2024-01-15 10:30:00',
                        isDefault: true
                    },
                    {
                        id: 'default_2',
                        name: 'Mike Chen',
                        businessType: 'Real Estate Agent',
                        reviewText: 'Outstanding service! The flyers and business cards helped boost our marketing efforts significantly.',
                        rating: 5,
                        timestamp: '2024-01-20 14:45:00',
                        isDefault: true
                    }
                ];
                
                localStorage.setItem(this.storageKey, JSON.stringify(defaultReviews));
                console.log('✅ Initialized default reviews');
            }
            
        } catch (error) {
            console.error('❌ Error initializing storage:', error);
        }
    }

    setupCrossTabSync() {
        // Listen for storage changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === this.syncKey && e.newValue) {
                console.log('🔄 Cross-tab sync detected');
                this.handleCrossTabUpdate(JSON.parse(e.newValue));
            }
        });

        // Listen for custom sync events
        window.addEventListener('reviewSync', (e) => {
            console.log('🔄 Review sync event received');
            if (window.location.hash !== '#updating') {
                this.refreshDisplays();
            }
        });
    }

    setupCleanup() {
        // Clean up old sync entries periodically
        setInterval(() => {
            try {
                const syncData = localStorage.getItem(this.syncKey);
                if (syncData) {
                    const parsed = JSON.parse(syncData);
                    const age = Date.now() - (parsed.timestamp || 0);
                    
                    // Remove sync data older than 1 minute
                    if (age > 60000) {
                        localStorage.removeItem(this.syncKey);
                    }
                }
            } catch (error) {
                console.warn('Cleanup error:', error);
            }
        }, 30000);
    }

    getAllReviews() {
        try {
            const reviews = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

            // Remove duplicates - keep only the latest review per customer (by name)
            const uniqueReviews = [];
            const seenNames = new Set();

            // Sort by timestamp first (newest first)
            const sortedReviews = reviews.sort((a, b) => {
                const timeA = new Date(a.timestamp).getTime();
                const timeB = new Date(b.timestamp).getTime();
                return timeB - timeA;
            });

            // Keep only the first (newest) review for each customer name
            sortedReviews.forEach(review => {
                const nameLower = review.name.toLowerCase().trim();
                if (!seenNames.has(nameLower)) {
                    seenNames.add(nameLower);
                    uniqueReviews.push(review);
                }
            });

            console.log(`📊 Filtered ${reviews.length} reviews to ${uniqueReviews.length} unique reviews`);

            // If we removed duplicates, save the cleaned data back
            if (uniqueReviews.length !== reviews.length) {
                localStorage.setItem(this.storageKey, JSON.stringify(uniqueReviews));
                console.log('🧹 Cleaned up duplicate reviews in storage');
            }

            return uniqueReviews;
        } catch (error) {
            console.error('❌ Error getting reviews:', error);
            return [];
        }
    }

    async submitReview(reviewData) {
        try {
            // Validate required fields
            const requiredFields = ['name', 'businessType', 'reviewText', 'rating'];
            for (const field of requiredFields) {
                if (!reviewData[field] || reviewData[field].toString().trim() === '') {
                    throw new Error(`Missing required field: ${field}`);
                }
            }

            // Validate rating
            const rating = parseInt(reviewData.rating);
            if (rating < 1 || rating > 5) {
                throw new Error('Rating must be between 1 and 5');
            }

            // Get existing reviews
            const reviews = this.getAllReviews();
            
            // Create new review
            const newReview = {
                id: 'review_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                name: reviewData.name.trim(),
                businessType: reviewData.businessType.trim(),
                reviewText: reviewData.reviewText.trim(),
                rating: rating,
                timestamp: new Date().toISOString(),
                isCustomer: true
            };

            // Check for duplicate (same name)
            const existingIndex = reviews.findIndex(r => 
                r.name.toLowerCase() === newReview.name.toLowerCase()
            );

            if (existingIndex >= 0) {
                // Update existing review
                reviews[existingIndex] = newReview;
                console.log('📝 Updated existing review from:', newReview.name);
            } else {
                // Add new review
                reviews.unshift(newReview);
                console.log('✨ Added new review from:', newReview.name);
            }

            // Save to storage
            localStorage.setItem(this.storageKey, JSON.stringify(reviews));
            
            // Trigger cross-tab sync
            this.triggerSync(newReview);
            
            // Update last sync time
            localStorage.setItem(this.lastSyncKey, Date.now().toString());

            console.log('✅ Review saved successfully:', newReview);
            return newReview;

        } catch (error) {
            console.error('❌ Error submitting review:', error);
            throw error;
        }
    }

    triggerSync(newReview) {
        try {
            // Trigger storage event for other tabs
            const syncData = {
                action: 'newReview',
                review: newReview,
                timestamp: Date.now()
            };
            
            localStorage.setItem(this.syncKey, JSON.stringify(syncData));
            
            // Remove sync data after a short delay
            setTimeout(() => {
                localStorage.removeItem(this.syncKey);
            }, 5000);

            // Dispatch custom event for same tab
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent('reviewSync', {
                    detail: syncData
                }));
            }, 100);

        } catch (error) {
            console.error('❌ Error triggering sync:', error);
        }
    }

    handleCrossTabUpdate(syncData) {
        try {
            if (syncData.action === 'newReview') {
                console.log('🔄 Handling cross-tab review update:', syncData.review.name);
                
                // Refresh displays
                this.refreshDisplays();
                
                // Show notification
                if (window.toastManager) {
                    window.toastManager.info(`New review from ${syncData.review.name} appeared!`);
                }
            }
        } catch (error) {
            console.error('❌ Error handling cross-tab update:', error);
        }
    }

    refreshDisplays() {
        try {
            // Set flag to prevent loops
            window.location.hash = '#updating';
            
            // Refresh review displays if functions exist
            if (typeof window.refreshAllReviewDisplays === 'function') {
                window.refreshAllReviewDisplays();
            }
            
            if (typeof window.loadSavedReviews === 'function') {
                window.loadSavedReviews();
            }
            
            // Clear flag
            setTimeout(() => {
                if (window.location.hash === '#updating') {
                    window.location.hash = '';
                }
            }, 1000);
            
        } catch (error) {
            console.error('❌ Error refreshing displays:', error);
        }
    }

    // Compatibility methods to replace the old API
    async getReviews() {
        return this.getAllReviews();
    }

    // Clean up specific reviews and ensure uniqueness
    cleanupReviews() {
        try {
            const reviews = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

            // Remove Kayla L. reviews specifically
            const filteredReviews = reviews.filter(review =>
                !review.name.toLowerCase().includes('kayla')
            );

            // Apply general deduplication
            const uniqueReviews = [];
            const seenNames = new Set();

            filteredReviews.forEach(review => {
                const nameLower = review.name.toLowerCase().trim();
                if (!seenNames.has(nameLower)) {
                    seenNames.add(nameLower);
                    uniqueReviews.push(review);
                }
            });

            // Save cleaned reviews
            localStorage.setItem(this.storageKey, JSON.stringify(uniqueReviews));

            console.log(`🧹 Cleaned reviews: removed ${reviews.length - uniqueReviews.length} duplicates/unwanted reviews`);

        } catch (error) {
            console.warn('⚠️ Error cleaning up reviews:', error);
        }
    }

    // Migration from old localStorage format
    migrateOldReviews() {
        try {
            const oldReviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
            const newReviews = this.getAllReviews();
            
            // Convert old format to new format
            const converted = oldReviews.map(oldReview => ({
                id: 'migrated_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                name: oldReview.name,
                businessType: oldReview.title || oldReview.businessType || 'Customer',
                reviewText: oldReview.text || oldReview.reviewText,
                rating: oldReview.rating,
                timestamp: oldReview.date || oldReview.timestamp || new Date().toISOString(),
                isMigrated: true
            }));

            // Merge with existing reviews (avoid duplicates)
            const allReviews = [...newReviews];
            
            converted.forEach(convertedReview => {
                const exists = allReviews.some(existing => 
                    existing.name.toLowerCase() === convertedReview.name.toLowerCase()
                );
                
                if (!exists) {
                    allReviews.push(convertedReview);
                }
            });

            // Save merged reviews
            localStorage.setItem(this.storageKey, JSON.stringify(allReviews));
            
            // Clear old storage
            localStorage.removeItem('customerReviews');
            
            console.log(`✅ Migrated ${converted.length} reviews from old format`);
            
        } catch (error) {
            console.warn('⚠️ Error migrating old reviews:', error);
        }
    }
}

// Create global instance
window.reviewStorage = new ReviewStorage();

// Clean up and migrate reviews on first load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.reviewStorage.cleanupReviews();
        window.reviewStorage.migrateOldReviews();

        console.log('✅ Review storage cleanup and migration completed');
        // Let the main initialization handle display refresh
    }, 500);
});

// Also clean up immediately when script loads
setTimeout(() => {
    if (window.reviewStorage) {
        window.reviewStorage.cleanupReviews();
        console.log('✅ Review storage immediate cleanup completed');
    }
}, 100);

// Create compatibility API object
window.reviewAPI = {
    getReviews: () => window.reviewStorage.getReviews(),
    submitReview: (data) => window.reviewStorage.submitReview(data)
};

// Add debugging helper
window.debugReviews = function() {
    console.log('=== REVIEW DEBUG INFO ===');
    const storage = window.reviewStorage;
    if (storage) {
        const reviews = storage.getAllReviews();
        console.log(`📊 Total reviews: ${reviews.length}`);
        reviews.forEach((review, index) => {
            console.log(`${index + 1}. ${review.name} (${review.businessType}) - ${review.rating}⭐`);
        });

        // Check DOM elements
        const scrollContainer = document.getElementById('reviewsScroll');
        const gridContainer = document.getElementById('allCustomerReviews');

        console.log(`📱 DOM - Scroll container reviews: ${scrollContainer ? scrollContainer.children.length : 'N/A'}`);
        console.log(`📱 DOM - Grid container reviews: ${gridContainer ? gridContainer.children.length : 'N/A'}`);
    } else {
        console.log('❌ Review storage not initialized');
    }
    console.log('========================');
};

console.log('✅ Enhanced Review Storage loaded successfully');
