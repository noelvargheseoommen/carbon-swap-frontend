import { db } from "../../../config/firebase";
import { ref, onValue } from "firebase/database";
import TopNav from "../../../components/TopNav";
import BottomNav from "../../../components/BottomNav";
import DashSideNav from "../../../components/DashSideNav";

import {
  Box,
  Button,
  Spacer,
  Image,
  Flex,
  HStack,
  chakra,
  Stack,
  Center,
  VStack,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function DashProfile() {
  const [data, setData] = useState({});

  useEffect(() => {
    const value = onValue(
      ref(db, "/vehicles"),
      (snapshot) => {
        const vehicles = snapshot.val();
        vehicles ? setData(vehicles) : null;
        // console.log(vehicles);
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  return (
    <div>
      <TopNav />

      <Box h="60px"></Box>

      <HStack spacing="90px">
        <DashSideNav />

        <Box
          boxShadow="inner-dark-lg"
          borderRadius="2xl"
          variant="solid"
          bg="brand.200"
          h="100%"
          w="70%"
        >
          <Stack spacing={5}>
            <Box></Box>
            <Text fontSize="3xl" as="b">
              Profile
            </Text>

            <Text fontSize="3xl" as="b">
              Welcome!
            </Text>

            <HStack>
              <Box w="5%"></Box>
              <Text fontSize="3xl" as="b" align="left">
                Your Vehicles
              </Text>
            </HStack>

            <Center>
              <Box
                boxShadow="inner-dark-lg"
                borderRadius="2xl"
                variant="solid"
                bg="lblack.100"
                h="100%"
                w="90%"
              >
                <TableContainer>
                  <Table variant="simple" size="lg" textColor="white">
                    <Thead textColor="white">
                      <Tr>
                        <Th textColor="white">Reg.no</Th>
                        <Th textColor="white">Name</Th>
                        <Th textColor="white">Type</Th>
                        <Th textColor="white">Carbon</Th>
                        <Th textColor="white"></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Object.keys(data).map((key) => (
                        <Tr key={key}>
                          <Td>{key}</Td>
                          <Td>{data[key].name}</Td>
                          <Td>{data[key].type}</Td>
                          <Td>{data[key].carbon}</Td>
                          <Td><Button bg='black' color='brand.100' variant='filled' >OFFSET</Button></Td>
                        </Tr>
                      ))}
                      {/* <Tr>
                        <Td>KL2745</Td>
                        <Td>Toyota</Td>
                        <Td>Semi Truck</Td>
                        <Td>46.2</Td>
                      </Tr>
                      <Tr>
                        <Td>KL7894</Td>
                        <Td>VOLVO</Td>
                        <Td>Bus</Td>
                        <Td>89.2</Td>
                      </Tr>
                      <Tr>
                        <Td>KL7565</Td>
                        <Td>Honda</Td>
                        <Td>Car</Td>
                        <Td>76.9</Td>
                      </Tr> */}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Center>

            <Box h="50px"></Box>
          </Stack>
        </Box>
      </HStack>

      <Box h="250px"></Box>

      <BottomNav />
    </div>
  );
}

export default DashProfile;
