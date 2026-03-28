<script>
	import { page } from '$app/state';

	let { data } = $props();
</script>

<h2>Classrooms</h2>
<ul>
	{#each data.items as classroom}
		<li>
			{classroom['classroomName']}
			<form method="POST" action="?/deleteClassroom">
				<input type="hidden" name="classroomId" value={classroom['classroomId']} />
				<button>Delete</button>
			</form>
		</li>
	{:else}
		<li>No classrooms</li>
	{/each}
</ul>

<hr />
<h2>Create Classroom</h2>
<form method="POST" action="?/createClassroom">
	<input type="text" placeholder="Classroom Name" name="classroomName" required />
	{#if page.form?.message}
		<p class="error">{page.form.message}</p>
	{/if}
	<button> Create Classroom </button>
</form>

<style>
	.error {
		color: red;
		text-align: center;
	}
</style>
