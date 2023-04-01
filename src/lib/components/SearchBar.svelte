<script lang='ts'>
    import AirportInput from "$lib/components/AirportInput.svelte";
    import DateInput from "$lib/components/DateInput.svelte"
    import IconFilled from "$lib/components/UI/IconFilled.svelte"
    import Icon from "$lib/components/UI/Icon.svelte"

    let originAirport = {
        id: "",
        name: "",
        continent: "",
        municipality: "",
        iata_code: "",
    }
    let destinationAirport = {
        id: "",
        name: "",
        continent: "",
        municipality: "",
        iata_code: "",
    }
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
        <AirportInput bind:selectedAirport={originAirport} placeholder='Where from?' />
        <Icon name='fa-solid fa-plane-departure' />
    </div>
    <hr>
    <div class='flex gap-2 items-center'>
        <AirportInput bind:selectedAirport={destinationAirport} placeholder='Where to?' />
        <Icon name='fa-solid fa-plane-departure' />
    </div>
    <hr>
    <div class='flex gap-2 items-center'>
        <DateInput bind:date={date} />
        {#if originAirport.iata_code !== '' && destinationAirport.iata_code !== '' && toFormattedDate(date) !== ''}
            <a
                href={`/flights?origin=${originAirport.iata_code}&destination=${destinationAirport.iata_code}&date=${toFormattedDate(date)}`}
                class="flex"
            >
                <IconFilled name='fa-solid fa-magnifying-glass fa-1x' />
                <span class="hidden">Search flights</span>
            </a>
        {:else}
            <button disabled>
                <Icon name='fa-solid fa-magnifying-glass fa-1x p-1' />
            </button>
        {/if}
    </div>
</div>
