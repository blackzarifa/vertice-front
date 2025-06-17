<script lang="ts">
	import { onMount } from 'svelte';
	import { type ColumnDef } from '@tanstack/table-core';
	import { DataTable } from '$lib/components/data-table';
	import {
		getFuncionarios,
		type Funcionario
	} from '$lib/services/funcionarios';
	import { Users } from '@lucide/svelte';

	let funcionarios = $state<Funcionario[]>([]);
	let loading = $state(true);
	let error = $state('');

	const columns: ColumnDef<Funcionario>[] = [
		{
			accessorKey: 'nome',
			header: 'Nome'
		},
		{
			accessorKey: 'cpf',
			header: 'CPF',
			cell: ({ row }) => {
				const cpf = row.getValue<string>('cpf');
				return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
			}
		},
		{
			accessorKey: 'cargo',
			header: 'Cargo'
		},
		{
			accessorKey: 'data_nascimento',
			header: 'Data de Nascimento',
			cell: ({ row }) => {
				const date = new Date(row.getValue<string>('data_nascimento'));
				return date.toLocaleDateString('pt-BR');
			}
		},
		{
			accessorKey: 'telefone',
			header: 'Telefone'
		},
		{
			accessorKey: 'cidade',
			header: 'Cidade'
		},
		{
			accessorKey: 'estado',
			header: 'Estado'
		}
	];

	onMount(async () => {
		try {
			const data = await getFuncionarios();
			funcionarios = data.data;
		} catch (err) {
			error =
				err instanceof Error ? err.message : 'Erro ao carregar funcionários';
		} finally {
			loading = false;
		}
	});
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">Funcionários</h1>
			<p class="text-muted-foreground">
				Gerencie os funcionários cadastrados no sistema
			</p>
		</div>
		<div class="text-muted-foreground flex items-center gap-2 text-sm">
			<Users class="h-4 w-4" />
			<span>{funcionarios.length} funcionários</span>
		</div>
	</div>

	{#if loading}
		<div class="flex h-64 items-center justify-center">
			<p class="text-muted-foreground">Carregando funcionários...</p>
		</div>
	{:else if error}
		<div class="border-destructive/50 bg-destructive/10 rounded-lg border p-4">
			<p class="text-destructive text-sm">{error}</p>
		</div>
	{:else}
		<DataTable {columns} data={funcionarios} />
	{/if}
</div>
