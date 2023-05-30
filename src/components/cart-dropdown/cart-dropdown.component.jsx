import Button from '../button/button.component';

import './cart-dropdown.styles.scss';

const CardDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items' />
            <Button>Go to Checkout</Button>
        </div>
    );
}

export default CardDropdown;