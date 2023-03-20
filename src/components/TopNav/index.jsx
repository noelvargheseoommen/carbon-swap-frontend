import './index.css'

import {
  ChakraProvider,
  Box,
  Button,
  ButtonGroup,
  Spacer,
  Image, Flex,  HStack , chakra , Stack,

} from '@chakra-ui/react'



function TopNav() {

return (

<Box   bg='#C9E265 ' w='100%' p={4} color='white'   >  

<Stack spacing={800} direction='row' align='center'>

<Image height='90px' src='.\src\assets\images\logo2.jpeg' alt='c02 icon' />

<Stack spacing={4} direction='row' align='center'>

<button2 >
Home
</button2>
<button2 >
Swap
</button2>
<button2 colorScheme='teal' size='md'>
Dashboard
</button2>
<Button colorScheme='black' left='90%' >Connect</Button>

</Stack>

</Stack>

</Box>
)
}

export default TopNav