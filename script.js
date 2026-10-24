document.addEventListener('DOMContentLoaded', function () {

    /* NAVEGACIÓN */
    var views = document.querySelectorAll('.view');
    var navLinks = document.querySelectorAll('[data-view]');

    function showView(viewId) {
        views.forEach(v => v.classList.remove('active'));
        var target = document.getElementById(viewId);
        if (target) { target.classList.add('active'); window.scrollTo(0, 0); }
        
        if (viewId === 'petshop') {
            document.getElementById('petshop-catalog').style.display = 'block';
            document.getElementById('product-detail').style.display = 'none';
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var viewId = this.getAttribute('data-view');
            if (viewId) showView(viewId);
        });
    });

    /* CATÁLOGO */
    var productos = [
        { id: 1, nombre: "Arenero Cerrado Premium", categoria: "Gatos", precio: 85000, desc: "Arenero cerrado con filtro de carbón.", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80", tags: ["arenero", "gatos"], descuento: false },
        { id: 2, nombre: "Arena Sanitaria 10kg", categoria: "Gatos", precio: 32000, desc: "Arena de alta absorción.", img: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&q=80", tags: ["arena", "gatos"], descuento: true },
        { id: 3, nombre: "Pala para Arena", categoria: "Gatos", precio: 12000, desc: "Pala ergonómica con rejilla.", img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80", tags: ["pala", "gatos"], descuento: false },
        { id: 4, nombre: "Concentrado Perro Adulto", categoria: "Perros", precio: 120000, desc: "Alimento balanceado con pollo.", img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80", tags: ["alimento", "perros"], descuento: false },
        { id: 5, nombre: "Juguete Hueso de Goma", categoria: "Perros", precio: 25000, desc: "Caucho resistente para morder.", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80", tags: ["juguete", "perros"], descuento: true }
    ];

    var shopGrid = document.getElementById('shopGrid');
    var shopFilters = document.getElementById('shopFilters');
    var catalogView = document.getElementById('petshop-catalog');
    var productDetailView = document.getElementById('product-detail');
    var backBtn = document.getElementById('backToCatalog');

    if (shopFilters) {
        ["Todos", "Perros", "Gatos"].forEach(cat => {
            var btn = document.createElement('button');
            btn.className = 'filter-btn' + (cat === 'Todos' ? ' active' : '');
            btn.textContent = cat;
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderProductos(cat);
            });
            shopFilters.appendChild(btn);
        });
    }

    function renderProductos(categoriaFiltro) {
        if (!shopGrid) return;
        shopGrid.innerHTML = '';
        var filtered = categoriaFiltro === 'Todos' ? productos : productos.filter(p => p.categoria === categoriaFiltro);

        filtered.forEach(prod => {
            var precioFinal = prod.descuento ? (prod.precio * 0.8) : prod.precio;
            var card = document.createElement('article');
            card.className = 'shop-card product-card';
            card.innerHTML = `
                ${prod.descuento ? '<span class="badge-discount">20% OFF</span>' : ''}
                <div class="product-img-wrap"><img src="${prod.img}" alt="${prod.nombre}" loading="lazy"></div>
                <div class="product-info">
                    <span class="product-cat">${prod.categoria}</span>
                    <h3>${prod.nombre}</h3>
                    <div class="product-price">
                        ${prod.descuento ? `<span class="old-price">$${prod.precio.toLocaleString()}</span>` : ''}
                        <span class="current-price">$${precioFinal.toLocaleString()}</span>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => openProductDetail(prod));
            shopGrid.appendChild(card);
        });
    }

    function openProductDetail(prod) {
        catalogView.style.display = 'none';
        productDetailView.style.display = 'block';

        document.getElementById('detailCategory').textContent = prod.categoria;
        document.getElementById('detailTitle').textContent = prod.nombre;
        document.getElementById('detailDescription').textContent = prod.desc;
        
        var precioFinal = prod.descuento ? (prod.precio * 0.8) : prod.precio;
        document.getElementById('detailPrice').innerHTML = `
            ${prod.descuento ? `<span class="old-price" style="font-size:1rem; display:block;">$${prod.precio.toLocaleString()}</span>` : ''}
            <span class="current-price" style="font-size:2rem; color:var(--primary);">$${precioFinal.toLocaleString()}</span>
        `;

        document.getElementById('detailImage').innerHTML = `<img src="${prod.img}" alt="${prod.nombre}">`;

        var waBtn = document.getElementById('detailWhatsApp');
        waBtn.href = 'https://wa.me/573213673394?text=' + encodeURIComponent(`Hola, me interesa: *${prod.nombre}* - $${precioFinal.toLocaleString()}`);

        renderRelated(prod);
        window.scrollTo(0, 0);
    }

    function renderRelated(currentProd) {
        var relatedGrid = document.getElementById('relatedGrid');
        relatedGrid.innerHTML = '';
        
        var related = productos.filter(p => p.id !== currentProd.id && (p.categoria === currentProd.categoria || p.tags.some(t => currentProd.tags.includes(t)))).slice(0, 3);

        related.forEach(prod => {
            var precioFinal = prod.descuento ? (prod.precio * 0.8) : prod.precio;
            var card = document.createElement('article');
            card.className = 'shop-card product-card';
            card.innerHTML = `
                ${prod.descuento ? '<span class="badge-discount">20% OFF</span>' : ''}
                <div class="product-img-wrap"><img src="${prod.img}" alt="${prod.nombre}" loading="lazy"></div>
                <div class="product-info">
                    <span class="product-cat">${prod.categoria}</span>
                    <h3>${prod.nombre}</h3>
                    <div class="product-price">
                        <span class="current-price">$${precioFinal.toLocaleString()}</span>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => openProductDetail(prod));
            relatedGrid.appendChild(card);
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', function() {
            productDetailView.style.display = 'none';
            catalogView.style.display = 'block';
        });
    }

    if (shopGrid) renderProductos('Todos');

    /* FORMULARIO */
    var form = document.getElementById('appointmentForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var data = new FormData(form);
            var texto = `🐾 *Nueva cita*\n👤 ${data.get('nombre')}\n📞 ${data.get('telefono')}\n🐶 ${data.get('mascota')}\n🩺 ${data.get('servicio')}`;
            window.open('https://wa.me/573213673394?text=' + encodeURIComponent(texto), '_blank');
            form.reset();
        });
    }
});
