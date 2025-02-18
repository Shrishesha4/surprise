export const correctPassword = 'tara';
export function isAuthenticated(): boolean {
	if (typeof window === 'undefined') return false;
	return localStorage.getItem('isAuthenticated') === 'true';
}