<script lang='ts'>
    import type { SavedFlightOffer } from '$lib/interfaces'
    import { getUpdatedFlight } from '$lib/api'
    import carriers from '$lib/data/carriers.json'
    import Icon from '$lib/components/UI/Icon.svelte'

    type FlightStatus = 'CURRENT' | 'UNAVAILABLE' | 'OLD'

    export let savedFlight: SavedFlightOffer
    let flight = savedFlight.offer.data
    let loading = false
    let status: FlightStatus = 'OLD'

    const getCarrierName = (code: string): string => {
        const name = (carriers as Record<string, string>)[code]
        return name ?? 'Unregisted Airline'
    }

    const handleUpdatePrice = async () => {
        loading = true

        const updatedFlight = await getUpdatedFlight(savedFlight.offer_id)
        if (updatedFlight === undefined) {
            status = 'UNAVAILABLE'
            return
        }

        loading = false
        status = 'CURRENT'
    }
</script>

<svelte:head>
    <title>
        Saved Flights - FlightOwl
    </title>
</svelte:head>

<li class='grid gap-6 py-4 border-b-2 border-gray-100 last:border-0 lg:grid-cols-4 lg:justify-between lg:items-center'>
    {#if loading}
        Loading...
    {:else if new Date(flight.lastTicketingDate) < new Date()}
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
        <div class='text-xl text-fo-pink text-center lg:col-span-2'>
            This flight is no longer offering tickets
        </div>
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
        <div class='flex gap-2 items-center text-center lg:flex-col lg:gap-0'>
            {#if status === 'UNAVAILABLE'}
                <span class='text-2xl'>
                    Unavailable
                </span>
            {:else if status === 'OLD'}
                <span class='text-2xl text-fo-magenta'>${flight.price.grandTotal}</span>
                <span class='text-lg text-gray-400'>Original Price</span>
            {:else}
                <span class='text-2xl text-fo-magenta'>${flight.price.grandTotal}</span>
                <span class='text-lg text-gray-400'>Current Price</span>
            {/if}
        </div>
        <button class='fo-btn w-full lg:w-auto' on:click={handleUpdatePrice}>
            Get Updated Info
        </button>
    {/if}
</li>
