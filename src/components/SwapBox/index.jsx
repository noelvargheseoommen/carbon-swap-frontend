import {
 
    Box, Center, extendTheme, Flex, Stack, HStack,VStack, SimpleGrid, Text, Input, Select, Button
   
  } from '@chakra-ui/react'

import {
  ArrowDownIcon, ArrowUpIcon
 } from '@chakra-ui/icons'

//  import { getPublicClient } from '@wagmi/core'
import React, { useState } from 'react';
 import { BalancerSDK,  Network } from '@balancer-labs/sdk';

function SwapBox() {

  const config = {
    network: 5,
    rpcUrl: `https://goerli.infura.io/v3/5ad6baed6e324423b49bc2c9c1b5e5e6`,
  };
  
  const balancer = new BalancerSDK(config);
  const [tokenBOut, setTokenBOut] = useState(0);
  
  function handleSwap(){
    console.log("SWAPPING ONGOING");
    //if swap is within the Stable Pool or Within the Weighted pool. single swap. 
    //If the swap is across pools then swap to the csp token and then swap back to the token needed.
    //try to get address dynamically from values of dropdown.
  }
  
  async function handleSpotPrice(tokenAInput){
    const poolId ='0x1049cd39f9ab0cd9abe9df16db4cf882ea9dd918000000000000000000000644';
  const pool = await balancer.pools.find(poolId);
  if (!pool) throw new BalancerError(BalancerErrorCode.POOL_DOESNT_EXIST);
  const spotPrice = await pool.calcSpotPrice(
      document.getElementById("tokenA").value, // BAL
      document.getElementById("tokenB").value // WETH
    );
    
    let tokenB = spotPrice*tokenAInput;
    setTokenBOut(tokenB);
    console.log(tokenBOut);
    
  }
  
  
  


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
  <Box bg='brand.200' height='410px' w='750px' borderRadius='3xl' >


<VStack  spacing={4} >

  <Box height='30px' w='750px'  />

  <Flex >

  <Box boxShadow='dark-lg' borderRadius='3xl'>
  <Select id='tokenA' variant='solid' placeholder='Select Token'  w='150px' h='65px' borderRadius='3xl' bg='white' textColor='black'>
  <option value='0x750c48A49CC4F71c1B3b8d3D763D40Ea1D973b7C'>BCT</option>
  <option value='0xC0a957D9ce9c230541Bcb82653838d619a85fB1f'>NCT</option>
  <option value='0xb21583D10795e4Cd6de1873E7f13678D8eAd6e40'>MCO2</option>
  <option value='0x42AF277712cA92b627a1b896Fa395408BBe0b816'>USDC</option>
  <option value='0x3D3F83BdAFDbAFE3E1ceb33bd1F93B62c4C40E13'>TCT</option>
  </Select>
  </Box>

  <Box  bg='transparent' h='65px' w='40px' />

  <Box boxShadow='dark-lg' borderRadius='3xl'>
  <Input bg='lblack.100' variant='filled' placeholder='0' textAlign='right' fontSize='35px'  w='450px' h='65px' borderRadius='3xl' textColor='white' onChange={(e) => handleSpotPrice(e.target.value)}/>
  </Box>
  </Flex>

<Flex>
<Box w='200px'></Box><ArrowDownIcon h='40px' w='40px'/> <ArrowUpIcon h='40px' w='40px'/>
</Flex>

  <Flex>

  <Box boxShadow='dark-lg' borderRadius='3xl'>
  <Select id='tokenB' variant='solid' placeholder='Select Token'  w='150px' h='65px' borderRadius='3xl' bg='white' textColor='black'>
  <option value='0x750c48A49CC4F71c1B3b8d3D763D40Ea1D973b7C'>BCT</option>
  <option value='0xC0a957D9ce9c230541Bcb82653838d619a85fB1f'>NCT</option>
  <option value='0xb21583D10795e4Cd6de1873E7f13678D8eAd6e40'>MCO2</option>
  <option value='0x42AF277712cA92b627a1b896Fa395408BBe0b816'>USDC</option>
  <option value='0x3D3F83BdAFDbAFE3E1ceb33bd1F93B62c4C40E13'>TCT</option>
  </Select>
  </Box>

  <Box  bg='transparent' h='65px' w='40px' />

  <Box boxShadow='dark-lg' borderRadius='3xl'>
  <Input bg='lblack.100'  variant='filled' placeholder={tokenBOut} value={tokenBOut} textAlign='right' fontSize='35px' w='450px' h='65px' borderRadius='3xl' textColor='white' />
  </Box>
  </Flex>

  <Box  bg='transparent' h='20px' w='40px' />

  <Box boxShadow='dark-lg' borderRadius='3xl'>
  <Button bg='lblack.100' variant='filled ' textColor='white' w='640px' h='65px' borderRadius='3xl' onClick={handleSwap}>Swap [carbon]</Button>
  </Box>

  </VStack>

  </Box>
  </Center>
  <Box bg='transparent' height='190px'></Box>
 
</SimpleGrid>
                    
                
 

   </div>
            )
}

export default SwapBox