// Configuración de navegación
const PAGES = [
    'pagina1.html',
    'pagina2.html',
    'pagina3.html',
    'pagina4.html',
    'pagina5.html',
    'pagina6.html',
    'pagina7.html',
    'pagina8.html',
    'pagina9.html',
    'pagina10.html',
    'pagina11.html',
    'pagina12.html',
    'pagina13.html',
    'pagina14.html',
    'pagina15.html'
];

// Función para obtener el índice de la página actual
function getCurrentPageIndex() {
    const currentPage = window.location.pathname.split('/').pop();
    return PAGES.indexOf(currentPage);
}

// Función para actualizar los enlaces de navegación
function updateNavigationLinks() {
    const currentIndex = getCurrentPageIndex();
    const prevButton = document.querySelector('.prev-page-button');
    const nextButton = document.querySelector('.next-page-button');

    if (prevButton && nextButton) {
        // Actualizar enlace "Anterior"
        const prevIndex = (currentIndex - 1 + PAGES.length) % PAGES.length;
        prevButton.href = PAGES[prevIndex];

        // Actualizar enlace "Siguiente"
        const nextIndex = (currentIndex + 1) % PAGES.length;
        nextButton.href = PAGES[nextIndex];
    }
}

// Función para crear la animación de red
function createNetworkAnimation() {
    const canvas = document.createElement('canvas');
    canvas.classList.add('network-animation');
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Configuración de partículas
    const particles = [];
    const particleCount = 50;
    const connectionDistance = 150;

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(108, 99, 255, 0.5)';
            ctx.fill();
        }
    }

    // Inicializar partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Función de animación
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Actualizar y dibujar partículas
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Dibujar conexiones
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(108, 99, 255, ${0.2 * (1 - distance/connectionDistance)})`;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    // Manejar redimensionamiento
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Iniciar animación
    animate();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    updateNavigationLinks();
    createNetworkAnimation();
}); 