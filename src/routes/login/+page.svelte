<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { User, Lock } from '@lucide/svelte';
	import logo from '$lib/assets/logo.svg';
	import { login } from '$lib/services/auth';
	import { goto } from '$app/navigation';

	let cpf = $state('');
	let senha = $state('');
	let lembreMe = $state(false);
	let loading = $state(false);
	let error = $state('');

	async function handleLogin(event: Event) {
		event.preventDefault();
		error = '';

		if (!cpf || !senha) {
			error = 'Preencha todos os campos';
			return;
		}

		loading = true;

		try {
			const response = await login({ cpf, senha });
			
			if (lembreMe) {
				localStorage.setItem('savedCpf', cpf);
			} else {
				localStorage.removeItem('savedCpf');
			}
			
			sessionStorage.setItem('token', response.token);
			sessionStorage.setItem('funcionario', JSON.stringify(response.funcionario));
			goto('/home');
		} catch (err) {
			error = err instanceof Error ? err.message : 'Erro ao fazer login';
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		const savedCpf = localStorage.getItem('savedCpf');
		if (savedCpf) {
			cpf = savedCpf;
			lembreMe = true;
		}
	});
</script>

<div
	class="flex min-h-screen items-center justify-center bg-[url($lib/assets/bg-login.png)] bg-cover p-4"
>
	<div class="flex flex-col items-center">
		<img src={logo} alt="Logo" class="-mt-52 mb-16 h-56 w-auto" />

		<form onsubmit={handleLogin} class="grid w-96 space-y-3">
			<Input id="cpf" icon={User} placeholder="CPF" bind:value={cpf} required />

			<Input
				id="senha"
				icon={Lock}
				type="password"
				placeholder="Senha"
				bind:value={senha}
				required
			/>

			{#if error}
				<p class="text-sm text-red-500">{error}</p>
			{/if}

			<Button size="lg" type="submit" disabled={loading}>
				{loading ? 'Entrando...' : 'Login'}
			</Button>

			<div class="flex items-center space-x-2">
				<Checkbox id="lembre-me" bind:checked={lembreMe} />
				<Label for="lembre-me">Lembre-me</Label>
			</div>
		</form>
	</div>
</div>
