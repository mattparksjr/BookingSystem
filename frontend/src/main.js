import App from './App.svelte';
import Login from './Login.svelte';

const login = new Login({
	target: document.body
});

/*const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});*/

export default login;