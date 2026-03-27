<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";

	let { children } = $props();
</script>

<Navbar />

<div>
	{@render children()}
</div>