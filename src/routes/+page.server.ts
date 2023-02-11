import type { Actions } from './$types'
import { API_URL } from '$env/static/private'
import axios from 'axios'

export const actions = {
    login: async ({ cookies, request}) => {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')

        if (email === null || password === null) {
            return
        }

        console.log("AUTHENTICATING")

        axios.post(
            API_URL + '/sessions',
            { 'email': email, 'password': password }
        )
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.error(error)
        })
    }
} satisfies Actions