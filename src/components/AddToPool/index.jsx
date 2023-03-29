import {
 
    Box, Center, extendTheme, Flex, Stack, HStack,VStack, SimpleGrid, Text, Input, Select, Button,
   
  } from '@chakra-ui/react'






function AddToPool() {


    return (

<div>



<SimpleGrid columns={1} spacing={10}>

<Box bg='transparent' height='20px'></Box>

<Center>
<Flex >
<Text  p='1' fontSize='4xl' color='white'>Add to </Text> 
<Text p='1' fontSize='4xl' color='#C9E265'> [carbon] </Text>
<Text  p='1' fontSize='4xl' color='white'>pool </Text> 
</Flex>
</Center>


<Center>
<Box bg='brand.300' height='560px' w='1183px' borderRadius='3xl'  boxShadow='inner-lg' p='4'>

<VStack  spacing={8} >

<Box bg='transparent' height='5px'  ></Box>

<Box  boxShadow='dark-lg' borderRadius='2xl'>
<Select placeholder='Select Token' textAlign='Center' borderRadius='2xl' bg='white'  variant='filled' w='350px' h='76px' fontSize='25px'  textColor='black'  >
  <option value='BCT'>BCT</option>
  <option value='NCT'>NCT</option>
  <option value='MCO2'>MCO2</option>
</Select>
</Box>

<Box bg='transparent' height='1px'  ></Box>


<Flex>
<Box   boxShadow='inner-dark-lg' borderRadius='3xl'>
  <Button variant='solid' borderRadius='2xl' w='450px' h='76px' bg='black' borderColor="black" fontSize='25px' textColor='white'>
      Add Liquidity
  </Button>
</Box>
  <Box bg='transparent' w='150px'  ></Box>

  <Box  boxShadow='inner-dark-lg' borderRadius='3xl'>
  <Button  variant='solid' borderRadius='2xl' w='450px' h='76px' bg='black' borderColor="black" fontSize='25px'textColor='white'>
      Remove Liquidity
  </Button>
  </Box>
</Flex>

<Flex>
<Box  boxShadow='dark-lg' borderRadius='3xl'>
<Input placeholder='0.0' textAlign='right' borderRadius='2xl' bg='lblack.100'  variant='filled' w='450px' h='76px' fontSize='35px'  textColor='grey'/>
</Box>

<Box bg='transparent' w='150px'  ></Box>

<Box  boxShadow='dark-lg' borderRadius='3xl'>
<Input placeholder='0.0' textAlign='right' borderRadius='2xl' bg='lblack.100'  variant='filled' w='450px' h='76px' fontSize='35px' textColor='white'/>
</Box>
</Flex>

<Flex>
<Box  boxShadow='dark-lg' borderRadius='3xl'>
<Button bg='Green' variant='solid' w='450px' h='76px' fontSize='30px' borderRadius='2xl' textColor='white'>
    Deposit
</Button>
</Box>

<Box bg='transparent' w='150px'  ></Box>

<Box  boxShadow='dark-lg' borderRadius='3xl'>
<Button bg='maroon' variant='solid'  w='450px' h='76px' fontSize='30px' borderRadius='2xl' textColor='white' >
    Withdraw
</Button>
</Box>

</Flex>

</VStack>
</Box>
</Center>


<Box bg='transparent' height='80px'></Box>
 
 
 </SimpleGrid>
                    
                
 

   </div>
            )
}

export default AddToPool