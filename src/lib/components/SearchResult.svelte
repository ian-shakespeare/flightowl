<script lang='ts'>
    import type { FlightOffer } from '$lib/interfaces'
    import carriers from '$lib/data/carriers.json'
    import Icon from '$lib/components/UI/Icon.svelte'
    import axios from 'axios';
    import ErrorNotification from './ErrorNotification.svelte';

    export let flight: FlightOffer

    let isLoading = false
    let isSaved = false
    let error: string | undefined = undefined

    const errorMap = new Map([
        [400, "serverError"],
        [401, "unauthorized"],
        [500, "serverError"],
    ]);

    const getCarrierName = (code: string): string => {
        const name = (carriers as Record<string, string>)[code]
        return name ?? 'Unregisted Airline'
    }

    const toDuration = (d: string): string => d.slice(2).replace('H', ' hr ').replace('M', ' min')

    const toTime = (t: string): string => new Date(t).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true})
    const toTimeWithDate = (t: string): string => new Date(t).toLocaleString('en-US', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true})

    const handleSaveFlight = async () => {
        if (!isSaved) {
            isLoading = true
            await axios
                .post(
                    "/api/flights",
                    flight,
                    { withCredentials: true }
                )
                .then((res) => {
                    isSaved = true
                })
                .catch((err) => {
                    isSaved = false
                    error = errorMap.get(err.response.status)
                })
            isLoading = false
        }
    }
</script>

{#if error}
    <ErrorNotification bind:errorType={error} />
{/if}
<li class='grid gap-6 items-center border-b-2 border-gray-100 py-8 last:border-0 lg:grid-flow-col lg:gap-0 lg:px-16'>
    <div class='text-5xl'>
        {flight.itineraries[0].segments[0].departure.iataCode}
        <Icon name='fa-solid fa-arrow-right' />
        {flight.itineraries[0].segments.at(-1)?.arrival.iataCode}
        <br>
        <span class='text-3xl text-neutral-400'>
            {getCarrierName(flight.validatingAirlineCodes[0])}
        </span>
    </div>
    <div class='grid text-xl text-left lg:text-center'>
        <p class="grid lg:grid-flow-col lg:justify-center lg:items-center lg:gap-3">
            Departs on
            <br class="lg:hidden">
            <span class="text-fo-magenta text-center text-2xl">
                {toTimeWithDate(flight.itineraries[0].segments[0].departure.at)}
            </span>
        </p>
        <p class="grid lg:grid-flow-col lg:justify-center lg:items-center lg:gap-3">
            Arrives on
            <br class="lg:hidden">
            <span class="text-fo-purple text-center text-2xl">
                {toTimeWithDate(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at)}
            </span>
        </p>
        <span class='text-neutral-400'>
            {toDuration(flight.itineraries[0].duration)}
            {#if flight.itineraries[0].segments.length == 1}
                &lpar;{flight.itineraries[0].segments.length} stop&rpar;
            {:else}
                &lpar;{flight.itineraries[0].segments.length} stops&rpar;
            {/if}
        </span>
    </div>
    <div class='flex justify-between items-center text-3xl lg:justify-end'>
        ${flight.price.total}
        {#if isLoading}
            <Icon name='fa-solid fa-spinner fa-lg animate-spin text-2xl' />
        {:else if isSaved}
            <Icon name='fa-solid fa-star fa-lg text-2xl' />
        {:else}
            <button title='Save this flight' class='fo-hyperlink text-2xl' disabled={isSaved} on:click={handleSaveFlight}>
                <Icon name='fa-regular fa-star fa-lg' />
            </button>
        {/if}
    </div>
</li>
