import { useCallback, useState } from "react";
import { db } from "../../../../config/firebase";
import { ref, set } from "firebase/database";
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
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

const initData = {
  name: "",
  regNo: "",
  type: "",
  carbon: "",
};
function AddVehicleForm() {
  const [data, setData] = useState(initData);
  const toast = useToast();
  const onDataChange = useCallback((e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSubmit = useCallback(async (e, data) => {
    e.preventDefault();
    // console.log(data);

    try {
      await set(ref(db, `vehicles/${data.regNo}`), {
        carbon: Number.parseFloat(data.carbon),
        name: data.name,
        type: data.type,
      });

      // console.log("db", db);
      toast({
        title: "Vehicle added successfully",
        // description: "",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Unable to add vehicle",
        // description: "",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, []);

  return (
    <div>
      <Center>
        <Box
          w="70%"
          h="20%"
          bg="lblack.100"
          borderRadius="15px"
          boxShadow="dark-lg"
        >
          <Box h="50px"></Box>

          <FormControl isRequired>
            <HStack spacing="20px">
              <Box w="7%"></Box>
              <Input
                bg="lblack.100"
                borderColor="white"
                variant="filled"
                placeholder="Vehicle Name"
                name="name"
                value={data["name"]}
                onChange={onDataChange}
                textAlign="left"
                fontSize="20px"
                w="40%"
                h="65px"
                borderRadius="2xl"
                textColor="white"
              />
              <Input
                bg="lblack.100"
                borderColor="white"
                variant="filled"
                placeholder="Registration No"
                name="regNo"
                value={data["regNo"]}
                onChange={onDataChange}
                textAlign="left"
                fontSize="20px"
                w="40%"
                h="65px"
                borderRadius="2xl"
                textColor="white"
              />
            </HStack>

            <Spacer></Spacer>
            <Box h="40px"></Box>

            <HStack spacing="20px">
              <Box w="7%"></Box>
              <Input
                bg="lblack.100"
                borderColor="white"
                variant="filled"
                placeholder="Vehicle Type"
                name="type"
                value={data["type"]}
                onChange={onDataChange}
                textAlign="left"
                fontSize="20px"
                w="40%"
                h="65px"
                borderRadius="2xl"
                textColor="white"
              />
              <Input
                bg="lblack.100"
                borderColor="white"
                variant="filled"
                placeholder="Carbon"
                name="carbon"
                value={data["carbon"]}
                onChange={onDataChange}
                textAlign="left"
                fontSize="20px"
                w="40%"
                h="65px"
                borderRadius="2xl"
                textColor="white"
              />
            </HStack>

            <Box h="40px"></Box>

            <Button
              w="350px"
              h="60px"
              bg="lblack.100"
              borderColor="white"
              textColor="white"
              borderRadius="xl"
              fontSize="22px"
              onClick={(e) => onSubmit(e, data)}
            >
              {" "}
              Submit{" "}
            </Button>
          </FormControl>

          <Box h="50px"></Box>
        </Box>
      </Center>
    </div>
  );
}

export default AddVehicleForm;
