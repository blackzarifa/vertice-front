<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { Endereco } from '$lib/services/funcionarios';

	interface Props {
		endereco: Endereco;
	}

	let { endereco = $bindable() }: Props = $props();

	function formatCEP(value: string) {
		const numbers = value.replace(/\D/g, '');
		if (numbers.length <= 8) {
			endereco.cep = numbers;
		}
	}
</script>

<div class="bg-card p-6 rounded-lg border space-y-4">
	<h2 class="text-xl font-semibold">Endereço</h2>
	
	<div class="grid grid-cols-2 gap-4">
		<div class="space-y-2">
			<Label for="cep">CEP</Label>
			<Input
				id="cep"
				value={endereco.cep.replace(/(\d{5})(\d{3})/, '$1-$2')}
				oninput={(e) => formatCEP(e.currentTarget.value)}
				required
				placeholder="00000-000"
				maxlength={9}
			/>
		</div>

		<div class="space-y-2">
			<Label for="local">Logradouro</Label>
			<Input
				id="local"
				bind:value={endereco.local}
				required
				placeholder="Rua das Flores"
			/>
		</div>

		<div class="space-y-2">
			<Label for="numero">Número</Label>
			<Input
				id="numero"
				type="number"
				bind:value={endereco.numero_casa}
				required
				placeholder="123"
			/>
		</div>

		<div class="space-y-2">
			<Label for="bairro">Bairro</Label>
			<Input
				id="bairro"
				bind:value={endereco.bairro}
				required
				placeholder="Centro"
			/>
		</div>

		<div class="space-y-2">
			<Label for="cidade">Cidade</Label>
			<Input
				id="cidade"
				bind:value={endereco.cidade}
				required
				placeholder="São Paulo"
			/>
		</div>

		<div class="space-y-2">
			<Label for="estado">Estado</Label>
			<Input
				id="estado"
				bind:value={endereco.estado}
				required
				placeholder="SP"
				maxlength={2}
			/>
		</div>
	</div>
</div>
</script>
