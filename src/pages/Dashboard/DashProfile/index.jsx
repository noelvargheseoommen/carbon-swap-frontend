

import TopNav from '../../../components/TopNav'
import BottomNav from '../../../components/BottomNav'
import DashSideNav from '../../../components/DashSideNav'


import {

    Box,Button,Spacer,
    Image, Flex,  HStack , chakra , Stack, Center, VStack,Text,
    TableContainer, Table, TableCaption, Thead, Tr, Th,Tbody, Td, Tfoot
  
  } from '@chakra-ui/react'



function DashProfile() {


return (

  <div>
 
<TopNav/>


<HStack spacing='90px'>
<DashSideNav/>



<Box   boxShadow='inner-dark-lg' borderRadius='2xl' variant='solid' bg='brand.200' h='100%' w='70%'>

<Stack spacing={5}>
<Box></Box>
<Text fontSize='3xl' as='b' >Profile</Text>

<Text fontSize='3xl' as='b' >Welcome!</Text>

<HStack>  
  <Box w='5%'></Box>
  <Text fontSize='3xl' as='b' align='left' >Your Vehicles</Text> 
</HStack>

<Center>
<Box   boxShadow='inner-dark-lg' borderRadius='2xl' variant='solid' bg='lblack.100' h='100%' w='90%'>

<TableContainer>
  <Table variant='simple' size='lg' textColor='white'>
    <Thead textColor='white'>
      <Tr>
        <Th textColor='white'>Vehicle Reg.no</Th>
        <Th textColor='white'>NAME</Th>
        <Th  textColor='white'>Type</Th>
        <Th  textColor='white'>CO2</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>KL2745</Td>
        <Td>Toyota</Td>
        <Td >Semi Truck</Td>
        <Td >46.2</Td>
      </Tr>
      <Tr>
        <Td>KL7894</Td>
        <Td>VOLVO</Td>
        <Td>Bus</Td>
        <Td >89.2</Td>
      </Tr>
      <Tr>
        <Td>KL7565</Td>
        <Td>Honda</Td>
        <Td >Car</Td>
        <Td >76.9</Td>
      </Tr>
      
    

    </Tbody>
  </Table>
</TableContainer>


</Box>
</Center>

<Box h='50px'></Box>

</Stack>

</Box>

</HStack>


<BottomNav/>

</div>

)
}

export default DashProfile