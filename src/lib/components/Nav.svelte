<script lang='ts'>
    import { auth } from '$lib/store'
    import { browser } from '$app/environment'

    if (browser) {
        auth.useLocalStorage()
    }

    let isSignedIn: boolean
    auth.subscribe(value => {
        isSignedIn = value
    })
</script>

<nav class='w-full h-16 flex items-center justify-end px-12'>
    {#if isSignedIn}
        <button on:click={() => auth.set(false)} class='fo-hyperlink'>
            Logout
        </button>
    {:else}
        <a href='/login' class='fo-btn'>
            Login
        </a>
    {/if}
</nav>