import type { PageServerLoad } from './$types'
import { PUBLIC_API_URL } from '$env/static/public'
import axios from 'axios'

export const load = (async ({ cookies, url }) => {
    const sid = cookies.get('sessionId')
    if (sid === undefined) return { account: null }

    const body = {
        'originLocationCode': url.searchParams.get('origin'),
        'destinationLocationCode': url.searchParams.get('destination'),
        'departureDate': url.searchParams.get('date'),
        'adults': 1
    }
    const res = await axios.request({
        method: 'GET',
        url: PUBLIC_API_URL + '/flights',
        headers: {
            Cookie: `sessionId=${sid};`
        },
        data: body
    })
    .then(res => res)
    .catch(err => console.error(err))

    if (res === undefined) return { account: null }

    switch (res.status) {
        case 200:
            return {
                flights: res.data,
            }
        case 401:
            return {
                account: null
            }
    }
}) satisfies PageServerLoad

export const ssr = true
