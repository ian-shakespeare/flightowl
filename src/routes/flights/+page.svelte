<script lang='ts'>
    import type { PageData } from './$types'
    import carriers from '$lib/data/carriers.json'
    import Box from '$lib/components/UI/Box.svelte'
    import Icon from '$lib/components/UI/Icon.svelte'

    interface FlightOffer {
        id: string
        instantTicketingRequired: boolean
        itineraries: {
            duration: string
            segments: {
                aircraft: { code: string }
                arrival: {
                    iataCode: string
                    terminal: string
                    at: string
                }
                blacklistedInEu: boolean
                carrierCode: string
                departure: {
                    iataCode: string
                    terminal: string
                    at: string
                }
                duration: string
                id: string
                number: string
                numberOfStops: number
                operating: { carrierCode: string }
            }[]
        }[]
        lastTicketingDate: string
        nonHomogeneous: false
        numberOfBookableSeats: number
        oneWay: boolean
        price: {
            base: string
            currency: string
            fees: {
                amount: string
                type: string
            }[]
            grandTotal: string
            total: string
        }
        pricingOptions: {
            fareType: string[]
            includedCheckedBagsOnly: boolean
        }
        source: string
        travelerPricings: {
            fareDetailsBySegment: {
                segmentId: string
                cabin: string
                fareBasis: string
                class: string
                brandedFare: string
                includedCheckedBags: { quantity: number }
            }[]
            fareOption: string
            price: {
                currency: string
                total: string
                base: string
            }
            travelerId: string
            travelerType: string
        }[]
        type: string
        validatingAirlineCodes: string[]
    }

    export let data: PageData

    const flights: FlightOffer[] = data.flights

    const getCarrierName = (code: string): string => {
        const name = (carriers as Record<string, string>)[code]
        return name ?? 'Unregisted Airline'
    }

    const toDuration = (d: string): string => d.slice(2).replace('H', ' hours, ').replace('M', ' minutes')
    const militaryToAMPM = (t: string): string => {
        const tArr = t.split(':')
        tArr[0] = String(parseInt(tArr[0]) % 24)
        return tArr.join(':')
    }
    const toTime = (t: string): string => militaryToAMPM(t.split('T')[1])
</script>

<svelte:head>
    <title>Flight Search - FlightOwl</title>
</svelte:head>

<Box>
    <h1>
        Flights page
    </h1>
    <ul>
        {#each flights as flight}
            <li class='grid items-center border-b-2 border-gray-100 py-8 last:border-0 lg:grid-flow-col lg:px-16'>
                <h2 class='text-5xl'>
                    {flight.itineraries[0].segments[0].departure.iataCode}
                    <Icon name='fa-solid fa-arrow-right' />
                    {flight.itineraries[0].segments.at(-1)?.arrival.iataCode}
                    <br>
                    <span class='text-3xl text-neutral-400'>
                        {getCarrierName(flight.validatingAirlineCodes[0])}
                    </span>
                </h2>
                <h3 class='text-2xl lg:text-center'>
                    {toDuration(flight.itineraries[0].duration)}
                    <span class='text-neutral-400'>
                        {#if flight.itineraries[0].segments.length == 1}
                            &lpar;{flight.itineraries[0].segments.length} stop&rpar;
                        {:else}
                            &lpar;{flight.itineraries[0].segments.length} stops&rpar;
                        {/if}
                    </span>
                    <br>
                    <span class='text-neutral-400'>
                        Departing at {toTime(flight.itineraries[0].segments[0].departure.at)}
                    </span>
                </h3>
                <h4 class='text-3xl lg:text-right'>
                    ${flight.price.total}
                </h4>
            </li>
        {/each}
    </ul>
</Box>
