import {

    Box,Button,Spacer,
    Image, Flex,  HStack , chakra , Stack, Center, VStack,Text,
    FormControl, FormLabel, Input
  
  } from '@chakra-ui/react'



function AddVehicleForm() {


return (

<div>
 
<Center>
<Box w='70%' h='20%' bg='lblack.100'  borderRadius='15px' boxShadow='dark-lg'>

<Box  h='50px'></Box>

<FormControl isRequired>
 

  <HStack spacing='20px'>
  <Box w='7%'></Box>
  <Input bg='lblack.100' borderColor='white'  variant='filled' placeholder='Vehicle Name'  textAlign='left' fontSize='20px'  w='40%' h='65px' borderRadius='2xl' textColor='white'/>
  <Input bg='lblack.100' borderColor='white'  variant='filled' placeholder='Registration No'  textAlign='left' fontSize='20px'  w='40%' h='65px' borderRadius='2xl' textColor='white'/>
  </HStack>

  <Spacer></Spacer>
  <Box  h='40px'></Box>

  <HStack spacing='20px'>
  <Box w='7%'></Box>
  <Input bg='lblack.100' borderColor='white'  variant='filled' placeholder='Vehicle Type'  textAlign='left' fontSize='20px'  w='40%' h='65px' borderRadius='2xl' textColor='white'/>
  <Input bg='lblack.100' borderColor='white'  variant='filled' placeholder='Carbon'  textAlign='left' fontSize='20px'  w='40%' h='65px' borderRadius='2xl' textColor='white'/>
  </HStack>
  
  <Box  h='40px'></Box>

  <Button w='350px' h='60px' bg='lblack.100' borderColor='white' textColor='white'borderRadius='xl' fontSize='22px' > Submit </Button>

</FormControl>

<Box h='50px' ></Box>

</Box>
</Center>

</div>

)
}

export default AddVehicleForm