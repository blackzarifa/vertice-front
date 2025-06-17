<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'id' | 'bind:value'> {
		label: string;
		id: string;
		value?: string | number;
	}

	let { label, id, value = $bindable(), ...restProps }: Props = $props();
</script>

<div class="space-y-2">
	<Label for={id}>{label}</Label>
	<Input {id} bind:value {...restProps} />
</div>
