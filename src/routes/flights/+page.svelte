<script lang='ts'>
    import type { PageData } from './$types'
    import carriers from '$lib/data/carriers.json'

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
        const name = carriers[code]
        return name ?? 'Unregisted Airline'
    }
</script>

<svelte:head>
    <title>Flight Search - FlightOwl</title>
</svelte:head>

<div>
    Flights page
    <ul>
        {#each flights as flight}
            <li>
                {getCarrierName(flight.validatingAirlineCodes[0])}
                {flight.itineraries[0].duration}
                ${flight.price.total}
            </li>
        {/each}
    </ul>
</div>
