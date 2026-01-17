import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DisplayInventory, AddInventory } from "./to_inventory";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DisplayInventory />
    <AddInventory />
  </React.StrictMode>
);
