document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Navigation Scroll Effect
    // ========================================
    const nav = document.querySelector('.nav-fixed');
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check if section has dark background
                const bgColor = window.getComputedStyle(entry.target).backgroundColor;
                const isLight = bgColor.includes('255, 255, 255') || bgColor === 'transparent';

                if (!isLight) {
                    nav.classList.add('inverted');
                } else {
                    nav.classList.remove('inverted');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ========================================
    // Smooth Scroll
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // Project Item Hover - Show Preview Number
    // ========================================
    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            // Add entry animation
            item.style.transform = 'translateX(10px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });

    // ========================================
    // Scroll Progress Indicator (optional)
    // ========================================
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            if (scrollIndicator) scrollIndicator.style.opacity = '0';
        } else {
            if (scrollIndicator) scrollIndicator.style.opacity = '1';
        }
    });

    // ========================================
    // Current Time Display (Brutalist Touch)
    // ========================================
    const updateTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const timeDisplay = document.querySelector('.nav-role');
        if (timeDisplay) {
            timeDisplay.textContent = `ML ENGINEER / ${hours}:${minutes}:${seconds}`;
        }
    };

    setInterval(updateTime, 1000);
    updateTime();

    // ========================================
    // Keyboard Navigation (Accessibility + Cool)
    // ========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp') {
            window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        }
    });

    // ========================================
    // Console Easter Egg
    // ========================================
    console.log('%c RUAEL TOM ', 'background: #CCFF00; color: #000; font-size: 24px; font-weight: bold; padding: 10px;');
    console.log('%c ML ENGINEER & CREATIVE DEVELOPER ', 'color: #666; font-size: 12px;');
    console.log('%c Looking for opportunities! ', 'color: #CCFF00; font-size: 14px;');
});
