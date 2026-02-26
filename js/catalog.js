// --- CATALOG LOGIC ---
        const grid = document.getElementById('product-grid');
        const filterBtns = document.querySelectorAll('.filter-btn');

        function renderProducts(filter = 'all') {
            const container = document.getElementById('product-grid');
            container.innerHTML = '';

            const filtered = filter === 'all' ? products : products.filter(p => p.type === filter);

            filtered.forEach(p => {
                const card = document.createElement('div');
                card.className = "bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300";
                card.innerHTML = `
                    <div class="h-64 overflow-hidden relative bg-slate-100">
                        <!-- Imagen con manejador de error por si no existe el archivo -->
                        <img 
                            src="${p.image}" 
                            alt="${p.name}" 
                            class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                            onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=Foto+de+${p.name}';"
                        >
                        <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-dark shadow-sm">
                            $${p.price.toFixed(2)}
                        </div>
                    </div>
                    <div class="p-6">
                        <h4 class="text-xl font-bold text-slate-800 mb-2">${p.name}</h4>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed">${p.desc}</p>
                        <button onclick="selectProduct(${p.price})" class="w-full py-3 rounded-xl border-2 border-brand-light text-brand-dark font-bold hover:bg-brand-dark hover:text-white transition-all flex items-center justify-center gap-2">
                            Personalizar
                        </button>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        // Initialize Catalog
        renderProducts();

        // Filter Handlers
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update UI
                filterBtns.forEach(b => {
                    b.classList.remove('bg-brand-dark', 'text-white');
                    b.classList.add('bg-white', 'text-slate-600');
                });
                btn.classList.remove('bg-white', 'text-slate-600');
                btn.classList.add('bg-brand-dark', 'text-white');
                
                // Filter Data
                renderProducts(btn.dataset.filter);
            });
        });