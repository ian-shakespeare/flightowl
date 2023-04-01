<script lang='ts'>
    import Box from '$lib/components/UI/Box.svelte'
    import type { ActionData, PageData } from './$types';
    import { browser } from '$app/environment';
    import ErrorNotification from '$lib/components/ErrorNotification.svelte';

    export let data: PageData
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
{:else if form?.registrationDisabled || data.registrationDisabled}
    <ErrorNotification errorType="registrationDisabled" />
{:else}
    <Box>
        {#if form?.missing}
            <h2 class='text-3xl justify-self-center text-red-500'>
                Please fill out all fields
            </h2>
        {:else if form?.incorrect}
            <h2 class='text-3xl justify-self-center text-red-500'>
                Your passwords do not match
            </h2>
        {:else}
            <h2 class='text-3xl justify-self-center'>
                Create An Account
            </h2>
        {/if}
        <form method="POST" class="grid gap-4">
            <div class='grid gap-4 lg:grid-cols-2'>
                <label for='fname' class='grid gap-2'>
                    <span class='after:content-["*"] after:text-fo-pink after:ml-0.5'>
                        First Name
                    </span>
                    <input
                        bind:value={firstName}
                        required
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
                        required
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
                    required
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
                    required
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
                    required
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
