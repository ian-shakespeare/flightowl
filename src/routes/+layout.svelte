<script lang='ts'>
    import '../app.css'
    import BackgroundImage from '$lib/assets/flightowl_background.jpg'
    import Column from '$lib/components/UI/Column.svelte'
    import Logo from '$lib/components/UI/Logo.svelte'
    import Icon from '$lib/components/UI/Icon.svelte';
    import type { LayoutData } from './$types'

    export let data: LayoutData
</script>

<nav class='w-full flex items-center justify-between px-8 py-4 lg:px-12'>
    <a href='/' class='px-2 flex items-center gap-2 rounded-full duration-200 ease-in-out hover:shadow-lg'>
        <span class='inline-block relative w-16 h-16'>
            <Logo />
        </span>
        <span class='hidden text-3xl md:inline'>
            FlightOwl
        </span>
    </a>
    {#if data.account === null}
        <a title='Log In' href='/login' class='rounded-full duration-200 ease-in-out hover:shadow-lg'>
            <Icon name="fa-solid fa-right-to-bracket fa-2x" />
        </a>
    {:else}
        <button on:click={() => {}} class='peer bg-fo-gradient text-white text-2xl uppercase w-12 h-12 rounded-full'>
            {data.account.firstName[0] + data.account.lastName[0]}
        </button>
        <div class='grid grid-rows-[auto_1fr_auto] gap-4 fixed w-4/5 inset-y-0 -right-full bg-white h-full shadow-2xl p-8 z-50 duration-300 ease-in-out hover:right-0 peer-focus:right-0 lg:w-1/5'>
            <h4 class='text-3xl'>
                {data.account.firstName} {data.account.lastName}
            </h4>
            <div class="grid content-start gap-4">
                <hr class='my-4'>
                <a href='/account/saved' class='text-2xl text-fo-magenta hover:underline'>
                    Saved Flights
                </a>
                <a href='/account' class='text-2xl text-fo-magenta hover:underline'>
                    Account
                </a>
                <hr class='my-4'>
            </div>
            <form action="/login?/logout" method="POST">
                <input type="submit" value="Log Out" class='text-2xl text-left self-end hover:underline' />
            </form>
        </div>
    {/if}
</nav>
<div aria-hidden="true" class="fixed inset-0 w-full h-full bg-[#f0f0fa] -z-20">
    <img src={BackgroundImage} alt='cloud background' class='absolute w-full h-1/2 inset-x-0 bottom-0 -z-10 object-cover object-bottom rotate-180' />
</div>
<Column>
    <slot />
</Column>
