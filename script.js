/* ============================================================
   HUELLITAS SOS - JavaScript Completo
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
       6. CHATBOT HUELLITAS SOS
       Número actual del bot: 447418357240 (Reino Unido)
       ⚠️ CÁMBIALO por tu número de WhatsApp real si quieres
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
            cita: {
                texto: '📅 ¡Genial! Vamos a agendar tu cita. Te llevo a WhatsApp para tomar tus datos.',
                wa: '¡Hola! 🐾 Quiero agendar una cita en Huellitas SOS.\n\nNombre:\nMascota:\nServicio que necesito:\nFecha preferida:'
            },
            urgencia: {
                texto: '🚑 ¡Emergencia detectada! Atendemos 24/7. Te paso a WhatsApp ahora mismo.',
                wa: '🚨 EMERGENCIA - Huellitas SOS\n\nMi mascota necesita atención urgente.\nEstoy en:\nMi nombre:\nTeléfono:'
            },
            servicios: {
                texto: '🩺 Ofrecemos consulta, vacunación, laboratorio, rayos X, ecografía, cirugía, odontología y más. Te paso con un humano.',
                wa: 'Hola 🐾 quiero información sobre los servicios veterinarios de Huellitas SOS.'
            },
            spa: {
                texto: '✨ Nuestro spa incluye baño, corte, cepillado, uñas, higiene dental y paquetes completos. ¡Tu mascota quedará consentida!',
                wa: 'Hola ✨ quiero agendar una sesión de Spa para mi mascota en Huellitas SOS.'
            },
            petshop: {
                texto: '🛍️ Tenemos alimentos, juguetes, camas, accesorios y medicamentos. Cuéntanos qué buscas por WhatsApp.',
                wa: 'Hola 🛍️ estoy buscando un producto en el Pet Shop de Huellitas SOS. ¿Me ayudan?'
            },
            humano: {
                texto: '💬 Perfecto, te comunico con un humano del equipo de Huellitas SOS. Te paso a WhatsApp.',
                wa: 'Hola 🐾 quiero hablar con alguien de Huellitas SOS.'
            }
        };

        chatbotOptions.addEventListener('click', function (e) {
            var btn = e.target.closest('button');
            if (!btn) return;

            var opcion = btn.getAttribute('data-option');
            var textoUsuario = btn.textContent.trim();
            addMessage(textoUsuario, 'user');

            var r = respuestas[opcion];
            if (r) {
                setTimeout(function () {
                    addMessage(r.texto, 'bot');
                }, 400);

                setTimeout(function () {
                    openWhatsApp(r.wa);
                }, 1200);
            }
        });

        function enviarMensaje() {
            var texto = chatbotText.value.trim();
            if (!texto) return;

            addMessage(texto, 'user');
            chatbotText.value = '';

            setTimeout(function () {
                addMessage('¡Gracias por escribir! 🐶 Te llevo a WhatsApp para que un humano te atienda mejor.', 'bot');
            }, 400);

            setTimeout(function () {
                openWhatsApp('Hola 🐾 ' + texto);
            }, 1200);
        }

        chatbotSend.addEventListener('click', enviarMensaje);
        chatbotText.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                enviarMensaje();
            }
        });
    }

    /* ============================================================
       7. LOG EN CONSOLA
    ============================================================ */
    console.log('🐾 Huellitas SOS - Página cargada correctamente');
    console.log('🐶 Chatbot activo - WhatsApp: ' + WHATSAPP_BOT);

});
