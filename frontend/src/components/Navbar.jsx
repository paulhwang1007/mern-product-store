import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
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

const size = {
  height: "1.25rem",
  width: "1.25rem",
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
            <FaRegPlusSquare style={size} />
          </Link>
          <ColorModeButton />
        </HStack>
      </Flex>
    </Container>
  );
};
export default Navbar;
