// Counter Animation Function
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('id-ID');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('id-ID');
        }
    }, 16);
}

// Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const delay = parseInt(card.dataset.delay) || 0;

            // Animate card appearance with delay
            setTimeout(() => {
                card.classList.add('animate');

                // Start counter animation
                const numberElement = card.querySelector('.stat-number');
                const target = parseInt(numberElement.dataset.target);
                animateCounter(numberElement, target);
            }, delay);

            // Unobserve after animation
            observer.unobserve(card);
        }
    });
}, observerOptions);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Observe all stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        observer.observe(card);
    });

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    console.log('Statistics Counter initialized successfully!');
});

// Optional: Reset animation on window resize (for development)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Window resized - layout adjusted');
    }, 250);
});