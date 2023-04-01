<script lang='ts'>
    import type { PageData } from './$types'
    import Box from '$lib/components/UI/Box.svelte'
    import SearchResult from '$lib/components/SearchResult.svelte'
    import ErrorNotification from '$lib/components/ErrorNotification.svelte';
    import type { FlightOffer } from '$lib/interfaces'

    export let data: PageData

    const flights: FlightOffer[] = data.flights

    const errorMap = new Map([
        [401, "unauthorized"],
        [4010, "expired"],
        [404, "noFlights"],
        [400, "noFlights"],
        [500, "serverError"],
    ])
</script>

<svelte:head>
    <title>Flight Search - FlightOwl</title>
    <meta name='description' content='Search for flights across the world on FlightOwl'>
</svelte:head>


{#if errorMap.get(data.status)}
    <ErrorNotification errorType={errorMap.get(data.status)} />
{:else}
    <Box>
        <ul>
            {#each flights as flight}
                <SearchResult flight={flight} />
            {/each}
        </ul>
    </Box>
{/if}

