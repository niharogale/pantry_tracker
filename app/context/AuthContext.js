import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { auth } from "@/firebase";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }

    const logOut = async () => {
        setLoading(true)
        try {
            await signOut(auth)
        } catch(error) {
            console.log("Logout error: ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={{user, googleSignIn, logOut, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}