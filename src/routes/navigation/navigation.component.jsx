import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";


import CartIcon from "../../components/cart-icon/cart-icon.component";
import CardDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { NavigationContainer, NavLinks, NavLink, Logo } from "./navigation.styles";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <Logo>
                    <CrwnLogo />
                </Logo>
                <NavLinks>
                    <NavLink to='/'>
                        HOME
                    </NavLink>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CardDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;