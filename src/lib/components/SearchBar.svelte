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

<div class='grid gap-4 w-full py-6 bg-white border-2 border-gray-100 justify-center items-center shadow-lg rounded-lg duration-200 ease-in-out hover:shadow-xl lg:grid-flow-col lg:gap-2 lg:w-min lg:py-3 lg:pl-8 lg:pr-4 lg:rounded-full'>
    <div class='flex gap-2 items-center'>
        <AirportInput bind:code={originCode} placeholder='Where are you flying from?' />
        <Icon name='fa-solid fa-plane-departure' />
    </div>
    <hr>
    <div class='flex gap-2 items-center'>
        <AirportInput bind:code={destinationCode} placeholder='Where are you flying to?' />
        <Icon name='fa-solid fa-plane-departure' />
    </div>
    <hr>
    <div class='flex gap-2 items-center'>
        <DateInput bind:date={date} />
        {#if originCode !== '' && destinationCode !== '' && toFormattedDate(date) !== ''}
            <a href={`/flights?origin=${originCode}&destination=${destinationCode}&date=${toFormattedDate(date)}`}>
                <IconFilled name='fa-solid fa-magnifying-glass fa-1x' />
            </a>
        {:else}
            <button disabled>
                <Icon name='fa-solid fa-magnifying-glass fa-1x p-1' />
            </button>
        {/if}
    </div>
</div>
