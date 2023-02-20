<script lang='ts'>
    import AirportInput from "$lib/components/AirportInput.svelte"
    import DateInput from "$lib/components/DateInput.svelte"
    import IconFilled from "$lib/components/UI/IconFilled.svelte"
    import Icon from "$lib/components/UI/Icon.svelte"
    import { getContext, setContext } from "svelte"

    const getRedirectLink = (): string => {
        return `/flights?origin=LAX&destination=JFK&date=2023-06-06`
    }

</script>

<div class='flex px-4 py-2 border-2 border-gray-100 rounded-full items-center w-max shadow-lg'>
    <AirportInput id='origin' placeholder='Where are you flying from?' />
    <Icon name='fa-solid fa-plane-departure' />
    <AirportInput id='destination' placeholder='Where are you flying to?' />
    <Icon name='fa-solid fa-plane-departure' />
    <DateInput />
    <a href={getRedirectLink()}>
        <IconFilled name='fa-solid fa-magnifying-glass fa-1x' />
    </a>
</div>
