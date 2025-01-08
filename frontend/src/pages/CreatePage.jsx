import React, { useState } from "react";
import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        ></Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
