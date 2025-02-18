<script lang="ts">
    import { photos } from '$lib/stores/content';
	import { onMount } from 'svelte';
	import gsap from 'gsap/dist/gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		
		const photos = gsap.utils.toArray<HTMLElement>('.photo-item');
		const title = document.querySelector<HTMLElement>('.gallery-heading');

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

		photos.forEach((photo, index) => {
			gsap.from(photo, {
				scrollTrigger: {
					trigger: photo,
					start: 'top bottom-=50',
					toggleActions: 'restart pause reverse pause'
				},
				scale: 0.8,
				opacity: 0,
				duration: 1.2,
				delay: index * 0.1,
				ease: 'back.out(1.7)'
			});
		});
	});
</script>

<section class="photos-section relative min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-20 snap-start snap-always">
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
        <h2 class="gallery-heading mb-16 text-center text-4xl font-bold text-pink-600 drop-shadow-lg">Our Photo Gallery</h2>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {#each photos as photo, i}
                <div class="photo-item group relative aspect-square overflow-hidden rounded-lg shadow-xl transition-all hover:z-10 hover:scale-105 bg-white/80">
                    <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div class="absolute bottom-4 left-4 right-4">
                            <h3 class="text-xl font-semibold text-white">{photo.title}</h3>
                            <p class="text-gray-200">{photo.description}</p>
                            <p class="mt-1 text-sm text-gray-300">{photo.date}</p>
                        </div>
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