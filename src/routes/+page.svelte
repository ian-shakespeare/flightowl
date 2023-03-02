<script lang='ts'>
    import SearchBar from '$lib/components/SearchBar.svelte'
    import type { LayoutData } from './$types'

    export let data: LayoutData
</script>

<svelte:head>
    <title>
        Home - FlightOwl
    </title>
</svelte:head>

<div class='grid gap-8 pt-24 justify-items-center lg:pt-64'>
    <h1 class='text-4xl text-center'>
        {#if data.account === null}
            Where to, Partner
        {:else}
            Where to, {data.account.firstName}
        {/if}
    </h1>
    <SearchBar />
</div>
