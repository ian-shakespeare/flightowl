<script lang='ts'>
    import type { SavedFlightOffer } from '$lib/interfaces'
    import { getUpdatedFlight } from '$lib/api'
    import carriers from '$lib/data/carriers.json'
    import Icon from '$lib/components/UI/Icon.svelte'

    export let savedFlight: SavedFlightOffer
    let flight = savedFlight.offer.data
    let loading = false

    const getCarrierName = (code: string): string => {
        const name = (carriers as Record<string, string>)[code]
        return name ?? 'Unregisted Airline'
    }

    const handleUpdatePrice = async () => {
        loading = true
        flight = await getUpdatedFlight(savedFlight.offer_id) ?? flight
        loading = false
    }

    const toDuration = (d: string): string => d.slice(2).replace('H', ' hr ').replace('M', ' min')

    const toTime = (t: string): string => new Date(t).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})
</script>

<svelte:head>
    <title>
        Saved Flights - FlightOwl
    </title>
</svelte:head>

<li class='grid gap-6 py-4 border-b-2 border-gray-100 last:border-0 lg:grid-cols-3 lg:justify-between lg:items-center'>
    {#if loading}
        Loading...
    {:else}
        <div class='grid content-center text-left'>
            <span class='text-3xl leading-none'>
                {flight.itineraries[0].segments[0].departure.iataCode}
                <Icon name='fa-solid fa-arrow-right' />
                {flight.itineraries[0].segments.at(-1)?.arrival.iataCode}
            </span>
            <span class='text-xl'>
                {getCarrierName(flight.validatingAirlineCodes[0])}
            </span>
        </div>
        <div class='lg:text-center'>
            <span class='text-2xl text-fo-blue'>
                {new Date(flight.itineraries[0].segments[0].departure.at).toDateString().replace(' ', ', ')}
            </span>
            <br>
            <span class='text-lg text-gray-400'>
                Saved on {new Date(savedFlight.date_saved).toDateString().replace(' ', ', ')}
            </span>
        </div>
        <div class='flex flex-col lg:items-center gap-3 lg:gap-4 lg:flex-row lg:justify-self-end'>
            <h4 class='text-xl'>
                Total: <span class='text-2xl text-fo-magenta'>${flight.price.grandTotal}</span>
            </h4>
            <button class='fo-btn w-full lg:w-auto' on:click={handleUpdatePrice}>
                Get Updated Info
            </button>
        </div>
    {/if}
</li>
