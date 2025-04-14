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

        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;

        // Define valid client profiles
        const validClients = {
            "rrichiemh@gmail.com": { password: "TATIN1998", name: "Richie Herrera" },
            "jherrerarva04@gmail.com": { password: "JJ2004", name: "Jacqueline Herrera" },
            "dientista1@gmail.com": { password: "PAPI1960", name: "Ricardo Herrera" }
        };

        // Check if the login is for an admin (this logic is already in place)
        if (email.includes('admin')) {
            const userData = {
                name: "EBHfit Admin",
                email: email,
                lastLogin: new Date().toISOString(),
                isAdmin: true
            };
            localStorage.setItem('ebhfit_user', JSON.stringify(userData));
            window.location.href = 'admin.html';
        }
        // Validate the client credentials using the validClients object
        else if (validClients[email]) {
            if (validClients[email].password === password) {
                const userData = {
                    name: validClients[email].name,
                    email: email,
                    lastLogin: new Date().toISOString(),
                    isAdmin: false
                };
                localStorage.setItem('ebhfit_user', JSON.stringify(userData));
                window.location.href = 'dashboard.html';
            } else {
                alert("Incorrect password for " + email);
            }
        } else {
            alert("Invalid email or profile not recognized");
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
