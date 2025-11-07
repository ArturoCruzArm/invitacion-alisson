// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('2025-11-08T17:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<p style="font-size: 2rem;">¡El evento ha comenzado!</p>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Map Links - PENDIENTE: Agregar coordenadas exactas
function openMap(location) {
    let mapUrl = '';

    if (location === 'misa') {
        // Templo Sagrado Corazón de Jesús, Colonia Los Pinos
        // PENDIENTE: Agregar coordenadas exactas
        mapUrl = 'https://www.google.com/maps/search/Templo+Sagrado+Coraz%C3%B3n+de+Jes%C3%Bas+Colonia+Los+Pinos';
    } else if (location === 'recepcion') {
        // Salón Grand Castillo
        // PENDIENTE: Agregar coordenadas exactas
        mapUrl = 'https://www.google.com/maps/search/Sal%C3%B3n+Grand+Castillo';
    }

    window.open(mapUrl, '_blank');
}

// Smooth scroll for scroll indicator
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    document.querySelector('.message').scrollIntoView({ behavior: 'smooth' });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Hero section should be visible immediately
document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'translateY(0)';

// Music Toggle Function
let isPlaying = false;
const music = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');

function toggleMusic() {
    if (isPlaying) {
        music.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        musicToggle.classList.remove('playing');
    } else {
        music.play();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        musicToggle.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

// Auto-play music on user interaction (browsers block autoplay)
document.addEventListener('click', function initMusic() {
    if (!isPlaying) {
        music.play().then(() => {
            isPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            musicToggle.classList.add('playing');
        }).catch(() => {
            // Autoplay was prevented
        });
    }
    document.removeEventListener('click', initMusic);
}, { once: true });
