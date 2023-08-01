import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartBox from './CartBox';
import { Link, useNavigate } from 'react-router-dom';
import { modifyItem, removeItem } from '../../Redux/Reducers/cart';

export default function Cart() {
  const list = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  function handleDeleteToCart(data) {
    dispatch(removeItem(data));
  }

  function increament(data) {
    dispatch(modifyItem({ ...data, quantity: data.quantity + 1 }));
  }

  function decreament(data) {
    if (data.quantity > 1) {
      dispatch(modifyItem({ ...data, quantity: data.quantity - 1 }));
    }
  }

  function totalPrice() {
    let totalAmount = 0;
    list.forEach((data) => {
      totalAmount += data.price * data.quantity;
    });
    return totalAmount;
  }

  const navigate = useNavigate();

  function handleCheckout() {
    alert("KEEP SHOPPING");
    navigate("/");
  }

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container px-4 px-lg-5">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                <Link to="/">
                  <li className="nav-link">Back To Shopping</li>
                </Link>
              </ul>
              <form className="d-flex">
                <Link to="/cart">
                  <button className="btn btn-outline-dark" type="submit">
                    <i className="bi-cart-fill me-1"></i>
                    Cart
                    <span className="badge bg-dark text-white ms-1 rounded-pill">
                      {list.length}
                    </span>
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </nav>
      </div>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-8 d-flex flex-wrap gap-2">
            {list.map((data, i) => (
              <CartBox
                key={`product-${i}`}
                data={data}
                handleDelete={handleDeleteToCart}
                increament={increament}
                decreament={decreament}
              />
            ))}
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-header">Total Amount</div>
              <div className="card-body">
                <h6 className="card-title">Cart Price: {totalPrice()}</h6>
                <button
                  className="btn btn-primary"
                  onClick={() => handleCheckout()}
                >
                  Click here to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
