import axios from 'axios'
import { PUBLIC_API_URL } from '$env/static/public'
import { auth } from '$lib/store'

export const login = async (email: string, password: string) => {
    const res = await axios.post(
        PUBLIC_API_URL + '/sessions',
        {
            'email': email,
            'password': password
        },
        { withCredentials: true }
    )
    .then(res => {
        return res
    })
    .catch(err => {
        console.error(err)
        return null
    })

    if (res === null) return

    switch (res.status) {
        case 201:
            auth.set({ email: email })
            break
        default:
            console.error(res.status)
            break
    }
}
