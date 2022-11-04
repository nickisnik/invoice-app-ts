import create from 'zustand'

export type AuthDetails = {
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
    setAuthDetails: (details : AuthDetails) => set(() => ({authDetails: details})) 
}))
