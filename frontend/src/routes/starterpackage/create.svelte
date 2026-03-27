<script>
    let subject = $state("");
    
    function handleConfirm() {
        console.log(subject);       //test
        
  }

</script>

<div>
  <p>Subject</p>
  <input type="text" placeholder="Enter subject" bind:value={subject} />
  <button onclick={() => handleConfirm()}>Confirm</button>
</div>