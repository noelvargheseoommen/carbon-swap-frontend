

import TopNav from '../../components/TopNav'
import BottomNav from '../../components/BottomNav'


import {
    ChakraProvider,
    Box,
    Button,
    ButtonGroup,
    Spacer,
    Image, Flex,  HStack , chakra , Stack, Center, VStack,Text,
  
  } from '@chakra-ui/react'



function Dashboard() {


return (

  <div className="home">
 
<TopNav/>
<BottomNav/>

</div>

)
}

export default Dashboard