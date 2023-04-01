<script lang='ts'>
    import { browser } from '$app/environment';
    import ErrorNotification from '$lib/components/ErrorNotification.svelte';
    import Box from '$lib/components/UI/Box.svelte'
    import type { LayoutData } from '../$types';
    import type { ActionData } from './$types';

    export let data: LayoutData;
    export let form: ActionData;

    if (form?.success && browser) {
        document.cookie = `jwt=${form.token}`
    }
</script>

<svelte:head>
    <title>
        Log In - FlightOwl
    </title>
    <meta name='description' content='Log in to access everything FlightOwl has to offer'>
</svelte:head>

{#if data.account !== null || form?.success}
    <ErrorNotification errorType="alreadyAuthed" />
{:else}
    <Box styling="max-w-md mx-auto">
        <h2 class='text-3xl justify-self-center'>
            Log In to Start Searching
        </h2>
        <form method="POST" action="?/login" class="grid gap-4">
            <label for='email' class='grid gap-2'>
                <span class='after:content-["*"] after:text-fo-pink after:ml-0.5'>
                    Email
                </span>
                <input
                    name="email"
                    type='email'
                    placeholder="What's your email?"
                    class='border-2 border-gray-100 p-4 rounded-lg ring-fo-magenta'
                />
            </label>
            <label for='password' class='grid gap-2'>
                <span class='after:content-["*"] after:text-fo-pink after:ml-0.5'>
                    Password
                </span>
                <input
                    name="password"
                    type='password'
                    placeholder="What's your password?"
                    class='border-2 border-gray-100 p-4 rounded-lg ring-fo-magenta'
                />
            </label>
            <div class='flex items-center justify-between'>
                <a href='/register' class='fo-hyperlink'>
                    Create an Account
                </a>
                <input type="submit" class="fo-btn" value="Log In" />
            </div>
        </form>
    </Box>
{/if}
