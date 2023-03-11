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
    <meta name='description' content='Search for flights across the world on FlightOwl'>
</svelte:head>

<Box>
    {#if data.account === null}
        <div class='text-lg text-center lg:text-xl'>
            You must be signed in to look up flights.
            <a href='/login' class='fo-hyperlink'>
                Sign in here
            </a>
        </div>
    {:else if flights.length === 0}
        <div class='text-lg text-center lg:text-xl'>
            We couldn't find any flights that matched your search.
            <a href='/' class='fo-hyperlink'>
                Try searching again
            </a>
        </div>
    {:else}
        <ul>
            {#each flights as flight}
                <SearchResult flight={flight} />
            {/each}
        </ul>
    {/if}
</Box>
