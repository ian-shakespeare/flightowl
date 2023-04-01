<script lang='ts'>
    import type { LayoutData } from '../$types'
    import Box from '$lib/components/UI/Box.svelte'
    import ErrorNotification from '$lib/components/ErrorNotification.svelte';

    export let data: LayoutData
</script>

<svelte:head>
    <title>
        Your Account - FlightOwl
    </title>
    <meta name='description' content='View your FlightOwl account information'>
</svelte:head>

{#if data.account === null}
    <ErrorNotification errorType={"unauthorized"} />
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
