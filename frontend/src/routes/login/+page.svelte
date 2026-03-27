<div class="root">
	<div class="box">
    <p>Login</p>
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
    border: 2px;
    border-style: solid;
    border-color: black;
    border-radius: 15px;
    padding: 100px;
    display: flex;
    gap: 12px;
    flex-direction: column;
    p {
      font-size: xx-large;
    }
  }

  form {
    display: flex;
    gap: 8px;
    flex-direction: column;
  }

</style>
