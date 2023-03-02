<script lang='ts'>
    import type { PageData } from './$types'
    import type { SavedFlightOffer } from '$lib/interfaces'
    import Box from '$lib/components/UI/Box.svelte'
    import SavedFlight from '$lib/components/SavedFlight.svelte'

    export let data: PageData
    const savedFlights: SavedFlightOffer[] = data.saved.sort((a: SavedFlightOffer, b: SavedFlightOffer) => new Date(b.date_saved).getTime() - new Date(a.date_saved).getTime())
</script>

<svelte:head>
    <title>
        Saved Flights - FlightOwl
    </title>
</svelte:head>

<Box>
    {#if savedFlights.length < 1}
        <div class='text-lg text-center lg:text-xl'>
            You haven't saved any flights,
            <a href='/' class='fo-hyperlink'>
                Search Here
            </a>
        </div>
    {:else}
        <ul>
            {#each savedFlights as flight}
                <SavedFlight savedFlight={flight} />
            {/each}
        </ul>
    {/if}
</Box>
