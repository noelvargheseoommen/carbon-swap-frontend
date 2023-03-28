

import TopNav from '../../components/TopNav'
import BottomNav from '../../components/BottomNav'
import AddToPool from '../../components/AddToPool'


import {
    ChakraProvider,
    Box,
    Button,
    ButtonGroup,
    Spacer,
    Image, Flex,  HStack , chakra , Stack, Center, VStack,Text,
  
  } from '@chakra-ui/react'




function Liquidity() {


return (

  <div className="home">
 
<TopNav/>

<AddToPool/>

<BottomNav/>

</div>

)
}

export default Liquidity