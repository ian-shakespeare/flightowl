<script lang='ts'>
    import AirportInput from '$lib/components/AirportInput.svelte'
    import ColorPalette from '$lib/components/ColorPalette.svelte'
    import Login from '$lib/components/Login.svelte'
    import { loggedIn } from '$lib/stores'
</script>

<ColorPalette />
<!-- <h1 class='block bg-purple-500'>Welcome to FlightOwl</h1>
<AirportInput placeholder='Where do you want to fly?' />
<AirportInput placeholder='Where are you flying from?' /> -->
<!-- {#if !loggedIn} -->
    <Login />
<!-- {:else}
    <div>You are logged in</div>
{/if} -->
