// Client-side JavaScript for EBHfit

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the login page
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        setupLoginForm();
    }

    // Check if we're on the dashboard page
    const dashboardContainer = document.querySelector('.dashboard-container');
    if (dashboardContainer && !document.querySelector('.admin-controls')) {
        setupDashboard();
    }

    // Setup logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, this would clear session/tokens
            localStorage.removeItem('ebhfit_user');
            window.location.href = 'login.html';
        });
    }
});

function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // In a real application, this would validate with a backend
        // For now, we'll simulate a successful login
        
        if (email && password) {
            // Store user info in localStorage (in a real app, you'd store a token)
            const userData = {
                name: "Sarah Johnson", // This would come from the server
                email: email,
                lastLogin: new Date().toISOString(),
                isAdmin: email.includes('admin') // Simple check for demo
            };
            
            localStorage.setItem('ebhfit_user', JSON.stringify(userData));
            
            // Redirect based on user type
            if (userData.isAdmin) {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'dashboard.html';
            }
        } else {
            alert('Please enter your email and password');
        }
    });
}

function setupDashboard() {
    // Get user data
    const userData = JSON.parse(localStorage.getItem('ebhfit_user'));
    
    if (!userData) {
        // If no user data, redirect to login
        window.location.href = 'login.html';
        return;
    }
    
    // Update user-specific elements
    const clientNameElement = document.getElementById('client-name');
    const lastLoginElement = document.getElementById('last-login');
    
    if (clientNameElement && userData.name) {
        clientNameElement.textContent = userData.name;
    }
    
    if (lastLoginElement && userData.lastLogin) {
        // Format date - in a real app, use a proper date library
        const lastLogin = new Date(userData.lastLogin);
        lastLoginElement.textContent = lastLogin.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // In a real app, you would fetch workout data from a server here
    // and populate the dashboard dynamically
}
