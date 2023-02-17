<script lang='ts'>
    import AirportInput from "$lib/components/AirportInput.svelte"
    import DateInput from "$lib/components/DateInput.svelte"
    import IconFilled from "$lib/components/UI/IconFilled.svelte";
    import Icon from "$lib/components/UI/Icon.svelte"
</script>

<div class='flex  px-6 py-4 border-2 border-gray-100 rounded-full items-center w-max'>
    <AirportInput placeholder='Where are you flying from?' />
    <Icon name='fa-solid fa-plane-departure' />
    <AirportInput placeholder='Where are you flying to?' />
    <Icon name='fa-solid fa-plane-departure' />
    <DateInput />
    <IconFilled name='fa-solid fa-magnifying-glass fa-1x' />
</div>
