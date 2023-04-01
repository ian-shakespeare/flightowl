<script lang='ts'>
    export let styling: string | undefined = undefined
</script>

<div class={`grid bg-white border-2 border-gray-100 px-8 mb-8 py-6 gap-4 shadow-lg rounded-lg duration-200 ease-in-out hover:shadow-xl ${styling ?? ''}`}>
    <slot />
</div>