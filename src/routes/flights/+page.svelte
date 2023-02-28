<script lang='ts'>
    import type { PageData } from './$types'
    import Box from '$lib/components/UI/Box.svelte'
    import SearchResult from '$lib/components/SearchResult.svelte'
    import type { FlightOffer } from '$lib/interfaces'

    export let data: PageData

    const flights: FlightOffer[] = data.flights
</script>

<svelte:head>
    <title>Flight Search - FlightOwl</title>
</svelte:head>

<Box>
    <ul>
        {#each flights as flight}
            <SearchResult flight={flight} />
        {/each}
    </ul>
</Box>
