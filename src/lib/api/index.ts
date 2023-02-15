import axios from 'axios'
import { PUBLIC_API_URL } from '$env/static/public'
import { auth } from '$lib/store'

let isSignedIn: boolean
auth.subscribe(value => {
    isSignedIn = value
})

export const getUsers = async () => {
    const res = await axios.get(
        PUBLIC_API_URL + '/users',
        { withCredentials: true }
    )
    .then(res => {
        return res
    })
    .catch(err => {
        return null
    })

    if (res === null) return

    switch (res.status) {
        case 200:
            console.log('success!')
            break
        case 401:
            auth.set(false)
            alert('please log in again')
            break
        default:
            console.error(res.status)
            break
    }
}
