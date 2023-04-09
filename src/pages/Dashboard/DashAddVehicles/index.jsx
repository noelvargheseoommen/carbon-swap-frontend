

import TopNav from '../../../components/TopNav'
import BottomNav from '../../../components/BottomNav'
import DashSideNav from '../../../components/DashSideNav'


import {

    Box,Button,Spacer,
    Image, Flex,  HStack , chakra , Stack, Center, VStack,Text,
  
  } from '@chakra-ui/react'



function DashAddVehicles() {


return (

  <div>
 
<TopNav/>


<HStack spacing='90px'>
<DashSideNav/>



<Box   boxShadow='inner-dark-lg' borderRadius='2xl' variant='solid' bg='brand.200' h='410px' w='70%'>

<Stack spacing={5}>
<Box></Box>
<Text fontSize='3xl' as='b' >Add Vehicles</Text>

</Stack>

</Box>

</HStack>


<BottomNav/>

</div>

)
}

export default DashAddVehicles