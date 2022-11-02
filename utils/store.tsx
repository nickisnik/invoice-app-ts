import create from 'zustand'

export type UserDetails = {
    name: string,
    email: string,
    photoURL: string,
    id: string,
    loggedIn: boolean
}

export const useStore = create<any>((set : any) => ({
    authDetails: {
        name: "example",
        email: "",
        photoURL: "",
        id: "",
        loggedIn: false
    },
    setAuthDetails: (details : UserDetails) => set(() => ({authDetails: details})) 
}))
