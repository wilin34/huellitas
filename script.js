/* ============================================================
   ACORDEÓN DE SERVICIOS
   Al hacer clic en una tarjeta se expande y muestra más info
============================================================ */

const serviceCards = document.querySelectorAll('[data-service]');

serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Si el clic fue en un botón o enlace, no hacer toggle
        if (e.target.closest('.srv-cta') || e.target.closest('a')) {
            return;
        }

        const isActive = card.classList.contains('active');

        // Cerrar todas las tarjetas (opcional: comenta estas 3 líneas
        // si quieres que se puedan abrir varias a la vez)
        serviceCards.forEach(c => c.classList.remove('active'));

        // Abrir la que se hizo clic (si no estaba abierta)
        if (!isActive) {
            card.classList.add('active');
        }
    });
});
