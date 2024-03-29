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
  
  async function fetchBus() {
    const res = await fetch('/api/bus');
    const data = await res.json();
    console.log(data);
  }

  function saveBusCodes() {
    if (searchParam === '') return;
    savedBusCodes.push(searchParam);
  }
</script>

<main class="max-w-[420px] h-[100vh] bg-white mx-auto">
  <form method="POST">
    <input name="searchParam" type="text" bind:value={searchParam}>
  </form>
  <button on:click={fetchBus}>Bus</button>
  <button on:click={saveBusCodes}>Add</button>
</main>