<script lang='ts'>
    import '../app.css'
    import Column from '$lib/components/UI/Column.svelte'
    import Nav from '$lib/components/Nav.svelte'
</script>

<Nav />
<Column>
    <slot />
</Column>
