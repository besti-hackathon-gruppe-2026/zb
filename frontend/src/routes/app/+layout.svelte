<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";

	let { children } = $props();
</script>

<Navbar />

<div class="wrapper">
	<div class="content">
		{@render children()}
	</div>
</div>

<style>
	.wrapper {
		width: 100%;
		display: flex;

		justify-content: center;
	}

	.content {
		border-left: 1px solid #ddd;
		border-right: 1px solid #ddd;
		max-width: 54rem;
		width: 100%;

		padding: 1rem;
	}
</style>
