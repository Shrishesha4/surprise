import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

interface AnimationOptions {
	y?: number;
	x?: number;
	opacity?: number;
	scale?: number;
	duration?: number;
	ease?: string;
	stagger?: number;
	start?: string;
	delay?: number;
}

export const createScrollAnimation = (
    element: string,
    options: AnimationOptions = {}
) => {
    const defaults = {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        start: 'top bottom-=50',
        end: 'bottom top+=50',
        delay: 0
    };

    const settings = { ...defaults, ...options };

    if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        return gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: settings.start,
                end: settings.end,
                toggleActions: 'play pause resume reset',
                markers: false
            },
            ...settings
        });
    }
};