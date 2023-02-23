<script lang='ts'>
    import Login from '$lib/components/Login.svelte'
    import Box from '$lib/components/UI/Box.svelte'
    import { auth, type User } from '$lib/store'
    import { browser } from '$app/environment'

    if (browser) {
        auth.useLocalStorage()
    }

    let activeSignIn: User
    auth.subscribe(value => {
        activeSignIn = value
    })
</script>

{#if !activeSignIn.email}
    <Login />
{:else}
    <Box>
        You are logged in
        <a href='/' class='fo-hyperlink'>
            Begin Searching
        </a>
    </Box>
{/if}
