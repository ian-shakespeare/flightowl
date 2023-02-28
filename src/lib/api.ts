import axios from 'axios'
import { PUBLIC_API_URL } from '$env/static/public'
import { auth, type User } from '$lib/store'
import { browser } from '$app/environment'
import type { FlightOffer } from '$lib/interfaces'

let activeSignIn: User
auth.subscribe(value => {
    activeSignIn = value
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
            auth.set({})
            alert('please log in again')
            break
        default:
            console.error(res.status)
            break
    }
}

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
        const body: Record<string, string> = res.data
        if (res.status == 200 && browser) {
            document.cookie = `sessionId=${body['sessionId']}; Secure; SameSite=None`
        }
        return res
    })
    .catch(err => {
        console.error(err)
        return null
    })

    if (res === null) return

    switch (res.status) {
        case 200:
            auth.set({ email: email })
            break
        case 401:
            auth.set({})
            break
        default:
            console.error(res.status)
            break
    }
}

export const logout = () => {
    auth.set({})
}

export const saveFlight = async (flightBody: FlightOffer) => {
    const res = await axios.post(
        PUBLIC_API_URL + '/flights',
        { data: flightBody },
        { headers: {'Content-Type': 'application/json'}, withCredentials: true }
    )

    if (res === null) return

    switch(res.status) {
        case 201:
            console.log('flight saved')
            break
        default:
            console.log(res)
    }
}
