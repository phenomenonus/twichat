import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";

const elem = document.getElementById("root") as HTMLDivElement;

createRoot(elem).render(
  <StrictMode>
    <App elem={elem} />
  </StrictMode>,
);
