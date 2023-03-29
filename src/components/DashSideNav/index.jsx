

import {
    Box,
    Button,
    Spacer,
    Image, Flex,  HStack , chakra , Stack, Center, VStack,Text,
  
  } from '@chakra-ui/react'



function DashSideNav() {


return (
<div>
 
<Stack>

<Box bg='transparent' h='70px'></Box>

<Flex>

<Box bg='transparent' w='40px'></Box>

<Box  boxShadow='inner-dark-lg' borderRadius='2xl' variant='solid' bg='brand.100' h='450px' w='300px'>

<Stack spacing={5}>

<Box h='10px'></Box>

<Center>
<Box>
<Button w='250px' h='50px' >
Profile
</Button>
</Box>
</Center>

<Button>
View Vehicle
</Button>

</Stack>

</Box>
</Flex>

<Box bg='transparent' h='70px'></Box>

</Stack>

</div>
)
}

export default DashSideNav