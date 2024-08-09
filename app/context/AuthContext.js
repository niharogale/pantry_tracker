import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { auth } from "@/firebase";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth, provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    const handleRedirectResult = async () => {
        try {
            const result = await getRedirectResult(auth)
            if (result.user && result) {
                setUser(result.user)
            }
        } catch (error) {
            console.error('Error handling redirect result:', error)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        handleRedirectResult()

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{user, googleSignIn, logOut}}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}