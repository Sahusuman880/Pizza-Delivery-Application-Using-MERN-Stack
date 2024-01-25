import {
  Box,
  Button,
  Img,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import logo from "../Assets/pizza.webp";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link, json, useLocation, useNavigate } from "react-router-dom";
import { logOutUser, loginUser } from "../Utils/UserSlice";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("tokenId")));
  const [isLogin, setIsLogin] = useState(true);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authData, setAuthData] = useState({
    userName: "",
    email: "",
    passWord: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const handleLogin = (e) => {
    setIsLogin(true);
  };
  const handleRegister = (e) => {
    setIsLogin(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLogin) {
      axios
        .post("http://localhost:8000/login", authData)
        .then((res) => {
          if (res.status === 200) {
            dispatch(loginUser(res.data));
            navigate("/menu");
            document.getElementById("close-btn").click();
            authData.email = "";
            authData.passWord = "";
            return;
          } else {
            toast({
              description: res?.response?.data,
              status: "error",
            });
            return;
          }
        })
        .catch((err) => {
          console.log(err);
          return toast({
            description: err?.response?.data?.message,
            status: "error",
          });
        });
    } else {
      if (!authData.phone.match(/^\d{10}$/)) {
        toast({
          description: "Invalid phone number",
          status: "warning",
        });
        return;
      }
      axios
        .post("http://localhost:8000/register", authData)
        .then((res) => {
          console.log(res.data.message);
          if (res.status === 200) {
            if (res?.data?.token) {
              toast({
                description:
                  "Your account has registered successfully, please login",
                status: "info",
              });
              setIsLogin(true);
              return;
            }
          } else {
            toast({
              description: res.data,
              status: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast({
            description: err.response?.data?.message,
            status: "error",
          });
        });
    }
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decode = jwtDecode(token);
      if (decode?.exp * 1000 < new Date().getTime()) {
        dispatch(logOutUser());
      }
    }
    setUser(JSON.parse(localStorage.getItem("tokenId")));
    if (isLogin) {
      setAuthData({
        ...authData,
        email: "",
        passWord: "",
        userName: "",
        phone: "",
      });
    }
  }, [isLogin, location, user]);
  const handleChanage = (event) => {
    setAuthData({ ...authData, [event.target.name]: event.target.value });
  };

  const profileData = useSelector((state) => state.user.userDetails);

  return (
    <Box
      shadow={"xl"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={5}
    >
      <Link to={"/"}>
        <Img objectFit={"cover"} w={"100px"} src={logo} />
      </Link>
      <Box>
        <Link to={"/"}>
          <Button m={2} colorScheme="telegram">
            Home
          </Button>
        </Link>
        {!user?.token ? (
          <Button onClick={onOpen} m={2} colorScheme="telegram">
            Login
          </Button>
        ) : (
          <Menu>
            <MenuButton as={Button} colorScheme="pink">
              Profile
            </MenuButton>
            <MenuList>
              <MenuGroup title="Profile">
                <MenuItem>{user?.username}</MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuItem
                onClick={() => dispatch(logOutUser())}
                bgColor={"rebeccapurple"}
                color={"white"}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isLogin ? "Login" : "Register"} Your Account
          </ModalHeader>
          <ModalCloseButton id="close-btn" />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <Input
                  required
                  value={authData.userName}
                  onChange={handleChanage}
                  m={2}
                  name="userName"
                  type="text"
                  placeholder="Your Name : John"
                />
              )}

              <Input
                required
                value={authData.email}
                onChange={handleChanage}
                name="email"
                m={2}
                type="email"
                placeholder="Your Email : john@gmail.com"
              />
              <Input
                required
                value={authData.passWord}
                onChange={handleChanage}
                name="passWord"
                m={2}
                type="password"
                placeholder="Your Password"
              />
              {!isLogin && (
                <Input
                  required
                  value={authData.phone}
                  onChange={handleChanage}
                  name="phone"
                  m={2}
                  type="number"
                  placeholder="Your Phone"
                />
              )}
              <Button m={2} w={"full"} colorScheme="blue" type="submit">
                {isLogin ? "Login" : "Register"}
              </Button>
            </form>
          </ModalBody>

          <ModalFooter
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Button variant={"link"} m={2}>
                Forget password?
              </Button>
            </Box>
            <Box>
              <Button
                variant={"link"}
                onClick={(e) => handleLogin()}
                colorScheme="blue"
                mr={3}
              >
                Login
              </Button>

              <Button
                onClick={(e) => handleRegister()}
                color={"green.900"}
                variant={"link"}
              >
                Register
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Header;
