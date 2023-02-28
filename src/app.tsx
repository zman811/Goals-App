//import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import Main from "./main/App";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import React from "react";

function render() {
  const container = document.getElementById("app");
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <Main />
    </MantineProvider>
  );
}

render();
