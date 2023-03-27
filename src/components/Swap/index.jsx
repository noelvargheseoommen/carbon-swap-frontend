import {
 
    Box, Center, extendTheme, Flex, Stack, HStack,VStack, SimpleGrid,
   
  } from '@chakra-ui/react'






function SwapBox() {


    return (

<div>



<SimpleGrid columns={1} spacing={10}>
  <Box bg='transparent' height='80px'></Box>
  <Center>
  <Box bg='brand.200' height='80px' w='30%'></Box>
  </Center>
  <Box bg='transparent' height='80px'></Box>
 
</SimpleGrid>
                    
                
 

   </div>
            )
}

export default SwapBox