import React, {useContext} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


import styles from './cabinetPage.module.scss'
import InputCabinet from "../../UI/inputCabinet/InputCabinetUI";
import {
    changeEmailUser,
    changePhone,
    changeUsername, clearInfoUser,
    clearTokenUser, fetchOrders,
    selectUserInfo, setTokenUser
} from "../../../redux/slice/UserSlice";
import UserAxios from "../../../axios/User-axios";
import OrangeButtonUI from "../../UI/Buttons/OrangeButton/OrangeButtonUI";
import {RootState, useAppDispatch} from "../../../redux/redux";
import formatDate from "../../../Utilities/FormatDate";
import {ClearCart} from "../../../redux/slice/cartSlice";
import {ShowErrorModalContext} from "../../../App";

function CabinetPage (){
	const navigate = useNavigate();
	const userInfo = useSelector(selectUserInfo)
	const { status, orders} = useSelector((state: RootState) => state.userInfo)
	const dispatch = useAppDispatch();
    const orderStatus = useSelector((state: RootState) => state.userInfo.orderStatus)
    const { errorHandler } = useContext(ShowErrorModalContext);
	const exitFromAccount = () => {
		 dispatch(clearTokenUser());
		 dispatch(ClearCart());
		 dispatch(clearInfoUser());
	}
	const changeUserInfo = (value: string, type: string) =>{
		switch (type){
			case 'Имя':
				UserAxios.changeUsername(value).then(res =>{
                    if(userInfo.username !== value){
                         if(res.status === 200){
                            dispatch(changeUsername(value))
                        } else  errorHandler({data: res, errorText: 'Ошибка изменения имени'});
                    }
				})
				break;

			case 'Эл.почта':
				UserAxios.changeEmail(value).then(res =>{
                    if(userInfo.email !== value){
                         if(res.status === 200 ){
                            dispatch(changeEmailUser(value))
                        } else errorHandler({data: res, errorText: 'Ошибка изменения электронной почты'});
                    }
				})
				break;

			case 'Номер телефона':
				UserAxios.changePhone(value).then(res =>{
                    if(userInfo.phone !== value){
                         if(res.status === 200 ){
                            dispatch(changePhone(value))
                             dispatch(fetchOrders())
                        } else errorHandler({data: res, errorText: 'Ошибка изменения номера телефона'});
                    }
				})
				break;
		}
	}

	return(
		<>
			<h2 className={styles.title}>Личные данные</h2>
			{status === 'succeeded' &&
				<>
					<InputCabinet typeInput='text' value={userInfo.username} title='Имя' onChangeUserInfo={changeUserInfo} validationRegex={/^[а-яА-ЯёЁ0-9]+$/} errorMessage="Только буквы и цифры!"/>
					<InputCabinet typeInput='email' value={userInfo.email} title='Эл.почта'  onChangeUserInfo={changeUserInfo} validationRegex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/} errorMessage="Неверная почта!"/>
					<InputCabinet typeInput='tel' value={userInfo.phone} title='Номер телефона'  onChangeUserInfo={changeUserInfo} validationRegex={/^\+\d{11}$/} errorMessage="Неверный номер телефона!"/>
					{(userInfo.phone === null) && <i> Нужно указать номер телефона для дальнейшего оформления заказа. Если Вы ранее делали заказа без регистрации, то после ввода номера телефона, мы найдем все ваши заказы сделанные на этот номер телефона.</i>}
				</>
			}
			
			<h2 className={styles.Orders_title}>Заказы</h2>
			<div className={styles.Orders}>
				{
					(orders.length)
						?
						<table className={styles.table}>
							<thead className={styles.table_header}>
							<tr className={styles.table_row}>
								<th className={styles.table_col}>№</th>
								<th className={styles.table_col}>Время заказа</th>
								<th className={styles.table_col}>Сумма</th>
								<th className={styles.table_col}>Статус</th>
								<th className={styles.table_col}>Доставка</th>
								<th className={styles.table_col}></th>
							</tr>
							</thead>
							<tbody>
							{orders.map(order =>(
								<tr className={styles.table_row} key={order.id}>
									<td className={styles.table_col} >{order.nomer}</td>
									<td className={styles.table_col} >{formatDate(order.createdAt)}</td>
									<td className={styles.table_col} >{order.total_price} ₽</td>
									<td className={styles.table_col} >{orderStatus?.find(item => item.id === order.orderStatusId)?.name}</td>
									<td style={{fontSize: '13px'}} className={styles.table_col} >{order.address}</td>
									<td className={styles.table_col} ><span onClick={() => navigate(`/order/${order.nomer}`)}>Посмотреть</span></td>
								</tr>
							))}
							</tbody>
						</table>
						:
						<div className={styles.notHaveFavorites_Container} >
							<img src="/img/emodji_pechal.png" alt=""/>
							<p>У вас нет заказов :)</p>
						</div>
				}
			</div>
			
			<Link to='/home' onClick={exitFromAccount} className={styles.btn_exit}>
				<OrangeButtonUI title='Выйти из аккаунта' width='300px'/>
			</Link>
		</>
	
	);
}

export default CabinetPage;