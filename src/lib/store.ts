import { writable } from 'svelte/store'

const createBoolStore = (key: string, startValue: boolean) => {
    const { subscribe, set } = writable(startValue)

    return {
        subscribe,
        set,
        useLocalStorage: () => {
            const storedValue = localStorage.getItem(key) === 'true'
            if (storedValue) {
                set(storedValue)
            }
            subscribe(value => {
                localStorage.setItem(key, value ? 'true' : '')
            })
        }
    }
}

export const auth = createBoolStore('isSignedIn', false)
