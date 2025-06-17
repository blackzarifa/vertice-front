<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { CreateFuncionarioRequest, Funcionario } from '$lib/services/funcionarios';

	interface Props {
		formData: CreateFuncionarioRequest;
		supervisores: Funcionario[];
	}

	let { formData = $bindable(), supervisores }: Props = $props();

	const cargos = [
		{ value: 'ESTAGIARIO', label: 'Estagiário' },
		{ value: 'ATENDENTE', label: 'Atendente' },
		{ value: 'GERENTE', label: 'Gerente' }
	];
</script>

<div class="bg-card p-6 rounded-lg border space-y-4">
	<h2 class="text-xl font-semibold">Dados Profissionais</h2>
	
	<div class="grid grid-cols-2 gap-4">
		<div class="space-y-2">
			<Label for="codigo_funcionario">Código do Funcionário</Label>
			<Input
				id="codigo_funcionario"
				bind:value={formData.codigo_funcionario}
				required
				placeholder="FUNC001"
			/>
		</div>

		<div class="space-y-2">
			<Label for="senha">Senha</Label>
			<Input
				id="senha"
				type="password"
				bind:value={formData.senha}
				required
				placeholder="Mínimo 6 caracteres"
				minlength={6}
			/>
		</div>

		<div class="space-y-2">
			<Label for="cargo">Cargo</Label>
			<select
				id="cargo"
				bind:value={formData.cargo}
				class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				required
			>
				{#each cargos as cargo}
					<option value={cargo.value}>{cargo.label}</option>
				{/each}
			</select>
		</div>

		<div class="space-y-2">
			<Label for="supervisor">Supervisor (opcional)</Label>
			<select
				id="supervisor"
				bind:value={formData.id_supervisor}
				class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<option value={undefined}>Nenhum</option>
				{#each supervisores as supervisor}
					<option value={supervisor.id_funcionario}>
						{supervisor.nome} - {supervisor.codigo_funcionario}
					</option>
				{/each}
			</select>
		</div>
	</div>
</div>
</script>
