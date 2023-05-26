

import {
    Box,
    Button,
    Spacer,
    Image, Flex,  HStack , chakra , Stack, Center, VStack,Text,
  
  } from '@chakra-ui/react'

  import { Link } from "react-router-dom";

function DashSideNav() {


return (
<div>
 
<Stack>

<Box bg='transparent' h='70px'></Box>

<Flex>

<Box bg='transparent' w='90px'></Box>

<Box  boxShadow='inner-dark-lg' borderRadius='2xl' variant='solid' bg='brand.200' h='240px' w='300px'>

<Stack spacing={8}>

<Box h='15px'></Box>


<Center>
<Link to="/dashprofile" className="nav-router-link">
<Box boxShadow='dark-lg' borderRadius='xl' w='250px' h='55px'>
<Button w='250px' h='55px' bg='lblack.100' textColor='white'borderRadius='xl' fontSize='19px' >
Profile
</Button>
</Box>
</Link>
</Center>


<Center>
<Link to="/dashaddvehicles" className="nav-router-link">
<Box boxShadow='dark-lg' borderRadius='xl' w='250px' h='55px'>
<Button w='250px' h='55px' bg='lblack.100' textColor='white' borderRadius='xl' fontSize='19px'>
Add Vehicles
</Button>
</Box>
</Link>
</Center>



<Box h='15px'></Box>

</Stack>

</Box>
</Flex>

<Box bg='transparent' h='70px'></Box>

</Stack>

</div>
)
}

export default DashSideNav