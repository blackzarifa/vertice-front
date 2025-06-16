<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
	import { User, Lock } from '@lucide/svelte';
	import logo from '$lib/assets/logo.svg';
	import {
		login,
		requestOTP,
		verifyOTP,
		type LoginResponse
	} from '$lib/services/auth';
	import { goto } from '$app/navigation';

	let cpf = $state('');
	let senha = $state('');
	let lembreMe = $state(false);
	let loading = $state(false);
	let error = $state('');
	let showOtp = $state(false);
	let otpValue = $state('');
	let loginResponse = $state<LoginResponse>();
	let invalidOtp = $state(false);

	async function handleLogin(event: Event) {
		event.preventDefault();
		error = '';
		if (!cpf || !senha) {
			error = 'Preencha todos os campos';
			return;
		}

		loading = true;
		try {
			loginResponse = await login({ cpf, senha });
			if (lembreMe) {
				localStorage.setItem('savedCpf', cpf);
			} else {
				localStorage.removeItem('savedCpf');
			}
			await requestOTP(cpf);
			showOtp = true;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Erro ao fazer login';
		} finally {
			loading = false;
		}
	}

	async function handleOtpSubmit(event: Event) {
		event.preventDefault();
		if (otpValue.length !== 6) {
			error = 'Digite o código completo';
			return;
		}

		loading = true;
		invalidOtp = false;
		try {
			await verifyOTP(cpf, otpValue);
			if (loginResponse) {
				sessionStorage.setItem('token', loginResponse.token);
				sessionStorage.setItem(
					'funcionario',
					JSON.stringify(loginResponse.funcionario)
				);
				goto('/home');
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'Código inválido';
			invalidOtp = true;
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

		{#if !showOtp}
			<form onsubmit={handleLogin} class="grid w-96 space-y-3">
				<Input
					id="cpf"
					icon={User}
					placeholder="CPF"
					bind:value={cpf}
					required
				/>
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
		{:else}
			<form onsubmit={handleOtpSubmit} class="grid w-96 space-y-6">
				<div class="text-center">
					<h2 class="text-2xl font-semibold">Verificação de Segurança</h2>
					<p class="text-muted-foreground mt-2 text-sm">
						Digite o código de 6 dígitos enviado para seu dispositivo
					</p>
				</div>

				<div class="flex justify-center">
					<InputOTP.Root bind:value={otpValue} maxlength={6}>
						{#snippet children({ cells })}
							<InputOTP.Group>
								{#each cells as cell}
									<InputOTP.Slot aria-invalid={invalidOtp} {cell} />
								{/each}
							</InputOTP.Group>
						{/snippet}
					</InputOTP.Root>
				</div>

				{#if error}
					<p class="text-center text-sm text-red-500">{error}</p>
				{/if}

				<Button
					size="lg"
					type="submit"
					disabled={loading || otpValue.length !== 6}
				>
					{loading ? 'Verificando...' : 'Verificar Código'}
				</Button>

				<Button
					type="button"
					variant="ghost"
					onclick={() => {
						showOtp = false;
						otpValue = '';
						error = '';
						invalidOtp = false;
					}}
				>
					Voltar ao login
				</Button>
			</form>
		{/if}
	</div>
</div>
