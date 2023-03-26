

import TopNav from '../../components/TopNav'
import BottomNav from '../../components/BottomNav'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import {
    ChakraProvider,
    Box,
    Button,
    ButtonGroup,
    Spacer,
    Image, Flex,  HStack , chakra , Stack, Center, VStack,Text,
  
  } from '@chakra-ui/react'



function Home() {


return (

  <div className="home">
 
  <TopNav/>

  

<Center>


<Box height='100px'> </Box>
<VStack   spacing={4}  align='stretch'>
<Box height='80px'> </Box>
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


<Center>
  <ConnectButton/>
</Center>

<Box height='30px'> </Box>

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

<Box height='60px'> </Box>

</VStack>

</Center>


<BottomNav/>

</div>

)
}

export default Home