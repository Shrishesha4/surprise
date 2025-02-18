<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import { valentineAccess } from '$lib/stores/valentine';
    import { isAuthenticated } from '$lib/utils/auth';

    onMount(() => {
        if (browser) {
            const hasAccess = valentineAccess.check();
            if (!hasAccess) {
                if (isAuthenticated() && $page.url.pathname !== '/wait') {
                    goto('/wait');
                } else if (!isAuthenticated() && $page.url.pathname !== '/login') {
                    localStorage.removeItem('isAuthenticated');
                    goto('/login');
                }
            }
        }
    });

    $: if (browser) {
        valentineAccess.check();
    }
</script>

<div class="contents" class:hidden={!$valentineAccess && !['login', 'wait'].includes($page.url.pathname.slice(1))}>
    <slot />
</div>
