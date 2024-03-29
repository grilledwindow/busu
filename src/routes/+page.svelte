<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
	import type { BusArrival } from './api/bus/+server';

  // onMount(fetchBus);

  let searchParam = $state('');
  let searchResult = $state('');
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
    if (!searchParam) {
      searchResult = 'No bus code entered!';
      return;
    }

    const res = await fetch('/api/bus?code=' + searchParam);
    const data: BusArrival = await res.json();
    
    if (!data.Services) {
      searchResult = 'invalid bus stop code: ' + searchParam;
    } else {
      searchResult =
        `bus stop code: ${data.BusStopCode}`
        + `\nservices: ${data.Services.map(({ ServiceNo }) => ServiceNo).join(', ')}`;
    }
  }

  function saveBusCodes() {
    if (searchParam === '') return;
    savedBusCodes.push(searchParam);
  }
</script>

<main class="max-w-[420px] h-[100vh] bg-white mx-auto p-2">
  <!-- <form method="POST"> -->
    <input name="searchParam" type="text" class="px-2 py-1 border-2 rounded-lg" placeholder="bus code" bind:value={searchParam}>
  <!-- </form> -->
  <button on:click={fetchBus} class="px-2 py-1 border-2 border-blue-500 bg-blue-500 rounded-lg text-white">Search</button>
  <!-- <button on:click={saveBusCodes}>Add</button> -->
  {#if searchResult}
    <p class="mt-2 whitespace-pre-line">{searchResult}</p>
  {/if}
</main>