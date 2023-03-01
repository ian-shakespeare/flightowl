<script lang='ts'>
    import Logo from '$lib/components/UI/Logo.svelte'
    import type { Account } from '$lib/interfaces'

    export let account: Account | null
</script>

<nav class='w-full flex items-center justify-between px-8 py-4 lg:px-12'>
    <a href='/' class='flex items-center gap-2'>
        <span class='inline-block relative w-16 h-16'>
            <Logo />
        </span>
        <span class='hidden text-3xl md:inline'>
            FlightOwl
        </span>
    </a>
    {#if account === null}
        <a href='/login' class='fo-hyperlink'>
            Login
        </a>
    {:else}
        <button on:click={() => {}} class='peer bg-fo-gradient text-white text-2xl uppercase w-12 h-12 rounded-full'>
            {account.firstName[0] + account.lastName[0]}
        </button>
        <div class='grid content-start gap-4 fixed w-4/5 inset-y-0 -right-full bg-white h-full shadow-2xl p-8 z-50 duration-300 ease-in-out hover:right-0 peer-focus:right-0 lg:w-1/5'>
            <h4 class='text-3xl'>
                {account.firstName} {account.lastName}
            </h4>
            <hr class='my-4'>
            <a href='/account/saved' class='text-2xl text-fo-magenta hover:underline'>
                Saved Flights
            </a>
            <a href='/account' class='text-2xl text-fo-magenta hover:underline'>
                Account
            </a>
            <hr class='my-4'>
            <button class='text-2xl text-left self-end hover:underline' on:click={() => alert('Not Implemented')}>
                Log Out
            </button>
        </div>
    {/if}
</nav>