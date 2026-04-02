document.addEventListener('DOMContentLoaded', () => {

    /* =====================================
       1. CONTADOR REGRESIVO A LA SALIDA
       ===================================== */
    // La fecha del viaje (Lunes 6 de Abril del 2026 a las 10:00 AM CST)
    const tripDate = new Date("April 6, 2026 10:00:00").getTime();
    
    const cdDays = document.getElementById("cd-days");
    const cdHours = document.getElementById("cd-hours");
    const cdMins = document.getElementById("cd-mins");
    const cdSecs = document.getElementById("cd-secs");

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = tripDate - now;

        if (distance < 0) {
            // Ya es la hora
            if (cdDays) cdDays.innerText = "00";
            if (cdHours) cdHours.innerText = "00";
            if (cdMins) cdMins.innerText = "00";
            if (cdSecs) cdSecs.innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (cdDays) cdDays.innerText = days < 10 ? '0' + days : days;
        if (cdHours) cdHours.innerText = hours < 10 ? '0' + hours : hours;
        if (cdMins) cdMins.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (cdSecs) cdSecs.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    // Inicializar y ajustar velocidad a 1 segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* =====================================
       2. ACORDEÓN / LINEA DE TIEMPO INTERACTIVA
       ===================================== */
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Si quieres que al abrirse uno, se cierren los demás:
            accordions.forEach(item => {
                if (item !== accordion && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });

            // Toggle Class actual
            accordion.classList.toggle('active');
        });
    });

    /* =====================================
       3. ANIMACIONES AL HACER SCROLL
       ===================================== */
    const scrollElements = document.querySelectorAll('.section-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add("visible");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        });
    };

    // Ejecutar al inicio la primera vez
    handleScrollAnimation();

    // Event listener en scroll real
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});
