<div class="root">
	<div class="box">
    <h1>Login</h1>
		<form action="/action_page.php" method="get">
			<label> Username:</label>
			<input type="text" name="vehicle1" value="" />
			<label> Password:</label>
			<input type="text" name="vehicle2" value="" />
		</form>
	</div>
</div>

<style>
	.root {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

  .box {
    background-color: pink;
    padding: 15px;
    padding-left: 35px;
    padding-right: 35px;
    display: flex;
    gap: 12px;
    flex-direction: column;
  }

  form {
    display: flex;
    gap: 8px;
    flex-direction: column;
  }

  h1 {
    font-size: xx-large;
  }
  label {
    font-size: large;
  }
</style>
