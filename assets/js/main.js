import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import LocomotiveScroll from 'locomotive-scroll';
import Swiper from 'swiper';
import { pageTransitionOut, pageTransitionIn, contentAnimation, updateMenu } from './partials';

barba.use(barbaPrefetch);
gsap.registerPlugin(ScrollTrigger);

var menuButton = document.querySelector(".menu-button-wrap");
var mobileNav = document.querySelector(".nav-list");
var hamburger = document.querySelector(".hamburger");

menuButton.addEventListener("click", toggleMobileMenu);

function toggleMobileMenu() {
    if (mobileNav.classList.contains("nav-open")) {
        this.setAttribute("aria-expanded", "false");
        this.setAttribute("aria-label", "menu");
        mobileNav.classList.remove("nav-open");
        hamburger.classList.remove("is-active");
      } else {
          mobileNav.classList.add("nav-open");
          hamburger.classList.add("is-active");
        this.setAttribute("aria-label", "close menu");
        this.setAttribute("aria-expanded", "true");
      }
}

function updateAria() {
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "open mobile menu");
}

let scroll;
const selectAll = (e) => document.querySelectorAll(e);

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

function homepageAnimations() {
    contentAnimation();
    scrollTrigger();
    swiperInit();
}

function initPageTransitions() {
    // do something before the transition starts
    barba.hooks.before(() => {
        updateMenu();
        swiperInit();
    });

    // do something after the transition finishes
    barba.hooks.after(() => {
        homepageAnimations();
        updateAria();
    });

    // scroll to the top of the page
    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
        scrollTrigger();
        swiperInit();
    });
    
        barba.init({
            timeout: 7000,
            transitions: [{
                name: 'fade-transition',
                once(data) {
                    // do something once on the initial page load
                    homepageAnimations();
                },
                async leave(data) {
                    // animate loading screen in
                    await pageTransitionOut(data.current);
                    data.current.container.remove();
                },
                async enter(data) {
                    // animate loading screen away
                    pageTransitionIn(data.next);
                },
                async beforeEnter(data) {
                    homepageAnimations();
                    ScrollTrigger.getAll().forEach(t => t.kill());
                }
    
            }]
        });
}
initPageTransitions();
