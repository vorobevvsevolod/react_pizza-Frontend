import React from 'react';
import styles from './styles.module.scss'
import {AddressSuggestions} from "react-dadata";
import {useSelector} from "react-redux";
import {selectCart} from "../../../redux/slice/cartSlice";
import {useNavigate} from "react-router-dom";
import {changeEmailUser, changePhone, changeUsername, selectUserInfo} from "../../../redux/slice/UserSlice";
import Item from "../../UI/Cart/Item";
import InputCabinet from "../../UI/inputCabinet";
import UserAxios from "../../../axios/User-axios";
import {useAppDispatch} from "../../../redux";
import InputAddress from "../../UI/InputDostavka";
import OrangeButton from "../../UI/Buttons/OrangeButton/orangeButton";
import OrdersAxios from "../../../axios/Orders-axios";

import 'react-dadata/dist/react-dadata.css';
import InputDostavka from "../../UI/InputDostavka";
const OrderPage: React.FC = () => {
    const cart = useSelector(selectCart)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const userInfo = useSelector(selectUserInfo)
    const [phoneNoAuth, setPhoneNoAuth] = React.useState('')

    const [address, setAddress] = React.useState<{data: {}, unrestricted_value: string, value: string}>({data: {}, unrestricted_value: '', value: ''});
    const totalPrice = () =>{
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


            if (userInfo.phone !== '' || phoneNoAuth !== '' && address?.value !== '') {
                console.log(address?.value);
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

                OrdersAxios.create({products: products, address: address?.value, phone: userInfo.phone ? userInfo.phone : phoneNoAuth}).then(res =>{
                    navigate(`/order/${userInfo.phone.slice(1) ? userInfo.phone.slice(1) : phoneNoAuth[0] === "+" ? phoneNoAuth.slice(1) : phoneNoAuth}-${res.id}`)
                })

            } else alert('Необходимо указать номер телефона и адрес доставки!!!')
    }

    return (
        <div>
            <h1 className={styles.order_title}>Ваш заказ:</h1>
            <div className={styles.order_containerProduct}>
                {cart.length && cart.map(item => <Item key={item.id} {...item} order/>)}
                <p className={styles.order_subtitle}>Количество товаров: <b>{totalCount()}</b> </p>
            </div>

            <div className={styles.section}>
                <div className={styles.section_title}>Контакты</div>

                {(userInfo.email && userInfo.username && userInfo.phone) ?
                    <>
                        <InputCabinet typeInput='text' value={userInfo.username} title='Имя' onChangeUserInfo={changeUserInfo}/>
                        <InputCabinet typeInput='email' value={userInfo.email} title='Эл.почта' onChangeUserInfo={changeUserInfo}/>
                        <InputCabinet typeInput='tel' value={userInfo.phone} title='Номер телефона' onChangeUserInfo={changeUserInfo}/>
                        {(userInfo.phone === '') && <i> Нужно указать номер телефона</i>}
                    </> : <InputDostavka name={"phone"} title='Номер телефона' value={phoneNoAuth} setValue={(value: string)  => {
                        if(value[0] !== "+") setPhoneNoAuth(`+${value}`);
                        else setPhoneNoAuth(value)

                    }}/>
                }
            </div>

            <div className={styles.section}>
                <div className={styles.section_title}>Доставка</div>
                {// @ts-ignore
                     <AddressSuggestions token={process.env.REACT_APP_API_DADATA_TOKEN!} selectOnBlur value={address.value} onChange={setAddress} delay={300} minChars={3}/>
                }
            </div>
            <div className={styles.section} >
                <div className={styles.section_total}>Итого: {totalPrice()} ₽</div>
            </div>

            <OrangeButton title="Заказать" width='300px' onClick={submitOrder}/>

        </div>
    );
};

export default OrderPage;