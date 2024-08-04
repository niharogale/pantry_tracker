'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {firestore} from '@/firebase'
import { Box, Modal, Typography, Stack, TextField, Button, styled, Divider, InputAdornment } from "@mui/material";
import { collection, deleteDoc, getDoc, getDocs, query, setDoc, doc } from "firebase/firestore";
import SearchIcon from "@mui/icons-material/Search";

const RedButton = styled(Button)({
  backgroundColor: 'red',
  '&:hover': {
    backgroundColor: 'darkred',
  },
});

const BlueButton = styled(Button)({
  backgroundColor: 'lightblue',
  '&:hover': {
    backgroundColor: 'blue',
  },
});

export default function Home() {
  const [filteredPantry, setFilteredPantry] = useState([])
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setitemName] = useState('')
  const [itemQuantity, setItemQuantity] = useState(1)
  const [searchBox, setSearchBox] = useState("")

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc)=> {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
    setFilteredPantry(inventoryList)
  }

  const removeItem = async(item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      if(quantity == 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity: quantity-1})
      }
    }
    await updateInventory()
  }

  const deleteItem = async(item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)

    await deleteDoc(docRef)
    await updateInventory()
  }

  const addItem = async(item, number) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + number})
    } else {
      await setDoc(docRef, {quantity: number})
    }
    await updateInventory()
  }

  const plusItem = async(item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    const {quantity} = docSnap.data()

    await setDoc(docRef, {quantity: quantity + 1})
    await updateInventory()
  }

  useEffect(()=> {
    updateInventory()
  }, [])

  useEffect(()=> {
    if(searchBox === "") {
      setFilteredPantry(inventory)
    } else {
      setFilteredPantry(
        inventory.filter((item) => 
          item.name.toLowerCase().includes(searchBox.toLowerCase())
        )
      )
    }
  }, [searchBox, inventory])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    /*<Box>
    <Box display="flex" alignItems="center" justifyContent="flex-start" height="10vw" width="70vh">
      <Typography variant="h2" sx={{ marginRight: '50vw' }}>Pantry Pal</Typography>
    </Box>*/
    <Box width="100%" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2} bgcolor="#e8f5e9">
      <Modal open={open} onClose={handleClose}>
      <Box position="absolute" top="50%" left="50%" width={400} sx={{transform: 'translate(-50%, -50%)'}} 
        bgcolor="white" border="2px solid black" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3}>
        <Typography variant="h6">Add a new Item</Typography>
        <Stack width="100%" direction="column" spacing={2}>
          <TextField placeholder="Item name" variant='outlined' fullWidth value={itemName} onChange={(e) => {
            setitemName(e.target.value)
          }}>
          </TextField>
          <TextField placeholder="#" variant='outlined' type="number" value={itemQuantity} onChange={(e)=>{
            setItemQuantity(parseInt(e.target.value, 10))
          }}></TextField>
          <Button variant='outlined' onClick={()=>{
            addItem(itemName, itemQuantity)
            setitemName('')
            setItemQuantity(1)
            handleClose()
          }}>Add</Button>
        </Stack>
      </Box>
      </Modal>
      <Typography variant="h2" sx={{margin: "2vw 0vw"}}>Pantry Peek</Typography>
      <Stack direction="row" spacing={2} mb={2}>
      <TextField id="search-item" label="search" variant='outlined' value={searchBox} 
      onChange={(e) => setSearchBox(e.target.value)}
      InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
      }}
      sx={{ width: "300px" }} 
      />
      <Button variant='contained' onClick={()=>{
        handleOpen()
      }}>Add New Item</Button>
      </Stack>
      <Box>
        <Box width="70vw" height="8vh" bgcolor="e8f5e9" display="flex" alignItems="center" justifyContent="space-between" padding={2}>
          <Typography variant="h4" color="#333">Item</Typography>
          <Typography variant="h4" color="#333">Quantity</Typography>
          <Typography variant="h4" color="#333">Edit List</Typography>
        </Box>
        <Divider />
      <Stack width="70vw" height="64vh" spacing={0} overflow="auto" bgcolor="e8f5e9">
        {
          filteredPantry.map(({name, quantity})=>(
            <React.Fragment key={name}>
            <Box key={name} width="100%" minHeight="75" display="flex" alignItems="center" 
            justifyContent="space-between" bgcolor='e8f5e9' padding={2}>
              <Typography variant="h5" color='#333' textAlign="center">{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
              <Typography variant="h5" color='#333' textAlign="center">{quantity}</Typography>
              <Stack direction="row" spacing={2}>
              <BlueButton variant='contained' onClick={()=>{
                plusItem(name)
              }} sx={{
                        minWidth: '30px',
                        padding: '4px',
                      }}>+</BlueButton>
              <BlueButton variant='contained' onClick={()=>{
                removeItem(name)
              }} sx={{
                        minWidth: '30px',
                        padding: '4px',
                      }}>-</BlueButton>
              <RedButton variant="contained" onClick={()=> {
                deleteItem(name)
              }}>Delete</RedButton>
              </Stack>
            </Box>
            <Divider />
            </React.Fragment>
          ))
        }
      </Stack>
      </Box>
    </Box>
    //</Box>
  )
}
