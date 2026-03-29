document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Swiper.js Initialization
    const swiper = new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });

    // 3. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(el => revealObserver.observe(el));

    // 4. Navbar Background Change on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 5. FAB (Floating Action Button) Toggle
    const fabWrapper = document.getElementById('fab-wrapper');
    const fabMain = document.getElementById('fab-main');
    
    fabMain.addEventListener('click', (e) => {
        e.stopPropagation();
        fabWrapper.classList.toggle('active');
        
        // Change icon from plus to x
        const icon = fabMain.querySelector('i');
        if (fabWrapper.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'plus');
        }
        lucide.createIcons();
    });

    // Close FAB when clicking outside
    document.addEventListener('click', () => {
        if (fabWrapper.classList.contains('active')) {
            fabWrapper.classList.remove('active');
            const icon = fabMain.querySelector('i');
            icon.setAttribute('data-lucide', 'plus');
            lucide.createIcons();
        }
    });

    // 6. Theme Toggle (Dark/Light)
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        let targetTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
        
        // Feedback animation for icon
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => themeToggle.style.transform = 'scale(1.1)', 100);
    });

    // 7. Booking Form Submission (Mock)
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);
        
        console.log('Booking Sent:', data);
        
        // Show success state
        const originalBtnText = bookingForm.querySelector('button').innerText;
        const btn = bookingForm.querySelector('button');
        
        btn.innerHTML = '<i data-lucide="check" style="margin-right: 8px"></i>Cita Solicitada';
        btn.style.background = '#2cc060';
        lucide.createIcons();
        
        setTimeout(() => {
            btn.innerText = originalBtnText;
            btn.style.background = '';
            bookingForm.reset();
        }, 3000);
        
        alert(`¡Gracias ${data.name}! Hemos recibido tu solicitud para el servicio de ${data.service}. Nos contactaremos por ${data['contact-method']} pronto.`);
    });

    // 8. Mobile Menu logic (Simple toggle)
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        // Toggle responsive display
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'var(--bg-card)';
            navLinks.style.padding = '20px';
            navLinks.style.textAlign = 'center';
            navLinks.style.boxShadow = 'var(--shadow)';
        }
    });
});
