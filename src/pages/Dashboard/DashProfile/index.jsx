import { db } from "../../../config/firebase";
import { ref, onValue } from "firebase/database";
import TopNav from "../../../components/TopNav";
import BottomNav from "../../../components/BottomNav";
import DashSideNav from "../../../components/DashSideNav";

import {
  Box,
  Button,
  Spacer,
  Image,
  Flex,
  HStack,
  chakra,
  Stack,
  Center,
  VStack,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useAccount, usePrepareContractWrite, useContractWrite, useSigner, useContractRead } from 'wagmi'
import { BalancerSDK,  Network, SwapTypes, SwapType, Swaps} from '@balancer-labs/sdk';
import {parseEther, parseUnits, formatEther} from 'viem';
import ERC20ABI from '../../../assets/images/abi/ERC20.json';
import { ethers } from 'ethers';
import { parse } from "dotenv";
import { key } from "localforage";

function DashProfile() {

  const config = {
    network: 5,
    rpcUrl: `https://goerli.infura.io/v3/5ad6baed6e324423b49bc2c9c1b5e5e6`,
  };
  
  const { address } = useAccount();
  const balancer = new BalancerSDK(config);
  
  const [tokenAIn, setTokenAIn] = useState(0);
  const [tokenBOut, setTokenBOut] = useState(0);
  const [tokenInAddr, setTokenInAddr] = useState("0x42AF277712cA92b627a1b896Fa395408BBe0b816");//usdc
  const [tokenOutAddr, setTokenOutAddr] = useState("0x3D3F83BdAFDbAFE3E1ceb33bd1F93B62c4C40E13");//tct
  const [allowance, setAllowance] = useState(0);
  const [ptscpToken, setPtcsp] = useState("0x1049cD39F9aB0CD9abe9dF16dB4cF882ea9dd918");
  const [balance, setBalance] = useState(0);

  const { swaps, contracts,pricing} = balancer;
  const { data: signer, isError, isLoading } = useSigner();

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

  async function handleOffset(tokenAInput, key){
    setTokenAIn(tokenAInput);
    console.log(tokenAInput);
    //approval
    console.log("Approving");
    console.log("TOKEN A INPUT: " + tokenAInput);
    try {
      const token1 = new ethers.Contract(
        tokenInAddr,
        ERC20ABI,
        signer
      )
      const tx1 = await token1.approve(contracts.vault.address, parseEther(String(tokenAInput)))
      await tx1.wait() }
       catch (error) {
        console.log('error: ', error)
      }
    ////swap
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
          amount: parseEther(String(tokenAInput)),
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
      limits: ['0', parseEther(String(tokenAInput)), '0'], // +ve for max to send, -ve for min to receive
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
    })

    const price = await handleSpotPrice(tokenAInput);
    
    ///burn
    try{
      const token2 = new ethers.Contract(
        tokenOutAddr,
        ERC20ABI,
        signer
      )
      const tx2 = await token2.burn(parseEther(String(price)))
      await tx2.wait()
    } catch (error) {
      console.log('error: ', error)
    }

     //ref.child("db").child("vehicle").child("carbon").setValue("0");

     const updates = {};
  
     updates['/vehicles/' + key + '/carbon'] = 0;
   
     return update(ref(db), updates);

  }

  async function handleSpotPrice(tokenAInput){
    const spotPrice = await pricing.getSpotPrice(tokenInAddr, tokenOutAddr);
      console.log('spotPrice', spotPrice.toString());
        let tokenB = spotPrice * tokenAInput;
        setTokenBOut(tokenB);
        console.log(tokenBOut);
        return(spotPrice*tokenAInput);
  }





  const [data, setData] = useState({});

  useEffect(() => {
    const value = onValue(
      ref(db, "/vehicles"),
      (snapshot) => {
        const vehicles = snapshot.val();
        vehicles ? setData(vehicles) : null;
        // console.log(vehicles);
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  return (
    <div>
      <TopNav />

      <Box h="60px"></Box>

      <HStack spacing="90px">
        <DashSideNav />

        <Box
          boxShadow="inner-dark-lg"
          borderRadius="2xl"
          variant="solid"
          bg="brand.200"
          h="100%"
          w="70%"
        >
          <Stack spacing={5}>
            <Box></Box>
            <Text fontSize="3xl" as="b">
              Profile
            </Text>

            <Text fontSize="3xl" as="b">
              Welcome!
            </Text>

            <HStack>
              <Box w="5%"></Box>
              <Text fontSize="3xl" as="b" align="left">
                Your Vehicles
              </Text>
            </HStack>

            <Center>
              <Box
                boxShadow="inner-dark-lg"
                borderRadius="2xl"
                variant="solid"
                bg="lblack.100"
                h="100%"
                w="90%"
              >
                <TableContainer>
                  <Table variant="simple" size="lg" textColor="white">
                    <Thead textColor="white">
                      <Tr>
                        <Th textColor="white">Reg.no</Th>
                        <Th textColor="white">Name</Th>
                        <Th textColor="white">Type</Th>
                        <Th textColor="white">Carbon</Th>
                        <Th textColor="white"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Object.keys(data).map((key) => (
                        <Tr key={key}>
                          <Td>{key}</Td>
                          <Td>{data[key].name}</Td>
                          <Td>{data[key].type}</Td>
                          <Td>{data[key].carbon}</Td>
                          <Td><Button bg='black' color='brand.100' variant='filled' onClick={() => handleOffset(data[key].carbon, key)} >OFFSET</Button></Td>
                        </Tr>
                      ))}
                      {/* <Tr>
                        <Td>KL2745</Td>
                        <Td>Toyota</Td>
                        <Td>Semi Truck</Td>
                        <Td>46.2</Td>
                      </Tr>
                      <Tr>
                        <Td>KL7894</Td>
                        <Td>VOLVO</Td>
                        <Td>Bus</Td>
                        <Td>89.2</Td>
                      </Tr>
                      <Tr>
                        <Td>KL7565</Td>
                        <Td>Honda</Td>
                        <Td>Car</Td>
                        <Td>76.9</Td>
                      </Tr> */}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Center>

            <Box h="50px"></Box>
          </Stack>
        </Box>
      </HStack>

      <Box h="250px"></Box>

      <BottomNav />
    </div>
  );
}

export default DashProfile;
