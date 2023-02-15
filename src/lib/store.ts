import { writable } from 'svelte/store'

const createAuthStore = (key: string, startValue: boolean) => {
    const { subscribe, set } = writable(startValue)

    return {
        subscribe,
        set,
        useLocalStorage: () => {
            const storedIsSignedIn = localStorage.getItem('isSignedIn') === 'true'
            if (storedIsSignedIn) {
                set(storedIsSignedIn)
            }
            subscribe(value => {
                localStorage.setItem('isSignedIn', value ? 'true' : '')
            })
        }
    }
}

export const auth = createAuthStore('auth', false)
