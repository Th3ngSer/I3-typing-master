// Form submissions (simplified for demo)
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Registration successful! (This is a demo)');
            showSection('login', document.querySelector('.nav-link[onclick*="login"]')); // Redirect to login
        });

        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login successful! (This is a demo)');
            showSection('typing', document.querySelector('.nav-link[onclick*="typing"]')); // Redirect to typing test
        });

        // Password Reset Functionality
        let generatedResetCode = null;
        let resetEmail = null;

        document.getElementById('resetEmailForm').addEventListener('submit', function(e) {
            e.preventDefault();
            resetEmail = document.getElementById('resetEmail').value;
            
            // Generate a random 6-digit code (in real app, this would be sent via email)
            generatedResetCode = Math.floor(100000 + Math.random() * 900000).toString();
            
            // Show success message with the code (in real app, this would be sent to email)
            alert(`Reset code sent to ${resetEmail}!\n\nFor demo purposes, your code is: ${generatedResetCode}\n\n(In a real application, this would be sent to your email)`);
            
            // Move to step 2
            document.getElementById('resetStep1').classList.add('hidden');
            document.getElementById('resetStep2').classList.remove('hidden');
        });

        document.getElementById('resetCodeForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const enteredCode = document.getElementById('verificationCode').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmNewPassword').value;
            
            // Validate verification code
            if (enteredCode !== generatedResetCode) {
                alert('Invalid verification code. Please try again.');
                return;
            }
            
            // Validate password match
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }
            
            // Validate password strength (basic validation)
            if (newPassword.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }
            
            // In a real app, you would update the password in the database here
            console.log(`Password reset successful for ${resetEmail}`);
            
            // Move to step 3 (success)
            document.getElementById('resetStep2').classList.add('hidden');
            document.getElementById('resetStep3').classList.remove('hidden');
            
            // Reset the form data
            generatedResetCode = null;
            resetEmail = null;
        });

        // Function to reset the password reset form when navigating away
        function resetPasswordResetForm() {
            document.getElementById('resetStep1').classList.remove('hidden');
            document.getElementById('resetStep2').classList.add('hidden');
            document.getElementById('resetStep3').classList.add('hidden');
            document.getElementById('resetEmailForm').reset();
            document.getElementById('resetCodeForm').reset();
            generatedResetCode = null;
            resetEmail = null;
        }