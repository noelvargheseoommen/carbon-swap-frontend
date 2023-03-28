import {
 
    Box, Center, extendTheme, Flex, Stack, HStack,VStack, SimpleGrid, Text, Input, Select,
   
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

  <Box height='30px' w='750px'  />

  <Flex >

  <Box boxShadow='dark-lg' borderRadius='3xl'>
  <Select variant='outline' placeholder='Select Token'  w='150px' h='65px' borderRadius='3xl' bg='black'>
  <option value='option1'>BCT</option>
  <option value='option2'>NCT</option>
  <option value='option3'>MCO2</option>
  </Select>
  </Box>

  <Box  bg='transparent' h='65px' w='40px' />

  <Box boxShadow='dark-lg' borderRadius='3xl'>
  <Input bg='black' variant='outline' placeholder='Enter Amount' w='450px' h='65px' borderRadius='3xl'/>
  </Box>
  </Flex>

  <Flex>

  <Box boxShadow='dark-lg' borderRadius='3xl'>
  <Select variant='outline' placeholder='Select Token'  w='150px' h='65px' borderRadius='3xl' bg='black'>
  <option value='option1'>BCT</option>
  <option value='option2'>NCT</option>
  <option value='option3'>MCO2</option>
  </Select>
  </Box>

  <Box  bg='transparent' h='65px' w='40px' />

  <Box boxShadow='dark-lg' borderRadius='3xl'>
  <Input bg='black' variant='outline' placeholder='Enter Amount' w='450px' h='65px' borderRadius='3xl'  />
  </Box>
  </Flex>

  </VStack>

  </Box>
  </Center>
  <Box bg='transparent' height='200px'></Box>
 
</SimpleGrid>
                    
                
 

   </div>
            )
}

export default SwapBox