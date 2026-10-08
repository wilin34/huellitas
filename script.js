/* ============================================================
   HUELLITAS SOS - JavaScript
   Navegación entre vistas en la misma página
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    const views = document.querySelectorAll('.view');
    const navLinks = document.querySelectorAll('[data-view]');
    const navLinksContainer = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');

    /* ---------- Cambiar de vista ---------- */
    function showView(viewId) {
        // Ocultar todas las vistas
        views.forEach(v => v.classList.remove('active'));

        // Mostrar la vista seleccionada
        const target = document.getElementById(viewId);
        if (target) {
            target.classList.add('active');
            // Scroll al top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Actualizar enlace activo en el menú
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.dataset.view === viewId) a.classList.add('active');
        });
    }

    /* ---------- Click en cualquier enlace con data-view ---------- */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = link.dataset.view;
            if (viewId) {
                showView(viewId);
                // Cerrar menú móvil
                navLinksContainer.classList.remove('open');
                // Actualizar hash sin saltar
                history.replaceState(null, '', '#' + viewId);
            }
        });
    });

    /* ---------- Menú móvil ---------- */
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
        });
    }

    /* ---------- Cargar vista desde hash al iniciar ---------- */
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && document.getElementById(initialHash)) {
        showView(initialHash);
    }

    /* ---------- Formulario de reserva → WhatsApp ---------- */
    const form = document.getElementById('appointmentForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(form);

            const mensaje = `🐾 *Nueva solicitud de cita - Huellitas SOS*%0A%0A` +
                `*Nombre:* ${encodeURIComponent(data.get('nombre') || '')}%0A` +
                `*Teléfono:* ${encodeURIComponent(data.get('telefono') || '')}%0A` +
                `*Mascota:* ${encodeURIComponent(data.get('mascota') || '')}%0A` +
                `*Especie:* ${encodeURIComponent(data.get('especie') || '')}%0A` +
                `*Fecha:* ${encodeURIComponent(data.get('fecha') || '')}%0A` +
                `*Hora:* ${encodeURIComponent(data.get('hora') || '')}%0A` +
                `*Servicio:* ${encodeURIComponent(data.get('servicio') || '')}%0A` +
                `*Mensaje:* ${encodeURIComponent(data.get('mensaje') || 'Sin mensaje adicional')}`;

            window.open(`https://wa.me/573213673394?text=${mensaje}`, '_blank');
            form.reset();
        });
    }

});
