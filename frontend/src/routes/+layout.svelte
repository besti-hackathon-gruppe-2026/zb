<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div>
	{@render children()}
</div>

<style>
	:global(*) {
		margin: 0;
		padding: 0;

		font-family: 'Archivo', sans-serif;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		font-variation-settings: 'wdth' 100;
	}
</style>
