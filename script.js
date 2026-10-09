/* ============================================================
   HUELLITAS SOS - JavaScript Completo
   Versión: 1.0
   Incluye:
   - Navegación entre vistas (SPA)
   - Menú móvil
   - Acordeón de servicios
   - Formulario hacia WhatsApp
   - Manejo de hash en la URL
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. VARIABLES GLOBALES
    ============================================================ */
    const views = document.querySelectorAll('.view');
    const navLinks = document.querySelectorAll('[data-view]');
    const navLinksContainer = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    const serviceCards = document.querySelectorAll('[data-service]');
    const form = document.getElementById('appointmentForm');

    /* ============================================================
       2. NAVEGACIÓN ENTRE VISTAS (SPA)
    ============================================================ */
    function showView(viewId) {
        // Ocultar todas las vistas
        views.forEach(v => v.classList.remove('active'));

        // Mostrar la vista seleccionada
        const target = document.getElementById(viewId);
        if (target) {
            target.classList.add('active');
            // Scroll suave al top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Actualizar enlace activo en el menú
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.dataset.view === viewId) {
                a.classList.add('active');
            }
        });

        // Cerrar menú móvil si está abierto
        if (navLinksContainer) {
            navLinksContainer.classList.remove('open');
        }

        // Actualizar hash de la URL sin hacer scroll
        if (history.replaceState) {
            history.replaceState(null, '', '#' + viewId);
        }
    }

    /* ============================================================
       3. CLICK EN ENLACES DE NAVEGACIÓN
    ============================================================ */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = link.dataset.view;
            if (viewId) {
                showView(viewId);
            }
        });
    });

    /* ============================================================
       4. MENÚ MÓVIL (☰)
    ============================================================ */
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinksContainer.classList.toggle('open');
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!navLinksContainer.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinksContainer.classList.remove('open');
            }
        });
    }

    /* ============================================================
       5. CARGAR VISTA SEGÚN EL HASH DE LA URL
    ============================================================ */
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && document.getElementById(initialHash)) {
        showView(initialHash);
    }

    // Escuchar cambios en el hash (por si el usuario usa atrás/adelante)
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById(hash)) {
            showView(hash);
        }
    });

    /* ============================================================
       6. ACORDEÓN DE SERVICIOS
       Al hacer clic se expande y muestra más info
    ============================================================ */
    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Si el clic fue en el botón de "Reservar" o en un enlace, no hacer toggle
            if (e.target.closest('.srv-cta') || e.target.closest('a')) {
                return;
            }

            const isActive = card.classList.contains('active');

            // Cerrar todas las tarjetas (solo una abierta a la vez)
            serviceCards.forEach(c => c.classList.remove('active'));

            // Si no estaba activa, abrirla
            if (!isActive) {
                card.classList.add('active');
            }
        });
    });

    /* ============================================================
       7. FORMULARIO DE CITA → WHATSAPP
    ============================================================ */
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obtener datos del formulario
            const data = new FormData(form);
            const nombre = data.get('nombre') || '';
            const telefono = data.get('telefono') || '';
            const mascota = data.get('mascota') || '';
            const especie = data.get('especie') || '';
            const fecha = data.get('fecha') || '';
            const hora = data.get('hora') || '';
            const servicio = data.get('servicio') || '';
            const mensaje = data.get('mensaje') || 'Sin mensaje adicional';

            // Construir mensaje para WhatsApp
            const texto = `🐾 *Nueva solicitud de cita - Huellitas SOS*%0A%0A` +
                `👤 *Nombre:* ${encodeURIComponent(nombre)}%0A` +
                `📞 *Teléfono:* ${encodeURIComponent(telefono)}%0A` +
                `🐶 *Mascota:* ${encodeURIComponent(mascota)}%0A` +
                `🐱 *Especie:* ${encodeURIComponent(especie)}%0A` +
                `📅 *Fecha:* ${encodeURIComponent(fecha)}%0A` +
                `⏰ *Hora:* ${encodeURIComponent(hora)}%0A` +
                `🩺 *Servicio:* ${encodeURIComponent(servicio)}%0A` +
                `📝 *Mensaje:* ${encodeURIComponent(mensaje)}`;

            // Abrir WhatsApp
            const urlWhatsApp = `https://wa.me/573213673394?text=${texto}`;
            window.open(urlWhatsApp, '_blank');

            // Limpiar formulario
            form.reset();

            // Mostrar confirmación visual
            alert('✅ ¡Solicitud enviada! Se abrirá WhatsApp con tu mensaje listo.');
        });
    }

    /* ============================================================
       8. SCROLL SUAVE PARA ANCLAS INTERNAS
    ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Solo procesar si NO tiene data-view (los data-view los maneja showView)
            if (!this.dataset.view && href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 90;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* ============================================================
       9. HEADER STICKY CON SCROLL
    ============================================================ */
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (header) {
            if (currentScroll > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.02)';
            }
        }

        lastScroll = currentScroll;
    });

    /* ============================================================
       10. ANIMACIÓN DE APARICIÓN AL HACER SCROLL
    ============================================================ */
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

    // Aplicar animación a tarjetas y secciones
    const animatableElements = document.querySelectorAll(
        '.welcome-card, .srv-card, .shop-card, .mvv-card, .reason, .contact-cta'
    );

    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    /* ============================================================
       11. CONSOLA: MENSAJE DE BIENVENIDA
    ============================================================ */
    console.log('%c🐾 Huellitas SOS', 'color: #00B894; font-size: 20px; font-weight: bold;');
    console.log('%cClínica Veterinaria 24/7 en Bogotá', 'color: #5C6B73; font-size: 14px;');
    console.log('%c📞 321 367 3394', 'color: #FF6B6B; font-size: 14px; font-weight: bold;');

});
