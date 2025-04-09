// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typewriter effect
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    
    const textArray = ['Full Stack Developer', 'Web Designer', 'Problem Solver', 'Tech Enthusiast'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove('typing');
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }
    
    if(textArray.length) setTimeout(type, newTextDelay + 250);
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Scroll to section
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    const navHeight = header.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > navHeight) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server
            // For this demo, we'll just show a success message
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted:', formValues);
            
            // Show success message
            contactForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
            `;
        });
    }
    
    // Project hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-image::before').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-image::before').style.opacity = '0';
        });
    });
    
    // Fetch GitHub repositories
    async function fetchGitHubRepos() {
        try {
            const response = await fetch('https://api.github.com/users/DiyanshShah/repos');
            if (!response.ok) throw new Error('Failed to fetch repositories');
            
            const repos = await response.json();
            
            // Display only the first 3 repositories if they exist
            if (repos.length > 0) {
                const projectsGrid = document.querySelector('.projects-grid');
                
                // Clear existing project cards if we're fetching real data
                // projectsGrid.innerHTML = '';
                
                // For this demo, we'll keep the existing projects and just log the GitHub repos
                console.log('GitHub Repositories:', repos);
                
                // In a real application, you would replace or add to the projects section
                // with the fetched repositories
            }
        } catch (error) {
            console.error('Error fetching GitHub repositories:', error);
        }
    }
    
    // Uncomment to fetch real GitHub repositories
    // fetchGitHubRepos();
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animate-on-scroll class to elements you want to animate
    document.querySelectorAll('.skill-item, .project-card, .about-image, .about-text').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load
});
