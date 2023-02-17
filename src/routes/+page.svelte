<script lang='ts'>
    import BoundingBox from '$lib/components/UI/BoundingBox.svelte'
    import AirportInput from '$lib/components/AirportInput.svelte'
    import ColorPalette from '$lib/components/ColorPalette.svelte'
    import Login from '$lib/components/Login.svelte'
    import { auth } from '$lib/store'
    import { getUsers } from '$lib/api'
    import { browser } from '$app/environment'
    import { fade } from 'svelte/transition'

    if (browser) {
        auth.useLocalStorage()
    }

    let isSignedIn: boolean
    auth.subscribe(value => {
        isSignedIn = value
    })
</script>

<ColorPalette />
<BoundingBox>
    {#if !isSignedIn}
        <Login />
    {:else}
        <div transition:fade='{{ delay: 100 }}'>
            You are logged in
            <button on:click={() => getUsers()}>
                Get Users
            </button>
            <button on:click={() => auth.set(false)} class='fo-btn'>
                Logout
            </button>
        </div>
    {/if}
</BoundingBox>
