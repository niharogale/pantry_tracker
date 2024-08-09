import React, { useEffect, useState } from 'react'
import { Box,List,ListItem,Link } from '@mui/material'
import { UserAuth } from '../context/AuthContext'
import { resolve } from 'styled-jsx/css';

const Navbar = () => {
    const {user, googleSignIn, logOut} = UserAuth();
    const [loading, setLoading] = useState(true)

    const handleSignIn = async () => {
        try {
            await googleSignIn()
        } catch(error) {
            console.log("Sign in Error: " + error)
        }
    }

    const handleSignOut = async () => {
        try {
            await logOut()
        } catch(error) {
            console.log("Logout Error: " + error)
        }
    }

    useEffect(()=> {
        const checkAuthentication = async ()=> {
            await new Promise((resolve) => setTimeout(resolve, 50))
            setLoading(false)
        }
        checkAuthentication()
    }, [user])

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <List sx={{ display: 'flex', padding: 1 }}>
        <ListItem sx={{padding: 2, width: 'auto'}}>
          <Link href="/" underline="none">Home</Link>
        </ListItem>
        <ListItem sx={{padding: 2, width: 'auto'}}>
            <Link href = "/profile">Profile</Link>
        </ListItem>
        <ListItem sx={{padding: 2, width: 'auto'}}>
            <Link href="/recipe">Recipe</Link>
        </ListItem>
      </List>
      {loading ? null : !user ? (<List sx={{ display: 'flex', padding: 1 }}>
        <ListItem onClick={handleSignIn} >Login</ListItem>
        <ListItem onClick={handleSignIn} >Signup</ListItem>
      </List>) : (
        <Box>
            <p>Welcome, {user.displayName}</p>
            <p onClick={handleSignOut}>Sign Out</p>
        </Box>
      )}
      
    </Box>
  )
}

export default Navbar