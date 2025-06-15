<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import type { Component } from 'svelte';
	import { cn, type WithElementRef } from '$lib/utils.js';

	type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;
	type LucideIcon = Component<{ class?: string; size?: number | string }>;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> &
			({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined }) & {
				icon?: LucideIcon;
				iconClass?: string;
			}
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		icon: Icon,
		iconClass,
		class: className,
		...restProps
	}: Props = $props();
</script>

{#if type === 'file'}
	<div class="relative flex items-center">
		{#if Icon}
			<Icon class={cn('text-primary absolute left-3 h-4 w-4', iconClass)} />
		{/if}
		<input
			bind:this={ref}
			data-slot="input"
			class={cn(
				'selection:bg-primary dark:bg-input/30 selection:text-primary-foreground border-input ring-offset-background placeholder:text-muted-foreground flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 pt-1.5 text-sm font-medium shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				Icon && 'pl-10',
				className
			)}
			type="file"
			bind:files
			bind:value
			{...restProps}
		/>
	</div>
{:else}
	<div class="relative flex items-center">
		{#if Icon}
			<Icon class={cn('text-primary absolute left-3 h-4 w-4', iconClass)} />
		{/if}
		<input
			bind:this={ref}
			data-slot="input"
			class={cn(
				'border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground flex h-10 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				Icon && 'pl-10',
				className
			)}
			{type}
			bind:value
			{...restProps}
		/>
	</div>
{/if}
