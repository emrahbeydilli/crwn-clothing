import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';

const CardDropdown = () => {
    const {cartItems, cartTotal, setIsCartOpen} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () =>{
        setIsCartOpen(false);
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map(item => (
                    <CartItem key={item.id} cartItem={item}/>
                ))}
            </div>
            <div className="cart-total">Total: ${cartTotal}</div>
            <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>
        </div>
    );
}

export default CardDropdown;