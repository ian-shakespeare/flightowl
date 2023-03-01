<script lang='ts'>
    export let styling: string | undefined = undefined
</script>

<div class={`grid border-2 border-gray-100 px-8 py-6 gap-4 shadow-lg rounded-lg ${styling ?? ''}`}>
    <slot />
</div>