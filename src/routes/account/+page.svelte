<script lang='ts'>
    import carriers from '$lib/data/carriers.json'
    import type { PageData } from './$types'
    import Box from '$lib/components/UI/Box.svelte'

    export let data: PageData
</script>

<svelte:head>
    <title>
        Your Account - FlightOwl
    </title>
</svelte:head>

{#if data.account === null}
    <div class='text-lg text-center lg:text-xl'>
        You aren't signed in.
        <a href='/login' class='fo-hyperlink'>
            Sign in here
        </a>
    </div>
{:else}
    <Box styling='lg:gap-12'>
        <h1 class='text-3xl text-center lg:text-5xl'>
            Welcome back, {data.account.firstName}
        </h1>
        <table class='w-full text-lg text-gray-400 lg:w-80 lg:mx-auto lg:text-2xl'>
            <tbody class='grid gap-4 lg:gap-6'>
                <tr class='grid grid-flow-col lg:grid-cols-2'>
                    <td class='whitespace-nowrap'>
                        Email:
                    </td>
                    <td class='text-right text-fo-magenta whitespace-nowrap lg:text-left'>
                        {data.account.email}
                    </td>
                </tr>
                <tr class='grid grid-flow-col lg:grid-cols-2'>
                    <td class='whitespace-nowrap'>
                        Joined:
                    </td>
                    <td class='text-right text-fo-purple whitespace-nowrap lg:text-left'>
                        {new Date(data.account.dateJoined).toDateString().replace(' ', ', ')}
                    </td>
                </tr>
            </tbody>
        </table>
        <a href='/account/saved' class='fo-btn lg:w-80 lg:mx-auto'>
            View Saved Flights
        </a>
    </Box>
{/if}
