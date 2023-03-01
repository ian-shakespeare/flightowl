<script lang='ts'>
    import '../app.css'
    import Column from '$lib/components/UI/Column.svelte'
    import Nav from '$lib/components/Nav.svelte'
    import type { LayoutData } from './$types'

    export let data: LayoutData
</script>

<Nav account={data.account} />
<Column>
    <slot />
</Column>
