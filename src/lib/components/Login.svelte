<script lang='ts'>
</script>

<form action='?/login' method='POST' class='grid border-2 border-gray-100 w-[32rem] p-8 gap-4 shadow-lg rounded-lg'>
    <h2 class='text-3xl justify-self-center'>
        Log In to Start Searching
    </h2>
    <label for='email' class='grid gap-2'>
        <span class='after:content-["*"] after:text-fo-pink after:ml-0.5'>
            Email
        </span>
        <input
            name='email'
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
            name='password'
            type='password'
            placeholder="What's your password?"
            class='border-2 border-gray-100 p-4 rounded-lg ring-fo-magenta'
        />
    </label>
    <div class='flex items-center justify-between'>
        <a href='/' class='fo-hyperlink'>
            Create an Account
        </a>
        <input type='submit' value='Log In' class='fo-btn cursor-pointer' />
    </div>
</form>