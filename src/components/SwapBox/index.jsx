import {
    Box, Center, extendTheme, Flex, Stack, HStack,VStack, SimpleGrid, Text, Input, Select, Button
  } from '@chakra-ui/react'

import {
  ArrowDownIcon, ArrowUpIcon
 } from '@chakra-ui/icons'

// import { getPublicClient } from '@wagmi/core'
import { useAccount, usePrepareContractWrite, useContractWrite, useSigner, useContractRead } from 'wagmi'
import React, { useEffect, useState } from 'react';
import { BalancerSDK,  Network, SwapTypes, SwapType, Swaps} from '@balancer-labs/sdk';
import {parseEther, parseUnits, formatEther} from 'viem';
import ERC20ABI from '../../assets/images/abi/ERC20.json';
import { ethers } from 'ethers';


function SwapBox() {
  const config = {
    network: 5,
    rpcUrl: `https://goerli.infura.io/v3/5ad6baed6e324423b49bc2c9c1b5e5e6`,
  };
  
  const { address } = useAccount();
  const balancer = new BalancerSDK(config);
  
  const [tokenAIn, setTokenAIn] = useState(0);
  const [tokenBOut, setTokenBOut] = useState(0);
  const [tokenInAddr, setTokenInAddr] = useState("");
  const [tokenOutAddr, setTokenOutAddr] = useState("");
  const [allowance, setAllowance] = useState(0);
  const [ptscpToken, setPtcsp] = useState("0x1049cD39F9aB0CD9abe9dF16dB4cF882ea9dd918");
  const [balance, setBalance] = useState(0);

  const { swaps, contracts,pricing} = balancer;
  const { data: signer, isError, isLoading } = useSigner()

  const { config: approveTokenConfig, error } = usePrepareContractWrite({
    address: tokenInAddr,
    abi: ERC20ABI,
    functionName: 'approve',
    args: [contracts.vault.address, tokenAIn],
  })
  const { approveToken } = useContractWrite(approveTokenConfig);

  const { data: tokenAllowance} = useContractRead({
    address: tokenInAddr,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: [address, contracts.vault.address],
    watch: true,
  })

  const { data: balanceOf} = useContractRead({
    address: tokenInAddr,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  })

  useEffect(() => {
    const updatedBalance = formatEther(String(balanceOf)); 
    console.log(updatedBalance);

    // Update the state with the new value
    setBalance(updatedBalance);
  }, []);

  
  async function handleSwap(){
    console.log("SWAPPING ONGOING");
    //if swap is within the Stable Pool or Within the Weighted pool. single swap. 
    //If the swap is across pools then swap to the csp token and then swap back to the token needed.
    //try to get address dynamically from values of dropdown.
    if(tokenInAddr == "0x750c48A49CC4F71c1B3b8d3D763D40Ea1D973b7C" || tokenInAddr == "0xb21583D10795e4Cd6de1873E7f13678D8eAd6e40" || tokenInAddr =="0xC0a957D9ce9c230541Bcb82653838d619a85fB1f"){
      if(tokenOutAddr == "0x750c48A49CC4F71c1B3b8d3D763D40Ea1D973b7C" || tokenOutAddr == "0xb21583D10795e4Cd6de1873E7f13678D8eAd6e40" || tokenOutAddr =="0xC0a957D9ce9c230541Bcb82653838d619a85fB1f"){
        const encodedBatchSwapData = Swaps.encodeBatchSwap( {
          kind: SwapType.SwapExactIn,
          swaps: [
            // First pool swap: 10 ETH > USDC
            {
              poolId:
                '0x1049cd39f9ab0cd9abe9df16db4cf882ea9dd918000000000000000000000644',
              // ETH
              assetInIndex: 1,
              // USDC
              assetOutIndex: 2,
              amount: String(parseEther(tokenAIn)),
              userData: '0x',
            },
          ],
          assets: [
            // Balancer use the zero address for ETH and the Vault will wrap/unwrap as neccessary
            '0x0000000000000000000000000000000000000000',
            tokenInAddr,
            // USDC
            tokenOutAddr
          ],
          funds: {
            fromInternalBalance: false,
            // These can be different addresses!
            recipient: address,
            sender: address,
            toInternalBalance: false,
          },
          limits: ['0', String(parseEther(tokenAIn)), '0'], // +ve for max to send, -ve for min to receive
          deadline: '999999999999999999', // Infinity
        });
        console.log(encodedBatchSwapData)
        await signer.sendTransaction({
          data: encodedBatchSwapData,
          to: contracts.vault.address,
          value: '0'
          /**
           * The following gas inputs are optional,
           **/
          // gasPrice: '6000000000',
          // gasLimit: '2000000',
        });
      }

      else if(tokenOutAddr == "0x3D3F83BdAFDbAFE3E1ceb33bd1F93B62c4C40E13" || tokenOutAddr == "0x42AF277712cA92b627a1b896Fa395408BBe0b816"){
        const encodedBatchSwapData = Swaps.encodeBatchSwap( {
          kind: SwapType.SwapExactIn,
          swaps: [
            // First pool swap: 10 ETH > USDC
            {
              poolId:
                '0x1049cd39f9ab0cd9abe9df16db4cf882ea9dd918000000000000000000000644',
              // ETH
              assetInIndex: 1,
              // USDC
              assetOutIndex: 2,
              amount: String(parseEther(tokenAIn)),
              userData: '0x',
            },
            {
              poolId:
                '0x41e9a01b90a5e0a4744c5244b6403c386883eb2000010000000000000000080b',
              // ETH
              assetInIndex: 2,
              // USDC
              assetOutIndex: 3,
              amount: '0',
              userData: '0x',
            },
          ],
          assets: [
            // Balancer use the zero address for ETH and the Vault will wrap/unwrap as neccessary
            '0x0000000000000000000000000000000000000000',
            tokenInAddr,
            ptscpToken, // PTCSP
            tokenOutAddr
          ],
          funds: {
            fromInternalBalance: false,
            // These can be different addresses!
            recipient: address,
            sender: address,
            toInternalBalance: false,
          },
          limits: ['0', String(parseEther(tokenAIn)), '0','0'], // +ve for max to send, -ve for min to receive
          deadline: '999999999999999999', // Infinity
        });
        console.log(encodedBatchSwapData)
        await signer.sendTransaction({
          data: encodedBatchSwapData,
          to: contracts.vault.address,
          value: '0'
          /**
           * The following gas inputs are optional,
           **/
          // gasPrice: '6000000000',
          // gasLimit: '2000000',
        });
      }

      else{
        console.log("TOKEN OUT ADDRESS DOES NOT MATCH")
      }
    }
    if(tokenInAddr == "0x3D3F83BdAFDbAFE3E1ceb33bd1F93B62c4C40E13" || tokenInAddr == "0x42AF277712cA92b627a1b896Fa395408BBe0b816"){
      if(tokenOutAddr == "0x3D3F83BdAFDbAFE3E1ceb33bd1F93B62c4C40E13" || tokenOutAddr == "0x42AF277712cA92b627a1b896Fa395408BBe0b816"){
        const encodedBatchSwapData = Swaps.encodeBatchSwap( {
          kind: SwapType.SwapExactIn,
          swaps: [
            // First pool swap: 10 ETH > USDC
            {
              poolId:
                '0x41e9a01b90a5e0a4744c5244b6403c386883eb2000010000000000000000080b',
              // ETH
              assetInIndex: 1,
              // USDC
              assetOutIndex: 2,
              amount: String(parseEther(tokenAIn)),
              userData: '0x',
            },
          ],
          assets: [
            // Balancer use the zero address for ETH and the Vault will wrap/unwrap as neccessary
            '0x0000000000000000000000000000000000000000',
            tokenInAddr,
            // USDC
            tokenOutAddr
          ],
          funds: {
            fromInternalBalance: false,
            // These can be different addresses!
            recipient: address,
            sender: address,
            toInternalBalance: false,
          },
          limits: ['0', String(parseEther(tokenAIn)), '0'], // +ve for max to send, -ve for min to receive
          deadline: '999999999999999999', // Infinity
        });
        console.log(encodedBatchSwapData)
        await signer.sendTransaction({
          data: encodedBatchSwapData,
          to: contracts.vault.address,
          value: '0'
          /**
           * The following gas inputs are optional,
           **/
          // gasPrice: '6000000000',
          // gasLimit: '2000000',
        });
      }
      else if(tokenOutAddr == "0x750c48A49CC4F71c1B3b8d3D763D40Ea1D973b7C" || tokenOutAddr == "0xb21583D10795e4Cd6de1873E7f13678D8eAd6e40" || tokenOutAddr =="0xC0a957D9ce9c230541Bcb82653838d619a85fB1f"){
        const encodedBatchSwapData = Swaps.encodeBatchSwap( {
          kind: SwapType.SwapExactIn,
          swaps: [
            // First pool swap: 10 ETH > USDC
            {
              poolId:
              '0x41e9a01b90a5e0a4744c5244b6403c386883eb2000010000000000000000080b',
              // ETH
              assetInIndex: 1,
              // USDC
              assetOutIndex: 2,
              amount: String(parseEther(tokenAIn)),
              userData: '0x',
            },
            {
              poolId:
                '0x1049cd39f9ab0cd9abe9df16db4cf882ea9dd918000000000000000000000644',
              // ETH
              assetInIndex: 2,
              // USDC
              assetOutIndex: 3,
              amount: '0',
              userData: '0x',
            },
          ],
          assets: [
            // Balancer use the zero address for ETH and the Vault will wrap/unwrap as neccessary
            '0x0000000000000000000000000000000000000000',
            tokenInAddr,
            ptscpToken, // PTCSP
            tokenOutAddr
          ],
          funds: {
            fromInternalBalance: false,
            // These can be different addresses!
            recipient: address,
            sender: address,
            toInternalBalance: false,
          },
          limits: ['0', String(parseEther(tokenAIn)), '0','0'], // +ve for max to send, -ve for min to receive
          deadline: '999999999999999999', // Infinity
        });
        console.log(encodedBatchSwapData)
        await signer.sendTransaction({
          data: encodedBatchSwapData,
          to: contracts.vault.address,
          value: '0'
          /**
           * The following gas inputs are optional,
           **/
          // gasPrice: '6000000000',
          // gasLimit: '2000000',
        });
      }
    }
    else{
      console.log("TOKEN IN ADDRESS DOES NOT MATCH")
    }

    
    

  }
  
  async function handleSpotPrice(tokenAInput){
  // if(document.getElementById("tokenA").value == "0x750c48A49CC4F71c1B3b8d3D763D40Ea1D973b7C" || document.getElementById("tokenA").value == "0xb21583D10795e4Cd6de1873E7f13678D8eAd6e40" || document.getElementById("tokenA").value =="0xC0a957D9ce9c230541Bcb82653838d619a85fB1f"){
  //   const poolId ='0x1049cd39f9ab0cd9abe9df16db4cf882ea9dd918000000000000000000000644';
  //   const pool = await balancer.pools.find(poolId);
  //   if (!pool) throw new BalancerError(BalancerErrorCode.POOL_DOESNT_EXIST);
  //   const spotPrice = await pool.calcSpotPrice(
  //       document.getElementById("tokenB").value, // BAL
  //       document.getElementById("tokenA").value // WETH
  //     );
  //     setTokenAIn(tokenAInput);
  //     setTokenInAddr(document.getElementById("tokenA").value);
  //     let tokenB = spotPrice*tokenAInput;
  //     setTokenBOut(tokenB);
  //     setTokenOutAddr(document.getElementById("tokenB").value);
  //     console.log(tokenBOut);
  //   }
  //   else if(document.getElementById("tokenA").value == "0x3D3F83BdAFDbAFE3E1ceb33bd1F93B62c4C40E13" || document.getElementById("tokenA").value == "0x42AF277712cA92b627a1b896Fa395408BBe0b816"){
  //     const poolId ='0x41e9a01b90a5e0a4744c5244b6403c386883eb2000010000000000000000080b';
  //     const pool = await balancer.pools.find(poolId);
  //     if (!pool) throw new BalancerError(BalancerErrorCode.POOL_DOESNT_EXIST);
  //     const spotPrice = await pool.calcSpotPrice(
  //         document.getElementById("tokenB").value, // BAL
  //         document.getElementById("tokenA").value // WETH
  //       );
  //       setTokenAIn(tokenAInput);
  //       setTokenInAddr(document.getElementById("tokenA").value);
  //       let tokenB = spotPrice*tokenAInput;
  //       setTokenBOut(tokenB);
  //       setTokenOutAddr(document.getElementById("tokenB").value);
  //       console.log(tokenBOut);
  //     }
      // else{
      //   console.log("PAIR NOT FOUND");
      // }

      const spotPrice = await pricing.getSpotPrice(document.getElementById("tokenA").value, document.getElementById("tokenB").value);
      console.log('spotPrice', spotPrice.toString());
      setTokenAIn(tokenAInput);
        setTokenInAddr(document.getElementById("tokenA").value);
        let tokenB = spotPrice * tokenAInput;
        setTokenBOut(tokenB);
        setTokenOutAddr(document.getElementById("tokenB").value);
        console.log(tokenBOut);
  }

  async function handleApprove(){
    //approveToken?.();
    console.log("Approving");
    try {
      const token = new ethers.Contract(
        tokenInAddr,
        ERC20ABI,
        signer
      )
      const tx = await token.approve(contracts.vault.address, String(parseEther(tokenAIn)))
      await tx.wait()
    } catch (error) {
      console.log('error: ', error)
    }
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
  {
    balanceOf != undefined ? (
      <Text>Balance: {formatEther(String(balanceOf))}</Text>
    ) : (
      <Text>Balance: </Text>
    )
  }
  

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
  <div>
      {tokenAllowance >= tokenAIn ? (
          <Button bg='lblack.100' variant='filled ' textColor='white' w='640px' h='65px' borderRadius='3xl' onClick={handleSwap}>Swap [carbon]</Button>

      ) : (
        <Button bg='lblack.100' variant='filled ' textColor='white' w='640px' h='65px' borderRadius='3xl' onClick={handleApprove}>Approve [carbon]</Button>
        )}
    </div>
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