import React, { useState, useEffect } from "react";
import axios from "axios";

function Display_Inventory() {
  const [res, setres] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000")
      .then(response => setres(response.data));
  }, []);

  return (
    <div>
      <h1>Inventory Management</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Qty</th><th>Price</th>
          </tr>
        </thead>
        <tbody>
          {res.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.prodname}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddInventory() {
  const [id, setId] = useState("");
  const [prodname, setProdname] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  const SubmitEvent = () => {
    axios.post("http://localhost:8000/add", {
      id, prodname, qty, price
    }).then(() => window.location.reload());
  };

  return (
    <div>
      <h2>Add Inventory</h2>
      <input placeholder="ID" onChange={e => setId(e.target.value)} />
      <input placeholder="Product Name" onChange={e => setProdname(e.target.value)} />
      <input placeholder="Qty" onChange={e => setQty(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <button onClick={SubmitEvent}>Add</button>
    </div>
  );
}

export { Display_Inventory, AddInventory };
