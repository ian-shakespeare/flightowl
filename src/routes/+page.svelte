<script lang='ts'>
    import SearchBar from '$lib/components/SearchBar.svelte'
    import NewInput from '$lib/components/NewInput.svelte';
    import type { LayoutData } from './$types'
    import type { Airport } from '$lib/interfaces';

    export let data: LayoutData

    let airport1: Airport | null = null
    let airport2: Airport | null = null
</script>

<svelte:head>
    <title>
        Home - FlightOwl
    </title>
    <meta name='description' content='The gateway to any flight, from any airport, all on FlightOwl'>
</svelte:head>

<div class='grid gap-8 pt-24 justify-items-center lg:pt-64'>
    <h1 class='text-4xl text-center lg:text-6xl'>
        {#if data.account === null}
            Where to, Partner
        {:else}
            Where to, {data.account.firstName}
        {/if}
    </h1>
    <SearchBar />
    <div class="flex">
        <NewInput bind:selectedAirport={airport1} />
        <NewInput bind:selectedAirport={airport2} />
    </div>
    <button on:click={() => {
        console.log(airport1); console.log(airport2)
    }}
    >
        Log airports
    </button>
</div>
