import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";


import styles from './cabinetPage.module.scss'
import InputCabinet from "../../UI//inputCabinet";
import {changeEmailUser, changePhone, changeUsername, selectUserInfo} from "../../../redux/slice/UserSlice";
import UserAxios from "../../../axios/User-axios";
import OrangeButton from "../../UI/Buttons/OrangeButton/OrangeButton";

function CabinetPage (){
	const navigate = useNavigate();
	const userInfo = useSelector(selectUserInfo)
	const status = useSelector(state => state.userInfo.status)
	const dispatch = useDispatch();
	
	const exitFromAccount = () => {
		// dispatch(ClearTokenUser())
		// dispatch(clearCart())
		// dispatch(clearFavorites())
		// dispatch(clearFavoriteCartInCard())
		// dispatch(clearInfoUser())
	}
	const changeUserInfo = (value, type) =>{
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
	return(
		<>
			<h2 className={styles.title}>Личные данные</h2>
			{status === 'succeeded' &&
				<>
					<InputCabinet typeInput='text' value={userInfo.username} title='Имя' onChangeUserInfo={changeUserInfo}/>
					<InputCabinet typeInput='email' value={userInfo.email} title='Эл.почта'  onChangeUserInfo={changeUserInfo}/>
					<InputCabinet typeInput='tel' value={userInfo.phone} title='Номер телефона'  onChangeUserInfo={changeUserInfo}/>
					{(userInfo.phone === null) && <i> Нужно указать номер телефона</i>}
				</>
			}
			
			<h2 className={styles.Orders_title}>Заказы</h2>
			<div className={styles.Orders}>
				{
					(false)
						?
						// <table className={styles.table}>
						// 	<thead className={styles.table_header}>
						// 	<tr className={styles.table_row}>
						// 		<th className={styles.table_col}>№</th>
						// 		<th className={styles.table_col}>Время заказа</th>
						// 		<th className={styles.table_col}>Сумма</th>
						// 		<th className={styles.table_col}>Статус</th>
						// 		<th className={styles.table_col}>Доставка</th>
						// 		<th className={styles.table_col}>Товары</th>
						// 	</tr>
						// 	</thead>
						// 	<tbody>
						// 	{orders.map(order =>(
						// 		<tr className={styles.table_row} key={order.order_id}>
						// 			<td className={styles.table_col} >{order.order_id}</td>
						// 			<td className={styles.table_col} >{order.date}</td>
						// 			<td className={styles.table_col} >{order.total_cost} ₽</td>
						// 			<td className={styles.table_col} >{order.status}</td>
						// 			<td style={{fontSize: '13px'}} className={styles.table_col} >{order.adress}</td>
						// 			<td className={styles.table_col} ><span onClick={() => navigate(`/order/${order.order_id}`)}>Посмотреть</span></td>
						// 		</tr>
						// 	))}
						// 	</tbody>
						// </table>
						<></>
						:
						<div className={styles.notHaveFavorites_Container} >
							<img src="/img/emodji_pechal.png" alt=""/>
							<p>У вас нет заказов :)</p>
						</div>
				}
			</div>
			
			<Link to='/' onClick={exitFromAccount}>
				<OrangeButton title='Выйти из аккаунта' width='300px'/>
			</Link>
		</>
	
	);
}

export default CabinetPage;