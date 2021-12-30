import {Fragment, useContext, useState} from "react";

import Modal from '../UI/Modal'
import CartItem from './CartItem';
import classes from '../../css/Cart.module.css';
import CartContext from '../../store/CartContext';
import Checkout from "./Checkout";

const Cart = props => {
    const [isChecking, setIsChecking] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    }

    const orderHandler = () => {
        setIsChecking(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://udemy-practice-3-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(item => <li>
            <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price}
                      onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}/>
        </li>)}</ul>;

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    )

    const cartModalContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>
                    Total Amount
                </span>
                <span>
                    {totalAmount}
                </span>
            </div>
            {isChecking && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {!isChecking && modalActions}
        </Fragment>
    )

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = (
        <Fragment>
            <p>Successfully set the order!</p>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            </div>
        </Fragment>
    )

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
};

export default Cart;