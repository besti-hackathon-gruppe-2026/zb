<main class="page">
	<section class="login-card container">
		<h1 class="title">Login</h1>

		<form method="POST" action="?/login">
			<div class="form-field">
				<label for="email">Email</label>
				<input id="email" name="email" type="text" required autocomplete="email" />
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

	form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
</style>
