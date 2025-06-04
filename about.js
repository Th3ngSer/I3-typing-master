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

