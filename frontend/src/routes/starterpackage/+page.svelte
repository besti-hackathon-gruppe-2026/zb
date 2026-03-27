<script>
  import Create from "./create.svelte";
  import SubjectComponent from "./SubjectComponent.svelte"

  let showCreate = $state(false);

</script>

<div>
    <div>
        <h2>Create</h2>
        <button onclick={() => (showCreate = true)}>Create</button>
    </div>
    <div class="container">
        <SubjectComponent/>
        <SubjectComponent/>
        <SubjectComponent/>
        <SubjectComponent/>
        <SubjectComponent/>
        <SubjectComponent/>
        <SubjectComponent/>
        <SubjectComponent/>
        <SubjectComponent/>
    </div>
  
</div>



{#if showCreate}
  <Create />
{/if}


<style>    
    .container{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;         
        margin-left: 50px;
    }
</style>
