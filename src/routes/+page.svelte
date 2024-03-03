<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let searchParam = $state('');
  let codes = $state([123]);

  if (browser && localStorage.getItem('codes') === null) {
    JSON.parse(localStorage.getItem('codes'));
  }
  
  $effect(() => {
    if ($effect.active()) {
      localStorage.setItem('codes', JSON.stringify(codes));
    }
  });
  
  const fetchBus = () => fetch('/api/bus', { method: 'POST' });
  onMount(fetchBus);
</script>

codes: {codes}
<form method="POST">
    <input name="searchParam" type="text" bind:value={searchParam}>
</form>
<button on:click={fetchBus}>Bus</button>
