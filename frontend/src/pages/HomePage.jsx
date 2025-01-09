import React, { useEffect } from "react";
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/store/product";

const headerStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  textAlign: "center",
  color: "transparent",
  background: "linear-gradient(#26C6DA, #2196F3)",
  backgroundClip: "text",
};

function HomePage() {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.x1" py={12}>
      <VStack spacing={8}>
        <Text style={headerStyle}>Current Products 🚀</Text>

        <SimpleGrid columns={[1, 2, 3]} gap="20px" w="full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="#26C6DA"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}

export default HomePage;
