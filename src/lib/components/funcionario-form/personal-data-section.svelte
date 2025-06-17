<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { CreateFuncionarioRequest } from '$lib/services/funcionarios';

	interface Props {
		formData: CreateFuncionarioRequest;
	}

	let { formData = $bindable() }: Props = $props();

	function formatCPF(value: string) {
		const numbers = value.replace(/\D/g, '');
		if (numbers.length <= 11) {
			formData.cpf = numbers;
		}
	}

	function formatPhone(value: string) {
		const numbers = value.replace(/\D/g, '');
		formData.telefone = numbers;
	}
</script>

<div class="bg-card p-6 rounded-lg border space-y-4">
	<h2 class="text-xl font-semibold">Dados Pessoais</h2>
	
	<div class="grid grid-cols-2 gap-4">
		<div class="space-y-2">
			<Label for="nome">Nome Completo</Label>
			<Input
				id="nome"
				bind:value={formData.nome}
				required
				placeholder="João da Silva"
			/>
		</div>

		<div class="space-y-2">
			<Label for="cpf">CPF</Label>
			<Input
				id="cpf"
				value={formData.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
				oninput={(e) => formatCPF(e.currentTarget.value)}
				required
				placeholder="000.000.000-00"
				maxlength={14}
			/>
		</div>

		<div class="space-y-2">
			<Label for="data_nascimento">Data de Nascimento</Label>
			<Input
				id="data_nascimento"
				type="date"
				bind:value={formData.data_nascimento}
				required
			/>
		</div>

		<div class="space-y-2">
			<Label for="telefone">Telefone</Label>
			<Input
				id="telefone"
				value={formData.telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}
				oninput={(e) => formatPhone(e.currentTarget.value)}
				required
				placeholder="(00) 00000-0000"
				maxlength={15}
			/>
		</div>
	</div>
</div>
</script>
