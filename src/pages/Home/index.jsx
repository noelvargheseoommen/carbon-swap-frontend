import './index.css'

import TopNav from '../../components/TopNav'
import BottomNav from '../../components/BottomNav'


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

<Text  fontSize='6xl' color='#C9E265'>606,451,452 </Text> 

<Box height='80px'> </Box>
</VStack>

</Center>


<BottomNav/>

</div>

)
}

export default Home