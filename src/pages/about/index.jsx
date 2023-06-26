import { useState } from 'react'

import DashTopNav from '../../components/DashTopNav'
import BottomNav from '../../components/BottomNav'

import {
  Box,
  Button,
  ButtonGroup,
  Spacer,
  Image, Flex,  VStack , chakra , Heading, Center, Text

} from '@chakra-ui/react'




function About() {
  

  return (

   
    <div className="swap">

<DashTopNav/>

<Center>

<Box h='400px'></Box>

<Box h='200px' w='1500px'>

<VStack  spacing={5} >

<Heading as='h2' size='xl' color={'brand.100'}>
THE [CARBON] SWAP
</Heading>


<Text fontSize='2xl' color={'brand.100'}>
It is a well-known fact that CO2 emissions contribute to global warming and climate change, which can have serious impacts and consequences for people and the environment. All countries and corporations are trying to reduce their carbon emissions and move towards a net-zero carbon future. Carbon markets were established for this very purpose. Regulated carbon markets are markets where governments create a cap on net carbon emissions and provide carbon emission limits for corporations as permits. Carbon trading is the process of buying and selling permits and credits that enable permit holders to emit carbon dioxide. However, there are many limitations and problems faced by participants in the carbon markets such as lack of transparency, double counting and proper methods for tracking carbon emissions.
We plan on incorporating blockchain into  carbon markets, by tokenizing carbon emissions and creating a voluntary peer to peer carbon trading platform. Which can reduce carbon footprint while solving the issues and limitations of conventional regulated carbon markets.
</Text>

<Text fontSize='2xl' color={'brand.100'}>
Blockchain technology can provide a solution by monitoring and reporting emissions reductions for transactions, eliminating double counting problems, improving financial flows and helping build trust. It can help in enabling individuals to take part in a carbon-free future through the currently sealed off mandatory market. Millions of people around the world are eager to create an ecologically responsible future, and blockchain can facilitate this by unlocking the door for everyone to participate in the goal of a carbon-neutral future.
</Text>


</VStack>

</Box>

</Center>

<Box h='450px'></Box>

<BottomNav/>

    </div>
  )
}

export default About
