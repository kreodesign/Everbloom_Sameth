// --- DATA STORE (Actualizado y Limpio) ---
const products = [
    { 
        id: 1, 
        name: 'Amor Eterno', 
        folder: 'amor_eterno', 
        imageCount: 2, 
        type: 'ramo', 
        price: 20.00, // Ajustado para coincidir con el calculador (6 rosas)
        desc: '6 rosas satinadas con envoltura premium. Un detalle clásico y elegante.',
        isNew: false,
        isPopular: true
    },
    { 
        id: 2, 
        name: 'Everbloom Eternity', 
        folder: 'everbloom_eternity',
        imageCount: 4,
        type: 'ramo', 
        price: 35.00, 
        desc: '12 rosas satinadas con envoltura premium de larga duración.',
        isNew: true,
        isPopular: false
    },
    { 
        id: 3, 
        name: 'Noche Mística', 
        folder: 'noche_mistica',
        type: 'ramo',
        imageCount: 4,
        price: 55.00, // Ajustado para coincidir con el calculador (24 rosas)
        desc: '24 rosas, incluye luces LED y tonos profundos para una noche mágica.',
        isNew: false,
        isPopular: true
    },
    { 
        id: 4, 
        name: 'Domo de Cristal', 
        folder: 'domo_cristal',
        type: 'individual',
        imageCount: 4,
        price: 12.00,
        desc: 'Una rosa eterna encapsulada tipo Bella y Bestia en cúpula de vidrio.',
        isNew: false,
        isPopular: false
    },
    { 
        id: 5, 
        name: 'Ramo Gigante', 
        folder: 'ramo_gigante',
        type: 'ramo',
        imageCount: 4,
        price: 120.00, // Ajustado para coincidir con el calculador (50 rosas)
        desc: '50 rosas de lujo para una declaración impactante e inolvidable.',
        isNew: true,
        isPopular: true
    },
    { 
        id: 6, 
        name: 'Blue Box', 
        folder: 'blue_box',
        type: 'individual',
        imageCount: 4,
        price: 45.00,
        desc: 'Elegante caja azul con rosas seleccionadas de acabado satinado superior.',
        isNew: false,
        isPopular: false
    },
    { 
        id: 7, 
        name: 'Ramo Rosa Pastel', 
        folder: 'ramo_rosa',
        type: 'ramo',
        imageCount: 4,
        price: 38.00,
        desc: 'Combinación delicada de tonos rosas para expresar ternura.',
        isNew: false,
        isPopular: false
    }
];

// --- CATALOG LOGIC ---
const grid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Formateador de moneda (S/ 00.00)
const formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
});

/**
 * Renderiza los productos en el grid con filtros y búsqueda
 */
function renderProducts(filter = 'all', searchTerm = '') {
    const container = document.getElementById('product-grid');
    if (!container) return;
    
    container.innerHTML = '';

    const filtered = products.filter(p => {
        const matchesFilter = filter === 'all' || p.type === filter;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              p.desc.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-slate-400 text-lg">No encontramos productos que coincidan.</p>
            </div>`;
        return;
    }

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-500 flex flex-col h-full";
        
        // Lógica de etiquetas
        let badge = '';
        if (p.isNew) badge = '<span class="absolute top-4 left-4 z-10 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Nuevo</span>';
        if (p.isPopular) badge = '<span class="absolute top-4 left-4 z-10 bg-pink-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">Popular</span>';

        card.innerHTML = `
            <div class="h-72 overflow-hidden relative bg-slate-50">
                ${badge}
                <img src="img/products/${p.folder}/1.png" 
                     alt="${p.name}" 
                     class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 p-4"
                     onmouseover="if(${p.imageCount} > 1) this.src='img/products/${p.folder}/2.png'"
                     onmouseout="this.src='img/products/${p.folder}/1.png'"
                     onerror="this.src='https://placehold.co/400x400?text=Everbloom+Sameth'"
                     loading="lazy">
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="text-xl font-bold text-slate-800 leading-tight">${p.name}</h4>
                    <span class="text-brand-primary font-bold whitespace-nowrap ml-2">
                        ${formatter.format(p.price)}
                    </span>
                </div>
                <p class="text-slate-500 text-sm mb-6 line-clamp-2 flex-grow">
                    ${p.desc}
                </p>
                <a href="producto.html?id=${p.id}" 
                   class="block w-full text-center py-3 rounded-xl border-2 border-brand-primary text-brand-primary font-bold hover:bg-brand-primary hover:text-white transition-all transform active:scale-95">
                    Personalizar y Comprar
                </a>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- EVENT LISTENERS ---

// Inicializar Catálogo
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    // Filtros por categoría
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-brand-dark', 'text-white', 'shadow-md');
                b.classList.add('bg-white', 'text-slate-600');
            });
            btn.classList.remove('bg-white', 'text-slate-600');
            btn.classList.add('bg-brand-dark', 'text-white', 'shadow-md');
            
            renderProducts(btn.dataset.filter);
        });
    });

    // Buscador (Opcional: Si agregas un input con id="product-search" en tu HTML)
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilter = document.querySelector('.filter-btn.bg-brand-dark')?.dataset.filter || 'all';
            renderProducts(activeFilter, e.target.value);
        });
    }
});