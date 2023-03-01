<script lang='ts'>
    import ColorPalette from '$lib/components/ColorPalette.svelte'
    import SearchBar from '$lib/components/SearchBar.svelte'
    import type { LayoutData } from './$types'

    export let data: LayoutData
</script>

<h1 class='text-4xl text-center pt-64 pb-8'>
    {#if data.account === null}
        Where to, Chief
    {:else}
        Where to, {data.account.firstName}
    {/if}
</h1>
<SearchBar />
<!-- <ColorPalette /> -->
