 /*----Pantalla de carga-----*/

 gsap.to("#Loading-Screen", {
    opacity: 1,
    duration: .5,
    delay: .2
});

 gsap.to(".loader", {
    opacity: 1,
    duration: 1,
});

gsap.to(".loading-bar", {
    ease: "power3.inOut",
    width: "100%",
    duration: 1.5
});

gsap.to(".loader", {
    opacity: 0,
    duration: .5,
    delay: 1.6
});


gsap.to(".contanin", {
    opacity: 1,
    duration: 0.1,
    delay: 1
});

gsap.to("#Loading-Screen", {
    duration: 0.6,
    ease: "power4.inOut",
    translateY: "101vh",
    delay: 1.6
});

/*-----Cambio de Seccion-----*/
const team = [
    { name: "Andrés Gardea", desc: "Soy un Fotógrafo y Diseñador Gráfico de la ciudad de Chihuahua México." },
    { name: "Fotógrafo", desc: "Me apasiona la fotografía de naturaleza y me especializo en fotografía de productos y retratos." },
    { name: "Diseñador", desc: "Lorem ipsum, dolor sit amet..." },
    { name: "Programador", desc: "He trabajado en páginas como UnfotografomasCUU, ChihuahuaMx y KarmaStudio." },
    { name: "", desc: "" },

];

const cursor = document.querySelector('.cursor');
const cursorIcon = cursor.querySelector('i');

const cursorWidth = cursor.offsetWidth / 2;
const cursorHeight = cursor.offsetHeight / 2;

let currentSlide = 1;
const totalSlides = 5;

const updateCursorClass = (xPosition) => {
    const halfPageWidth = window.innerWidth / 2;

    if (xPosition > halfPageWidth) {
        if (currentSlide < totalSlides) {
            cursorIcon.classList.remove('ph-arrow-left');
            cursorIcon.classList.add('ph-arrow-right');
            cursor.style.display = '';
        }
        else {
            cursor.style.display = 'none';
        }
    }
    else {
        if (currentSlide > 1) {
            cursorIcon.classList.remove('ph-arrow-right');
            cursorIcon.classList.add('ph-arrow-left');
            cursor.style.display = '';
        } else {
            cursor.style.display = 'none';

        }
    }
}

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - cursorWidth,
        y: e.clientY - cursorHeight,
        duration: .5,
        ease: "power3.out"
    });

    updateCursorClass(e.clientX);
});

const updateInfo = (slideNumber) => {
    const member = team[slideNumber - 1];
    document.querySelector('.info .name').textContent = member.name;
    document.querySelector('.info .desc').textContent = member.desc;
};

const animateSlide = (slideNumber, reveal) => {
    const marquee = document.querySelector(`.t-${slideNumber}.backgroundContent`);
    const img = document.getElementById(`t-${slideNumber}`);
    const clipPathValue = reveal ? 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)' : 'polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)';

    gsap.to(marquee, { clipPath: clipPathValue, duration: 1, ease: "power4.out", delay: 0.3 });
    gsap.to(img, { clipPath: clipPathValue, duration: 1, ease: "power4.out" });
};

updateInfo(currentSlide);

/*-----Click-----*/

const handleRightclick = () => {
    if (currentSlide < totalSlides) {
        animateSlide(currentSlide + 1, true);
        currentSlide++;
        updateInfo(currentSlide);
    }
}

const handleLeftclick = () => {
    if (currentSlide > 1) {
        animateSlide(currentSlide, false);
        currentSlide--;
        updateInfo(currentSlide);
    }
}

const clickZone = document.querySelector('.clickZone');


clickZone.addEventListener('click', (e) => {
    const halfPageWidth = window.innerWidth / 2;
    if (e.clientX > halfPageWidth) {
        handleRightclick();
    }
    else {
        handleLeftclick();
    }
});

if (window.screen.width <= 600) {
    document.addEventListener('click', (e) => {
        const halfPageWidth = window.innerWidth / 2;
        if (e.clientX > halfPageWidth) {
            handleRightclick();
        }
        else {
            handleLeftclick();
        }
    
        console.log("Click");
    });
}

/*
setInterval(handleRightclick, 9000);
*/

/*-----Reloj-----*/
var ChihuahuaTime = function () {
    document.getElementById("time-text").innerHTML = new Date().toLocaleString("en-US", { timeZone: "America/Chihuahua", timeStyle: "medium" })
}

ChihuahuaTime();
setInterval(ChihuahuaTime, 1000);