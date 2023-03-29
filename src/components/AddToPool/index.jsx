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
<Box bg='brand.200' height='520px' w='1183px' borderRadius='3xl'  boxShadow='inner' p='4'>

<VStack  spacing={8} >


<Box bg='transparent' height='20px'  ></Box>


<Flex>

<Select placeholder='Select Token' borderRadius='2xl' bg='white'  variant='filled' w='450px' h='76px' fontSize='20px'  textColor='black' >
  <option value='BCT'>BCT</option>
  <option value='NCT'>NCT</option>
  <option value='MCO2'>MCO2</option>
</Select>

<Box bg='transparent' w='20px'  ></Box>

<Select placeholder='Select Token' borderRadius='2xl' bg='white'  variant='filled' w='450px' h='76px' fontSize='20px'  textColor='black'>
  <option value='BCT'>BCT</option>
  <option value='NCT'>NCT</option>
  <option value='MCO2'>MCO2</option>
</Select>

</Flex>

<Flex>
  <Button variant='solid' borderRadius='2xl' w='450px' h='76px' bg='transparent' borderColor="black" fontSize='20px'>
      Add Liquidity
  </Button>

  <Box bg='transparent' w='20px'  ></Box>

  <Button  variant='solid' borderRadius='2xl' w='450px' h='76px' bg='transparent' borderColor="black" fontSize='20px'>
      Remove Liquidity
  </Button>
</Flex>

<Flex>
<Input placeholder='0.0' textAlign='right' borderRadius='2xl' bg='lblack.100'  variant='filled' w='450px' h='76px' fontSize='35px'  textColor='grey'/>

<Box bg='transparent' w='20px'  ></Box>

<Input placeholder='0.0' textAlign='right' borderRadius='2xl' bg='lblack.100'  variant='filled' w='450px' h='76px' fontSize='35px' textColor='white'/>
</Flex>

<Flex>
<Button bg='Green' variant='solid' w='450px' h='76px' fontSize='35px' borderRadius='2xl' textColor='white'>
    Deposit
</Button>

<Box bg='transparent' w='20px'  ></Box>

<Button bg='maroon' variant='solid'  w='450px' h='76px' fontSize='35px' borderRadius='2xl' textColor='white' >
    Withdraw
</Button>

</Flex>

</VStack>
</Box>
</Center>


<Box bg='transparent' height='110px'></Box>
 
 
 </SimpleGrid>
                    
                
 

   </div>
            )
}

export default AddToPool