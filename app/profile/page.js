'use client'
import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { Box, Typography } from '@mui/material'

const Page = () => {
  const {user} = UserAuth()
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    const checkAuthentication = async ()=> {
        await new Promise((resolve) => setTimeout(resolve, 50))
        setLoading(false)
    }
    checkAuthentication()
}, [user])

  return (
    <Box>
      {loading ? (<Typography variant="body1"></Typography>) : user ? (
        <Typography variant="body1">Welcome, {user.displayName} - you are logged in to the profile page - a protected route</Typography>
      ) : (<Typography variant="body1">You must be logged in to view this page - protected route</Typography>)}
      
    </Box>
  )
}

export default Page