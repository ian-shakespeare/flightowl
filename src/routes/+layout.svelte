<script lang='ts'>
    import '../app.css'
    import BackgroundImage from '$lib/assets/flightowl_background.jpg'
    import Column from '$lib/components/UI/Column.svelte'
    import Nav from '$lib/components/Nav.svelte'
    import type { LayoutData } from './$types'

    export let data: LayoutData
</script>

<Nav account={data.account} />
<div aria-hidden="true" class="fixed inset-0 w-full h-full bg-[#f0f0fa] -z-20">
    <img src={BackgroundImage} alt='cloud background' class='absolute w-full h-1/2 inset-x-0 bottom-0 -z-10 object-cover object-bottom rotate-180' />
</div>
<Column>
    <slot />
</Column>
