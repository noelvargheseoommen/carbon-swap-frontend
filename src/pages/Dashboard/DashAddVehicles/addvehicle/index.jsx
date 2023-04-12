import {

    Box,Button,Spacer,
    Image, Flex,  HStack , chakra , Stack, Center, VStack,Text,
    FormControl, FormLabel, Input
  
  } from '@chakra-ui/react'



function AddVehicleForm() {


return (

<div>
 
<Center>
<Box w='90%' h='1%' bg='lblack.100'  borderRadius='15px' boxShadow='dark-lg'>

<Box  h='30px'></Box>

<FormControl isRequired>
 
  <Input bg='lblack.100' borderColor='brand.100'  variant='filled' placeholder='Vehicle Name'  textAlign='left' fontSize='20px'  w='30%' h='65px' borderRadius='2xl' textColor='white'/>

</FormControl>


<Box h='30px' ></Box>

</Box>
</Center>

</div>

)
}

export default AddVehicleForm