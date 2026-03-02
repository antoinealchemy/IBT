/* =============================================
   IBTimus - Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Slider
    initSlider();

    // Initialize Before/After Slider
    initBeforeAfterSlider();

    // Initialize Smooth Scroll
    initSmoothScroll();

    // Header scroll effect
    initHeaderScroll();
});

/* =============================================
   Hero Slider
   ============================================= */
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!slides.length || !dotsContainer) return;

    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 4000; // 4 seconds

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    // Go to specific slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = index;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Reset interval
        resetInterval();
    }

    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    // Start auto-play
    function startInterval() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Reset interval
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Pause on hover
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            startInterval();
        });
    }

    // Start auto-play
    startInterval();
}

/* =============================================
   Before/After Slider
   ============================================= */
function initBeforeAfterSlider() {
    const slides = document.querySelectorAll('.before-after-slide');
    const dots = document.querySelectorAll('.ba-dot');

    if (!slides.length) return;

    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // 5 seconds

    // Go to specific slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = index;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    // Start auto-play
    function startInterval() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            clearInterval(slideInterval);
            startInterval();
        });
    });

    // Pause on hover
    const sliderContainer = document.querySelector('.before-after-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            startInterval();
        });
    }

    // Start auto-play
    startInterval();
}

/* =============================================
   Smooth Scroll
   ============================================= */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =============================================
   Header Scroll Effect
   ============================================= */
function initHeaderScroll() {
    const header = document.querySelector('.header');

    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove shadow based on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

/* =============================================
   Utility Functions
   ============================================= */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
