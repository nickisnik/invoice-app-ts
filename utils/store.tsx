import create from 'zustand'

export type AuthDetails = {
    name: string,
    email: string,
    photoURL: string,
    id: string,
    loggedIn: boolean,
    anonymous: boolean
}

export const useStore = create<any>((set : any) => ({
    authDetails: {
        name: "example",
        email: "",
        photoURL: "",
        id: "",
        loggedIn: false
    },
    setAuthDetails: (details : AuthDetails) => set(() => ({authDetails: details})),
    selectedBusiness : {
        id: "",
        name: ""
    },
    setSelectedBusiness : (name : string) => set(() => ({selectedBusiness: name})),
    loading: true,
    setLoading: (status : boolean) => set(() => ({loading: status}))
}))
