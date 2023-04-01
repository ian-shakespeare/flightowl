<script lang="ts">
    import __airports from "$lib/data/airports.json"
    import type { Airport } from "$lib/interfaces";

    const airports: Airport[] = __airports
    export let placeholder: string;
    export let selectedAirport: Airport = {
        id: "",
        name: "",
        continent: "",
        municipality: "",
        iata_code: "",
    };
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
        )).slice(0, 8)
    }

    const navigateList = (e: KeyboardEvent) => {
        if (possibleAirports.length < 1) return;
        if (e.key === "ArrowDown" || e.key === "Tab") {
            e.preventDefault()
            highlightedIndex === possibleAirports.length - 1 ? highlightedIndex = 0 : highlightedIndex += 1;
        } else if (e.key === "ArrowUp" && highlightedIndex !== -1) {
            highlightedIndex === 0 ? highlightedIndex = possibleAirports.length - 1 : highlightedIndex -= 1;
        } else if (e.key === "Enter") {
            selectedAirport = possibleAirports[highlightedIndex];
            inputValue = selectedAirport.name;
            possibleAirports = [];
        } else if (e.key === "Escape") {
            inputValue = "";
            selectedAirport = {
                id: "",
                name: "",
                continent: "",
                municipality: "",
                iata_code: "",
            };
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
        placeholder={placeholder}
        class='w-64 text-xl !outline-none duration-100 ease-in-out whitespace-nowrap overflow-ellipsis focus:border-b-2 focus:border-fo-magenta lg:text-center'
    />
    {#if possibleAirports.length > 0}
        <ul class="absolute w-full top-full bg-white rounded-b-lg z-20">
            {#each possibleAirports as pa, i}
                <li class={`px-2 py-4 border-b-2 border-gray-200 last:border-b-0 ${i === highlightedIndex ? "bg-fo-blue text-white" : ""}`}>
                    {pa.name} ({pa.iata_code})
                </li>
            {/each}
        </ul>
    {/if}
</div>
