<script lang='ts'>
    import type { FlightOffer } from '$lib/interfaces'
    import carriers from '$lib/data/carriers.json'
    import Icon from '$lib/components/UI/Icon.svelte'
    import { saveFlight } from '$lib/api'

    export let flight: FlightOffer

    let isSaved = false

    const getCarrierName = (code: string): string => {
        const name = (carriers as Record<string, string>)[code]
        return name ?? 'Unregisted Airline'
    }

    const toDuration = (d: string): string => d.slice(2).replace('H', ' hr ').replace('M', ' min')

    const toTime = (t: string): string => new Date(t).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})

    const handleSaveFlight = () => {
        if (!isSaved) {
            isSaved = true
            saveFlight(flight)
        }
    }
</script>

<li class='grid items-center border-b-2 border-gray-100 py-8 last:border-0 lg:grid-flow-col lg:px-16'>
    <div class='text-5xl'>
        {flight.itineraries[0].segments[0].departure.iataCode}
        <Icon name='fa-solid fa-arrow-right' />
        {flight.itineraries[0].segments.at(-1)?.arrival.iataCode}
        <br>
        <span class='text-3xl text-neutral-400'>
            {getCarrierName(flight.validatingAirlineCodes[0])}
        </span>
    </div>
    <div class='text-2xl lg:text-center'>
        {toTime(flight.itineraries[0].segments[0].departure.at)} - {toTime(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at)}
        <br>
        <span class='text-neutral-400'>
            {toDuration(flight.itineraries[0].duration)}
            {#if flight.itineraries[0].segments.length == 1}
                &lpar;{flight.itineraries[0].segments.length} stop&rpar;
            {:else}
                &lpar;{flight.itineraries[0].segments.length} stops&rpar;
            {/if}
        </span>
    </div>
    <div class='text-3xl lg:text-right'>
        ${flight.price.total}
        <br>
        <button class='fo-hyperlink text-2xl' on:click={handleSaveFlight}>
            {#if isSaved}
                Saved
            {:else}
                Save
            {/if}
        </button>
    </div>
</li>
