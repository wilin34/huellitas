/* ============================================================
   HUELLITAS SOS - JavaScript Simple y Funcional
============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ============================================================
    // 1. NAVEGACIÓN ENTRE VISTAS
    // ============================================================
    var views = document.querySelectorAll('.view');
    var navLinks = document.querySelectorAll('[data-view]');
    var navLinksContainer = document.getElementById('navLinks');
    var menuToggle = document.querySelector('.menu-toggle');

    function showView(viewId) {
        // Ocultar todas
        for (var i = 0; i < views.length; i++) {
            views[i].classList.remove('active');
        }

        // Mostrar la seleccionada
        var target = document.getElementById(viewId);
        if (target) {
            target.classList.add('active');
            window.scrollTo(0, 0);
        }

        // Actualizar enlace activo
        var allNavLinks = document.querySelectorAll('.nav-links a');
        for (var j = 0; j < allNavLinks.length; j++) {
            allNavLinks[j].classList.remove('active');
            if (allNavLinks[j].getAttribute('data-view') === viewId) {
                allNavLinks[j].classList.add('active');
            }
        }

        // Cerrar menú móvil
        if (navLinksContainer) {
            navLinksContainer.classList.remove('open');
        }

        // Actualizar hash
        if (history.replaceState) {
            history.replaceState(null, '', '#' + viewId);
        }
    }

    // Click en enlaces de navegación
    for (var k = 0; k < navLinks.length; k++) {
        navLinks[k].addEventListener('click', function (e) {
            e.preventDefault();
            var viewId = this.getAttribute('data-view');
            if (viewId) {
                showView(viewId);
            }
        });
    }

    // ============================================================
    // 2. MENÚ MÓVIL
    // ============================================================
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navLinksContainer.classList.toggle('open');
        });
    }

    // ============================================================
    // 3. CARGAR VISTA DESDE HASH
    // ============================================================
    var hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showView(hash);
    }

    // ============================================================
    // 4. ACORDEÓN DE SERVICIOS
    // ============================================================
    var serviceCards = document.querySelectorAll('[data-service]');
    
    for (var m = 0; m < serviceCards.length; m++) {
        serviceCards[m].addEventListener('click', function (e) {
            // Si hizo clic en un botón o enlace, no hacer nada
            if (e.target.closest('.srv-cta') || e.target.closest('a')) {
                return;
            }

            var isActive = this.classList.contains('active');

            // Cerrar todas
            for (var n = 0; n < serviceCards.length; n++) {
                serviceCards[n].classList.remove('active');
            }

            // Abrir la actual si no estaba abierta
            if (!isActive) {
                this.classList.add('active');
            }
        });
    }

    // ============================================================
    // 5. FORMULARIO → WHATSAPP
    // ============================================================
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

    // ============================================================
    // 6. LOG EN CONSOLA
    // ============================================================
    console.log('🐾 Huellitas SOS - Página cargada correctamente');

});
