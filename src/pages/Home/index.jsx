
import { Link } from "react-router-dom";
import DashTopNav from '../../components/DashTopNav'
import BottomNav from '../../components/BottomNav'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import {
    ChakraProvider,
    Box,
    Button,
    ButtonGroup,
    Spacer,
    Image, Flex,  HStack , chakra , Stack, Center, VStack,Text, SimpleGrid,
  
  } from '@chakra-ui/react'



function Home() {


return (

  <div className="home">
 
  <DashTopNav/>

  

<Center>


<Box height='100px'> </Box>
<VStack   spacing={4}  align='stretch'>
<Box height='50px'> </Box>
<Center>
<Image  boxSize='190px' align='center' src='src\assets\images\carbon-neutral.png' alt='Carbon Neutral' />
</Center>

<Box height='35px'> </Box>

<Flex >
<Text  p='1' fontSize='4xl' color='white'>Enter the World of </Text> 
<Text p='1' fontSize='4xl' color='#C9E265'> [carbon] </Text>
<Text p='1' fontSize='4xl' color='white'> swap and help</Text>
</Flex>

<Center>
<Flex >
<Text  p='1' fontSize='4xl' color='white'>reduce global </Text> 
<Text p='1' fontSize='4xl' color='#C9E265'> [carbon] </Text>
<Text p='1' fontSize='4xl' color='white'> emissons</Text>
</Flex>
</Center>
<Box height='30px'> </Box>

<Link to="/swap" className="nav-router-link">
<Button colorScheme="blue"  size="lg"  variant='solid'>Enter DAPP</Button>
</Link>

<Box height='20px'> </Box>

<Center>
<Flex  >
<Text   fontSize='6xl' color='#C9E265'>606,451,452 </Text> 

<Image  boxSize='70px' align='center' src='src\assets\images\co2.png' alt='CO2' />
</Flex>
</Center>




<Center>
<Flex >
<Text  p='1' fontSize='4xl' color='white'>Liquidity locked on the </Text> 
<Text p='1' fontSize='4xl' color='#C9E265'> [carbon] </Text>
<Text p='1' fontSize='4xl' color='white'> swap</Text>
</Flex>
</Center>

<Box height='40px'> </Box>

</VStack>

</Center>





<BottomNav/>

</div>

)
}

export default Home