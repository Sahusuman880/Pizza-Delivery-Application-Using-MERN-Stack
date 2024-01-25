import { Box, Text, Heading, Img, Input } from "@chakra-ui/react";
import React from "react";
import r1 from "../Assets/r1.png";
import r2 from "../Assets/r2.png";
import or from "../Assets/order-img.jpg";
import s1 from "../Assets/step-1.png";
import s2 from "../Assets/step-2.png";
import s3 from "../Assets/step-3.png";
import s4 from "../Assets/step-4.png";
const Footer = () => {
  return (
    <Box
      bgColor={"whiteAlpha.100"}
      shadow={"lg"}
      textAlign={"center"}
      className="footer"
    >
      <Box>
        <Heading>how it works</Heading>
        <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
          <Box
            m={5}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Img objectFit={"cover"} w={200} src={s1} />
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Choose your favorite food
            </Text>
          </Box>
          <Box
            m={5}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Img objectFit={"cover"} w={200} src={s2} />
            <Text fontWeight={"bold"} fontSize={"xl"}>
              Free and fast delivery
            </Text>
          </Box>
          <Box
            m={5}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Img objectFit={"cover"} w={200} src={s3} />
            <Text fontWeight={"bold"} fontSize={"xl"}>
              Easy payments methods
            </Text>
          </Box>
          <Box
            m={5}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Img objectFit={"cover"} w={200} src={s4} />
            <Text fontWeight={"bold"} fontSize={"xl"}>
              & finally, enjoy your food
            </Text>
          </Box>
        </Box>
      </Box>
      <section className="order" id="order">
        <Heading>Order Now </Heading>

        <div className="row">
          <div className="image">
            <img src={or} alt="" />
          </div>

          <form action="">
            <div className="inputBox">
              <input type="text" placeholder="First Name" maxW='220px'/>
              <input type="text" placeholder="Last name" />
            </div>

            <div className="inputBox">
              <input type="number" placeholder="Number" />
              <input type="email" placeholder="Email" />
            </div>

            <textarea
              placeholder="Enter your address "
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>

            <input type="submit" value="Place your Order" class="btn" />
          </form>
        </div>
      </section>
      <div class="credit">
        Created by <span>Suman </span> || all right reserved || <span> ©2023 </span> 
        Copyright
      </div>
    </Box>
  );
};

export default Footer;
