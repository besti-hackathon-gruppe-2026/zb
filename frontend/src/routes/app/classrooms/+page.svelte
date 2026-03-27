<script>
	let {data} = $props();

	function createClassroom() {
	    // TODO
	}

	function deleteClassroom(cl) {
	    // TODO
	}
</script>

<h2>Classrooms</h2>
<ul>
{#each data.items as classroom}
    <li>
        {classroom["classroomName"]}
        <form method="POST" action="?/deleteClassroom">
            <input type="hidden" name="classroomId" value={classroom["classroomId"]}>
            <button>Delete</button>
        </form>
    </li>
{:else}
    <li>No classrooms</li>
{/each}
</ul>

<hr>
<h2>Create Classroom</h2>
<form method="POST" action="?/createClassroom">
    <input type="text" placeholder="Classroom Name" name="classroomName"/>
    <button>
        Create Classroom
    </button>
</form>