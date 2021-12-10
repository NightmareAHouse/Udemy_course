import {useContext, useEffect, useState} from 'react';
import CartIcon from '../cart/CartIcon';
import CartContext from "../../store/CartContext";
import classes from '../../css/HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    const [btnIsHighLighted, setBtnIsHughLighted] = useState(false)

    const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump: ''}`;

    const { items } = cartCtx

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBtnIsHughLighted(true);

        const timer = setTimeout(() => {
            setBtnIsHughLighted(false);
        }, 300);

        return () => {
          clearTimeout(timer);
        };
    }, [items])

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton