const fadeElements = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                appearOnScroll.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);

fadeElements.forEach((el) => appearOnScroll.observe(el));

/********* Dust Particles **********/

const particleCount = 80; // number of particles
const particlesContainer = document.querySelector(".particles");
const particles = [];

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");

    const size = Math.random() * 5 + 3; // 3px to 8px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    particle.dataset.x = x;
    particle.dataset.y = y;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const duration = Math.random() * 60 + 30;
    const delay = Math.random() * 60;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    particlesContainer.appendChild(particle);
    particles.push(particle);
}

// Mouse parallax effect
document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5; // -0.5 to 0.5
    const mouseY = e.clientY / window.innerHeight - 0.5;

    particles.forEach((p, index) => {
        const depth = parseFloat(p.style.width) / 8;
        const offsetX = mouseX * 50 * depth; // 50px max offset
        const offsetY = mouseY * 50 * depth;

        p.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(45deg)`;
    });
});

document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    document.querySelectorAll(".floating").forEach((el) => {
        const speed = el.classList.contains("rocket")
            ? 40
            : el.classList.contains("astronaut")
            ? 25
            : 15;
        el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// Projects scrolling

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".projects-carousel");
    const projectCards = document.querySelectorAll(
        ".projects-carousel > .project-card"
    );

    if (!carousel || projectCards.length === 0) {
        console.warn("Carousel or project cards not found.");
        return;
    }

    function updateActiveCard() {
        let minDistance = Infinity;
        let closestCard = null;

        const carouselRect = carousel.getBoundingClientRect();
        const carouselCenter = carouselRect.left + carouselRect.width / 2;

        projectCards.forEach((card) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;

            const distance = Math.abs(carouselCenter - cardCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
            }
        });

        projectCards.forEach((card) => card.classList.remove("active-card"));
        if (closestCard) {
            closestCard.classList.add("active-card");
        }
    }

    setTimeout(updateActiveCard, 100);

    let scrollTimeout;
    carousel.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveCard, 150);
    });

    const initialActiveCard = document.querySelector(
        ".projects-carousel .active-card"
    );

    if (initialActiveCard) {
        const cardOffsetLeft = initialActiveCard.offsetLeft;
        const cardWidth = initialActiveCard.offsetWidth;
        const carouselWidth = carousel.offsetWidth;
        
        const scrollPosition = cardOffsetLeft + (cardWidth / 2) - (carouselWidth / 2);

        carousel.scrollLeft = scrollPosition;
    }
});