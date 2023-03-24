import React from 'react';
import styles from './styles.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {selectCart, selectShowCart, setShowCart} from "../../../redux/slice/cartSlice";
import Item from "./Item";
import OrangeButton from "../Buttons/OrangeButton/orangeButton";
import {useAppDispatch} from "../../../redux";
const Cart = () => {
	const showCart = useSelector(selectShowCart)
	const cart = useSelector(selectCart)
	const dispatch = useAppDispatch()

	React.useEffect(() =>{
		if(showCart){
			document.documentElement.classList.add('no-scroll');
		} else {
			document.documentElement.classList.remove('no-scroll');
		}
	}, [showCart])
	const totalPrice = () =>{
		return cart.reduce((sum, obj) => sum + (obj.price * obj.quantity), 0)
	}
	const totalCount = () =>{
		return cart.reduce((sum, obj) => sum + obj.quantity, 0)
	}
	return (
		<div className={`${styles.overlay} ${showCart ? styles.overlay_visible : styles.overlay_hidden}`}>
			<img className={styles.overlay_svg} src="/img/cross.svg" alt="" onClick={() => dispatch(setShowCart())}/>
			<div className={`${styles.cart} ${showCart ? styles.cart_visible : ""}`}>
				{
					(cart.length)
					?   <>
							<div className={styles.cart_title}>{`${totalCount()} товара на ${totalPrice()} ₽`}</div>
							<div className={styles.cart_items}>
								{
									cart.map(item => <Item key={item.id} {...item}/>)
								}
							</div>
							<div className={styles.bottom}>
								<div className={styles.bottom_info}>
									<div className={styles.bottom_info_container}>
										<span>Начислим додокоины</span> <span>+ {Math.round(totalPrice() * 0.05)}
										<svg width={15} height={15} fill="none" viewBox="0 0 16 16" className="dodocoin">
								<path fillRule="evenodd" clipRule="evenodd"
								      d="M7.5.75c.41 0 .75.34.75.75V3h.25a5 5 0 010 10h-.25v1.5a.75.75 0 01-1.5 0V13H4.07c-.38 0-.56 0-.7-.07a.67.67 0 01-.3-.3C3 12.5 3 12.32 3 11.94V4.07c0-.38 0-.56.07-.7a.67.67 0 01.3-.3C3.5 3 3.68 3 4.06 3h2.68V1.5c0-.41.34-.75.75-.75zm-3 10.75h4a3.5 3.5 0 100-7h-4v7z"
								      fill="#000"></path>
							</svg>
						</span>
									</div>
									<div className={styles.bottom_info_container}><span>Доставка</span> <span>бесплатно</span></div>
								</div>
								<div className={styles.bottom_button}>
									<div className={styles.bottom_button_total}><span>Сумма заказа</span><span>{totalPrice()} ₽</span></div>
									<OrangeButton title='К оформлению заказа'/>
								</div>
							</div>
						</>
					:
						<div className={styles.cartEmpty}>
							<img width={315} height={205} src="/img/cartEmpty.svg" alt=""/>
							<h3>Ой, пусто!</h3>
							<p>Ваша корзина пуста, откройте «Меню»
								и выберите понравившийся товар.
							</p>
						</div>
				}

			</div>
		</div>
	);
};

export default Cart;