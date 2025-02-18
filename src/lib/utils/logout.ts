import { goto } from '$app/navigation';

export function logout() {
	localStorage.removeItem('isAuthenticated');
	goto('/');
}
