<script lang='ts'>
    import AirportInput from "$lib/components/AirportInput.svelte"
    import DateInput from "$lib/components/DateInput.svelte"
    import IconFilled from "$lib/components/UI/IconFilled.svelte"
    import Icon from "$lib/components/UI/Icon.svelte"

    let originCode = ''
    let destinationCode = ''
    let date = ''

    const toFormattedDate = (d: string): string => {
        try {
            return new Date(d).toISOString().split('T')[0]
        } catch (e) {
            return ''
        }
    }
</script>

<div class='flex pl-8 pr-4 py-2 border-2 border-gray-100 rounded-full justify-between items-center w-full shadow-lg'>
    <AirportInput bind:code={originCode} placeholder='Where are you flying from?' />
    <Icon name='fa-solid fa-plane-departure' />
    <AirportInput bind:code={destinationCode} placeholder='Where are you flying to?' />
    <Icon name='fa-solid fa-plane-departure' />
    <DateInput bind:date={date} />
    {#if originCode !== '' && destinationCode !== '' && toFormattedDate(date) !== ''}
        <a href={`/flights?origin=${originCode}&destination=${destinationCode}&date=${toFormattedDate(date)}`}>
            <IconFilled name='fa-solid fa-magnifying-glass fa-1x' />
        </a>
    {:else}
        <button>
            <IconFilled name='fa-solid fa-magnifying-glass fa-1x' />
        </button>
    {/if}
</div>
