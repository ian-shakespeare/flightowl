<script lang='ts'>
    import type { PageData } from './$types'
    import type { SavedFlightOffer } from '$lib/interfaces'
    import Box from '$lib/components/UI/Box.svelte'
    import SavedFlight from '$lib/components/SavedFlight.svelte'
    import ErrorNotification from '$lib/components/ErrorNotification.svelte';

    export let data: PageData
    const savedFlights: SavedFlightOffer[] = data.saved.sort((a: SavedFlightOffer, b: SavedFlightOffer) => new Date(b.date_saved).getTime() - new Date(a.date_saved).getTime())

    const errorMap = new Map([
        [500, "serverError"],
        [400, "serverError"],
        [401, "unauthorized"],
        [4010, "expired"]
    ])
</script>

<svelte:head>
    <title>
        Saved Flights - FlightOwl
    </title>
    <meta name='description' content='All of your saved flights on FlightOwl'>
</svelte:head>

{#if errorMap.get(data.status)}
    <ErrorNotification errorType={errorMap.get(data.status)} />
{:else if savedFlights.length < 1}
    <ErrorNotification errorType={"noSavedFlights"} />
{:else}
    <Box>
        <ul>
            {#each savedFlights as flight}
                <SavedFlight savedFlight={flight} />
            {/each}
        </ul>
    </Box>
{/if}
