import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Img,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { pizzaMenuList } from "./Pizza";
import veg from "../Assets/veg.png";
import nonveg from "../Assets/nonveg.png";

import { StarIcon } from "@chakra-ui/icons";
import { addItem } from "../Utils/CartSlice";
import { useDispatch } from "react-redux";

const PizzaList = () => {
  const disptach = useDispatch();
  const [size, setSize] = useState([{ id: "", price: "" }]);
  const [menuList, setMenuList] = useState(pizzaMenuList);
  const ChangePrice = (id, value) => {
    setSize([...size, { id: id, price: value }]);
    console.log(value);
    document.getElementById(id).innerHTML = `₹ ${value}`;
  };
  useEffect(() => {
    setMenuList(pizzaMenuList);
  }, []);

  const addToCart = ({ title, description, id, imageUrl, price }) => {
    let finalPrice = filterPrice(id);
    if (!finalPrice || finalPrice === "undefined") {
      finalPrice = price;
    }
    disptach(
      addItem({
        id,
        title,
        description,
        imageUrl,
        qty: 1,
        price: Number(finalPrice),
      })
    );
  };

  const filterPrice = (id) => {
    const FilterPrice = size.filter((data) => {
      return data.id === id;
    });

    const price = FilterPrice.map((data) => {
      return data.price;
    });
    const length = price.length - 1;
    return price[length];
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        {menuList.map((data) => (
          <Card
            w={["200px", "200px", "200px", "xs"]}
            margin={"10px"}
            key={data?.id}
          >
            <CardBody>
              <Img
                borderRadius={"md"}
                objectFit={"cover"}
                src={data?.imageUrl}
              />
              <HStack
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <Heading mt={2} fontSize={"medium"}>
                  {data?.title}
                </Heading>
                <Text id={data?.id} fontSize={"medium"} fontWeight={"semibold"}>
                  ₹ {data?.price}
                </Text>
              </HStack>

              <Text
                mt={2}
                color={"gray.500"}
                fontSize={"xs"}
                fontWeight={"medium"}
              >
                {data?.description}
              </Text>

              <HStack
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <Img
                  mt={1}
                  w={"20px"}
                  src={data?.category === "VEG" ? veg : nonveg}
                />
                <Box>
                  {[...Array(data?.rating).keys()].map((rate) => (
                    <StarIcon
                      m={1}
                      color={data?.rating >= 3 ? "green.400" : "red"}
                    />
                  ))}
                </Box>
              </HStack>

              <Select
                fontWeight={"medium"}
                bgColor={"whiteAlpha.900"}
                onChange={(e) => ChangePrice(data.id, e.target.value)}
                mt={2}
              >
                {data?.size.map((sizes, id) => (
                  <>
                    <option key={id} value={sizes.price}>
                      {sizes?.type}
                    </option>
                  </>
                ))}
              </Select>
            </CardBody>
            <CardFooter>
              <Button
                onClick={() => addToCart(data)}
                color={"green.500"}
                textTransform={"uppercase"}
                fontSize={"xs"}
              >
                add to cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default PizzaList;
