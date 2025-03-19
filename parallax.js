// Parallax effect for layers
document.addEventListener('DOMContentLoaded', () => {
    const layers = document.querySelectorAll('.layer');
    const parallaxContainer = document.querySelector('.parallax');

    // Function to calculate scroll progress
    function getScrollProgress() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        return scrollTop / (documentHeight - windowHeight);
    }

    // Function to update layer visibility and scale
    function updateLayers() {
        const scrollProgress = getScrollProgress();
        
        layers.forEach((layer, index) => {
            const layerProgress = (scrollProgress - (index * 0.2)) * 5; // Each layer takes 20% of the scroll
            const scale = Math.max(0.1, Math.min(1, layerProgress));
            const opacity = Math.max(0, Math.min(1, layerProgress));
            
            layer.style.transform = `scale(${scale})`;
            layer.style.opacity = opacity;
            
            if (opacity > 0.1) {
                layer.classList.add('visible');
            } else {
                layer.classList.remove('visible');
            }
        });
    }

    // Update layers on scroll
    window.addEventListener('scroll', updateLayers);
    
    // Initial update
    updateLayers();

    // Parallax effect for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    const scrollY = window.scrollY;
    
    galleryItems.forEach(item => {
        const speed = item.getAttribute('data-speed');
        const offset = scrollY * speed;
        item.style.transform = `translateY(${offset}px)`;
    });

    // Planet container animations
    const planetContainers = document.querySelectorAll('.planet-container');
    const planetObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const planetObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, planetObserverOptions);

    planetContainers.forEach(container => {
        planetObserver.observe(container);
    });

    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', () => {
        const aboutSection = document.querySelector('.about');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Content fade-in animations
    const contentObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, contentObserverOptions);

    // Observe all content sections
    document.querySelectorAll('.content').forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        content.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        contentObserver.observe(content);
    });

    // Form submission handling
    document.querySelector('.contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for joining our mission! We\'ll be in touch soon.');
            e.target.reset();
        }
    });

    // Mouse move parallax effect for hero section
    document.addEventListener('mousemove', (e) => {
        const hero = document.querySelector('.hero');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        hero.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    });

    // Add loading animation for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        });
        
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    });
});