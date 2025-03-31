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

// Form submission
// Professional Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const submitText = submitBtn.querySelector('.submit-text');
    const loader = submitBtn.querySelector('.loading-icon');
    
    // Show loading state
    submitText.textContent = 'Sending...';
    loader.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    try {
      // Submit to Netlify
      const formData = new FormData(contactForm);
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      
      // Show success modal
      document.getElementById('success-modal').style.display = 'flex';
      contactForm.reset();
      
    } catch (error) {
      alert('Error sending message. Please try again later.');
    } finally {
      // Reset button
      submitText.textContent = 'Send Message';
      loader.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
}

// Modal close function
function closeModal() {
  document.getElementById('success-modal').style.display = 'none';
}


// Loading Animation
window.addEventListener('load', function() {
    setTimeout(function() {
        const loaderWrapper = document.querySelector('.loader-wrapper');
        loaderWrapper.style.opacity = '0';
        setTimeout(function() {
            loaderWrapper.style.display = 'none';
        }, 500);
    }, 1500); // Adjust this time to match your loading animation duration
});


document.addEventListener('DOMContentLoaded', function() {
    const showMoreContainer = document.querySelector('.show-more-container');
    const showMoreBtn = document.getElementById('show-more-btn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let isExpanded = false;

    // Only show the button if there are hidden projects
    if (hiddenProjects.length > 0) {
        showMoreContainer.style.display = 'flex';
    }

    showMoreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // Show all projects
            hiddenProjects.forEach(project => {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, 10);
            });
            showMoreBtn.innerHTML = '<span>Show Less</span><i class="fas fa-chevron-up"></i>';
        } else {
            // Hide additional projects
            hiddenProjects.forEach(project => {
                project.style.opacity = '0';
                project.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            });
            showMoreBtn.innerHTML = '<span>Show More</span><i class="fas fa-chevron-down"></i>';
        }
        
        // Add/remove active class for any additional styling
        showMoreBtn.classList.toggle('active');
    });
});
