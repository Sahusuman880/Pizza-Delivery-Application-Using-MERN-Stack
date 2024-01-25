import {
  Box,
  Container,
  Heading,
  Img,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { pizzaMenuList } from "./Pizza";

const Gallery = () => {
  return (
    <Container mt={"5rem"} maxW={"container.xl"}>
      <Heading textAlign={"center"} fontSize={["3xl", "5xl"]}>
        <span className="yummy-welcome">Yummy...</span> Pizza
      </Heading>
      <Tabs position="relative" variant="unstyled">
        <TabList display={"flex"} justifyContent={"center"}>
          <Tab>Veg</Tab>
          <Tab>Nonveg</Tab>
          <Tab>Miscellaneous</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel
            justifyContent={"center"}
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"wrap"}
          >
            {pizzaMenuList
              .filter((data) => {
                return data?.category === "VEG";
              })
              .map((data) => (
                <Box className="gall-container" key={data?.id}>
                  <Img
                    shadow={"lg"}
                    w={["220px", "340px"]}
                    h={["120px", "220px"]}
                    m={2}
                    borderRadius={"md"}
                    src={data?.imageUrl}
                  />
                  <Text
                    borderRadius={"md"}
                    shadow={"md"}
                    textAlign={"center"}
                    w={"200px"}
                    className="text-abs"
                    m={2}
                    fontSize={"sm"}
                    fontWeight={"bold"}
                    p={2}
                    color={"black"}
                    bgColor={"white"}
                  >
                    {data?.title}
                  </Text>
                </Box>
              ))}
          </TabPanel>
          <TabPanel
            justifyContent={"center"}
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"wrap"}
          >
            {pizzaMenuList
              .filter((data) => {
                return data?.category === "NONVEG";
              })
              .map((data) => (
                <Box className="gall-container" key={data?.id}>
                  <Img
                    shadow={"lg"}
                    w={["220px", "340px"]}
                    h={["120px", "220px"]}
                    m={2}
                    borderRadius={"md"}
                    src={data?.imageUrl}
                  />
                  <Text
                    borderRadius={"md"}
                    shadow={"md"}
                    textAlign={"center"}
                    w={"200px"}
                    fontSize={"sm"}
                    fontWeight={"bold"}
                    className="text-abs"
                    m={2}
                    p={2}
                    color={"black"}
                    bgColor={"white"}
                  >
                    {data?.title}
                  </Text>
                </Box>
              ))}
          </TabPanel>
          <TabPanel
            justifyContent={"center"}
            display={"flex"}
            flexDirection={"row"}
            flexWrap={"wrap"}
          >
            {pizzaMenuList.map((data) => (
              <Box className="gall-container" key={data?.id}>
                <Img
                  shadow={"lg"}
                  w={["220px", "340px"]}
                  h={["120px", "220px"]}
                  m={2}
                  borderRadius={"md"}
                  src={data?.imageUrl}
                />
                <Text
                  borderRadius={"md"}
                  shadow={"md"}
                  textAlign={"center"}
                  w={"200px"}
                  fontSize={"sm"}
                  fontWeight={"bold"}
                  className="text-abs"
                  m={2}
                  p={2}
                  color={"black"}
                  bgColor={"white"}
                >
                  {data?.title}
                </Text>
              </Box>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Gallery;
