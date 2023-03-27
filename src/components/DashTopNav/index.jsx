import { ConnectButton } from '@rainbow-me/rainbowkit'

import {
  Box,
  Button,
  Center,
  Image,
  Stack,
  Flex,
  Spacer
} from "@chakra-ui/react";

import { Link } from "react-router-dom";


function DashTopNav() {
  return (

   
    <Box  bgGradient='linear(to-b,#c9e26561, #000000)' height='120px' width='100%'>
      <Stack spacing='40%' direction="row">

      <Link to="/" className="nav-router-link">
        <Image
          height="90px"
          src=".\src\assets\images\logo2.jpeg"
          alt="c02 icon"
        />
        </Link>

<Center>
           <Link to="/" className="nav-router-link">
          <Button colorScheme="transparent"  size="lg">
            Home
            </Button>
           </Link>
          

       
             <Link to="/about" className="nav-router-link">
          <Button colorScheme="transparent"  size="lg">
            {/* Styling is applied to link in the css file */}
         
              {/* change url to /swap without causing the entire app reload */}
              {/* Always use Link tag instead of <a> tag */}
              About
          </Button>
             </Link>
             </Center>

     
       
      



      </Stack>
    </Box>

  );
}

export default DashTopNav;
