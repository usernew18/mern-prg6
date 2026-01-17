import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Display_Inventory, AddInventory } from './to_inventory';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Display_Inventory />
    <AddInventory />
  </React.StrictMode>
);
