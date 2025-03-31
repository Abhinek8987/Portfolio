// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
if (currentTheme === 'dark') {
    themeToggle.classList.add('active');
}

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.classList.toggle('active');
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active link on scroll
const sections = document.querySelectorAll('section');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back to Top Button
const backToTopBtn = document.createElement('div');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced Form Handling with Perfect Name Integration
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const submitText = submitBtn.querySelector('.submit-text');
        const loader = submitBtn.querySelector('.loading-icon');
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Show loading state
        submitText.textContent = 'Sending...';
        loader.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        try {
            // Submit to Netlify
            await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });
            
            // Personalize success message with perfect name integration
            const thankYouElement = document.getElementById('thank-you-personal');
            if (formValues.name && formValues.name.trim() !== '') {
                thankYouElement.innerHTML = `Thank you, <span class="visitor-name">${formValues.name.trim()}</span>!`;
            } else {
                thankYouElement.textContent = 'Thank you!';
            }
            
            // Show modal
            document.getElementById('success-modal').style.display = 'flex';
            contactForm.reset();
            
            // Google Analytics tracking
            if (window.gtag) {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': 'Portfolio Form'
                });
            }
            
        } catch (error) {
            alert('Error sending message. Please try again later.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button
            submitText.textContent = 'Send Message';
            loader.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Modal functions
function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
}

// Close modal when clicking outside
const modalOverlay = document.querySelector('.modal-overlay');
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

// Loading Animation
window.addEventListener('load', function() {
    setTimeout(function() {
        const loaderWrapper = document.querySelector('.loader-wrapper');
        if (loaderWrapper) {
            loaderWrapper.style.opacity = '0';
            setTimeout(function() {
                loaderWrapper.style.display = 'none';
            }, 500);
        }
    }, 1500);
});

// Show More Projects Functionality
document.addEventListener('DOMContentLoaded', function() {
    const showMoreContainer = document.querySelector('.show-more-container');
    const showMoreBtn = document.getElementById('show-more-btn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let isExpanded = false;

    // Only show the button if there are hidden projects
    if (hiddenProjects.length > 0 && showMoreContainer) {
        showMoreContainer.style.display = 'flex';
    }

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                // Show all projects with smooth animation
                hiddenProjects.forEach((project, index) => {
                    setTimeout(() => {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'translateY(0)';
                        }, 10);
                    }, index * 50); // Staggered animation
                });
                showMoreBtn.innerHTML = '<span>Show Less</span><i class="fas fa-chevron-up"></i>';
            } else {
                // Hide additional projects with smooth animation
                hiddenProjects.forEach((project, index) => {
                    setTimeout(() => {
                        project.style.opacity = '0';
                        project.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 300);
                    }, index * 30); // Staggered animation
                });
                showMoreBtn.innerHTML = '<span>Show More</span><i class="fas fa-chevron-down"></i>';
            }
            
            showMoreBtn.classList.toggle('active');
        });
    }
});

// Initialize form configuration check
document.addEventListener('DOMContentLoaded', function() {
    console.log('Form Configuration Check:');
    console.log('- Form element:', document.querySelector('form[name="contact"]') ? 'Exists' : 'Missing');
    console.log('- Netlify attribute:', document.querySelector('form[data-netlify="true"]') ? 'Exists' : 'Missing');
});
