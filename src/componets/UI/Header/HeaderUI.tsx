import React from 'react';
import styles from "./styles.module.scss"
import { useSelector} from "react-redux";
import {selectCart, setShowCart} from "../../../redux/slice/cartSlice";
import {selectToken, selectUserInfo} from "../../../redux/slice/UserSlice";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch} from "../../../redux/redux";
import Login from "../Login/LoginUI";
import Categories from "../Categories/CategoriesUI";


const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const cart = useSelector(selectCart)
	const token = useSelector(selectToken)
    const userInfo = useSelector(selectUserInfo)
	const [showLogin, setShowLogin] = React.useState<boolean>(false)
    const location = useLocation();
    const totalPrice = () =>{
		return cart.reduce((sum : number, obj) => sum + (obj.price * obj.quantity), 0)
	}
	const totalCount = () =>{
		return cart.reduce((sum : number, obj) => sum + obj.quantity, 0)
	}

	return (
        <div className={`${styles.containerMobile}`}>
            <div className={styles.header}>
                <div className={styles.container}>
                    <Link to='/home'>
                        <div className={styles.header__logo}>
                            <img  src="/img/pizza-logo.svg" alt="Pizza logo"/>
                            <div>
                                <h1>React Pizza</h1>
                                <p>самая вкусная пицца во вселенной</p>
                            </div>
                        </div>
                    </Link>
                    <div className={styles.header_left}>
                        <div className={styles.link}>
                            <Link to="/ordersSearch" >
                                Найти заказ
                            </Link>
                        </div>

                        <div className={styles.link}>
                            <Link to="/contact" >
                                О нас
                            </Link>
                        </div>
                    </div>
                    <div className={styles.header_left}>
                        <div onClick={() => dispatch(setShowCart())}>
                            {
                                (cart && cart.length
                                    ? <a href="#" className="button button--cart">
                                        <span className='button--cart_price'>{totalPrice()} ₽</span>
                                        <div className="button__delimiter"></div>
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                                                stroke="white"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                                                stroke="white"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                                                stroke="white"
                                                strokeWidth="1.8"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <span className='button--cart_count'>{totalCount()}</span>
                                    </a>
                                    : <a href="#" className="button button--cart">Корзина</a>)
                            }
                        </div>

                        {(token) ?
                            <Link to="/cabinet">
                                <button className={styles.header_cabButton}>
                                    <svg version="1.1" id="mdi-face" width="30" height="30" viewBox="0 0 24 24" >
                                        <path d="M9,11.75A1.25,1.25 0 0,0 7.75,13A1.25,1.25 0 0,0 9,14.25A1.25,1.25 0 0,0 10.25,13A1.25,1.25 0 0,0 9,11.75M15,11.75A1.25,1.25 0 0,0 13.75,13A1.25,1.25 0 0,0 15,14.25A1.25,1.25 0 0,0 16.25,13A1.25,1.25 0 0,0 15,11.75M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,11.71 4,11.42 4.05,11.14C6.41,10.09 8.28,8.16 9.26,5.77C11.07,8.33 14.05,10 17.42,10C18.2,10 18.95,9.91 19.67,9.74C19.88,10.45 20,11.21 20,12C20,16.41 16.41,20 12,20Z" />
                                    </svg>
                                    <span>{userInfo.username ? (userInfo.username.length > 8 ? userInfo.username.slice(0, 8) + '...' : userInfo.username) : "Профиль"}</span>

                                </button>
                            </Link> :
                            <button className={styles.header_cabButton} onClick={() => setShowLogin(!showLogin)}>
                                <svg version="1.1" id="mdi-face" width="30" height="30" viewBox="0 0 24 24" >
                                    <path d="M9,11.75A1.25,1.25 0 0,0 7.75,13A1.25,1.25 0 0,0 9,14.25A1.25,1.25 0 0,0 10.25,13A1.25,1.25 0 0,0 9,11.75M15,11.75A1.25,1.25 0 0,0 13.75,13A1.25,1.25 0 0,0 15,14.25A1.25,1.25 0 0,0 16.25,13A1.25,1.25 0 0,0 15,11.75M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,11.71 4,11.42 4.05,11.14C6.41,10.09 8.28,8.16 9.26,5.77C11.07,8.33 14.05,10 17.42,10C18.2,10 18.95,9.91 19.67,9.74C19.88,10.45 20,11.21 20,12C20,16.41 16.41,20 12,20Z" />
                                </svg>
                                <span>Кабинет</span>
                            </button>
                        }

                        <Login showLogin={showLogin} setShowLogin={setShowLogin}/>
                    </div>

                </div>
            </div>
            <div>
                {location.pathname.startsWith('/home') ? (
                    <div className={styles.containerMobile_categorues}>
                        <Categories/>
                    </div>
                ) : null}
            </div>
        </div>

	);
};

export default Header;