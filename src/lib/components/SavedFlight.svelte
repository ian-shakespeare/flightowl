<script lang='ts'>
    import type { SavedFlightOffer } from '$lib/interfaces'
    import carriers from '$lib/data/carriers.json'
    import Icon from '$lib/components/UI/Icon.svelte'

    export let savedFlight: SavedFlightOffer
    console.log(savedFlight)

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

<li>
    <button on:click={() => console.log(savedFlight)}>
        Get Body
    </button>
</li>
