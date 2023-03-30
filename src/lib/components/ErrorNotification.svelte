<script lang="ts">
    import Box from "$lib/components/UI/Box.svelte";
    import customErrors from "$lib/data/customErrors.json"

    type ErrorDetails = {
        message: string;
        redirectUrl: string;
        redirectText: string;
    }

    const errors: Record<string, ErrorDetails> = customErrors;

    export let errorType: string | undefined = undefined;
</script>

{#if errorType}
    <Box>
        <div class='text-lg text-center lg:text-xl'>
            {errors[errorType].message}
            <a href={errors[errorType].redirectUrl} class='fo-hyperlink'>
                {errors[errorType].redirectText}
            </a>
        </div>
    </Box>
{/if}
