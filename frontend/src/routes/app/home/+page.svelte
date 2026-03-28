<script>
	import Dropdown from '$lib/components/Dropdown.svelte';
</script>

<main class="">
	{#snippet trigger()}
		<p>Dropdown</p>
	{/snippet}

	<!-- <Dropdown {trigger}>Hallo Bruda</Dropdown> -->

	<div class="logo">
		<label class="switch">
			<input type="checkbox" />
			<span class="slider round"></span>
		</label>
		<span class="logo-label">
			<span class="net-label">Net</span>
			<span class="switch-label">Switch</span>
		</span>
	</div>
</main>

<style>
	main {
		height: calc(100vh - 6rem);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.net-label {
		color: #196ad4;
		font-weight: 600;
	}
	
	.switch-label {
		color: #61c561;
		font-weight: 600;
	}

	.logo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		gap: 2rem;
	}

	.logo-label {
		display: flex;
		justify-content: center;
		align-items: center;

		display: flex;
		gap: 0;
		font-size: 4rem;
	}

	.switch {
		position: relative;
		display: inline-block;
		width: 240px;
		height: 100px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: '';
		height: 84px;
		width: 84px;
		left: 8px;
		bottom: 8px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		background-color: #61c561;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #61c561;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(140px);
		-ms-transform: translateX(140px);
		transform: translateX(140px);
	}

	.slider.round {
		border-radius: 100px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
