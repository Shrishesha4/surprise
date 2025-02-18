<script lang="ts">
    import { logout } from '$lib/utils/logout';
    import { onMount } from 'svelte';
    import gsap from 'gsap/dist/gsap';
    import ScrollTrigger from 'gsap/dist/ScrollTrigger';

    let isVisible = false;

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: '.letter-section',
            start: 'top center',
            onEnter: () => isVisible = true,
            onLeaveBack: () => isVisible = false
        });
    });
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
 <div class="flex justify-center p-4">
     <button
         on:click={logout}
         class="z-50 rounded-full bg-blue-600 p-2 text-white transition-all duration-300"
         class:opacity-0={!isVisible}
         class:pointer-events-none={!isVisible}
         class:opacity-50={isVisible}
         class:hover:opacity-100={isVisible}
     >
         <i class="fa-solid fa-sign-out-alt"></i>
     </button>
 </div>