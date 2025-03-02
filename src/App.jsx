import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, calculateCartTotals } from './Store/cartSlice';
import { product } from './assets/Assets';
import './App.css';
import React from 'react';

const App = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const savings = useSelector((state) => state.cart.savings);
  const total = useSelector((state) => state.cart.total);

  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
    dispatch(calculateCartTotals());
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    dispatch(calculateCartTotals());
  };

  useEffect(() => {
    dispatch(calculateCartTotals());
  }, [dispatch, cartItems]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {product.map((item) => (
          <div key={item._id} className=" p-4 border border-gray-200 rounded-lg shadow-lg flex items-center space-x-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
            <p className="mt-2 text-xl font-semibold text-gray-800">{item.name} - £{item.price}</p>
            <button
              onClick={() => handleAddToCart(item._id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>



      <div className="cart mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Shopping Cart</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.keys(cartItems).map((itemId) => {
            const item = product.find((product) => product._id === itemId);
            if (item) {
              return (
                <div key={itemId} className="p-4 border border-gray-200 rounded-lg shadow-lg flex items-start space-x-6">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-600">Price: £{item.price}</p>
                    <p className="text-gray-600">Quantity: {cartItems[itemId]}</p>
                    <button
                      onClick={() => handleRemoveFromCart(itemId)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="mt-8 p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-xl font-semibold text-gray-800">Subtotal: £{subtotal.toFixed(2)}</p>
          <p className="text-xl font-semibold text-gray-800">Savings: -£{savings.toFixed(2)}</p>
          <p className="text-xl font-semibold text-gray-800">Total: £{total.toFixed(2)}</p>
        </div>
      </div>

      
    </div>
  );
};

export default App;
