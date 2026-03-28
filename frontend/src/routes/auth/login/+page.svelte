<script lang="ts">
	import type { PageProps } from './$types';
	import { page } from '$app/state';

	let { data, form }: PageProps = $props();
</script>

<main class="page">
	<section class="login-card container">
		<h1 class="title">Login</h1>

		<form method="POST" action="?/login">
			<div class="form-field">
				<label for="username">Username</label>
				<input id="username" name="username" type="text" required autocomplete="username" />
			</div>

			<div class="form-field">
				<label for="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					autocomplete="current-password"
				/>
			</div>

			{#if page.form?.message}
				<p class="error">{page.form.message}</p>
			{/if}

			<button type="submit">Login</button>
		</form>
	</section>
</main>

<style>
	.title {
		text-align: center;
	}

	.login-card {
		display: flex;
		flex-direction: column;
		width: 100%;

		max-width: 420px;

		padding: 2.5rem;
		gap: 1.5rem;
	}

	.form-field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.error {
		color: red;
		text-align: center;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
</style>
