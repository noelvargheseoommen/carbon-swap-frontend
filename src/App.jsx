import { useState } from 'react'


import './App.css'

import TopNav from './components/TopNav'
import Home from './pages/Home'
import BottomNav from './components/BottomNav'

import {
  ChakraProvider,
  Box,
  Button,
  ButtonGroup,
  Spacer,
  Image, Flex,  HStack , chakra , Stack,

} from '@chakra-ui/react'



function App() {

  return(

   
            <div className="app">

                <TopNav/>
  
                <Home/>

                <BottomNav/>

            </div>
         )
}

export default App
