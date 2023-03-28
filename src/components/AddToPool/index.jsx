import {
 
    Box, Center, extendTheme, Flex, Stack, HStack,VStack, SimpleGrid, Text, Input, Select, Button,
   
  } from '@chakra-ui/react'






function AddToPool() {


    return (

<div>



<SimpleGrid columns={1} spacing={10}>
  <Box bg='transparent' height='60px'></Box>

  <Center>
<Flex >
<Text  p='1' fontSize='4xl' color='white'>Add to </Text> 
<Text p='1' fontSize='4xl' color='#C9E265'> [carbon] </Text>
<Text  p='1' fontSize='4xl' color='white'>pool </Text> 

</Flex>
</Center>



  <Center>
  <Box bg='brand.300' height='496px' w='1183px' borderRadius='3xl' >


<VStack  spacing={8} >

 

  </VStack>

  </Box>
  </Center>
  <Box bg='transparent' height='110px'></Box>
 
</SimpleGrid>
                    
                
 

   </div>
            )
}

export default AddToPool