<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  onMount(fetchBus);

  let searchParam = $state('');
  let savedBusCodes: string[] = $state([]);

  // Retrieve saved codes if stored in LocalStorage
  if (browser) {
    const localStorageBusCodes = localStorage.getItem('codes');
    if (localStorageBusCodes !== null) {
      savedBusCodes = JSON.parse(localStorageBusCodes);
    }
  }

  // Updates LocalStorage whenever saved codes are updated
  $effect(() => {
    localStorage.setItem('codes', JSON.stringify(savedBusCodes));
  });
  
  // const fetchBus = () => fetch('/api/bus', { method: 'POST' });
  function fetchBus() {
    if (searchParam === '') return;
    savedBusCodes.push(searchParam);
  }
</script>

codes: {savedBusCodes}
<form method="POST">
    <input name="searchParam" type="text" bind:value={searchParam}>
</form>
<button on:click={fetchBus}>Bus</button>
