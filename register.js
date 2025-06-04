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

