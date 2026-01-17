import React, { useState, useEffect } from "react";
import axios from "axios";

function DisplayInventory() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000");
      setRes(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Inventory Management</h1>
      <table border="1" width="70%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {res.map((item) => (
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
  const [id, setId] = useState(0);
  const [prodname, setProdName] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const SubmitEvent = async () => {
    const newItem = { id, prodname, qty, price };
    console.log("🟢 Adding Item:", newItem);

    await axios.post("http://localhost:8000/add", newItem);
    alert("✅ Product added successfully!");
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <table>
        <tbody>
          <tr>
            <td>ID</td>
            <td>
              <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Product Name</td>
            <td>
              <input
                type="text"
                value={prodname}
                onChange={(e) => setProdName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Quantity</td>
            <td>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" align="center">
              <input type="button" value="Add Product" onClick={SubmitEvent} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export { DisplayInventory, AddInventory };
