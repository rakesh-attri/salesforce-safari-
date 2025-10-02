// Simple admin login (hardcoded credentials)
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'safari2025';

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    sessionStorage.setItem('isAdmin', 'true');
    window.location.href = 'admin-dashboard.html';
  } else {
    loginError.textContent = 'Invalid username or password.';
  }
});
