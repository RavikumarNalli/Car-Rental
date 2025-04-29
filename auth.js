
const users = JSON.parse(localStorage.getItem('users')) || [];


document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        
        window.location.href = 'index.html';
    } else {
        alert('Invalid email or password!');
    }
});


document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    

    if (users.some(u => u.email === email)) {
        alert('Email already registered!');
        return;
    }
    
    
    const newUser = {
        name,
        email,
        password
    };
    
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    
    window.location.href = 'index.html';
});


function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPath = window.location.pathname;
    
    if (!isLoggedIn && !currentPath.includes('login.html')) {
        window.location.href = 'login.html';
    } else if (isLoggedIn && currentPath.includes('login.html')) {
        window.location.href = 'index.html';
    }
}


document.addEventListener('DOMContentLoaded', checkAuth); 