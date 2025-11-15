// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initCustomCursor();
    initSmoothScrolling();
    initHeaderScroll();
    initProjectFilters();
    initContactForm();
    initGSAPAnimations();
    initThreeJSAnimation();
    initMobileMenu();
});

// Custom cursor effect
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .btn, .project-card, .skill-item');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Add slight delay to follower for smooth effect
        setTimeout(() => {
            cursorFollower.style.left = `${e.clientX}px`;
            cursorFollower.style.top = `${e.clientY}px`;
        }, 50);
    });

    // Expand cursor on hoverable elements
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseout', () => {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    });

    document.addEventListener('mouseover', () => {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu if open
            const nav = document.querySelector('nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.querySelector('.menu-toggle').classList.remove('active');
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Project filtering
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    gsap.to(card, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                        clearProps: 'all'
                    });
                    card.style.display = 'block';
                } else {
                    gsap.to(card, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Contact form validation and submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission (replace with actual form submission)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Message sent successfully! I will get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// GSAP animations
function initGSAPAnimations() {
    // Hero section animations
    gsap.from('.hero-text h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.expertise', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });
    
    gsap.from('.cta-buttons', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section:not(.hero)');
    
    sections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Skill items staggered animation
    gsap.from('.skill-item', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 70%'
        }
    });
    
    // Project cards staggered animation
    gsap.from('.project-card', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 70%'
        }
    });
}

// Three.js animation for hero section
function initThreeJSAnimation() {
    const canvas = document.getElementById('hero-canvas');
    
    if (!canvas) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    // Primary color from CSS variables
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    const color = new THREE.Color(primaryColor);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 5;
        posArray[i + 1] = (Math.random() - 0.5) * 5;
        posArray[i + 2] = (Math.random() - 0.5) * 5;
        
        // Color - slightly randomize based on primary color
        colorsArray[i] = color.r + (Math.random() - 0.5) * 0.1;
        colorsArray[i + 1] = color.g + (Math.random() - 0.5) * 0.1;
        colorsArray[i + 2] = color.b + (Math.random() - 0.5) * 0.1;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Position camera
    camera.position.z = 3;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - window.innerWidth / 2) / 100;
        mouseY = (event.clientY - window.innerHeight / 2) / 100;
    }
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
        
        // Respond to mouse movement
        particlesMesh.rotation.x += (mouseY * 0.001 - particlesMesh.rotation.x) * 0.05;
        particlesMesh.rotation.y += (mouseX * 0.001 - particlesMesh.rotation.y) * 0.05;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
}