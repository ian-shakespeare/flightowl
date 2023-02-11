<script lang='ts'>
</script>

<form action='?/login' method='POST' class='grid border-2 border-gray-100 w-[32rem] p-8 gap-4 shadow-lg rounded-lg'>
    <h2 class='text-3xl justify-self-center'>
        Existing User Log in
    </h2>
    <label for='email' class='grid'>
        Email
        <input
            id='email'
            type='email'
            placeholder="What's your email?"
            class='border-2 border-gray-100 p-4 rounded-lg'
        />
    </label>
    <label for='password' class='grid'>
        Password
        <input
            id='password'
            type='password'
            placeholder="What's your password?"
            class='border-2 border-gray-100 p-4 rounded-lg'
        />
    </label>
    <div class='flex items-center justify-between'>
        <a href='/' class='fo-hyperlink'>
            Create an Account
        </a>
        <input type='submit' value='Log In' class='fo-btn cursor-pointer' />
    </div>
</form>