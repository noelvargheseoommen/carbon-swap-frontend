import { useState } from 'react'
import './swap.css'

import TopNav from '../../components/TopNav'
import BottomNav from '../../components/BottomNav'

import {
  Box,
  Button,
  ButtonGroup,
  Spacer,
  Image, Flex,  HStack , chakra ,

} from '@chakra-ui/react'




function Swap() {
  

  return (

   
    <div className="swap">

<TopNav/>
  
  


<Box boxSize='sm'>
<br></br> <br></br>
<br></br><br></br>
<br></br>
  <Image height='200px' src='.\src\assets\carbon-neutral.png' alt='carbon neutral icon' />
  <br></br><br></br>
  <h2 >Enter the world of</h2> <h22 >[carbon]</h22><h2>swap and help</h2>
  <Spacer /><br></br>
      <h2>reduce global </h2><h22>[carbon]</h22> <h2>emissions</h2>
      <br></br><br></br>
      <br></br><br></br>
        <button onClick={() => setCount((count) => count + 1)}>
          Enter Dapp 
        </button>
        <br></br> <br></br><br></br>
        <h1 color='#C9E265' >87818781   </h1>
        <Image height='60px' src='.\src\assets\co2.png' alt='c02 icon' />
        <Spacer /><br></br>
        <h2>Liquidity locked on the </h2><h22>[carbon]</h22> <h2>swap</h2>
        <br></br> <br></br> <br></br> <br></br><br></br>

   
</Box>


<BottomNav/>

    </div>
  )
}

export default Swap
