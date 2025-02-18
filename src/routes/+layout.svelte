<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { isAuthenticated } from '$lib/utils/auth';

	onMount(() => {
		if (browser) {
			if (isAuthenticated() && $page.url.pathname !== '/') {
				goto('/main');
			} else if (!isAuthenticated() && $page.url.pathname !== '/') {
				localStorage.removeItem('isAuthenticated');
				goto('/');
			}
		}
	});
</script>

<div class="contents">
	<slot />
</div>