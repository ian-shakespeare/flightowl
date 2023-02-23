<script lang='ts'>
    export let date: string
</script>

<input
    bind:value={date}
    placeholder='Date (mm/dd/yyyy)'
    class='text-center text-xl !outline-none duration-100 ease-in-out focus:border-b-2 focus:border-fo-magenta'
/>
