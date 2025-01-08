import { Button, Container, Flex, HStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Link } from "react-router-dom";
import { ColorModeButton } from "./ui/color-mode";
import { FaRegPlusSquare } from "react-icons/fa";

const linkStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  textAlign: "center",
  color: "transparent",
  background: "linear-gradient(#26C6DA, #2196F3)",
  backgroundClip: "text",
};

const buttonStyle = {
  height: "2.5rem",
  width: "2.5rem",
};

const iconStyle = {
  height: "1.6rem",
  width: "1.6rem",
};

const Navbar = () => {
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Link to={"/"} style={linkStyle}>
          Product Store 🛒
        </Link>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button
              style={buttonStyle}
              color={useColorModeValue("gray.800", "gray.100")}
              backgroundColor={useColorModeValue("gray.100", "gray.900")}
            >
              <FaRegPlusSquare style={iconStyle} />
            </Button>
          </Link>
          <ColorModeButton />
        </HStack>
      </Flex>
    </Container>
  );
};
export default Navbar;
