

import TopNav from '../../components/TopNav'
import BottomNav from '../../components/BottomNav'
import DashSideNav from '../../components/DashSideNav'


import {

    Box,Button,Spacer,
    Image, Flex,  HStack , chakra , Stack, Center, VStack,Text,
  
  } from '@chakra-ui/react'



function DashHome() {


return (

  <div>
 
<TopNav/>

<DashSideNav/>

<BottomNav/>

</div>

)
}

export default DashHome