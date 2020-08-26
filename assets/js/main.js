console.log("Justin Parsons");

var menuButton = document.querySelector(".menu-button-wrap");
var mobileNav = document.querySelector(".nav-list");
var hamburger = document.querySelector(".hamburger");

menuButton.addEventListener("click", toggleMobileMenu);

function toggleMobileMenu() {
    mobileNav.classList.toggle("nav-open");
    hamburger.classList.toggle("is-active");
}

// var parallaxTitle1 = document.querySelector(".parallax-1");
// var parallaxTitle2 = document.querySelector(".parallax-2");
// var parallaxTitle3 = document.querySelector(".parallax-3");

// window.addEventListener("scroll", function () {
//     var scrollPosition = window.scrollY;

//     parallaxTitle1.style.transform = "translateX(-" + scrollPosition / 50 + "%)";
//     parallaxTitle2.style.transform = "translateX(-" + scrollPosition / 50 + "%)";
//     parallaxTitle3.style.transform = "translateX(-" + scrollPosition / 50 + "%)";
// })
// gsap scroll trigger
function scrollTrigger() {
    const blueback = gsap.timeline({
        scrollTrigger: {
            trigger: ".blue-background",
            start: "top bottom",
            end: "bottom top",
        }
    });
    blueback.to(".blue-background", { width: "70%" });
    const parallax1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".parallax-1",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        }
    });
    parallax1.to(".parallax-1", { translateX: "-40%" });
    const parallax2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".parallax-2",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        }
    });
    parallax2.to(".parallax-2", { translateX: "-20%" });
    const parallax3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".parallax-3",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        }
    });
    parallax3.to(".parallax-3", { translateX: "-20%" });
}

function swiperInit() {
    // init swiper slider for portfolio
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            800: {
                slidesPerView: 2,
            },
            1000: {
                slidesPerView: 3,
            },
        }
    });
}

// scroll progress bar indicator
var progress = document.querySelector(".progress-container");
var progressBar = document.querySelector(".progress-bar");
var totalHeight = document.body.scrollHeight - window.innerHeight;

window.onscroll = function () {
    var progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.height = progress + "%";
}
// loading screen style animation
function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}

function pageTransition() {
    var tl = gsap.timeline();
    tl.to(".loading-screen", {
        duration: .5,
        width: "100%",
        left: "0%",
        ease: "Expo.easeInOut",
    });
    tl.to(".loading-screen", {
        duration: .5,
        width: "100%",
        left: "100%",
        ease: "Expo.easeInOut",
        delay: 0.3,
    });
    tl.set(".loading-screen", { left: "-100%" });
    if (mobileNav.classList.contains("nav-open")) {
        mobileNav.classList.remove("nav-open");
        hamburger.classList.remove("is-active");
    }
}

function contentAnimation() {
    var tl = gsap.timeline();
    tl.to(".brand-logo", {
        opacity: 1,
        duration: 0.3,
    });
    tl.to(".nav-item", {
        opacity: 1,
        duration: 0.3,
        stagger: 0.2,
        y: 0,
    });
    tl.to(".hero-text-block", {
        opacity: 1,
        duration: 0.5,
        y: 0,
    });
    tl.to(".large-circle", {
        opacity: 1,
        scale: 1,
        duration: 0.3,
    });
    tl.to(".medium-circle", {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.1,
    });
    tl.to(".small-circle", {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.1,
    });
}



barba.init({
    sync: true,

    transitions: [
        {
            async leave(data) {
                const done = this.async();

                pageTransition();
                await delay(1000);
                done();
            },
            async enter(data) {
                contentAnimation();
                scrollTrigger();
                swiperInit();
            },
            async once(data) {
                contentAnimation();
                scrollTrigger();
                swiperInit();
            },
        },
    ],
});