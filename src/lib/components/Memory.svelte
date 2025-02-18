<script lang="ts">
    import { memories } from '$lib/stores/content';
	import { onMount } from 'svelte';
	import gsap from 'gsap/dist/gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		
		const cards = gsap.utils.toArray<HTMLElement>('.memory-card');
		const title = document.querySelector<HTMLElement>('.memories-heading');

		if (title) {
			gsap.from(title, {
				scrollTrigger: {
					trigger: title,
					start: 'top bottom-=100',
					toggleActions: 'restart pause reverse pause'
				},
				y: 50,
				opacity: 0,
				duration: 0.8
			});
		}

		cards.forEach((card, index) => {
			gsap.from(card, {
				scrollTrigger: {
					trigger: card,
					start: 'top bottom-=50',
					toggleActions: 'restart pause reverse pause'
				},
				y: 50,
				opacity: 0,
				duration: 0.4,
				delay: index * 0.1
			});
		});
	});
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<section class="memories-section relative min-h-screen bg-gradient-to-br from-yellow-50 to-pink-50 py-20 snap-start snap-always">
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

    <div class="container relative mx-auto px-4">
        <h2 class="memories-heading mb-16 text-center text-4xl font-bold text-pink-600">Our Special Moments</h2>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {#each memories as memory, i}
                <div class="memory-card overflow-hidden rounded-lg bg-blue-50 p-6 shadow-lg transition-all hover:scale-105">
                    <div class="card-content">
                        <div class="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg">
                            {#if memory.imageUrl}
                                <img 
                                    src={memory.imageUrl} 
                                    alt={memory.title}
                                    class="h-full w-full object-cover"
                                />
                            {:else}
                                <div class="h-full w-full bg-blue-100" />
                            {/if}
                        </div>
                        <h3 class="mb-2 text-xl font-semibold text-blue-600">{memory.title}</h3>
                        <p class="mb-2 text-yellow-600">{memory.description}</p>
                        <p class="text-sm text-gray-500">{memory.date}</p>
                    </div>
                </div>
            {/each}
        </div>
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