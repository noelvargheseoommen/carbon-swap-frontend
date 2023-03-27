import {
 
    Box, Center, extendTheme, Flex, Stack, HStack,VStack, SimpleGrid, Text, Input,
   
  } from '@chakra-ui/react'






function SwapBox() {


    return (

<div>



<SimpleGrid columns={1} spacing={10}>
  <Box bg='transparent' height='60px'></Box>

  <Center>
<Flex >
<Text  p='1' fontSize='4xl' color='white'>Swap </Text> 
<Text p='1' fontSize='4xl' color='#C9E265'> [carbon] </Text>

</Flex>
</Center>



  <Center>
  <Box bg='brand.200' height='400px' w='750px' borderRadius='3xl' >


<VStack  spacing={8} >

  <Box height='30px' w='750px' />
  <Input bg='black' variant='outline' placeholder='Enter Amount' w='500px' h='65px' borderRadius='3xl'/>
  <Input bg='black' variant='outline' placeholder='Enter Amount' w='500px' h='65px' borderRadius='3xl'/>
  </VStack>

  </Box>
  </Center>
  <Box bg='transparent' height='200px'></Box>
 
</SimpleGrid>
                    
                
 

   </div>
            )
}

export default SwapBox