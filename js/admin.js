// Admin-side JavaScript for EBHfit

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in and is an admin
    const userData = JSON.parse(localStorage.getItem('ebhfit_user'));
    
    if (!userData || !userData.isAdmin) {
        // If not admin, redirect to login
        window.location.href = 'login.html';
        return;
    }
    
    // Setup client list functionality
    setupClientList();
    
    // Setup workout form
    setupWorkoutForm();
    
    // Handle add client button
    const addClientBtn = document.getElementById('add-client-btn');
    if (addClientBtn) {
        addClientBtn.addEventListener('click', function() {
            // In a real app, this would show a form or modal to add a client
            alert('Add client functionality would open here');
        });
    }
    
    // Handle create workout button
    const createWorkoutBtn = document.getElementById('create-workout-btn');
    if (createWorkoutBtn) {
        createWorkoutBtn.addEventListener('click', function() {
            // Scroll to the create workout form
            const createWorkoutForm = document.querySelector('.workout-card:last-child');
            if (createWorkoutForm) {
                createWorkoutForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Add exercise button functionality
    const addExerciseBtn = document.getElementById('add-exercise-btn');
    if (addExerciseBtn) {
        addExerciseBtn.addEventListener('click', function() {
            addExerciseField();
        });
    }
});

function setupClientList() {
    const clientLinks = document.querySelectorAll('.client-list .list-group-item');
    
    clientLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all clients
            clientLinks.forEach(function(item) {
                item.classList.remove('active');
            });
            
            // Add active class to clicked client
            this.classList.add('active');
            
            // In a real app, this would fetch client data from the server
            // and update the client details panel
            
            // For now, we'll just update the client name in the header
            const clientName = this.textContent.trim();
            const profileHeader = document.querySelector('.workout-card .card-header');
            if (profileHeader) {
                profileHeader.textContent = clientName + ' - Profile';
            }
        });
    });
}

function setupWorkoutForm() {
    const workoutForm = document.querySelector('.form-dark');
    
    if (workoutForm) {
        workoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, this would send the form data to the server
            // For now, we'll just show a success message
            alert('Workout saved successfully!');
            
            // Clear the form
            workoutForm.reset();
        });
    }
}

function addExerciseField() {
    const exercisesContainer = document.getElementById('exercises-container');
    
    if (!exercisesContainer) return;
    
    // Clone the first exercise entry
    const firstExercise = exercisesContainer.querySelector('.exercise-entry');
    const newExercise = firstExercise.cloneNode(true);
    
    // Clear input values
    const inputs = newExercise.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
        input.value = '';
    });
    
    // Add a remove button
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn btn-sm btn-outline-danger mt-2';
    removeBtn.textContent = 'Remove Exercise';
    removeBtn.addEventListener('click', function() {
        exercisesContainer.removeChild(newExercise);
    });
    
    newExercise.appendChild(removeBtn);
    
    // Add the new exercise to the container
    exercisesContainer.appendChild(newExercise);
}
