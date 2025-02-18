<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap/dist/gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';
	import {her_name}	from '$lib/stores/content';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const tl = gsap.timeline();
		
		tl.from('.hero-heading', {
			y: 100,
			opacity: 0,
			duration: 1.2,
			ease: 'power4.out'
		})
		.from('.hero-description', {
			y: 50,
			opacity: 0,
			duration: 1,
			delay: 0.3
		})
		.from('.scroll-down', {
			y: -20,
			opacity: 0,
			duration: 0.8
		});
	});
</script>

<section class="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-pink-50 snap-start snap-always">
    <div class="absolute inset-0 overflow-hidden">
        <div class="hearts-bg absolute inset-0 opacity-60">
            {#each Array(40) as _, i}
                <i 
                    class="fa-solid fa-heart absolute text-pink-400" 
                    style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; font-size: {12 + Math.random() * 20}px; animation: pulse {2 + Math.random() * 4}s infinite {Math.random() * 2}s;"
                ></i>
            {/each}
        </div>
        <div class="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent backdrop-blur-[1px]"></div>
    </div>
    <div class="container relative mx-auto flex h-full items-center justify-center px-4">
		<div class="text-center">
			<h1 class="hero-heading text-6xl font-bold text-pink-500">Happy Valentine's Day</h1>
			<h1 class="hero-heading mb-6 text-6xl font-bold text-pink-500">{her_name}</h1>
			<p class="hero-description text-xl text-pink-400">Scroll Down...</p>
		</div>
	</div>
	<div class="scroll-down absolute bottom-8 left-[45%] -translate-x-1/2 animate-bounce">
		<i class="fa-solid fa-chevron-down text-3xl text-pink-300"></i>
	</div>
</section>

<style>
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 0.4;
        }
        50% {
            transform: scale(1.2);
            opacity: 0.8;
        }
    }

    .hearts-bg {
        filter: blur(1.5px);
    }
</style>