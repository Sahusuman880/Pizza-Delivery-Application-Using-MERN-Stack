import { Container } from "@chakra-ui/react";
import MainContainer from "./Components/MainContainer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Checkout from "./Components/Checkout";
const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export const routerProvider = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "menu",
        element: <MainContainer />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]);

function App() {
  return (
    <Container maxW={"100%"}>
      <AppLayout />
    </Container>
  );
}

export default App;
