//import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import Main from "./components/test";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import React from "react";

function render() {
  //   const App =  <MantineProvider withGlobalStyles withNormalizeCSS>
  //   <Main />
  // </MantineProvider>
  // ReactDOM.render(Main(), document.body);
  const container = document.getElementById("app");
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        // colors: {
        //   brand: [
        //     "#F0BBDD",
        //     "#ED9BCF",
        //     "#EC7CC3",
        //     "#ED5DB8",
        //     "#F13EAF",
        //     "#F71FA7",
        //     "#FF00A1",
        //     "#E00890",
        //     "#C50E82",
        //     "#AD1374",
        //   ],
        // },
        // primaryColor: "brand",
      }}
    >
      <Main />
    </MantineProvider>
  );
}

render();
