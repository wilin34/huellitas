/* ============================================================
   HUELLITAS SOS - JavaScript Completo (Con Catálogo)
============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ============================================================
       1. NAVEGACIÓN ENTRE VISTAS
    ============================================================ */
    var views = document.querySelectorAll('.view');
    var navLinks = document.querySelectorAll('[data-view]');
    var navLinksContainer = document.getElementById('navLinks');
    var menuToggle = document.querySelector('.menu-toggle');

    function showView(viewId) {
        for (var i = 0; i < views.length; i++) {
            views[i].classList.remove('active');
        }

        var target = document.getElementById(viewId);
        if (target) {
            target.classList.add('active');
            window.scrollTo(0, 0);
        }

        var allNavLinks = document.querySelectorAll('.nav-links a');
        for (var j = 0; j < allNavLinks.length; j++) {
            allNavLinks[j].classList.remove('active');
            if (allNavLinks[j].getAttribute('data-view') === viewId) {
                allNavLinks[j].classList.add('active');
            }
        }

        if (navLinksContainer) {
            navLinksContainer.classList.remove('open');
        }

        if (history.replaceState) {
            history.replaceState(null, '', '#' + viewId);
        }
    }

    for (var k = 0; k < navLinks.length; k++) {
        navLinks[k].addEventListener('click', function (e) {
            e.preventDefault();
            var viewId = this.getAttribute('data-view');
            if (viewId) {
                // Si volvemos al Petshop, reseteamos la vista
                if (viewId === 'petshop') {
                    document.getElementById('petshop-catalog').style.display = 'block';
                    document.getElementById('product-detail').style.display = 'none';
                }
                showView(viewId);
            }
        });
    }

    /* ============================================================
       2. MENÚ MÓVIL
    ============================================================ */
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinksContainer.classList.toggle('open');
        });

        document.addEventListener('click', function (e) {
            if (!navLinksContainer.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinksContainer.classList.remove('open');
            }
        });
    }

    /* ============================================================
       3. CARGAR VISTA SEGÚN HASH
    ============================================================ */
    var hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showView(hash);
    }

    window.addEventListener('hashchange', function () {
        var h = window.location.hash.replace('#', '');
        if (h && document.getElementById(h)) {
            showView(h);
        }
    });

    /* ============================================================
       4. ACORDEÓN DE SERVICIOS
    ============================================================ */
    var serviceCards = document.querySelectorAll('[data-service]');

    for (var m = 0; m < serviceCards.length; m++) {
        serviceCards[m].addEventListener('click', function (e) {
            if (e.target.closest('.srv-cta') || e.target.closest('a')) {
                return;
            }

            var isActive = this.classList.contains('active');

            for (var n = 0; n < serviceCards.length; n++) {
                serviceCards[n].classList.remove('active');
            }

            if (!isActive) {
                this.classList.add('active');
            }
        });
    }

    /* ============================================================
       5. FORMULARIO → WHATSAPP
    ============================================================ */
    var form = document.getElementById('appointmentForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var data = new FormData(form);
            var nombre = data.get('nombre') || '';
            var telefono = data.get('telefono') || '';
            var mascota = data.get('mascota') || '';
            var especie = data.get('especie') || '';
            var fecha = data.get('fecha') || '';
            var hora = data.get('hora') || '';
            var servicio = data.get('servicio') || '';
            var mensaje = data.get('mensaje') || 'Sin mensaje adicional';

            var texto = '🐾 *Nueva solicitud de cita - Huellitas SOS*\n\n' +
                '👤 Nombre: ' + nombre + '\n' +
                '📞 Teléfono: ' + telefono + '\n' +
                '🐶 Mascota: ' + mascota + '\n' +
                '🐱 Especie: ' + especie + '\n' +
                '📅 Fecha: ' + fecha + '\n' +
                '⏰ Hora: ' + hora + '\n' +
                '🩺 Servicio: ' + servicio + '\n' +
                '📝 Mensaje: ' + mensaje;

            var urlWhatsApp = 'https://wa.me/573213673394?text=' + encodeURIComponent(texto);
            window.open(urlWhatsApp, '_blank');
            form.reset();
        });
    }

    /* ============================================================
       6. SISTEMA DE RECONOCIMIENTO / CATÁLOGO PET SHOP
    ============================================================ */
    // Base de datos de productos (Simulada)
    var product = [
        { id: 1, nombre: "Arenero Cerrado Premium", categoria: "Gatos", precio: 85000, desc: "Arenero cerrado con filtro de carbón para evitar olores. Ideal para espacios pequeños.", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80", tags: ["arenero", "gatos", "higiene"], descuento: false },
        { id: 2, nombre: "Arena Sanitaria Aglomerante 10kg", categoria: "Gatos", precio: 32000, desc: "Arena de alta absorción con control de olores. Rinde hasta 1 mes.", img: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&q=80", tags: ["arena", "gatos", "higiene"], descuento: true },
        { id: 3, nombre: "Pala para Arena de Gato", categoria: "Gatos", precio: 12000, desc: "Pala ergonómica con rejilla para filtrar la arena limpia.", img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&q=80", tags: ["pala", "gatos", "higiene"], descuento: false },
        { id: 4, nombre: "Juguete Ratón Interactivo", categoria: "Gatos", precio: 18000, desc: "Ratón de cuerda con catnip incluido. Estimula el instinto cazador.", img: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=400&q=80", tags: ["juguete", "gatos"], descuento: true },
        { id: 5, nombre: "Concentrado Premium Perro Adulto", categoria: "Perros", precio: 120000, desc: "Alimento balanceado con proteína de pollo y omega 3 para pelaje brillante.", img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80", tags: ["alimento", "perros"], descuento: false },
        { id: 6, nombre: "Juguete Hueso de Goma", categoria: "Perros", precio: 25000, desc: "Hueso de caucho resistente para morder, ideal para limpieza dental.", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&q=80", tags: ["juguete", "perros"], descuento: false },
        { id: 7, nombre: "Collar Antipulgas", categoria: "Perros", precio: 45000, desc: "Collar repelente de pulgas y garrapatas con duración de 4 meses.", img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80", tags: ["salud", "perros"], descuento: true },
        { id: 8, nombre: "Cama Nido Suave", categoria: "Accesorios", precio: 65000, desc: "Cama ultra suave y abrigada para perros y gatos pequeños.", img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=400&q=80", tags: ["cama", "accesorios"], descuento: false }
    ];

    var shopGrid = document.getElementById('shopGrid');
    var shopFilters = document.getElementById('shopFilters');
    var catalogView = document.getElementById('petshop-catalog');
    var productDetailView = document.getElementById('product-detail');
    var backBtn = document.getElementById('backToCatalog');

    // Renderizar filtros
    var categorias = ["Todos", "Perros", "Gatos", "Accesorios"];
    categorias.forEach(function(cat) {
        var btn = document.createElement('button');
        btn.className = 'filter-btn' + (cat === 'Todos' ? ' active' : '');
        btn.textContent = cat;
        btn.setAttribute('data-cat', cat);
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProductos(this.getAttribute('data-cat'));
        });
        shopFilters.appendChild(btn);
    });

    // Función para renderizar productos en el grid
    function renderProductos(categoriaFiltro, targetGrid = shopGrid) {
        targetGrid.innerHTML = '';
        
        var filtered = productos;
        if (categoriaFiltro && categoriaFiltro !== 'Todos') {
            filtered = productos.filter(p => p.categoria === categoriaFiltro);
        }

        filtered.forEach(function(prod) {
            // Calcular precio con descuento
            var precioFinal = prod.descuento ? (prod.precio * 0.8) : prod.precio;
            
            var card = document.createElement('article');
            card.className = 'shop-card product-card';
            card.innerHTML = `
                ${prod.descuento ? '<span class="badge-discount">20% OFF</span>' : ''}
                <div class="product-img-wrap">
                    <img src="${prod.img}" alt="${prod.nombre}" loading="lazy" width="300" height="200">
                </div>
                <div class="product-info">
                    <span class="product-cat">${prod.categoria}</span>
                    <h3>${prod.nombre}</h3>
                    <div class="product-price">
                        ${prod.descuento ? `<span class="old-price">$${prod.precio.toLocaleString()}</span>` : ''}
                        <span class="current-price">$${precioFinal.toLocaleString()}</span>
                    </div>
                </div>
            `;
            
            // Al hacer clic, abrir detalle
            card.addEventListener('click', function() {
                openProductDetail(prod);
            });

            targetGrid.appendChild(card);
        });
    }

    // Función para abrir el detalle del producto
    function openProductDetail(prod) {
        catalogView.style.display = 'none';
        productDetailView.style.display = 'block';

        // Llenar datos
        document.getElementById('detailCategory').textContent = prod.categoria;
        document.getElementById('detailTitle').textContent = prod.nombre;
        document.getElementById('detailDescription').textContent = prod.desc;
        
        var precioFinal = prod.descuento ? (prod.precio * 0.8) : prod.precio;
        document.getElementById('detailPrice').innerHTML = `
            ${prod.descuento ? `<span class="old-price" style="font-size:1rem; display:block;">$${prod.precio.toLocaleString()}</span>` : ''}
            <span class="current-price" style="font-size:2rem; color:var(--primary);">$${precioFinal.toLocaleString()}</span>
            ${prod.descuento ? '<span class="badge-discount" style="margin-left:10px;">20% OFF</span>' : ''}
        `;

        document.getElementById('detailImage').innerHTML = `<img src="${prod.img}" alt="${prod.nombre}" width="500" height="400">`;

        // Actualizar botón WhatsApp
        var waBtn = document.getElementById('detailWhatsApp');
        var msg = `Hola, estoy interesado en el producto: *${prod.nombre}* (${prod.categoria}) - Precio: $${precioFinal.toLocaleString()}`;
        waBtn.href = 'https://wa.me/573213673394?text=' + encodeURIComponent(msg);

        // Lógica de artículos relacionados (Tipo Temu)
        renderRelated(prod);
        
        window.scrollTo(0, 0);
    }

    // Función para renderizar relacionados
    function renderRelated(currentProd) {
        var relatedGrid = document.getElementById('relatedGrid');
        relatedGrid.innerHTML = '';

        // Algoritmo simple: Misma categoría o mismos tags, excluyendo el actual
        var related = productos.filter(p => {
            if (p.id === currentProd.id) return false;
            
            // Coincidencia por categoría
            if (p.categoria === currentProd.categoria) return true;
            
            // Coincidencia por tags (ej. arenero, pala, arena)
            var hasCommonTag = p.tags.some(tag => currentProd.tags.includes(tag));
            return hasCommonTag;
        });

        // Tomar máximo 4
        related = related.slice(0, 4);

        related.forEach(function(prod) {
            var precioFinal = prod.descuento ? (prod.precio * 0.8) : prod.precio;
            var card = document.createElement('article');
            card.className = 'shop-card product-card';
            card.innerHTML = `
                ${prod.descuento ? '<span class="badge-discount">20% OFF</span>' : ''}
                <div class="product-img-wrap">
                    <img src="${prod.img}" alt="${prod.nombre}" loading="lazy" width="300" height="200">
                </div>
                <div class="product-info">
                    <span class="product-cat">${prod.categoria}</span>
                    <h3>${prod.nombre}</h3>
                    <div class="product-price">
                        ${prod.descuento ? `<span class="old-price">$${prod.precio.toLocaleString()}</span>` : ''}
                        <span class="current-price">$${precioFinal.toLocaleString()}</span>
                    </div>
                </div>
            `;
            card.addEventListener('click', function() {
                openProductDetail(prod);
            });
            relatedGrid.appendChild(card);
        });
    }

    // Botón Volver
    backBtn.addEventListener('click', function() {
        productDetailView.style.display = 'none';
        catalogView.style.display = 'block';
    });

    // Inicializar catálogo
    if (shopGrid) {
        renderProductos('Todos');
    }

    /* ============================================================
       7. CHATBOT
    ============================================================ */
    var WHATSAPP_BOT = '447418357240';
    var chatbot = document.getElementById('chatbot');
    var chatbotToggle = document.getElementById('chatbotToggle');
    var chatbotClose = document.getElementById('chatbotClose');
    var chatbotBody = document.getElementById('chatbotBody');
    var chatbotOptions = document.getElementById('chatbotOptions');
    var chatbotText = document.getElementById('chatbotText');
    var chatbotSend = document.getElementById('chatbotSend');

    if (chatbot && chatbotToggle) {
        chatbotToggle.addEventListener('click', function () {
            chatbot.classList.toggle('open');
        });

        chatbotClose.addEventListener('click', function () {
            chatbot.classList.remove('open');
        });

        function addMessage(text, sender) {
            var div = document.createElement('div');
            div.className = 'chat-msg ' + sender;
            div.innerHTML = text;
            chatbotBody.appendChild(div);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }

        function openWhatsApp(mensaje) {
            var url = 'https://wa.me/' + WHATSAPP_BOT + '?text=' + encodeURIComponent(mensaje);
            window.open(url, '_blank');
        }

        var respuestas = {
            cita: { texto: '📅 ¡Genial! Vamos a agendar tu cita. Te llevo a WhatsApp para tomar tus datos.', wa: '¡Hola! 🐾 Quiero agendar una cita en Huellitas SOS.' },
            urgencia: { texto: '🚑 ¡Emergencia detectada! Atendemos 24/7. Te paso a WhatsApp ahora mismo.', wa: '🚨 EMERGENCIA - Huellitas SOS' },
            servicios: { texto: '🩺 Ofrecemos consulta, vacunación, laboratorio, rayos X, etc.', wa: 'Hola 🐾 quiero información sobre los servicios.' },
            spa: { texto: '✨ Nuestro spa incluye baño, corte, cepillado y más.', wa: 'Hola ✨ quiero agendar una sesión de Spa.' },
            petshop: { texto: '🛍️ Tenemos alimentos, juguetes, camas y medicamentos.', wa: 'Hola 🛍️ estoy buscando un producto en el Pet Shop.' },
            humano: { texto: '💬 Perfecto, te comunico con un humano del equipo.', wa: 'Hola 🐾 quiero hablar con alguien de Huellitas SOS.' }
        };

        chatbotOptions.addEventListener('click', function (e) {
            var btn = e.target.closest('button');
            if (!btn) return;
            var opcion = btn.getAttribute('data-option');
            addMessage(btn.textContent.trim(), 'user');
            var r = respuestas[opcion];
            if (r) {
                setTimeout(function () { addMessage(r.texto, 'bot'); }, 400);
                setTimeout(function () { openWhatsApp(r.wa); }, 1200);
            }
        });

        function enviarMensaje() {
            var texto = chatbotText.value.trim();
            if (!texto) return;
            addMessage(texto, 'user');
            chatbotText.value = '';
            setTimeout(function () { addMessage('¡Gracias! 🐶 Te llevo a WhatsApp.', 'bot'); }, 400);
            setTimeout(function () { openWhatsApp('Hola 🐾 ' + texto); }, 1200);
        }

        chatbotSend.addEventListener('click', enviarMensaje);
        chatbotText.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { e.preventDefault(); enviarMensaje(); }
        });
    }

    /* ============================================================
       8. SERVICE WORKER (CACHÉ)
    ============================================================ */
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('ServiceWorker registrado con éxito:', registration.scope);
                })
                .catch(error => {
                    console.log('Error al registrar ServiceWorker:', error);
                });
        });
    }

});
