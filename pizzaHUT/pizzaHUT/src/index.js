import React from "react";
import ReactDOM from "react-dom/client";
import App, { routerProvider } from "./App";
import { Provider } from "react-redux";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import store from "./Utils/store";
import "./style.css";
import { RouterProvider } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = extendTheme({
  font: {
    font: `"Open Sans" !important`,
  },
});
root.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <RouterProvider router={routerProvider} />
    </Provider>
  </ChakraProvider>
);
