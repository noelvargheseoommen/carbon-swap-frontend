import { useState } from 'react'

import TopNav from '../../components/TopNav'
import BottomNav from '../../components/BottomNav'
import SwapBox from '../../components/Swap'

import {
  Box,
  Button,
  ButtonGroup,
  Spacer, Text, Center,
  Image, Flex,  HStack , chakra ,

} from '@chakra-ui/react'





function Swap() {
  

  return (

   
    <div className="swap">

<TopNav/>
  


<SwapBox/>



<BottomNav/>

    </div>
  )
}

export default Swap
