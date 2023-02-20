<script lang='ts'>
    import airports from '$lib/data/airports.json'
    import Fuse from 'fuse.js'

    export let placeholder: string
    export let id: string

    type Airport = {
        item: {
            name: string
            municipality: string
            iata_code: string
        }
    }

    const options = {
        keys: [
            'name',
            'iata_code',
            'municipality'
        ]
    }
    const fuse = new Fuse(airports, options)

    let possibleAirports: Airport[] = []
    let searchField = { value: '', code: ''}

    const searchPossibleAirports = () => {
        possibleAirports = fuse.search(searchField.value).slice(0, 5)
    }

    const assignInput = (airport: Airport) => {
        searchField.value = airport.item.name
        searchField.code = airport.item.iata_code
        possibleAirports = []
    }
</script>

<div id={id} class='relative'>
    <input
        bind:value={searchField.value}
        on:keypress={() => searchPossibleAirports()}
        placeholder={placeholder}
        class='text-center text-xl !outline-none duration-100 ease-in-out focus:border-b-2 focus:border-fo-magenta'
    />
    {#if possibleAirports.length >= 1}
        <div class='absolute z-10 inset-x-0 bg-white'>
            {#each possibleAirports as airport}
                <div
                    on:click={() => assignInput(airport)}
                    on:keypress={() => assignInput(airport)}
                    class='hover:bg-purple-200'>
                    {airport.item.name} &lpar;{airport.item.iata_code}&rpar;
                </div>
            {/each}
        </div>
    {/if}
</div>
