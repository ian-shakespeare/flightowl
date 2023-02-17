<script lang='ts'>
    import Login from '$lib/components/Login.svelte'
    import Box from '$lib/components/UI/Box.svelte'
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

{#if !isSignedIn}
    <Login />
{:else}
    <Box>
        You are logged in
        <a href='/' class='fo-hyperlink'>
            Begin Searching
        </a>
    </Box>
{/if}
