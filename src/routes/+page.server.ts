import type { Actions } from './$types'
import { fail } from '@sveltejs/kit'
import { API_URL } from '$env/static/private'
import axios from 'axios'
import { loggedIn } from '$lib/stores'

export const actions = {
    login: async ({ cookies, request}) => {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')

        if (email === null || password === null) {
            return fail(400, { invalid: true })
        }
        await axios.post(
            API_URL + '/sessions',
            { 'email': email, 'password': password }
        )
        .then((res) => {
            res.headers['set-cookie']!.map(kv => {
                const [key, value] = kv.split('=')
                cookies.set(key, value)
            })
        })
        .catch((error) => {
            console.error(error)
        })
        loggedIn.set(true)
        return { success: true }
    }
} satisfies Actions
