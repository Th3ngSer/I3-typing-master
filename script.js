        // Navigation functions
        function showSection(sectionName, clickedElement) {
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.remove('active'));

            // Show selected section
            document.getElementById(sectionName).classList.add('active');

            // Update navigation active state for desktop
            const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
            navLinks.forEach(link => link.classList.remove('active'));

            if (clickedElement) {
                // Find the corresponding desktop nav link and activate it
                const desktopNavLink = document.querySelector(`.desktop-nav .nav-link[onclick*="${sectionName}"]`);
                if (desktopNavLink) {
                    desktopNavLink.classList.add('active');
                }
            }

            // Close mobile menu if open
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav && !mobileNav.classList.contains('hidden')) {
                mobileNav.classList.add('hidden');
                mobileNav.classList.remove('active'); // Remove active class for transition
            }
        }

        function toggleMobileMenu() {
            const mobileNav = document.getElementById('mobileNav');
            mobileNav.classList.toggle('hidden');
            mobileNav.classList.toggle('active'); // Toggle active class for transition
        }

        // Typing test functionality
        let testActive = false;
        let startTime = null;
        let timeLeft = 60; // Default test time in seconds
        let timerInterval = null;
        let testText = "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is commonly used for typing practice. Focus on accuracy first, then gradually increase your speed as you become more comfortable with the keyboard layout. Consistent practice is key to improving your typing speed and accuracy over time. Remember to maintain proper posture and hand position for optimal results and to prevent strain. Typing is a fundamental skill in the digital age.";
        let currentTextIndex = 0; // To track current character in the text

        // Function to render the text with spans for each character
        function renderTextToType() {
            const textToTypeElement = document.getElementById('textToType');
            textToTypeElement.innerHTML = testText.split('').map((char, index) => {
                return `<span id="char-${index}">${char}</span>`;
            }).join('');
            highlightCurrentChar();
        }

        function highlightCurrentChar() {
            document.querySelectorAll('#textToType span').forEach((span, index) => {
                span.classList.remove('text-yellow-400', 'font-bold', 'underline', 'bg-blue-100'); // Clean previous highlight
                if (index === currentTextIndex) {
                    span.classList.add('text-yellow-400', 'font-bold', 'underline'); // Apply highlight
                }
            });
        }

        function startTest() {
            if (testActive) return; // Prevent starting multiple tests

            testActive = true;
            startTime = new Date().getTime();
            timeLeft = 60; // Reset time for new test
            currentTextIndex = 0; // Reset character index
            renderTextToType(); // Render text with fresh spans

            document.getElementById('typingInput').value = ''; // Clear input
            document.getElementById('typingInput').disabled = false;
            document.getElementById('typingInput').focus();
            document.getElementById('startBtn').disabled = true;
            document.getElementById('startBtn').textContent = 'Test in Progress...';
            document.getElementById('resetBtn').style.display = 'inline-block'; // Show reset button

            // Reset stats display
            document.getElementById('wpm').textContent = '0';
            document.getElementById('accuracy').textContent = '100%';
            document.getElementById('timer').textContent = '1:00';

            // Start timer
            timerInterval = setInterval(updateTimer, 1000);

            // Add event listener for typing input
            document.getElementById('typingInput').addEventListener('input', handleTypingInput);
        }

        function resetTest() {
            testActive = false;
            clearInterval(timerInterval);
            timeLeft = 60;
            currentTextIndex = 0;

            document.getElementById('typingInput').disabled = true;
            document.getElementById('typingInput').value = '';
            document.getElementById('startBtn').disabled = false;
            document.getElementById('startBtn').textContent = 'Start Test';
            document.getElementById('resetBtn').style.display = 'none'; // Hide reset button

            document.getElementById('wpm').textContent = '0';
            document.getElementById('accuracy').textContent = '100%';
            document.getElementById('timer').textContent = '1:00';

            renderTextToType(); // Re-render text to clear highlights/errors
            document.getElementById('typingInput').removeEventListener('input', handleTypingInput);
        }

        function updateTimer() {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timer').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            if (timeLeft <= 0) {
                endTest();
            }
        }

        function handleTypingInput() {
            if (!testActive) return;

            const typedText = document.getElementById('typingInput').value;
            const textSpans = document.querySelectorAll('#textToType span');

            let correctChars = 0;
            let totalTyped = typedText.length;

            for (let i = 0; i < textSpans.length; i++) {
                const charSpan = textSpans[i];
                const charInTest = testText[i];
                const charTyped = typedText[i];

                charSpan.classList.remove('text-green-600', 'text-red-600', 'bg-red-100', 'font-bold', 'underline'); // Clear previous styling

                if (charTyped === undefined) {
                    // Character not yet typed
                    charSpan.classList.remove('text-yellow-400'); // Remove current highlight if backspaced
                } else if (charTyped === charInTest) {
                    charSpan.classList.add('text-green-600'); // Correct
                    correctChars++;
                } else {
                    charSpan.classList.add('text-red-600', 'bg-red-100', 'underline'); // Incorrect
                }
            }

            currentTextIndex = typedText.length;
            highlightCurrentChar(); // Highlight the next character to type

            // Calculate WPM
            const currentTime = new Date().getTime();
            const timeElapsedMinutes = (currentTime - startTime) / 1000 / 60;
            const wpm = timeElapsedMinutes > 0 ? Math.round((correctChars / 5) / timeElapsedMinutes) : 0;
            document.getElementById('wpm').textContent = wpm;

            // Calculate accuracy
            const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;
            document.getElementById('accuracy').textContent = accuracy + '%';

            // Check if test is complete
            if (typedText.length === testText.length) {
                endTest();
            }
        }

        function endTest() {
            testActive = false;
            clearInterval(timerInterval);
            document.getElementById('typingInput').disabled = true;
            document.getElementById('startBtn').disabled = false;
            document.getElementById('startBtn').textContent = 'Start Test';
            document.getElementById('resetBtn').style.display = 'inline-block'; // Keep reset visible after test

            // Final WPM and Accuracy are already updated by handleTypingInput
            const finalWPM = document.getElementById('wpm').textContent;
            const finalAccuracy = document.getElementById('accuracy').textContent;

            // In a real app, you'd save these results to a database
            alert(`Test Complete!\nWPM: ${finalWPM}\nAccuracy: ${finalAccuracy}`);

            // Remove the event listener to prevent further updates after test ends
            document.getElementById('typingInput').removeEventListener('input', handleTypingInput);
        }

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