// --- DATA STORE ---
        const products = [
        { 
            id: 1, 
            name: 'Amor Eterno', 
            folder: 'amor_eterno', // Nombre de la carpeta
            imageCount: 2, // Cuántas imágenes hay (1.jpg, 2.jpg, 3.jpg)
            type: 'ramo', 
            price: 10.00, 
            desc: '6 rosas satinadas con envoltura premium. Un detalle clásico y elegante.'
        },
        { 
            id: 2, 
            name: 'Everbloom Eternity', 
            folder: 'everbloom_eternity',
            imageCount: 4,
            type: 'ramo', 
            price: 35.00, 
            desc: '12 rosas satinadas con envoltura premium de larga duración.'
        },
        { 
            id: 3, 
            name: 'Noche Mística', 
            folder: 'noche_mistica',
            type: 'ramo',
            imageCount: 4,
            price: 45.00, 
            desc: '24 rosas, incluye luces LED y tonos profundos.', 
        },
        { 
            id: 4, 
            name: 'Domo de Cristal', 
            folder: 'domo_cristal',
            type: 'individual',
            imageCount: 4,
            price: 12.00,
            desc: 'Una rosa eterna encapsulada tipo Bella y Bestia.', 
        },
        { 
            id: 5, 
            name: 'Ramo Gigante', 
            folder: 'ramo_gigante',
            type: 'ramo',
            imageCount: 4,
            price: 90.00,
            desc: '50 rosas para una declaración impactante.', 
        },
        { 
            id: 6, 
            name: 'Blue Box', 
            folder: 'blue_box',
            type: 'ramo',
            imageCount: 4,
            price: 90.00,
            desc: '50 rosas para una declaración impactante.', 
        },
        { 
            id: 7, 
            name: 'Ramo Rosa', 
            folder: 'ramo_rosa',
            type: 'ramo',
            imageCount: 4,
            price: 90.00,
            desc: '50 rosas para una declaración impactante.', 
        },
    ];

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
                        <img src="img/products/${p.folder}/1.png" 
                             alt="${p.name}" 
                             class="w-full h-full object-contain">
                    </div>
                    <div class="p-6">
                        <h4 class="text-xl font-bold text-slate-800 mb-2">${p.name}</h4>
                        <a href="producto.html?id=${p.id}" class="block w-full text-center py-3 rounded-xl border-2 border-brand-primary text-brand-primary font-bold hover:bg-brand-primary hover:text-white transition-all">
                            Ver Detalles y Fotos
                        </a>
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