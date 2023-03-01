<script lang='ts'>
    import Login from '$lib/components/Login.svelte'
    import Box from '$lib/components/UI/Box.svelte'
    import type { LayoutData } from '../$types';

    export let data: LayoutData
</script>

{#if data.account === null}
    <Login />
{:else}
    <Box>
        You are logged in
        <a href='/' class='fo-hyperlink'>
            Begin Searching
        </a>
    </Box>
{/if}
