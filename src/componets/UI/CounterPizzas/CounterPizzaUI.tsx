import React, {useState, useEffect, useContext} from 'react';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductCart, selectCart, updateQuantityProductInCart } from '../../../redux/slice/cartSlice';
import PizzaAxios from '../../../axios/Pizza-axios';
import { selectToken } from '../../../redux/slice/UserSlice';
import {ShowErrorModalContext} from "../../../App";

const CounterPizzas: React.FC<{ id: number; big?: boolean }> = ({ id, big }) => {
    const cart = useSelector(selectCart);
    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [externalQuantityChange, setExternalQuantityChange] = useState(false);
    const { errorHandler } = useContext(ShowErrorModalContext);

    useEffect(() => {
        // Находим товар в корзине по id
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            // Устанавливаем количество товара из корзины, только если оно отличается от текущего
            if (cartItem.quantity !== quantity && !externalQuantityChange) {
                setQuantity(cartItem.quantity);
            }
        } else {
            // Если товара нет в корзине, устанавливаем количество в 1
            setQuantity(1);
        }
    }, [id, cart, quantity, externalQuantityChange]);

    const plusQuantity = () => {
        setQuantity(prev => prev + 1);
        setExternalQuantityChange(true); // Устанавливаем флаг, что изменение произошло изнутри компонента
    };

    const minusQuantity = () => {
        if (quantity === 1) {
            if (token) {
                PizzaAxios.delete(id).then(res => {
                    if (res.status === 200) {
                        dispatch(deleteProductCart(id));
                    } else errorHandler({data: res, errorText: 'Ошибка удаление продукта из корзины'});

                });
            } else dispatch(deleteProductCart(id));
        } else {
            setQuantity(prev => prev - 1);
            setExternalQuantityChange(true);
        }
    };

    useEffect(() => {
        if (externalQuantityChange) {
            if (token) {
                PizzaAxios.update(id, quantity).then(res => {
                        if (res.status === 200) {
                            dispatch(updateQuantityProductInCart({ id: id, quantity: quantity }));
                        } else errorHandler({data: res, errorText: 'Ошибка изменения количество продукта в корзине'});
                });
            } else dispatch(updateQuantityProductInCart({ id: id, quantity: quantity }));
            setExternalQuantityChange(false); // Сбрасываем флаг после обновления данных
        }
    }, [externalQuantityChange, id, quantity, dispatch, token]);

    return (
        <div className={`${styles.container} ${big ? styles.container_big : styles.container_standart}`}>
            <button className={`${styles.circle} ${big ? styles.circle_big : styles.circle_standart}`} onClick={minusQuantity}>
                <svg width="10" height="10" viewBox="0 0 10 10" className="icon">
                    <rect fill="#7b7b7b" y="4" width="10" height="2" rx="1"></rect>
                </svg>
            </button>
            <div className={`${styles.count} ${big ? styles.count_big : styles.count_standart}`}>{quantity}</div>
            <button className={`${styles.circle} ${big ? styles.circle_big : styles.circle_standart}`} onClick={plusQuantity}>
                <svg width="10" height="10" viewBox="0 0 10 10" className="icon">
                    <g fill="#7b7b7b">
                        <rect x="4" width="2" height="10" ry="1"></rect>
                        <rect y="4" width="10" height="2" rx="1"></rect>
                    </g>
                </svg>
            </button>
        </div>
    );
};

export default CounterPizzas;
