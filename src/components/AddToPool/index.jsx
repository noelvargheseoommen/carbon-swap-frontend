import {
    Box, Center, extendTheme, Flex, Stack, HStack,VStack, SimpleGrid, Text, Input, Select, Button,
  } from '@chakra-ui/react'
  import { useAccount, usePrepareContractWrite, useContractWrite, useSigner, useContractRead } from 'wagmi'
  import React, { useEffect, useState } from 'react';
  import { BalancerSDK,  Network, SwapTypes, SwapType, Swaps} from '@balancer-labs/sdk';
  import {parseEther, parseUnits, formatEther} from 'viem';
  import ERC20ABI from '../../assets/images/abi/ERC20.json';
  import BPTABI from '../../assets/images/abi/BPT.json';
  import VaultABI from '../../assets/images/abi/Vault.json'
  import { ethers } from 'ethers';

function AddToPool() {
  const config = {
    network: 5,
    rpcUrl: `https://goerli.infura.io/v3/5ad6baed6e324423b49bc2c9c1b5e5e6`,
  };
  
  const { address } = useAccount();
  const balancer = new BalancerSDK(config);

  const [tokenInputAddr, setTokenInputAddr] = useState("");
  const [tokenInputAmount, setTokenInputAmount] = useState(0);
  const [underlyingBalances, setUnderlyingBalances] = useState([]);

  const { swaps, contracts,pricing} = balancer;
  const { data: signer, isError, isLoading } = useSigner();
  //[bct, mco2, nct]
  const ComposableStablePool = ['0x750c48A49CC4F71c1B3b8d3D763D40Ea1D973b7C', '0xb21583D10795e4Cd6de1873E7f13678D8eAd6e40', '0xC0a957D9ce9c230541Bcb82653838d619a85fB1f']
  //[ptscp, tct, usdc]
  const WeightedPool = ['0x1049cD39F9aB0CD9abe9dF16dB4cF882ea9dd918', '0x3D3F83BdAFDbAFE3E1ceb33bd1F93B62c4C40E13', '0x42AF277712cA92b627a1b896Fa395408BBe0b816']

  const amountsIn = [parseEther('0'), parseEther('0'), parseEther('0')];
  const amountsOut = [parseEther('0'), parseEther('0'), parseEther('0')];


  // const { config: approveTokenConfig, error } = usePrepareContractWrite({
  //   address: tokenInputAddr,
  //   abi: ERC20ABI,
  //   functionName: 'approve',
  //   args: [contracts.vault.address, tokenInputAmount],
  // })
  // const { approveToken } = useContractWrite(approveTokenConfig);

  const { data: tokenAllowance} = useContractRead({
    address: tokenInputAddr,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: [address, contracts.vault.address],
    watch: true,
  })

  const { data: PTCSPBalance} = useContractRead({
    address: "0x1049cD39F9aB0CD9abe9dF16dB4cF882ea9dd918",
    abi: BPTABI,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  })

  const { data: WPBalance} = useContractRead({
    address: "0x41E9A01b90A5e0a4744C5244b6403c386883Eb20",
    abi: BPTABI,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  })

  const { data: PTCSPSupply} = useContractRead({
    address: "0x1049cD39F9aB0CD9abe9dF16dB4cF882ea9dd918",
    abi: BPTABI,
    functionName: 'getActualSupply',
    watch: true,
  })

  const { data: WPSupply} = useContractRead({
    address: "0x41E9A01b90A5e0a4744C5244b6403c386883Eb20",
    abi: BPTABI,
    functionName: 'totalSupply',
    watch: true,
  })

  const { data: getPoolTokensPTCSP} = useContractRead({
    address: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
    abi: VaultABI,
    functionName: 'getPoolTokens',
    args: ["0x1049cd39f9ab0cd9abe9df16db4cf882ea9dd918000000000000000000000644"],
    watch: true,
  })

  const { data: getPoolTokensWP} = useContractRead({
    address: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
    abi: VaultABI,
    functionName: 'getPoolTokens',
    args: ["0x41e9a01b90a5e0a4744c5244b6403c386883eb2000010000000000000000080b"],
    watch: true,
  })


  async function handleTokenAddress() {
    setTokenInputAddr(document.getElementById("tokenInput").value)
    console.log(tokenInputAddr);
    
    const {tokens: PTCSPtokens, balances: PTCSPbalances, lastChangeBlock: PTCSPlastChangeBlock} = getPoolTokensPTCSP; 
    const{tokens: WPtokens, balances: WPbalances, lastChangeBlock: WPlastChangeBlock} = getPoolTokensWP;
    const PTCSPPoolShare = PTCSPBalance/PTCSPSupply;
    const WPPoolShare = WPBalance/WPSupply;
    console.log(PTCSPPoolShare); 
    console.log(WPPoolShare);
    
    let PTCSPUnderlyingBalances = new Array(PTCSPbalances.length-1).fill(0);
    let WPUnderlyingBalances = new Array(WPbalances.length).fill(0);

    for(let i=1; i<PTCSPbalances.length; i++){
    PTCSPUnderlyingBalances[i-1] = (formatEther(PTCSPbalances[i])*PTCSPPoolShare).toFixed(4);
    // setUnderlyingBalances(PTCSPUnderlyingBalances);
    console.log(formatEther(PTCSPUnderlyingBalances[i-1]));
    }

    for(let i=0; i<WPbalances.length; i++){
    WPUnderlyingBalances[i] = (formatEther(WPbalances[i])*WPPoolShare).toFixed(4);
    console.log(formatEther(WPUnderlyingBalances[i]));
};
    setUnderlyingBalances([...PTCSPUnderlyingBalances, ...WPUnderlyingBalances]);
  };

 async function handleDeposit(){
    console.log("Deposit Initiated");
    if(ComposableStablePool.includes(tokenInputAddr)){
      const pool = await balancer.pools.find('0x1049cd39f9ab0cd9abe9df16db4cf882ea9dd918000000000000000000000644')
      if (!pool) throw Error('Pool not found');
      // Build join transaction
      const slippage = '100' // 100 bps = 1%

      const index = ComposableStablePool.findIndex((address) => address == tokenInputAddr);
      console.log(index)

      if (index !== -1) {
        // Create a new array with the same elements as tokenAmounts
        let newAmountsIn = [...amountsIn];
        // Insert the amount at the corresponding index
        newAmountsIn[index] = parseEther(tokenInputAmount);
        console.log(newAmountsIn);

      const { to, data, minBPTOut } = pool.buildJoin(
        address,
        ComposableStablePool,
        newAmountsIn,
        slippage
      )
      console.log(data);
      

      //Calculate price impact
      const priceImpact = await pool.calcPriceImpact(newAmountsIn, minBPTOut, true)
      console.log("Price Impact from the JOIN: " + priceImpact );

      //Submit join tx
      const transactionResponse = await signer.sendTransaction({
        to,
        data,
        // gasPrice: '6000000000', // gas inputs are optional
        // gasLimit: '2000000', // gas inputs are optional
      });

      await transactionResponse.wait()

    }
    else{
      console.log("Index of tokenAddress is -1")
    }

  }

  else if(WeightedPool.includes(tokenInputAddr)){
    const pool = await balancer.pools.find('0x41e9a01b90a5e0a4744c5244b6403c386883eb2000010000000000000000080b')
      if (!pool) throw Error('Pool not found');
      // Build join transaction
      const slippage = '100' // 100 bps = 1%

      const index = WeightedPool.findIndex((address) => address == tokenInputAddr);
      console.log(index)

      if (index !== -1) {
        // Create a new array with the same elements as tokenAmounts
        let newAmountsIn = [...amountsIn];
        // Insert the amount at the corresponding index
        newAmountsIn[index] = parseEther(tokenInputAmount);
        console.log(newAmountsIn);

      const { to, data, minBPTOut } = pool.buildJoin(
        address,
        ComposableStablePool,
        newAmountsIn,
        slippage
      )
      console.log(data);
      

      //Calculate price impact
      const priceImpact = await pool.calcPriceImpact(newAmountsIn, minBPTOut, true)
      console.log("Price Impact from the JOIN: " + priceImpact );

      //Submit join tx
      const transactionResponse = await signer.sendTransaction({
        to,
        data,
        // gasPrice: '6000000000', // gas inputs are optional
        // gasLimit: '2000000', // gas inputs are optional
      });

      await transactionResponse.wait()

    }
    else{
      console.log("Index of tokenAddress is -1")
    }
  }
 }

  async function handleWithdrawal(){
    console.log("Withdrawal Initiated");
    if(ComposableStablePool.includes(tokenInputAddr)){
      const slippage = '1000' // 10%
      const pool = await balancer.pools.find('0x1049cd39f9ab0cd9abe9df16db4cf882ea9dd918000000000000000000000644');
      if (!pool) throw Error('Pool not found');

      const index = ComposableStablePool.findIndex((address) => address == tokenInputAddr);
      console.log(index)

      if (index !== -1) {
        // Create a new array with the same elements as tokenAmounts
        let newAmountsOut = [...amountsOut];
        // Insert the amount at the corresponding index
        newAmountsOut[index] = parseEther(tokenInputAmount);
        console.log(newAmountsOut);

          // We are exiting all the BPT to a single token out
      const { to, data, expectedAmountsOut } = pool.buildExitExactTokensOut(
        address,
        ComposableStablePool,
        newAmountsOut,
        slippage
      )

      console.log("EXPECTED TOKENS OUT: " + expectedAmountsOut);

      // Send transaction
      await (
        await signer.sendTransaction({ to, data })
      ).wait()
    }
  }

  else if(WeightedPool.includes(tokenInputAddr)){
    const slippage = '1000' // 10%
    const pool = await balancer.pools.find('0x41e9a01b90a5e0a4744c5244b6403c386883eb2000010000000000000000080b');
    if (!pool) throw Error('Pool not found');

    const index = WeightedPool.findIndex((address) => address == tokenInputAddr);
    console.log(index)

    if (index !== -1) {
      // Create a new array with the same elements as tokenAmounts
      let newAmountsOut = [...amountsOut];
      // Insert the amount at the corresponding index
      newAmountsOut[index] = parseEther(tokenInputAmount);
      console.log(newAmountsOut);

        // We are exiting all the BPT to a single token out
    const { to, data, expectedAmountsOut } = pool.buildExitExactTokensOut(
      address,
      ComposableStablePool,
      newAmountsOut,
      slippage
    )

    console.log("EXPECTED TOKENS OUT: " + expectedAmountsOut);

    // Send transaction
    await (
      await signer.sendTransaction({ to, data })
    ).wait()
  }
}
    

  }

  async function handleApprove(){
    //approveToken?.();
    console.log("Approving");
    try {
      const token = new ethers.Contract(
        tokenInputAddr,
        ERC20ABI,
        signer
      )
      const tx = await token.approve(contracts.vault.address, parseEther(tokenInputAmount))
      await tx.wait()
    } catch (error) {
      console.log('error: ', error)
    }
  }


    return (

<div>



<SimpleGrid columns={1} spacing={10}>

<Box bg='transparent' height='20px'></Box>

<Center>
<Flex >
<Text  p='1' fontSize='4xl' color='white'>The </Text> 
<Text p='1' fontSize='4xl' color='#C9E265'> [liquidity] </Text>
<Text  p='1' fontSize='4xl' color='white'>pool </Text> 
</Flex>
</Center>


<Center>
<Box bg='brand.300' height='680px' w='1183px' borderRadius='3xl'  boxShadow='inner-lg' p='4'>

<VStack  spacing={8} >

<Box bg='transparent' height='10px'  ></Box>

<Box  boxShadow='dark-lg' borderRadius='2xl'>
<Select placeholder='Select Token' id='tokenInput' textAlign='Center' borderRadius='2xl' bg='white'  variant='filled' w='350px' h='76px' fontSize='25px'  textColor='black' onInput={handleTokenAddress} >
<option value='0x750c48A49CC4F71c1B3b8d3D763D40Ea1D973b7C'>BCT</option>
  <option value='0xC0a957D9ce9c230541Bcb82653838d619a85fB1f'>NCT</option>
  <option value='0xb21583D10795e4Cd6de1873E7f13678D8eAd6e40'>MCO2</option>
  <option value='0x42AF277712cA92b627a1b896Fa395408BBe0b816'>USDC</option>
  <option value='0x3D3F83BdAFDbAFE3E1ceb33bd1F93B62c4C40E13'>TCT</option>
  <option value='0x1049cD39F9aB0CD9abe9dF16dB4cF882ea9dd918'>PTCSP (BCT-NCT-MCO2)</option>
  
</Select>
</Box>
<Text style={{ fontWeight: 'bold', color: 'white', fontSize: 22 }}>
  Total Deposits: <br></br>BCT = {underlyingBalances[0]} | MCO2 = {underlyingBalances[1]} | NCT = {underlyingBalances[2]} <br></br>
  PTCSP (BCT-MCO2-NCT) = {underlyingBalances[3]} | TCT = {underlyingBalances[4]} | USDC = {underlyingBalances[5]}
</Text>
<Box bg='transparent' height='1px'  ></Box>

<Flex>


<Box   boxShadow='inner-dark-lg' borderRadius='3xl'>
  <Box variant='solid' borderRadius='2xl' w='450px' h='76px' bg='lblack.100' borderColor="black" fontSize='25px' textColor='white'>
     <Center> <Text p='5' as='b'>Add Liquidity</Text></Center>
  </Box>
</Box>
  <Box bg='transparent' w='150px'  ></Box>

  <Box  boxShadow='inner-dark-lg' borderRadius='3xl'>
  <Box variant='solid' borderRadius='2xl' w='450px' h='76px' bg='lblack.100' borderColor="black" fontSize='25px' textColor='white'>
     <Center> <Text p='5' as='b'>Remove Liquidity</Text></Center>
  </Box>
  </Box>
</Flex>

<Flex>
<Box  boxShadow='dark-lg' borderRadius='3xl'>
<Input placeholder='0.0' textAlign='right' borderRadius='2xl' bg='lblack.100'  variant='filled' w='450px' h='76px' fontSize='35px'  textColor='white' onChange={(e) => setTokenInputAmount(e.target.value)}/>
</Box>

<Box bg='transparent' w='150px'  ></Box>

<Box  boxShadow='dark-lg' borderRadius='3xl'>
<Input placeholder='0.0' textAlign='right' borderRadius='2xl' bg='lblack.100'  variant='filled' w='450px' h='76px' fontSize='35px' textColor='white' onChange={(e) => setTokenInputAmount(e.target.value)}/>
</Box>
</Flex>

<Flex>
<Box  boxShadow='dark-lg' borderRadius='3xl'>
<div>
      {tokenAllowance >= tokenInputAmount ? (
          <Button bg='Green' variant='solid' w='450px' h='76px' fontSize='30px' borderRadius='2xl' textColor='white' onClick={handleDeposit}>Deposit</Button>

      ) : (
        <Button bg='Green' variant='solid' w='450px' h='76px' fontSize='30px' borderRadius='2xl' textColor='white' onClick={handleApprove}>Approve</Button>
        )}
      {/* <Button bg='Green' variant='solid' w='450px' h='76px' fontSize='30px' borderRadius='2xl' textColor='white' onClick={handleDeposit}>Deposit</Button> */}

</div>

</Box>

<Box bg='transparent' w='150px'  ></Box>

<Box  boxShadow='dark-lg' borderRadius='3xl'>
<Button bg='maroon' variant='solid'  w='450px' h='76px' fontSize='30px' borderRadius='2xl' textColor='white' onClick={handleWithdrawal} >
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