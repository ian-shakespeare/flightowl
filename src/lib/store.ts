import { writable } from 'svelte/store'

export type User = {
    email?: string
}

const createBoolStore = (key: string, startValue: User) => {
    const { subscribe, set } = writable(startValue)

    return {
        subscribe,
        set,
        useLocalStorage: () => {
            const storedValue: User = JSON.parse(localStorage.getItem(key) ?? '{}')
            if (storedValue) {
                set(storedValue)
            }
            subscribe(value => {
                localStorage.setItem(key, JSON.stringify(value))
            })
        }
    }
}

export const auth = createBoolStore('isSignedIn', {})
