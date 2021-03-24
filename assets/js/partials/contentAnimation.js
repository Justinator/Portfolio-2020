import { gsap } from "gsap";

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

export default contentAnimation;