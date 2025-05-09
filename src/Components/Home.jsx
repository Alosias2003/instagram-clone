import { Box } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import Main from './Main'
import Left from './Left'

const Home = () => {
  return (
    <Box sx={{display:'flex',backgroundColor:'wheat'}}>
        <Navbar/>
        <Main/>
        <Left/>
    </Box>
  )
}

export default Home
