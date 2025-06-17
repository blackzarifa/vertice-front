<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import {
		createFuncionario,
		type CreateFuncionarioRequest,
		getFuncionarios,
		type Funcionario
	} from '$lib/services/funcionarios';
	import {
		PersonalDataSection,
		ProfessionalDataSection,
		AddressSection
	} from '$lib/components/funcionario-form';
	import { UserPlus } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let loading = $state(false);
	let error = $state('');
	let success = $state(false);
	let supervisores = $state<Funcionario[]>([]);

	let formData = $state<CreateFuncionarioRequest>({
		nome: '',
		cpf: '',
		data_nascimento: '',
		telefone: '',
		senha: '',
		codigo_funcionario: '',
		cargo: 'ATENDENTE',
		id_supervisor: undefined,
		endereco: {
			cep: '',
			local: '',
			numero_casa: 0,
			bairro: '',
			cidade: '',
			estado: ''
		}
	});

	onMount(async () => {
		try {
			const data = await getFuncionarios();
			const funcionarios = data.data;
			supervisores = funcionarios.filter(
				(f: Funcionario) => f.cargo === 'GERENTE'
			);
		} catch (err) {
			console.error('Erro ao carregar supervisores:', err);
		}
	});

	async function handleSubmit(event: Event) {
		event.preventDefault();
		error = '';
		success = false;
		loading = true;

		try {
			await createFuncionario(formData);
			success = true;
			resetForm();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Erro ao criar funcionário';
		} finally {
			loading = false;
		}
	}

	function resetForm() {
		formData = {
			nome: '',
			cpf: '',
			data_nascimento: '',
			telefone: '',
			senha: '',
			codigo_funcionario: '',
			cargo: 'ATENDENTE',
			id_supervisor: undefined,
			endereco: {
				cep: '',
				local: '',
				numero_casa: 0,
				bairro: '',
				cidade: '',
				estado: ''
			}
		};
	}
</script>

<div class="mx-auto max-w-4xl space-y-6">
	<div>
		<h1 class="flex items-center gap-3 text-3xl font-bold">
			<UserPlus class="h-8 w-8" />
			Criar Funcionário
		</h1>
		<p class="text-muted-foreground mt-2">
			Cadastre um novo funcionário no sistema
		</p>
	</div>

	<form onsubmit={handleSubmit} class="space-y-8">
		<PersonalDataSection bind:formData />
		<ProfessionalDataSection bind:formData {supervisores} />
		<AddressSection bind:endereco={formData.endereco} />

		{#if error}
			<div
				class="border-destructive/50 bg-destructive/10 rounded-lg border p-4"
			>
				<p class="text-destructive text-sm">{error}</p>
			</div>
		{/if}

		{#if success}
			<div class="rounded-lg border border-green-500/50 bg-green-500/10 p-4">
				<p class="text-sm text-green-600">Funcionário criado com sucesso!</p>
			</div>
		{/if}

		<div class="flex justify-end gap-4">
			<Button type="button" variant="outline" onclick={() => goto('/home')}>
				Cancelar
			</Button>
			<Button type="submit" disabled={loading}>
				{loading ? 'Criando...' : 'Criar Funcionário'}
			</Button>
		</div>
	</form>
</div>
