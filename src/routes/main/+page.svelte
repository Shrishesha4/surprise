<script lang="ts">
    import Hero from '$lib/components/Hero.svelte';
    import Memory from '$lib/components/Memory.svelte';
    import Photos from '$lib/components/Photos.svelte';
    import Letter from '$lib/components/Letter.svelte';
    import { onMount } from 'svelte';
    import Lenis from '@studio-freight/lenis';
    import Logout from '$lib/components/Logout.svelte';
    import gsap from 'gsap/dist/gsap';
    import ScrollTrigger from 'gsap/dist/ScrollTrigger';

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.defaults({
            markers: false,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play none none reverse"
        });
        
        const lenis = new Lenis({
            duration: 0.4,
            easing: (t) => 1,
            orientation: 'vertical',
            smoothWheel: false,
            touchMultiplier: 4,
            wheelMultiplier: 2.8,
            gestureOrientation: 'vertical',
            infinite: false
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    });
</script>

<main class="relative">
    <Hero />
    <Memory />
    <Photos />
    <Letter />
    <Logout/>
</main>

<style lang="postcss">
    :global(html) {
        height: 100%;
        overflow-y: auto;
        overscroll-behavior-y: none;
        scroll-behavior: auto;
    }

    :global(body) {
        overflow-x: hidden;
        overscroll-behavior-y: none;
        min-height: 100vh;
    }
</style>
