

import {
    Box,
    Button,
    Spacer,Link,
    Image, Flex,  HStack , chakra , Stack, Center, VStack,Text,
  
  } from '@chakra-ui/react'



function DashSideNav() {


return (
<div>
 
<Stack>

<Box bg='transparent' h='70px'></Box>

<Flex>

<Box bg='transparent' w='40px'></Box>

<Box  boxShadow='inner-dark-lg' borderRadius='2xl' variant='solid' bg='brand.200' h='410px' w='300px'>

<Stack spacing={8}>

<Box h='15px'></Box>


<Center>
<Box boxShadow='dark-lg' borderRadius='xl' w='250px' h='55px'>
<Link to="/dashhome" className="nav-router-link">
<Button w='250px' h='55px' bg='lblack.100' textColor='white'borderRadius='xl' fontSize='19px' >
Profile
</Button>
</Link>
</Box>
</Center>

<Center>
<Box boxShadow='dark-lg' borderRadius='xl' w='250px' h='55px'>
<Button w='250px' h='55px' bg='lblack.100' textColor='white' borderRadius='xl' fontSize='19px'>
View Vehicles
</Button>
</Box>
</Center>

<Center>
<Box boxShadow='dark-lg' borderRadius='xl' w='250px' h='55px'>
<Button w='250px' h='55px' bg='lblack.100' textColor='white' borderRadius='xl' fontSize='19px'>
Add Vehicles
</Button>
</Box>
</Center>

<Center>
<Box boxShadow='dark-lg' borderRadius='xl' w='250px' h='55px'>
<Button w='250px' h='55px' bg='lblack.100' textColor='white' borderRadius='xl' fontSize='19px' >
History
</Button>
</Box>
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