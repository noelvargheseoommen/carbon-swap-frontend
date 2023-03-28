import { ConnectButton } from '@rainbow-me/rainbowkit'

import {
  Box,
  Button,
  Center,
  Image,
  Stack,
  Flex,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";


function TopNav() {
  return (

    <Center>
    <Box  bgGradient='linear(to-b,#c9e26561, #000000)' height='120px' width='100%'>
      <Stack spacing={900} direction="row" align="center">

      <Link to="/" className="nav-router-link">
        <Image
          height="90px"
          src=".\src\assets\images\logo2.jpeg"
          alt="c02 icon"
        />
        </Link>
<Center>
<Stack spacing={2} direction="row" align="center" >
        <Stack spacing={0} direction="row" align="center" >
      
        
          
             <Link to="/swap" className="nav-router-link">
          <Button colorScheme="transparent"  size="lg">
            {/* Styling is applied to link in the css file */}
         
              {/* change url to /swap without causing the entire app reload */}
              {/* Always use Link tag instead of <a> tag */}
              Swap
          </Button>
             </Link>


             <Link to="/liquidity" className="nav-router-link">
          <Button colorScheme="transparent" size="lg">
          [carbon]Pools
          </Button>
          </Link>

          <Link to="/dashboard" className="nav-router-link">
          <Button colorScheme="transparent" size="lg">
            Dashboard
          </Button>
          </Link>


        </Stack>
        <Center>
        <Flex gap={500}>
          
          <Box/>
        < ConnectButton />
        
        </Flex>
        </Center>
        </Stack>
        </Center>

      
       

        
        

      </Stack>
    </Box>
  </Center>
  );
}

export default TopNav;
