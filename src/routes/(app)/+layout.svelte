<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Home, UserPlus, Menu, Search, CircleUser } from '@lucide/svelte';
	import logo from '$lib/assets/logo-horizontal.svg';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { isAuthenticated } from '$lib/services/auth';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let { children } = $props();

	const menuItems = [
		{ icon: Home, label: 'Home', href: '/home' },
		{ icon: UserPlus, label: 'Criar Funcionário', href: '/criar-funcionario' }
	];

	onMount(() => {
		if (!isAuthenticated()) {
			goto('/login');
		}
	});
</script>

<Sidebar.Provider>
	<div class="flex h-screen">
		<Sidebar.Sidebar>
			<Sidebar.Header class="p-8">
				<img src={logo} alt="Vertice" class="h-16 w-auto" />
			</Sidebar.Header>
			<Separator />
			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each menuItems as item}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton
										isActive={page.url.pathname === item.href}
										size="lg"
										class="flex items-center gap-2"
									>
										{#snippet child({ props })}
											{@const IconComponent = item.icon}
											<a href={item.href} {...props}>
												<IconComponent class="h-5 w-5" />
												<span>{item.label}</span>
											</a>
										{/snippet}
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							{/each}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			</Sidebar.Content>
		</Sidebar.Sidebar>
	</div>
	<div class="bg-background flex flex-1 flex-col">
		<!-- Header -->
		<header class="bg-card border-border border-b">
			<div class="flex items-center justify-between p-4">
				<div class="flex flex-1 items-center gap-2">
					<Sidebar.Trigger class="lg:hidden">
						<Menu class="h-5 w-5" />
					</Sidebar.Trigger>
					<div class="relative flex-1">
						<Search
							class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
						/>
						<Input
							type="search"
							placeholder="Pesquisar"
							class="bg-background pl-9"
						/>
					</div>
				</div>
				<div class="ml-2 flex items-center">
					<Button variant="ghost">
						<CircleUser class="h-5 w-5" />
					</Button>
				</div>
			</div>
		</header>

		<!-- Page Content -->
		<Sidebar.Inset>
			<main class="bg-primary/5 min-h-screen p-8">
				{@render children()}
			</main>
		</Sidebar.Inset>
	</div>
</Sidebar.Provider>
