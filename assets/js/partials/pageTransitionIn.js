import { gsap } from "gsap";

function pageTransitionIn({ container }) {
    gsap.from(".site-main", {
        autoAlpha: 0,
        duration: .4,
        ease: "Expo.easeInOut",
    });
}

export default pageTransitionIn;