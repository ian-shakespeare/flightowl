<script lang="ts">
    import __airports from "$lib/data/airports.json"
    import type { Airport } from "$lib/interfaces";

    const airports: Airport[] = __airports
    export let selectedAirport: Airport | null;
    let searchInput: HTMLInputElement;
    let possibleAirports: Airport[] = [];
    let highlightedIndex = -1;
    let inputValue = "";

    const filterAirports = () => {
        if (!inputValue) return [];
        return airports.filter((a) => (
            a.municipality.toLowerCase().includes(inputValue.toLowerCase())
            || a.name.toLowerCase().includes(inputValue.toLowerCase())
            || a.iata_code.toLowerCase().includes(inputValue.toLowerCase())
        )).slice(0, 10)
    }

    const navigateList = (e: KeyboardEvent) => {
        if (e.key === "ArrowDown" && highlightedIndex <= possibleAirports.length) {
            highlightedIndex === -1 ? highlightedIndex = 0 : highlightedIndex += 1;
        } else if (e.key === "ArrowUp" && highlightedIndex !== -1) {
            highlightedIndex === 0 ? highlightedIndex = possibleAirports.length - 1 : highlightedIndex -= 1;
        } else if (e.key === "Enter") {
            selectedAirport = possibleAirports[highlightedIndex];
            inputValue = selectedAirport.name;
            possibleAirports = [];
        } else if (e.key === "Escape") {
            inputValue = "";
            selectedAirport = null;
            possibleAirports = [];
        }
    }
</script>

<div
    on:keydown={navigateList}
    class="relative"
>
    <input
        bind:this={searchInput}
        bind:value={inputValue}
        on:input={() => possibleAirports = filterAirports()}
        placeholder="New Input"
        class='w-64 text-xl !outline-none duration-100 ease-in-out focus:border-b-2 focus:border-fo-magenta lg:text-center'
    />
    {#if possibleAirports.length > 0}
        <ul class="absolute w-full top-full">
            {#each possibleAirports as pa, i}
                <li class="px-2 bg-fo-aqua text-white">
                    {pa.name} ({pa.iata_code})
                    <br>
                    {#if i === highlightedIndex}
                        Selected
                    {/if}
                </li>
            {/each}
        </ul>
    {/if}
</div>
