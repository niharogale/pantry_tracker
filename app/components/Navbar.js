import React, { useEffect, useState } from 'react'
import { Box,List,ListItem,Link } from '@mui/material'
import { UserAuth } from '../context/AuthContext'

const Navbar = () => {
    const {user, googleSignIn, logOut, loading} = UserAuth();

    const handleSignIn = async () => {
        try {
            await googleSignIn()
        } catch(error) {
            console.log("Sign in Error: " + error)
        }
    }

    useEffect(()=> {
        const checkAuthentication = async ()=> {
            await new Promise((resolve) => setTimeout(resolve, 50))
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
            <p onClick={logOut}>Sign Out</p>
        </Box>
      )}
      
    </Box>
  )
}

export default Navbar