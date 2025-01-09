import {
  Box,
  Heading,
  Image,
  Text,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import React from "react";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster";

function ProductCard({ product }) {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct } = useProductStore();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transtion="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton backgroundColor="cyan.300">
            <FaRegEdit />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteProduct(product._id)}
            backgroundColor="red.300"
          >
            <MdDelete />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
}

export default ProductCard;
