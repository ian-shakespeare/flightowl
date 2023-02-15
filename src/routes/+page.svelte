<script lang='ts'>
    import AirportInput from '$lib/components/AirportInput.svelte'
    import ColorPalette from '$lib/components/ColorPalette.svelte'
    import Login from '$lib/components/Login.svelte'
    import { auth } from '$lib/store'
    import { getUsers } from '$lib/api'
    import { browser } from '$app/environment'

    if (browser) {
        auth.useLocalStorage()
    }

    let isSignedIn: boolean
    auth.subscribe(value => {
        isSignedIn = value
    })
</script>

<ColorPalette />
<!-- <h1 class='block bg-purple-500'>Welcome to FlightOwl</h1>
<AirportInput placeholder='Where do you want to fly?' />
<AirportInput placeholder='Where are you flying from?' /> -->
{#if !isSignedIn}
    <Login />
{:else}
    <div>You are logged in</div>
    <button on:click={() => getUsers()}>
        Get Users
    </button>
    <button on:click={() => auth.set(false)} class='fo-btn'>
        Logout
    </button>
{/if}
