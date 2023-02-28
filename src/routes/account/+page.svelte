<script lang='ts'>
    import carriers from '$lib/data/carriers.json'
    import type { PageData } from './$types'
    import type { SavedFlightOffer } from '$lib/interfaces'
    import Box from '$lib/components/UI/Box.svelte'
    import Icon from '$lib/components/UI/Icon.svelte'
    import SavedFlight from '$lib/components/SavedFlight.svelte'

    export let data: PageData

    const savedFlights: SavedFlightOffer[] = data.saved

    const getCarrierName = (code: string): string => {
        const name = (carriers as Record<string, string>)[code]
        return name ?? 'Unregisted Airline'
    }

    const toDuration = (d: string): string => d.slice(2).replace('H', ' hr ').replace('M', ' min')

    const toTime = (t: string): string => {
        const d = new Date(t)
        const options: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        }
        return d.toLocaleString('en-US', options)
    }
</script>

<Box>
    <ul>
        {#each savedFlights as flight}
            <SavedFlight savedFlight={flight} />
        {/each}
    </ul>
</Box>
