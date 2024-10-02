import React, { useEffect, useRef, useState } from "react";
import Delete from "../img/delete.svg";
import "../App.css";

function Home() {
  const nameRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [products, setProducts] = useState([]);

  function handleCreate(e) {
    e.preventDefault();

    let user = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/products/private", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
        nameRef.current.value = "";
        priceRef.current.value = "";
        descRef.current.value = "";
        alert("Malumotlar muvoffaqiyatli saqlandi✔");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetch("https://auth-rg69.onrender.com/api/products/all")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  function handleDelete(id) {
    fetch(`https://auth-rg69.onrender.com/api/products/private/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          let copiedDel = [...products];
          copiedDel = copiedDel.filter((product) => product.id !== id);
          setProducts(copiedDel);
          alert("Malumot mufoffaqiyatli o'chirildi!");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className=" my-container ">
      <div className="max-w-[400px] mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Product Form</h2>
        <form className="space-y-4" onSubmit={handleCreate}>
          <div>
            <label
              htmlFor="name"
              className="flex text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              ref={nameRef}
              type="text"
              name="name"
              id="name"
              className="w-full p-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="flex text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              ref={descRef}
              name="description"
              id="description"
              className="w-full p-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="price"
              className="flex text-gray-700 font-medium mb-2"
            >
              Price
            </label>
            <input
              ref={priceRef}
              type="number"
              name="price"
              id="price"
              className="w-full p-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product price"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <h2 className="my-20 text-2xl pb-5 border-b-2 border-black">
        <b className="text-green-800">Products </b>

        {products.length}
      </h2>
      <div className="wrapper grid grid-cols-3 gap-y-12 pl-16">
        {products.length > 0 &&
          products.map((product) => {
            return (
              <div
                key={product.id}
                className="w-[350px] py-10 px-8  rounded shadow-xl flex  items-start justify-between border-2 border-blue-300"
              >
                <div className="flex flex-col gap-3">
                  {" "}
                  <h3 className="text-2xl">
                    <b>Nomi: </b>
                    {product.name}
                  </h3>
                  <p className="text-xl">
                    <b>Tavsifi: </b>
                    {product.description}
                  </p>
                  <span className="text-xl">
                    <b>Narxi: </b>
                    {product.price}$
                  </span>
                </div>
                <button onClick={() => handleDelete(product.id)}>
                  <img
                    src={Delete}
                    alt="delete"
                    width={50}
                    className="delimg"
                  />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
