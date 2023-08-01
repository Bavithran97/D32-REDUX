import React, { useState, useEffect } from "react";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { addItem } from "../../Redux/Reducers/cart";

export default function Page() {
  const [items, setItems] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/mocks/products.json")
      .then((response) => response.json())
      .then((result) => {
        if (result && result.products) setItems(result.products);
      })
      .catch((e) => console.log(e));
    return () => {};
  }, []);

  function handleAddToCart(data) {
    dispatch(addItem({ ...data, quantity: 1 }));
  }

  return (
    <section>
      <header className="bg-primary py-8"> 
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Anything can change, because the smartphone revolution is still in the early stages</h1>
            <p className="lead fw-normal text-white-50 mb-0">-Tim Cook</p>
          </div>
        </div>
      </header>
      <div className="container bg-dark"> 
        <div className="row">
          {items &&
            items.map((d, i) => (
              <Card key={`items-number-${i}`} data={d} handleAdd={handleAddToCart} />
            ))}
        </div>
      </div>
      <footer className="py-8 bg-primary"> 
        <div className="container">
          <p className="m-0 text-center text-white">Copyright &copy; BAVITHRAN 2023</p>
        </div>
      </footer>
    </section>
  );
}
