import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import LocomotiveScroll from 'locomotive-scroll';
import Swiper from 'swiper';

barba.use(barbaPrefetch);
gsap.registerPlugin(ScrollTrigger);

var menuButton = document.querySelector(".menu-button-wrap");
var mobileNav = document.querySelector(".nav-list");
var hamburger = document.querySelector(".hamburger");

console.log("file loaded");

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
        duration: 0.5,
        stagger: 0.2,
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

function homepageAnimations() {
    contentAnimation();
    scrollTrigger();
    swiperInit();
}

function removeScrollbar() {
    //Remove Old Locomotive Scrollbar otherwise there will be two
    const scrollbar = selectAll('.c-scrollbar');

    console.log(scrollbar);

    if (scrollbar.length > 1) {
        scrollbar[0].remove();
    }
}

function initPageTransitions() {
    // do something before the transition starts
    barba.hooks.before(() => {
        updateMenu();
        removeScrollbar();
        swiperInit();
    });

    // do something after the transition finishes
    barba.hooks.after(() => {
        // reinit locomotive scroll
        scroll.init();
        homepageAnimations();
    });

    // scroll to the top of the page
    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
        scrollTrigger();
        swiperInit();
    });

    barba.init({
        sync: true,
    
       
        transitions: [{
            name: 'page-transition',
            once(data) {
                // do something once on the initial page load
                initSmoothScroll(data.next.container);
                homepageAnimations();
            },
            async leave(data) {
                // animate loading screen in
                await pageTransition(data.current);
                data.current.container.remove();
            },
            async beforeEnter(data) {
                homepageAnimations();
                ScrollTrigger.getAll().forEach(t => t.kill());
                scroll.destroy();
                initSmoothScroll(data.next.container);
            }

        }]
    });

    function initSmoothScroll(container) {
        // borrowed from the pens https://codepen.io/mulegoat/project/editor/XvJVNP and https://codepen.io/GreenSock/pen/1dc38ca14811bc76e25c4b8c686b653d
        scroll = new LocomotiveScroll({
            el: container.querySelector('[data-scroll-container]'),
            smooth: true,
            getDirection: true
        });

        scroll.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy('[data-scroll-container]', {
            scrollTop(value) {
                return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
            pinType: container.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
        });

        // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
        ScrollTrigger.addEventListener('refresh', () => scroll.update());

        // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
        ScrollTrigger.refresh();
    }
}

initPageTransitions();



