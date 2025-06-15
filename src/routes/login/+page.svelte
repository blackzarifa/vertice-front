<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { User, Lock } from '@lucide/svelte';
	import logo from '$lib/assets/logo.svg';

	let cpf = $state('');
	let senha = $state('');
	let lembreMe = $state(false);
	let loading = $state(false);

	async function handleLogin(event: SubmitEvent) {
		event.preventDefault();

		if (!cpf || !senha) return;

		loading = true;

		try {
			const response = await fetch('localhost:8080/api/v1/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					cpf,
					senha
				})
			});

			if (!response.ok) {
				const error = await response.json();
				throw error;
			}

			const data = await response.json();

			if (lembreMe) {
				localStorage.setItem('cpf', cpf);
				localStorage.setItem('senha', senha);
			} else {
				localStorage.removeItem('cpf');
				localStorage.removeItem('senha');
			}

			window.location.href = '/home';
		} catch (error) {
			alert(`Login error: ${error}`);
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		const savedCpf = localStorage.getItem('cpf');
		const savedSenha = localStorage.getItem('senha');

		if (savedCpf) cpf = savedCpf;
		if (savedSenha) senha = savedSenha;
		if (savedCpf && savedSenha) lembreMe = true;
	});
</script>

<div
	class="flex min-h-screen items-center justify-center bg-[url($lib/assets/bg-login.png)] bg-cover p-4"
>
	<div class="flex flex-col items-center">
		<img src={logo} alt="Logo" class="-mt-52 mb-16 h-56 w-auto" />

		<form onsubmit={handleLogin} method="POST" class="grid w-96 space-y-3">
			<Input id="cpf" icon={User} placeholder="CPF" bind:value={cpf} required />

			<Input
				id="senha"
				icon={Lock}
				type="password"
				placeholder="Senha"
				bind:value={senha}
				required
			/>

			<Button size="lg" type="submit" disabled={loading}>
				{loading ? 'Carregar...' : 'Login'}
			</Button>

			<div class="flex items-center space-x-2">
				<Checkbox id="lembre-me" bind:checked={lembreMe} />
				<Label for="lembre-me">Lembre-me</Label>
			</div>
		</form>
	</div>
</div>
