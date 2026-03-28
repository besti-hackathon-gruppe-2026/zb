<script>
	let {data} = $props();
</script>

<h2>Filters</h2>
<table>
    <thead>
        <tr>
            <th>Classroom</th>
            <th>URL</th>
            <th>IP</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {#each data.items as filter}
            <tr>
                <td>{filter["classroomId"]}</td>
                <td>
                    {filter["url"]}
                </td>
                <td>
                    {filter["ip"]}
                </td>
                <td>
                    <form method="POST" action="?/deleteFilter">
                        <input type="hidden" name="filterId" value={filter["filterId"]}>
                        <button>Delete</button>
                    </form>
                </td>
            </tr>
        {:else}
            <tr>
                <td colspan="4">Whitelist is empty</td>
            </tr>
        {/each}
    </tbody>
</table>

<hr>
<h2>Create Filter</h2>
<form method="POST" action="?/createFilter">
    <input type="hidden" name="classroomId" value="14">
    <input type="text" placeholder="URL" name="url"/>
    <input type="text" placeholder="IP" name="ip"/>
    <button>
        Create Classroom
    </button>
</form>