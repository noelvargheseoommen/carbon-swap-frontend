import "./index.css";
import ConnectButton from "../ConnectButton/index.jsx";

import {
  Box,
  Button,
  Center,
  Image,
  Stack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

function TopNav() {
  return (

    <Center>
    <Box  bgGradient='linear(to-b,#c9e265, #000000)' height='90px' width='100%'>
      <Stack spacing={800} direction="row" align="center">
        <Image
          height="90px"
          src=".\src\assets\images\logo2.jpeg"
          alt="c02 icon"
        />
<Center>
        <Stack spacing={4} direction="row" align="center" >
      
           <Link to="/" className="nav-router-link">
          <Button colorScheme="transparent"  size="lg">
            Home
            </Button>
           </Link>
          
             <Link to="/swap" className="nav-router-link">
          <Button colorScheme="transparent"  size="lg">
            {/* Styling is applied to link in the css file */}
         
              {/* change url to /swap without causing the entire app reload */}
              {/* Always use Link tag instead of <a> tag */}
              Swap
          </Button>
             </Link>

          <Button colorScheme="transparent" size="lg">
            Dashboard
          </Button>
         


        </Stack>
        </Center>
      </Stack>
    </Box>
  </Center>
  );
}

export default TopNav;
