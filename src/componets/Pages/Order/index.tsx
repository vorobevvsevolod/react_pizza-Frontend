import React from 'react';
import styles from './styles.module.scss'
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
const OrderPage: React.FC = () => {
    const cart = useSelector(selectCart)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const userInfo = useSelector(selectUserInfo)
    const [phoneNoAuth, setPhoneNoAuth] = React.useState('')

    const [address, setAddress] = React.useState({
        streets: '',
        house: '',
        corpus: '',
        flat: ''
    })
    const totalPrice = () =>{
        return cart.reduce((sum : number, obj) => sum + (obj.price * obj.quantity), 0)
    }
    const totalCount = () =>{
        return cart.reduce((sum : number, obj) => sum + obj.quantity, 0)
    }

    const changeValueAddress = (value: string, type: string) => {
        switch (type) {
            case 'streets':
                setAddress(prev => ({...prev, streets: value}))
                break;
            case 'house':
                setAddress(prev => ({...prev, house: value}))
                break;
            case 'corpus':
                setAddress(prev => ({...prev, corpus: value}))
                break;
            case 'flat':
                setAddress(prev => ({...prev, flat: value}))
                break;
        }
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
        if (address.streets !== '' && address.house !== '' && address.corpus !== '' && address.flat !== '') {

            if (userInfo.phone !== '' || phoneNoAuth !== '') {
                let products: {
                    price: number;
                    quantity: number;
                    productId?: number;
                    pizzasSizedId?: number;
                    description: string;
                }[] = [];

                let addressString = `ул. ${address.streets}, дом ${address.house}, к${address.corpus}, кв. ${address.flat}`;
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

                OrdersAxios.create({products: products, address: addressString}).then(res =>{
                    navigate('/home')
                })

            } else alert('Необходимо указать номер телефона иначе мы не сможем с вами связаться!!!')

        } else alert('Вы не заполнили адрес доставки')
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

                {(userInfo.email && userInfo.username) ?
                    <>
                        <InputCabinet typeInput='text' value={userInfo.username} title='Имя' onChangeUserInfo={changeUserInfo}/>
                        <InputCabinet typeInput='email' value={userInfo.email} title='Эл.почта' onChangeUserInfo={changeUserInfo}/>
                        <InputCabinet typeInput='tel' value={userInfo.phone} title='Номер телефона' onChangeUserInfo={changeUserInfo}/>
                        {(userInfo.phone === '') && <i> Нужно указать номер телефона</i>}
                    </> : <InputAddress title='Номер телефона' onChange={(value: string) => setPhoneNoAuth(value)}/>
                }
            </div>

            <div className={styles.section}>
                <div className={styles.section_title}>Доставка</div>
                <div className={styles.address_container}>
                    <InputAddress width='300px' title='Улица' type='streets' onChange={changeValueAddress}/>
                    <InputAddress textAlign='center' width='60px' title='Дом' type='house' onChange={changeValueAddress}/>
                    <InputAddress textAlign='center' width='60px' title='Корпус' type='corpus' onChange={changeValueAddress}/>
                    <InputAddress textAlign='center' width='70px' title='Квартира' type='flat'  onChange={changeValueAddress}/>
                </div>
            </div>
            <div className={styles.section} >
                <div className={styles.section_total}>Итого: {totalPrice()} ₽</div>
            </div>
            
            <OrangeButton title="Заказать" width='300px' onClick={submitOrder}/>

        </div>
    );
};

export default OrderPage;