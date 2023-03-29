

import TopNav from '../../components/TopNav'
import BottomNav from '../../components/BottomNav'
import AddToPool from '../../components/AddToPool'
import LiquidityMenu from '../../components/LiquidityMenu'


import {
    ChakraProvider,
    Box,
    Button, Spacer,
    Image, Flex,  HStack , chakra , Stack, Center, VStack,Text,
  
  } from '@chakra-ui/react'





function Liquidity() {


return (

  <div className="home">


 
<TopNav/>



<Flex p='4'>

<LiquidityMenu/>


<Box bg='transparent' height='1000px'></Box>


<AddToPool/>
</Flex>

<BottomNav/>

</div>

)
}

export default Liquidity