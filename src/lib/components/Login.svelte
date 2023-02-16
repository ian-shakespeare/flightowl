<script lang='ts'>
    import { login } from '$lib/api/auth'
    import { fade } from 'svelte/transition'

    let email = ''
    let password = ''
</script>

<form transition:fade='{{ duration: 100 }}' class='grid border-2 border-gray-100 w-[32rem] p-8 gap-4 shadow-lg rounded-lg'>
    <h2 class='text-3xl justify-self-center'>
        Log In to Start Searching
    </h2>
    <label for='email' class='grid gap-2'>
        <span class='after:content-["*"] after:text-fo-pink after:ml-0.5'>
            Email
        </span>
        <input
            bind:value={email}
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
            bind:value={password}
            type='password'
            placeholder="What's your password?"
            class='border-2 border-gray-100 p-4 rounded-lg ring-fo-magenta'
        />
    </label>
    <div class='flex items-center justify-between'>
        <a href='/' class='fo-hyperlink'>
            Create an Account
        </a>
        <button on:click={() => login(email, password)} class='fo-btn'>
            Log In
        </button>
    </div>
</form>
