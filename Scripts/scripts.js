/*----Pantalla de carga-----*/

gsap.to("#loadingScreen", {
  opacity: 1,
  duration: .5,
});

gsap.to(".Loader", {
  opacity: 1,
  duration: .2,
});


gsap.to(".contain, .page-container", {
  opacity: 1,
  duration: 0.1,
  delay: 1
});

gsap.to(".clickZone", {
  pointerEvents: "auto",
  duration: 0,
  delay: 8.7
});

document.addEventListener("DOMContentLoaded", function () {
  splitTextIntoSpans(".loadingText p");
  // splitTextIntoSpans(".backgroundTitle");

  gsap.to(".Image-Holder img", {
    left: 0,
    stagger: 0.1,
    ease: "power4.out",
    duration: 1.6,
    delay: 2.8,
  });

  gsap.to(".Image-Holder img", {
    left: "110%",
    stagger: -0.1,
    ease: "power4.out",
    duration: 1.6,
    delay: 7.1,
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
        duration: 1.2,
      });

      gsap.to(".loadingText p span", {
        top: "0",
        stagger: 0.1,
        ease: "power3.inOut",
        duration: 1.1,
      });

      gsap.to(".loadingText p span", {
        top: "-300px",
        opacity: 0,
        stagger: 0.1,
        ease: "power3.inOut",
        duration: 1.2,
        delay: 3.2,
      });

      gsap.to("#loadingScreen", {
        opacity: 0,
        ease: "power4.inOut",
        // translateY: "101vh",
        duration: 1.1,
        delay: 4.2,
      });


      gsap.to(".imageZone img", {
        scale: 1,
        opacity: 1,
        ease: "power3.inOut",
        duration: 1.1,
        delay: 4,
      });

      // gsap.to(".backgroundContent .backgroundTitle span", {
      //   top: "0",
      //   opacity: 1,
      //   stagger: 0.1,
      //   ease: "power3.inOut",
      //   duration: 1.2,
      //   delay: 4,
      // });

      gsap.to(".nav-bar h1, .nav-bar a, .nav-bar .reloj", {
        opacity: 1,
        top: "0",
        ease: "power3.inOut",
        duration: 1.9,
        delay: 4,
        stagger: 0.2,

      });

      // gsap.to(".info p, .menu__item", {
      //   top: "0",
      //   stagger: 0.2,
      //   opacity: 1,
      //   ease: "power3.inOut",
      //   duration: 1.6,
      //   delay: 4.1,
      // });

      gsap.to(".clickZone", {
        delay: 4,
        duration: 0
      });

    }, 300);
  }

  updatecounter();
}

startLoader();

/*-----Reloj-----*/
var ChihuahuaTime = function () {
  document.getElementById("time-text").innerHTML = new Date().toLocaleString("en-US", { timeZone: "America/Chihuahua", timeStyle: "medium" })
}

ChihuahuaTime();
setInterval(ChihuahuaTime, 1000);

/*-----Cambio de Seccion-----*/

const stories = [
  {
    profileName: "Andrés Gardea",
    backgroundTitle: [
      "Andrés Gardea",
    ],
    descText: "Soy un Fotógrafo y Diseñador Gráfico de la ciudad de Chihuahua México.",
    storyImg: "../Media/000.webp",
    backgroundClass: "t-1",
  },
  {
    profileName: "Descubre más fotografías",
    backgroundTitle: ["Fotógrafo"],
    descText: "Me apasiona la fotografía de naturaleza y me especializo en fotografía gastronómica y de productos.",
    storyImg: "../Media/Servicios/Producto-4.webp",
    backgroundClass: "t-2",
    linkSrc: "../photo.html",
  },
  {
    profileName: "Mira mis Diseños",
    backgroundTitle: ["Diseñador"],
    descText: "Estudio Diseño y Comunicación Gráfica, realizo trabajos de diseño tanto digital como tradicional.",
    storyImg: "../Media/Poster/Poster-005.webp",
    backgroundClass: "t-3",
    linkSrc: "../design.html",
  },
  {
    profileName: "Conoce mis Trabajos",
    backgroundTitle: ["Programador"],
    descText: "He trabajado desarrollando y publicando páginas como UnfotografomasCUU, ChihuahuaMx y KarmaStudio.",
    storyImg: "../Media/Developer/Developer-1.webp",
    backgroundClass: "t-4",
    linkSrc: "../develloper.html",
  },
  {
    profileName: "Servicios",
    backgroundTitle: ["Servicios"],
    descText: "Conoce los servicios que ofrezco, desde sesiones fotográficas hasta planes diseño tradicional y digital.",
    storyImg: "../Media/5.webp",
    backgroundClass: "t-5",
    linkSrc: "../servicios.html",
  },
  {
    profileName: "Contáctame",
    backgroundTitle: ["Contacto"],
    descText: "He trabajado desarrollando y lanzando páginas como UnfotografomasCUU, ChihuahuaMx y KarmaStudio.",
    storyImg: "../Media/3.webp",
    backgroundClass: "t-6",
    linkSrc: "../photo.html",
  }
];

let activeStory = -1; //Sepa la v porque funciona xD
const storyDuration = 7750;
let direction = "next";
let storyTimeout;

/*-----Barra de Progreso-----*/
function resetIndexHighlight(index, currentDirection) {
  const highlight = document.querySelectorAll(".index .index-highlight")[index];
  gsap.killTweensOf(highlight);
  gsap.to(highlight, {
    width: currentDirection === "next" ? "100%" : "0%",
    duration: 0.3,
    onStart: () => {
      gsap.to(highlight, {
        transformOrigin: "right center",
        scaleX: 0,
        duration: 0.3,
      });
    },
  });
}

function animateIndexHighlight(index) {
  const highlight = document.querySelectorAll(".index .index-highlight")[index];
  gsap.set(highlight, {
    width: "0%",
    scaleX: 1,
    transformOrigin: "right center",
  });
  gsap.to(highlight, {
    width: "100%",
    duration: storyDuration / 1000,
    ease: "none",
  });
}

/*Camio de Imagen*/
function animateNewImage(imgContainer, currentDirection) {

  if (currentDirection === "next") {
    gsap.set(imgContainer, {
      clipPath:
        currentDirection === "next"
          ? 'polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)'
          : 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
    });

    gsap.to(imgContainer, {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      duration: 1,
      ease: "power4.out",
    });

  } else {
    gsap.set(imgContainer, {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    });

    gsap.to(imgContainer, {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      duration: 1,
      ease: "power4.out",
    });
  }
}

function animateImageScale(currentImg, upcomingImg) {
  gsap.fromTo(
    currentImg,
    { scale: 1, rotate: 0 },
    {
      scale: 1.1,
      duration: .8,
      ease: "power4.inOut",
      onComplete: () => {
        currentImg.parentElement.remove();
      },
    }
  );
  gsap.fromTo(
    upcomingImg,
    {
      scale: 1.1
    },
    { scale: 1, duration: .2, ease: "power4.inOut" }
  );
}
/*----Zona de Cambio del Background-----*/
function animateNewBackground(currentBackgroundContent, currentDirection) {
  if (currentDirection === "next") {
    gsap.set(currentBackgroundContent, {
      clipPath:
        currentDirection === "next"
          ? 'polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)'
          : 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
    });

    gsap.to(currentBackgroundContent, {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      duration: 1,
      ease: "power4.out",
    });

  } else {
    gsap.set(currentBackgroundContent, {
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    });

    gsap.to(currentBackgroundContent, {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      duration: 1,
      ease: "power4.out",
      delay: 0.3
    });
  }

}

/*Eliminar elementos al cambiar de pagina*/
function cleanUpElements() {
  const profileNameDiv = document.querySelector(".desc-name");
  const backgroundTitle = document.querySelector(".backgroundTitle");
  const image = document.querySelector(".story-img");
  const background = document.querySelector(".backgroundColor");


  while (profileNameDiv.childElementCount > 1) {
    profileNameDiv.removeChild(profileNameDiv.firstChild);
  }

  while (image.childElementCount > 2) {
    image.removeChild(image.firstChild);
  }

  while (background.childElementCount > 4) {
    background.removeChild(background.firstChild);
  }

  while (backgroundTitle.childElementCount > 1) {
    backgroundTitle.removeChild(backgroundTitle.firstChild);
  }

}

function changeStory(isAutomatic = true) {
  const previousStory = activeStory;
  const currentDirection = isAutomatic ? "next" : direction;

  if (currentDirection === "next") {
    activeStory = (activeStory + 1) % stories.length;
  } else {
    activeStory = (activeStory - 1 + stories.length) % stories.length;
  }

  const story = stories[activeStory];

  const currentImgContainer = document.querySelector(".story-img .img");
  const currentImg = currentImgContainer.querySelector("img");

  const currentBackgroundContent = document.querySelector(".backgroundContent");

  setTimeout(() => {
    const newProfileName = document.createElement("a");
    newProfileName.innerText = story.profileName;
    newProfileName.href = story.linkSrc;


    const profileNameDiv = document.querySelector(".desc-name");
    profileNameDiv.appendChild(newProfileName);

    //Cosas de las Imagenes
    const newImgContainer = document.createElement("div");
    newImgContainer.classList.add("img");
    const newStoryImg = document.createElement("img");
    newStoryImg.src = story.storyImg;
    newStoryImg.alt = story.profileName;
    newImgContainer.appendChild(newStoryImg);

    const storyImgDiv = document.querySelector(".story-img");
    storyImgDiv.appendChild(newImgContainer);

    animateNewImage(newImgContainer, currentDirection);

    const upcomingImg = newStoryImg;
    animateImageScale(currentImg, upcomingImg, currentDirection);

    //Cosas del Background
    const backgroundContainer = document.createElement("div");
    backgroundContainer.classList.add("backgroundContent");
    const newBackground = document.createElement("div");
    newBackground.className = story.backgroundClass;
    backgroundContainer.appendChild(newBackground);
    const newBackgroundTitle = document.createElement("div");
    newBackgroundTitle.classList.add("backgroundTitle");
    newBackground.appendChild(newBackgroundTitle);
    const newTitle = document.createElement("p");
    newTitle.innerText = story.backgroundTitle;
    newBackgroundTitle.appendChild(newTitle);


    const backgroundDiv = document.querySelector(".backgroundColor");
    backgroundDiv.appendChild(backgroundContainer);

    animateNewBackground(backgroundContainer, currentDirection);

    const upcomingBackground = newBackground;
    animateNewBackground(currentBackgroundContent, upcomingBackground, currentDirection);

    resetIndexHighlight(previousStory, currentDirection);
    animateIndexHighlight(activeStory);

    cleanUpElements();

    clearTimeout(storyTimeout);
    storyTimeout = setTimeout(() => changeStory(true), storyDuration);
  }, 200);

  setTimeout(() => {
    const desc = document.querySelector(".desc p");
    desc.textContent = story.descText;
    desc.href = story.descSrc;
  }, 200);

}

/*-----Cursor-----*/
const cursor = document.querySelector(".cursor");
const cursorIcon = cursor.querySelector('i');

document.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;
  gsap.to(cursor, {
    x: clientX - cursor.offsetWidth / 2,
    y: clientY - cursor.offsetHeight / 2,
    ease: "power2.out",
    duration: 0.3,
  });

  const viewportWidth = window.innerWidth;
  if (clientX < viewportWidth / 2) {
    cursorIcon.classList.remove('ph-arrow-right');
    cursorIcon.classList.add('ph-arrow-left');
    cursor.style.display = '';
    direction = "prev";
  } else {
    cursorIcon.classList.remove('ph-arrow-left');
    cursorIcon.classList.add('ph-arrow-right');
    cursor.style.display = '';
    direction = "next";
  }
});

document.addEventListener("click", () => {
  clearTimeout(storyTimeout);
  resetIndexHighlight(activeStory, direction);
  changeStory(false);
});

storyTimeout = setTimeout(() => changeStory(true), storyDuration);
animateIndexHighlight(activeStory);
