import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Img,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { DecQty, IncQty, clearCart, removeItem } from "../Utils/CartSlice";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const cartDetails = useSelector((state) => state?.cart?.cartItems);
  const removeItemFromCart = (id, price) => {
    dispatch(removeItem({ id, price }));
  };
  const totalPrice = cartDetails.reduce(
    (prev, curr) => prev + curr.price * curr.qty,
    0
  );
  const totalQty = cartDetails.reduce((prev, curr) => prev + curr.qty, 0);

  const doCheckOut = () => {
    console.log(user);
    if (user?.token || user?.token !== "undefined") {
      navigate("/checkout");
    } else {
      toast({
        description: "Please login to do checkout",
        status: "warning",
        position: "top-right",
      });
    }
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("tokenId")));
  }, []);
  console.log(user);
  return (
    <>
      {cartDetails.length > 0 ? (
        <Box
          shadow={"lg"}
          bgColor={"whiteAlpha.900"}
          w={"xs"}
          p={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <HStack borderBottomColor={"1px solid gray"}>
            <Heading color={"gray.600"} fontWeight={"md"}>
              Your Cart
            </Heading>
            <BsFillCartCheckFill size={40} style={{ color: "GrayText" }} />
          </HStack>
          {cartDetails && (
            <VStack p={2}>
              {cartDetails.map((data) => (
                <Box p={2} w={"xs"}>
                  <Img objectFit={"cover"} src={data.imageUrl} />

                  <Heading fontSize={"xs"}>{data.title}</Heading>
                  <Text id={data?.id} fontSize={"xs"} fontWeight={"semibold"}>
                    ₹ {data?.price}
                  </Text>
                  <Text
                    mt={2}
                    color={"gray.500"}
                    fontSize={"xs"}
                    fontWeight={"medium"}
                  >
                    {data?.description}
                  </Text>
                  <Text fontSize={"xs"} fontWeight={"medium"}>
                    Qty : {data?.qty}
                  </Text>
                  <Box
                    p={2}
                    display={"flex"}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button p={0} onClick={() => dispatch(IncQty(data))}>
                      <AiOutlinePlus size={20} />
                    </Button>
                    <Text p={2}>{data.qty}</Text>
                    {data.qty > 1 ? (
                      <Button p={0} onClick={() => dispatch(DecQty(data))}>
                        <AiOutlineMinus size={20} />
                      </Button>
                    ) : (
                      <Button
                        p={0}
                        onClick={() => removeItemFromCart(data.id, data.price)}
                      >
                        <AiFillDelete size={20} />
                      </Button>
                    )}
                  </Box>
                </Box>
              ))}
              {cartDetails.length >= 1 && (
                <Box>
                  <Heading fontWeight={"semibold"} fontSize="2xl">
                    Order Summary
                  </Heading>
                  <Divider m={2} />
                  <Box display={"flex"} justifyContent="space-between">
                    <Text>Quantity </Text>
                    <Text>{totalQty}</Text>
                  </Box>
                  <Box display={"flex"} justifyContent="space-between">
                    <Text>Price </Text>
                    <Text>₹ {totalPrice}</Text>
                  </Box>
                  <Divider size={"md"} />
                  <Box display={"flex"} justifyContent="space-between">
                    <Text fontWeight={"medium"}>TO PAY</Text>
                    <Text>₹ {totalPrice}</Text>
                  </Box>
                </Box>
              )}

              <Box>
                <Button
                  m={2}
                  onClick={() => dispatch(clearCart())}
                  colorScheme="red"
                >
                  Clear Cart
                </Button>

                <Button
                  m={2}
                  onClick={() => doCheckOut()}
                  colorScheme="green"
                  variant={"outline"}
                >
                  Check out
                </Button>
              </Box>
            </VStack>
          )}
        </Box>
      ) : (
        <Box>
          <Heading fontSize={["xl", "2xl"]} fontWeight={"medium"}>
            Your Cart is <span style={{ color: "#097969" }}>Empty!</span>
          </Heading>
          <Text
            mt={3}
            fontWeight={"medium"}
            fontSize="xs"
            color={"whiteAlpha.900"}
          >
            Looks like you haven't added anything to cart yet !!
          </Text>
        </Box>
      )}
    </>
  );
};

export default Cart;
