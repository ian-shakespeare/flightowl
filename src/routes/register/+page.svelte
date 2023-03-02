<script lang='ts'>
    import Box from '$lib/components/UI/Box.svelte'
    import { register } from '$lib/api'
    import type { LayoutData } from '../$types'
    import { PUBLIC_ACCOUNT_CREATION_DISABLED } from '$env/static/public'

    export let data: LayoutData

    let firstName = ''
    let lastName = ''
    let email = ''
    let password = ''
    let sex = 'unselected'
</script>

<svelte:head>
    <title>
        Register - FlightOwl
    </title>
</svelte:head>

<Box>
    {#if data.account !== null}
        <div class='text-lg text-center lg:text-xl'>
            You are logged in,
            <a href='/' class='fo-hyperlink'>
                Begin Searching
            </a>
        </div>
    {:else if PUBLIC_ACCOUNT_CREATION_DISABLED}
        <div class='text-lg text-center lg:text-xl'>
            Sorry, but account creation is disabled. If you have an account, 
            <a href='/login' class='fo-hyperlink'>
                sign in here
            </a>
        </div>
    {:else}
        <h2 class='text-3xl justify-self-center'>
            Create An Account
        </h2>
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
                placeholder="What's your password?"
                class='border-2 border-gray-100 p-4 rounded-lg ring-fo-magenta'
            />
        </label>
        <div class='flex items-center justify-between'>
            <a href='/register' class='fo-hyperlink'>
                Log In to Existing Account
            </a>
            <button on:click={() => register(firstName, lastName, email, password, sex)} class='fo-btn'>
                Create
            </button>
        </div>
    {/if}
</Box>
