import React, {useContext} from 'react';
import styles from './styles.module.scss'
import {AddressSuggestions} from "react-dadata";
import {useSelector} from "react-redux";
import {ClearCart, selectCart} from "../../../redux/slice/cartSlice";
import {useNavigate} from "react-router-dom";
import {changeEmailUser, changePhone, changeUsername, selectUserInfo} from "../../../redux/slice/UserSlice";
import Item from "../../UI/Cart/Item/CartItemUI";
import InputCabinet from "../../UI/inputCabinet/InputCabinetUI";
import UserAxios from "../../../axios/User-axios";
import {useAppDispatch} from "../../../redux/redux";
import InputAddress from "../../UI/InputDostavka/InputDostavka";
import OrangeButtonUI from "../../UI/Buttons/OrangeButton/OrangeButtonUI";
import OrdersAxios from "../../../axios/Orders-axios";
import DOMPurify from 'dompurify';

import 'react-dadata/dist/react-dadata.css';
import InputDostavka from "../../UI/InputDostavka/InputDostavka";
import PizzaAxios from "../../../axios/Pizza-axios";
import {ShowErrorModalContext} from "../../../App";
const OrderPage: React.FC = () => {
    const cart = useSelector(selectCart)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const userInfo = useSelector(selectUserInfo)
    const [phoneNoAuth, setPhoneNoAuth] = React.useState('')
    const [errorText, setErrorText] = React.useState<{text:string, disabled: boolean}>({text: '', disabled: false})
    const { errorHandler } = useContext(ShowErrorModalContext);
    const [address, setAddress] = React.useState<{data: {}, unrestricted_value: string, value: string}>({data: {}, unrestricted_value: '', value: ''});
    const [totalPrice, setTotalPrice] = React.useState<number>(0)
    const totalPriceCalculation = () =>{
        return cart.reduce((sum : number, obj) => sum + (obj.price * obj.quantity), 0)
    }
    const totalCount = () =>{
        return cart.reduce((sum : number, obj) => sum + obj.quantity, 0)
    }

    const changeUserInfo = (value: string, type: string) =>{
        switch (type){
            case 'Имя':
                UserAxios.changeUsername(value).then(res =>{
                    dispatch(changeUsername(value))
                })
                break;

            case 'Эл.почта':
                UserAxios.changeEmail(value).then(res =>{
                    dispatch(changeEmailUser(value))
                })
                break;

            case 'Номер телефона':
                UserAxios.changePhone(value).then(res =>{
                    dispatch(changePhone(value))
                })
                break;
        }
    }

    const submitOrder = () => {
        if(totalPrice < 599) {
            alert('Сумма заказа от 599 рублей!')
        } else if (((userInfo.phone && userInfo.username) || (phoneNoAuth.length && /^\+\d{11}$/.test(phoneNoAuth))) && address?.value) {
                let products: {
                    price: number;
                    quantity: number;
                    productId?: number;
                    pizzasSizedId?: number;
                    description: string;
                }[] = [];


                cart.map(item => {
                    if(item.productId){
                        products.push({
                            price: item.price,
                            quantity: item.quantity,
                            productId: item.productId,
                            description: item.description
                        })
                    }else{
                        products.push({
                            price: item.price,
                            quantity: item.quantity,
                            pizzasSizedId: item.pizzasSizedId,
                            description: item.description
                        })
                    }

                })

                    if(products.length){
                        OrdersAxios.create({products: products, address: address?.value, phone: userInfo.phone ? userInfo.phone : phoneNoAuth}).then(res =>{
                            if(res.status === 200){
                                dispatch(ClearCart());
                                PizzaAxios.clearBasket();

                                navigate(`/order/${res.data.message}`)
                            } else errorHandler({data: res, errorText: 'Ошибка создания заказа'});
                        })
                    } else alert('Необходимо указать номер телефона, ваше имя и адрес доставки!!');
            } else alert('Необходимо указать номер телефона, ваше имя и адрес доставки!!!')
    }

    React.useEffect(() => {
        if (cart.length) {
            setTotalPrice(totalPriceCalculation())
        }
    }, [cart])
    React.useEffect(() => {
        if (totalPrice < 599) {
            setErrorText({text: 'Сумма заказа от 599 рублей!', disabled: true});
        } else if (userInfo.email) {
            if (!(userInfo.phone && userInfo.username && userInfo.email)) {
                setErrorText({text: 'Заполните личные данные!', disabled: true});
            } else if (!address?.value) {
                setErrorText({text: 'Вы не указали адрес доставки!', disabled: true});
            } else {
                setErrorText({text: '', disabled: false});
            }
        } else {
            if (!(phoneNoAuth.length && /^\+\d{11}$/.test(phoneNoAuth))) {
                setErrorText({text: 'Заполните личные данные!', disabled: true});
            } else if (!address?.value) {
                setErrorText({text: 'Вы не указали адрес доставки!', disabled: true});
            } else {
                setErrorText({text: '', disabled: false});
            }
        }
    }, [totalPrice, userInfo.phone, userInfo.email, phoneNoAuth, address.value]);



    return (
        <div>
            <h1 className={styles.order_title}>Ваш заказ:</h1>
            <div className={styles.order_containerProduct}>
                {cart.length && cart.map(item => <Item key={item.id} {...item} order/>)}
                <p className={styles.order_subtitle}>Количество товаров: <b>{totalCount()}</b> </p>
            </div>

            <div className={styles.section}>
                <div className={styles.section_title}>Контакты</div>

                {(userInfo.email) ?
                    <>
                        <InputCabinet typeInput='text' value={userInfo.username} title='Имя' onChangeUserInfo={changeUserInfo} validationRegex={/^[а-яА-ЯёЁ]+$/} errorMessage="Только буквы и цифры!"/>
                        <InputCabinet typeInput='email' value={userInfo.email} title='Эл.почта'  onChangeUserInfo={changeUserInfo} validationRegex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/} errorMessage="Неверная почта!"/>
                        <InputCabinet typeInput='tel' value={userInfo.phone} title='Номер телефона'  onChangeUserInfo={changeUserInfo} validationRegex={/^\+\d{11}$/} errorMessage="Неверный номер телефона!"/>
                        {(userInfo.phone === '') && <i> Нужно указать данные для связи!</i>}
                    </> : <InputDostavka
                        name={"phone"}
                        title='Номер телефона'
                        type={'tel'}
                        value={DOMPurify.sanitize(phoneNoAuth)}
                        setValue={(value: string) => {
                            const sanitizedValue = DOMPurify.sanitize(value);
                            let newValue = sanitizedValue;
                            if (sanitizedValue[0] !== "+" && sanitizedValue.length > 0) {
                                newValue = `+${sanitizedValue}`;
                            }
                            if (/^\+\d{0,11}$/.test(newValue)) {
                                setPhoneNoAuth(newValue);
                            }
                        }}
                    />

                }
            </div>

            <div className={styles.section}>
                <div className={styles.section_title}>Доставка</div>
                {// @ts-ignore
                     <AddressSuggestions token={process.env.REACT_APP_API_DADATA_TOKEN!} selectOnBlur value={DOMPurify.sanitize(address.value)} onChange={setAddress} delay={300} minChars={3}/>
                }
            </div>
            <div className={styles.section} >
                <div className={styles.section_total}>Итого: {totalPrice} ₽</div>
                {
                    errorText ? <div className={styles.order_subtitle}>{errorText.text}</div> : ''
                }
            </div>


            <OrangeButtonUI title="Заказать" width='300px' onClick={submitOrder} disabled={errorText.disabled}/>

        </div>
    );
};

export default OrderPage;