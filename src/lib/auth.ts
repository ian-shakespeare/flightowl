import axios from 'axios'
import { PUBLIC_API_URL } from '$env/static/public'
import { isLoggedIn } from '$lib/store'

type Response = 'success' | 'failure' | 'error'

const headers = {
    withCredentials: true
}

export const login = async (email: string, password: string) => {
    const status: Response = await axios.post(
        PUBLIC_API_URL + '/sessions',
        {
            'email': email,
            'password': password
        },
        headers
    )
    .then(res => {
        if (res.status === 201) return 'success'
        else return 'failure'
    })
    .catch(err => {
        return 'error'
    })
    if (status === 'success') isLoggedIn.set(true)
    else console.error('error connecting to api')
}
