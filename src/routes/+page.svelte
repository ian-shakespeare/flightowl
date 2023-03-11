<script lang='ts'>
    import SearchBar from '$lib/components/SearchBar.svelte'
    import type { LayoutData } from './$types'

    export let data: LayoutData
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
</div>
