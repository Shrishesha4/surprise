<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap/dist/gsap';
	import { browser } from '$app/environment';
	import { correctPassword } from '$lib/utils/auth';
	import { hints, question } from '$lib/stores/content';

	let showPassword = false;
	let password = '';
	let error = '';
	let loginCard: HTMLElement;

	function handleAnswer(answer: boolean) {
		if (answer) {
			gsap.to('.question-card', {
				scale: 0.9,
				opacity: 0,
				duration: 0.5,
				onComplete: () => {
					showPassword = true;
					setTimeout(() => {
						gsap.from('.login-card', {
							scale: 0.9,
							opacity: 0,
							duration: 0.5
						});
					}, 100);
				}
			});
		} else {
			error = 'Please Say Yes! 🥹';
		}
	}

	function shakeAnimation() {
		gsap
			.timeline()
			.to(loginCard!, {
				x: -10,
				duration: 0.1,
				ease: 'power2.out'
			})
			.to(loginCard!, {
				x: 10,
				duration: 0.1,
				ease: 'power2.out'
			})
			.to(loginCard!, {
				x: -10,
				duration: 0.1,
				ease: 'power2.out'
			})
			.to(loginCard!, {
				x: 10,
				duration: 0.1,
				ease: 'power2.out'
			})
			.to(loginCard!, {
				x: 0,
				duration: 0.1,
				ease: 'power2.out'
			});
	}

	let lastHintIndex = -1;

	function getRandomHint(): string {
		let newIndex;
		do {
			newIndex = Math.floor(Math.random() * hints.length);
		} while (newIndex === lastHintIndex);

		lastHintIndex = newIndex;
		return hints[newIndex];
	}

	function handleSubmit() {
		if (password === correctPassword) {
			gsap.to('.login-card', {
				scale: 1.1,
				opacity: 0,
				duration: 0.8,
				ease: 'back.in(1.7)',
				onComplete: () => {
					localStorage.setItem('isAuthenticated', 'true');
					window.location.href = '/main';
				}
			});
		} else {
			error = `${getRandomHint()}\nTry again!`;
			password = '';
			shakeAnimation();
		}
	}

	onMount(() => {
		if (browser) {
			localStorage.removeItem('isAuthenticated');
			gsap.from('.question-card', {
				y: 50,
				opacity: 0,
				duration: 1,
				ease: 'power4.out'
			});
		}
	});
</script>

<div
	id="content"
	class="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 backdrop-blur-3xl"
>
	<div class="absolute inset-0 -z-10 backdrop-blur-xl"></div>

	<div class="absolute inset-0 overflow-hidden">
		{#each Array(12) as _, i}
			<div
				class="floating-hearts absolute text-pink-400/20"
				style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation: float {3 +
					Math.random() * 4}s ease-in-out infinite {Math.random() * 5}s;"
			>
				<i class="fa-solid fa-heart text-{2 + Math.floor(Math.random() * 4)}xl"></i>
			</div>
		{/each}
	</div>

	{#if !showPassword}
		<div
			class="question-card relative w-full max-w-md rounded-[2rem] bg-white/60 p-10 shadow-xl backdrop-blur-lg"
		>
			<div class="absolute -top-8 left-1/2 -translate-x-1/2 transform text-5xl">
				<i class="fa-solid fa-heart text-pink-500 drop-shadow-lg"></i>
			</div>
			<h1 class="mb-8 text-center text-3xl font-bold text-pink-600">{question}</h1>
			<div class="flex justify-center gap-4">
				<button
					on:click={() => handleAnswer(true)}
					class="group relative overflow-hidden rounded-md bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-3 text-white transition-all hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
				>
					Yes 💝
				</button>
				<button
					on:click={() => handleAnswer(false)}
					class="group relative overflow-hidden rounded-md bg-gradient-to-r from-gray-400 to-gray-500 px-8 py-3 text-white transition-all hover:from-gray-500 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
				>
					No 💔
				</button>
			</div>
			{#if error}
				<p class="mt-4 text-center text-sm text-pink-600">{error}</p>
			{/if}
		</div>
	{:else}
		<div
			class="login-card relative w-full max-w-md rounded-[2rem] bg-white/60 p-10 shadow-xl backdrop-blur-lg"
		>
			<div class="absolute -top-8 left-1/2 -translate-x-1/2 transform text-5xl">
				<i class="fa-solid fa-heart text-pink-500 drop-shadow-lg"></i>
			</div>
			<h1 class="mb-6 text-center text-3xl font-bold text-blue-600">Enter the Secret Code</h1>
			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<input
					type="password"
					bind:value={password}
					class="mt-1 block w-full rounded-md border border-pink-200 bg-white/50 px-3 py-2 text-center shadow-sm backdrop-blur-sm transition-all focus:border-pink-500 focus:outline-none focus:ring-pink-500"
					required
					placeholder="Enter the secret code..."
				/>
				{#if error}
					<p class="mt-4 text-center text-sm text-pink-600">{error}</p>
				{/if}
				<button
					type="submit"
					class="group relative w-full overflow-hidden rounded-md bg-gradient-to-r from-pink-500 to-blue-500 px-4 py-2 text-white transition-all hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
				>
					<span class="relative z-10">Begin Our Journey</span>
					<!-- svelte-ignore element_invalid_self_closing_tag -->
					<div
						class="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100"
					/>
				</button>
			</form>
		</div>
	{/if}
</div>

<style>
	@keyframes float {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-20px) rotate(10deg);
		}
	}

	.floating-hearts {
		pointer-events: none;
	}
</style>
