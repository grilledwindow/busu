<script>
    let searchParam = $state('')
</script>

<form method="POST">
    <input name="searchParam" type="text" bind:value={searchParam}>
    <button>Bus</button>
</form>
