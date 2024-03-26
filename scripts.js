/*----Pantalla de carga-----*/

gsap.to("#loadingScreen", {
    opacity: 1,
    duration: .5,
});

gsap.to(".Loader", {
    opacity: 1,
    duration: .2,
});


gsap.to(".contanin", {
    opacity: 1,
    duration: 0.1,
    delay: 1
});

document.addEventListener("DOMContentLoaded", function () {
    splitTextIntoSpans(".loadingText p");
    splitTextIntoSpans(".backgroundTitle");

    gsap.to(".Image-Holder img", {
        left: 0,
        stagger: 0.1,
        ease: "power4.out",
        duration: 1.5,
        delay: 4,
    });

    gsap.to(".Image-Holder img", {
        left: "110%",
        stagger: -0.1,
        ease: "power4.out",
        duration: 1.5,
        delay: 7,
    });
});

function splitTextIntoSpans(selector) {
    var element = document.querySelector(selector);
    if (element) {
        var text = element.innerText;
        var splitText = text
            .split("")
            .map((char) => `<span>${char}</span>`)
            .join("");
        element.innerHTML = splitText;
    }
}

function startLoader() {
    var counterElement = document.querySelector(".counter p");
    var logoElement = document.querySelector(".loadingText p");
    var currentValue = 0;

    function updatecounter() {
        if (currentValue === 100) {
            animateText();
            return;
        }

        currentValue += Math.floor(Math.random() * 10) + 1;
        currentValue = currentValue > 100 ? 100 : currentValue;
        counterElement.innerHTML =
            currentValue
                .toString()
                .split("")
                .map((char) => `<span>${char}</span>`)
                .join("") + "<span>%</span>";

        var delay = Math.floor(Math.random() * 200) + 100;
        setTimeout(updatecounter, delay);
    }

    function animateText() {

        setTimeout(() => {

            gsap.to(".counter p span", {
                top: "-400px",
                stagger: 0.1,
                ease: "power3.inOut",
                duration: 1,
            });

            gsap.to(".loadingText p span", {
                top: "0",
                stagger: 0.1,
                ease: "power3.inOut",
                duration: 1,
            });

            gsap.to(".loadingText p span", {
                top: "-400px",
                stagger: 0.1,
                ease: "power3.inOut",
                duration: 1,
                delay: 3,
            });

            gsap.to("#loadingScreen", {
                opacity: 0,
                ease: "power4.inOut",
                // translateY: "101vh",
                duration: 1,
                delay: 4,
            });


            gsap.to(".imageZone img", {
                scale: 1,
                opacity: 1,
                ease: "power3.inOut",
                duration: 1,
                delay: 4,
            });

            gsap.to(".backgroundContent .backgroundTitle span", {
                top: "0",
                opacity: 1,
                stagger: 0.1,
                ease: "power3.inOut",
                duration: 1.2,
                delay: 4,
            });

            gsap.to(".nav-bar h2, .nav-bar .reloj", {
                opacity: 1,
                top: "0",
                ease: "power3.inOut",
                duration: 1.8,
                delay: 4,
                stagger: 0.2,

            });

            gsap.to(".info p, .menu__item", {
                top: "0",
                stagger: 0.2,
                opacity: 1,
                ease: "power3.inOut",
                duration: 1.6,
                delay: 4.1,
            });

            gsap.to(".clickZone", {
                display: "block",
                delay: 4,
                duration: 0
            });

        }, 300);
    }

    updatecounter();
}

startLoader();

/*-----Cambio de Seccion-----*/
const activity = [
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
    const work = activity[slideNumber - 1];
    document.querySelector('.info .name').textContent = work.name;
    document.querySelector('.info .desc').textContent = work.desc;
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
