import React, { useState } from 'react';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const addItemToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const removeItemFromCart = (itemToRemove) => {
        setCartItems(cartItems.filter(item => item.id !== itemToRemove.id));
    };

    const updateItemQuantity = (itemId, quantity) => {
        setCartItems(cartItems.map(item => item.id === itemId ? {...item, quantity} : item));
    };

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
    };

    const applyPromoCode = () => {
        if (promoCode === 'book10') {
            setDiscount(0.1);
        } else {
            setDiscount(0);
        }
    };

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal >= 50 ? 0 : 4.99;
    const total = subtotal - (subtotal * discount) + shipping;

    return (
        <div>
            <h1>Your Shopping Cart</h1>
            <ul>
                {cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - {item.price}€ x 
                        <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                        {item.quantity}
                        <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                        <button onClick={() => removeItemFromCart(item)}>Remove</button>
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    placeholder="Enter promo code"
                />
                <button onClick={applyPromoCode}>Apply</button>
            </div>
            <h2>Order Summary</h2>
            <p>Subtotal: {subtotal.toFixed(2)}€</p>
            <p>Discount: {(subtotal * discount).toFixed(2)}€</p>
            <p>Shipping: {shipping.toFixed(2)}€</p>
            <p>Total: {total.toFixed(2)}€</p>
        </div>
    );
};

export default CartPage;