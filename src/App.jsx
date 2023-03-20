import { useState } from 'react'


import './App.css'

import TopNav from './components/TopNav'
import Home from './pages/Home'

import {
  ChakraProvider,
  Box,
  Button,
  ButtonGroup,
  Spacer,
  Image, Flex,  HStack , chakra , Stack,

} from '@chakra-ui/react'




function App() {


return (

   
<div className="app">

<TopNav/>
  
<Home/>



<Box bg='#C9E265 ' w='100%' h='70px' p={4} color='white'>
      <div>
  
     </div>
     <Spacer />
  

   </Box>  

    </div>
  )
}

export default App
