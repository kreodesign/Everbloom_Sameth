// Configuración del Carrusel del Hero
        const heroImages = [
            'img/destacados/domo_rosa.png',
            'img/destacados/amor_eterno.png',
            'img/destacados/noche_mistica.png',
            'img/destacados/ramo_gigante.jpg',
        ];

        let currentHeroIndex = 0;

        function setupHeroCarousel() {
            const inner = document.getElementById('carousel-inner');
            const indicators = document.getElementById('carousel-indicators');
            if (!inner || !indicators) return;

            inner.innerHTML = '';
            indicators.innerHTML = '';

            heroImages.forEach((src, index) => {
                // Crear imagen
                const item = document.createElement('div');
                item.className = `carousel-item absolute inset-0 bg-white p-3 rounded-2xl shadow-2xl transition-all duration-1000 transform ${index === 0 ? 'opacity-100 scale-100 rotate-3' : 'opacity-0 scale-90 -rotate-3'}`;
                item.style.zIndex = index === 0 ? '20' : '10';
                item.innerHTML = `
                    <div class="w-full h-full bg-slate-100 rounded-xl overflow-hidden">
                        <img src="${src}" class="w-full h-full object-contain" onerror="this.src='https://placehold.co/400x600?text=Ramo+Eterno'" />
                    </div>
                `;
                inner.appendChild(item);

                // Crear punto indicador
                const dot = document.createElement('button');
                dot.className = `w-2 h-2 rounded-full transition-all ${index === 0 ? 'bg-white w-6' : 'bg-white/40'}`;
                dot.onclick = () => showHeroSlide(index);
                indicators.appendChild(dot);
            });

            // Iniciar rotación automática
            setInterval(() => {
                currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
                showHeroSlide(currentHeroIndex);
            }, 4000);
        }

        function showHeroSlide(index) {
            const items = document.querySelectorAll('.carousel-item');
            const dots = document.querySelector('#carousel-indicators').children;
            
            items.forEach((item, i) => {
                if (i === index) {
                    item.className = "carousel-item absolute inset-0 bg-white p-3 rounded-2xl shadow-2xl transition-all duration-1000 transform opacity-100 scale-100 rotate-3 z-20";
                } else {
                    item.className = "carousel-item absolute inset-0 bg-white p-3 rounded-2xl shadow-2xl transition-all duration-1000 transform opacity-0 scale-90 -rotate-3 z-10";
                }
            });

            Array.from(dots).forEach((dot, i) => {
                dot.className = `w-2 h-2 rounded-full transition-all ${i === index ? 'bg-white w-6' : 'bg-white/40'}`;
            });
        }

        // Inicializar cuando cargue la página
        document.addEventListener('DOMContentLoaded', setupHeroCarousel);