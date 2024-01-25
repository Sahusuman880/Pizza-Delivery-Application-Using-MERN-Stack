import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import homeImg from "../Assets/home.webp";
import Gallery from "./Gallery";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Container maxW={"container.xl"}>
      <HStack
        h={"35rem"}
        display={"flex"}
        justifyContent={"space-around"}
        flexDirection={["column", "column", "column", "row", "row"]}
        alignItems={"center"}
      >
        <Box>
          <Img w={[300, 400]} objectFit={"cover"} src={homeImg} />
        </Box>
        <Box w={["xs", "sm", "md"]}>
          <Heading fontSize={"5xl"} fontWeight={"extrabold"}>
            <span className="welcome">Welcome</span> to the world of Testy &
            Fresh food.
          </Heading>

          <Heading fontWeight={"medium"} mt={2} fontSize={"lg"}>
            <span className="better">Better Ingredients.</span> Better Pizza
          </Heading>

          <Link to={"/menu"}>
            <Button mt={"30px"} className="home-menu-button">
              Explore menu
            </Button>
          </Link>
        </Box>
      </HStack>

      <Gallery />
    </Container>
  );
};

export default Home;
