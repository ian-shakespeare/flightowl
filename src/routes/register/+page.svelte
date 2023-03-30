<script lang='ts'>
    import Box from '$lib/components/UI/Box.svelte'
    import type { LayoutData } from '../$types'
    import type { ActionData } from './$types';
    import { browser } from '$app/environment';
    import ErrorNotification from '$lib/components/ErrorNotification.svelte';

    export let data: LayoutData
    export let form: ActionData

    let firstName = ''
    let lastName = ''
    let email = ''
    let password = ''
    let passwordConfirm = ''

    if (form?.success && browser) {
        document.cookie = `jwt=${form.token}`
    }
</script>

<svelte:head>
    <title>
        Register - FlightOwl
    </title>
    <meta name='description' content='Make an account to gain full access to FlightOwl'>
</svelte:head>

{#if data.account !== null || form?.success}
    <ErrorNotification errorType="alreadyAuthed" />
{:else}
    <Box>
        <h2 class='text-3xl justify-self-center'>
            Create An Account
        </h2>
        <form method="POST" class="grid gap-4">
            <div class='grid gap-4 lg:grid-cols-2'>
                <label for='fname' class='grid gap-2'>
                    <span class='after:content-["*"] after:text-fo-pink after:ml-0.5'>
                        First Name
                    </span>
                    <input
                        bind:value={firstName}
                        type='text'
                        name='fname'
                        placeholder="What's your first name?"
                        class='border-2 border-gray-100 p-4 rounded-lg ring-fo-magenta'
                    />
                </label>
                <label for='lname' class='grid gap-2'>
                    <span class='after:content-["*"] after:text-fo-pink after:ml-0.5'>
                        Last Name
                    </span>
                    <input
                        bind:value={lastName}
                        type='text'
                        name='lname'
                        placeholder="What's your last name?"
                        class='border-2 border-gray-100 p-4 rounded-lg ring-fo-magenta'
                    />
                </label>
            </div>
            <label for='email' class='grid gap-2'>
                <span class='after:content-["*"] after:text-fo-pink after:ml-0.5'>
                    Email
                </span>
                <input
                    bind:value={email}
                    type='email'
                    name='email'
                    placeholder="What's your email?"
                    class='border-2 border-gray-100 p-4 rounded-lg ring-fo-magenta'
                />
            </label>
            <label for='password' class='grid gap-2'>
                <span class='after:content-["*"] after:text-fo-pink after:ml-0.5'>
                    Password
                </span>
                <input
                    bind:value={password}
                    type='password'
                    name='password'
                    placeholder="Enter a password"
                    class='border-2 border-gray-100 p-4 rounded-lg ring-fo-magenta'
                />
            </label>
            <label for='password-confirm' class='grid gap-2'>
                <span class='after:content-["*"] after:text-fo-pink after:ml-0.5'>
                    Confirm Password
                </span>
                <input
                    bind:value={passwordConfirm}
                    type='password'
                    name='password-confirm'
                    placeholder="Enter your password again"
                    class='border-2 border-gray-100 p-4 rounded-lg ring-fo-magenta'
                />
            </label>
            <div class='flex items-center justify-between'>
                <a href='/register' class='fo-hyperlink'>
                    Log In to Existing Account
                </a>
                <input type="submit" value="Create" class='fo-btn' />
            </div>
        </form>
    </Box>
{/if}
