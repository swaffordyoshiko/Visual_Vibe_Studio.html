// 🔥 INSTANT AUTH FIX - COPY AND PASTE INTO BROWSER CONSOLE
// Just copy this entire script and paste it into the browser console, then press Enter

javascript:(function(){
console.log('🔥 INSTANT AUTH FIX STARTING...');

// Clear all existing auth functions
['handleSignIn','handleSignUp','showSignInModal','showSignUpModal','updateAuthUI','signOut'].forEach(f=>{delete window[f]});

// Simple auth storage
const auth = {
    save: (u) => {localStorage.setItem('currentUser',JSON.stringify(u));window.currentUser=u;},
    get: (e) => {
        if(e){
            try{
                const users=JSON.parse(localStorage.getItem('allUsers')||'[]');
                return users.find(u=>u.email.toLowerCase()===e.toLowerCase());
            }catch{return null;}
        }
        try{return JSON.parse(localStorage.getItem('currentUser'));}catch{return null;}
    },
    add: (u) => {
        try{
            const users=JSON.parse(localStorage.getItem('allUsers')||'[]');
            const filtered=users.filter(x=>x.email.toLowerCase()!==u.email.toLowerCase());
            filtered.push(u);
            localStorage.setItem('allUsers',JSON.stringify(filtered));
        }catch{}
    },
    clear: () => {localStorage.removeItem('currentUser');window.currentUser=null;}
};

// Create test user
const testUser={id:'test',name:'Test User',email:'test@test.com',password:'test123',createdAt:new Date().toISOString()};
auth.add(testUser);

// Sign in function
window.handleSignIn=function(e){
    if(e)e.preventDefault();
    const email=document.getElementById('signInEmail')?.value?.trim()?.toLowerCase();
    const password=document.getElementById('signInPassword')?.value?.trim();
    if(!email||!password){alert('Enter email and password');return;}
    const user=auth.get(email);
    if(!user){alert('No account found - use test@test.com');return;}
    if(user.password!==password){alert('Wrong password - use test123');return;}
    auth.save(user);
    window.hideSignInModal();
    window.updateAuthUI(true,user.name);
    alert('Signed in as '+user.name+'!');
};

// Sign up function  
window.handleSignUp=function(e){
    if(e)e.preventDefault();
    const name=document.getElementById('signUpName')?.value?.trim();
    const email=document.getElementById('signUpEmail')?.value?.trim()?.toLowerCase();
    const password=document.getElementById('signUpPassword')?.value?.trim();
    const confirm=document.getElementById('signUpConfirmPassword')?.value?.trim();
    if(!name||!email||!password||!confirm){alert('Fill all fields');return;}
    if(password!==confirm){alert('Passwords do not match');return;}
    if(auth.get(email)){alert('Account exists - sign in instead');return;}
    const newUser={id:Date.now()+'',name,email,password,createdAt:new Date().toISOString()};
    auth.add(newUser);auth.save(newUser);
    window.hideSignUpModal();
    window.updateAuthUI(true,newUser.name);
    alert('Account created for '+newUser.name+'!');
};

// UI update function
window.updateAuthUI=function(signedIn,userName=''){
    const so=document.getElementById('signedOutState');
    const si=document.getElementById('signedInState');
    const mso=document.getElementById('mobileSignedOutState');
    const msi=document.getElementById('mobileSignedInState');
    const uw=document.getElementById('userWelcome');
    
    if(signedIn){
        if(so){so.style.display='none';so.classList.add('hidden');}
        if(si){si.style.display='flex';si.style.visibility='visible';si.classList.remove('hidden');}
        if(mso){mso.style.display='none';mso.classList.add('hidden');}
        if(msi){msi.style.display='block';msi.style.visibility='visible';msi.classList.remove('hidden');}
        if(uw)uw.textContent='Welcome, '+userName+'!';
        
        // Add profile buttons if missing
        if(si&&!si.querySelector('.quick-profile-btn')){
            si.insertAdjacentHTML('beforeend','<button onclick="alert(\'Edit Profile Coming Soon!\')" class="quick-profile-btn text-indigo-600 hover:text-indigo-800 text-sm font-medium px-2 py-1 rounded">Edit Profile</button><button onclick="alert(\'My Orders Coming Soon!\')" class="quick-profile-btn text-indigo-600 hover:text-indigo-800 text-sm font-medium px-2 py-1 rounded">My Orders</button>');
        }
        if(msi&&!msi.querySelector('.quick-mobile-btn')){
            msi.insertAdjacentHTML('beforeend','<button onclick="alert(\'Edit Profile Coming Soon!\')" class="quick-mobile-btn w-full text-left text-indigo-600 hover:text-indigo-800 py-3 text-sm">Edit Profile</button><button onclick="alert(\'My Orders Coming Soon!\')" class="quick-mobile-btn w-full text-left text-indigo-600 hover:text-indigo-800 py-3 text-sm">My Orders</button>');
        }
    }else{
        if(so){so.style.display='flex';so.classList.remove('hidden');}
        if(si){si.style.display='none';si.classList.add('hidden');}
        if(mso){mso.style.display='block';mso.classList.remove('hidden');}
        if(msi){msi.style.display='none';msi.classList.add('hidden');}
    }
};

// Modal functions
window.showSignInModal=()=>{const m=document.getElementById('signInModal');if(m){m.style.display='flex';m.classList.remove('hidden');const e=document.getElementById('signInEmail');if(e){e.value='';setTimeout(()=>e.focus(),100);}const p=document.getElementById('signInPassword');if(p)p.value='';}};
window.showSignUpModal=()=>{const m=document.getElementById('signUpModal');if(m){m.style.display='flex';m.classList.remove('hidden');['signUpName','signUpEmail','signUpPassword','signUpConfirmPassword'].forEach(id=>{const i=document.getElementById(id);if(i)i.value='';});const n=document.getElementById('signUpName');if(n)setTimeout(()=>n.focus(),100);}};
window.hideSignInModal=()=>{const m=document.getElementById('signInModal');if(m){m.style.display='none';m.classList.add('hidden');}};
window.hideSignUpModal=()=>{const m=document.getElementById('signUpModal');if(m){m.style.display='none';m.classList.add('hidden');}};
window.switchToSignUp=()=>{window.hideSignInModal();setTimeout(window.showSignUpModal,100);};
window.switchToSignIn=()=>{window.hideSignUpModal();setTimeout(window.showSignInModal,100);};
window.signOut=()=>{auth.clear();window.updateAuthUI(false);alert('Signed out');};

// Attach form handlers
const sif=document.getElementById('signInForm');
const suf=document.getElementById('signUpForm');
if(sif)sif.onsubmit=window.handleSignIn;
if(suf)suf.onsubmit=window.handleSignUp;

// Check existing session
const current=auth.get();
if(current){window.updateAuthUI(true,current.name);}else{window.updateAuthUI(false);}

// Show success notification
const n=document.createElement('div');
n.style.cssText='position:fixed;top:20px;right:20px;background:#4CAF50;color:white;padding:15px;border-radius:5px;z-index:10000;font-family:Arial,sans-serif;box-shadow:0 4px 6px rgba(0,0,0,0.1)';
n.textContent='🔥 INSTANT AUTH FIX APPLIED! Test: test@test.com / test123';
document.body.appendChild(n);
setTimeout(()=>{if(n.parentNode)n.parentNode.removeChild(n);},5000);

console.log('✅ INSTANT AUTH FIX COMPLETE!');
console.log('Test account: test@test.com / test123');
})();
