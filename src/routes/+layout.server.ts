import { PUBLIC_API_URL } from '$env/static/public'
import type { LayoutServerLoad } from './$types'
import axios from 'axios'

export const load = (async ({ cookies }) => {
    const sid = cookies.get('sessionId')
    if (sid === undefined) return { account: null }

    const res = await axios.request({
        method: 'GET',
        url: PUBLIC_API_URL + '/user',
        headers: {
            Cookie: `sessionId=${sid}`
        }
    })
    .then(res => res)
    .catch(err => console.error(err))

    if (res === undefined) return { account: null }

    switch (res.status) {
        case 200:
            return { account: res.data }
        default:
            return { account: null }
    }
}) satisfies LayoutServerLoad

export const ssr = true
