<script lang='ts'>
    import Logo from '$lib/components/UI/Logo.svelte'
    import { auth, type User } from '$lib/store'
    import { browser } from '$app/environment'
    import { logout } from '$lib/api'

    if (browser) {
        auth.useLocalStorage()
    }

    let activeSignIn: User
    auth.subscribe(value => {
        activeSignIn = value
    })
</script>

<nav class='w-full flex items-center justify-between px-12 py-4'>
    <a href='/' class='flex items-center gap-2'>
        <span class='inline-block relative w-16 h-16'>
            <Logo />
        </span>
        <span class='text-3xl'>
            FlightOwl
        </span>
    </a>
    {#if activeSignIn.email}
        <button on:click={() => {}} class='peer bg-fo-gradient text-white text-2xl uppercase w-12 h-12 rounded-full'>
            {activeSignIn.email[0]}
        </button>
        <div class='flex flex-col justify-between fixed w-1/5 inset-y-0 -right-full bg-white h-full shadow-2xl p-8 z-50 duration-300 ease-in-out hover:right-0 peer-focus:right-0'>
            <section class='grid gap-4'>
                <h4 class='text-3xl'>
                    {activeSignIn.email}
                </h4>
                <a href='/account' class='text-2xl text-fo-magenta hover:underline'>
                    Account
                </a>
            </section>
            <button class='fo-hyperlink' on:click={() => logout()}>
                Log Out
            </button>
        </div>
    {:else}
        <a href='/login' class='fo-hyperlink'>
            Login
        </a>
    {/if}
</nav>