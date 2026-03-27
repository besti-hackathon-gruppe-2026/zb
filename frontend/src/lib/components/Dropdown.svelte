<script lang="ts">
	import type { Snippet } from 'svelte';

	let open = $state(false);

	const toggle = (): void => {
		open = !open;
	};

	const handleFocusOut = (event: FocusEvent): void => {
		const relatedTarget = event.relatedTarget as HTMLElement | null;
		const currentTarget = event.currentTarget as HTMLElement;

		if (relatedTarget && currentTarget.contains(relatedTarget)) return;

		open = false;
	};

	interface Props {
		children: Snippet;
		trigger: Snippet;
	}

	let { children, trigger }: Props = $props();
</script>

<div class="dropdown" onfocusout={handleFocusOut}>
	<button class="trigger" onclick={toggle}>
		{@render trigger()}
	</button>

	<div class="dropdown-content" style:visibility={open ? 'visible' : 'hidden'}>
		{#if children}
			{@render children()}
		{:else}
			<p>fallback content</p>
		{/if}
	</div>
</div>

<style>
	.dropdown {
		position: relative;
		display: inline-block;
	}

	.trigger {
		cursor: pointer;
	}

	.dropdown-content {
		position: absolute;
		top: 100%;
		left: 0;
		background: white;
		border: 1px solid #ccc;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		padding: 0.5rem;
		min-width: 10rem;
		z-index: 1000;
	}
</style>
