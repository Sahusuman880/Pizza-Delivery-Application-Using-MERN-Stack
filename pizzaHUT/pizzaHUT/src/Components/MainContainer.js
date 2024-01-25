import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import PizzaList from "./PizzaList";
import Cart from "./Cart";

const MainContainer = () => {
  return (
    <Stack w={"100%"} flexDirection={"row"}>
      <Box w={"8xl"}>
        <PizzaList />
      </Box>
      <Box p={2} w={"xl"}>
        <Cart />
      </Box>
    </Stack>
  );
};

export default MainContainer;
