import React from "react";
import styles from "../Home/styles.module.scss";
import stylesCabinet from '../CabinetPage/cabinetPage.module.scss'
import InputDostavka from "../../UI/InputDostavka";
import OrdersAxios from "../../../axios/Orders-axios";
import formatDate from "../../../Utilities/FormatDate";
import {IOrder} from "../../../redux/interface/IOrder";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux";
import {useNavigate} from "react-router-dom";

const OrdersSearch: React.FC = () =>{
    const [search, setSearch] = React.useState<string>("");
    const [orders, setOrders] = React.useState<IOrder[]>([])
    const orderStatus = useSelector((state: RootState) => state.userInfo.orderStatus)
    const navigate = useNavigate();
    return(
        <>
            <div className={styles.content__top} style={{marginTop: "-30px"}}>
                <h1 className={styles.content__title}>Поиск заказа...</h1>
                <i>Введите номер телефона</i>
                <div className={styles.content__top__search_container}>
                    <InputDostavka value={search} setValue={(value: string) => {
                        setSearch(value);
                        if(value.length === 11){
                            OrdersAxios.Search(value).then(res =>{
                                console.log(res);
                                setOrders(res)
                            })
                        }
                    }}
                     placeholder={'Поиск...'}
                    />
                    {search && <img src="/img/cross.svg" alt="" onClick={() => setSearch('')}/>}
                </div>
            </div>

            <div className={stylesCabinet.Orders}>
                {
                    (orders.length)
                        ?
                        <table className={stylesCabinet.table} style={{width: "100%"}}>
                            <thead className={stylesCabinet.table_header}>
                            <tr className={stylesCabinet.table_row}>
                                <th className={stylesCabinet.table_col}>№</th>
                                <th className={stylesCabinet.table_col}>Время заказа</th>
                                <th className={stylesCabinet.table_col}>Сумма</th>
                                <th className={stylesCabinet.table_col}>Статус</th>
                                <th className={stylesCabinet.table_col}>Доставка</th>
                                <th className={stylesCabinet.table_col}></th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(order =>(
                                <tr className={stylesCabinet.table_row} key={order.id}>
                                    <td className={stylesCabinet.table_col} >{order.id}</td>
                                    <td className={stylesCabinet.table_col} >{formatDate(order.createdAt)}</td>
                                    <td className={stylesCabinet.table_col} >{order.total_price} ₽</td>
                                    <td className={stylesCabinet.table_col} >{orderStatus?.find(item => item.id === order.orderStatusId)?.name}</td>
                                    <td style={{fontSize: '13px'}} className={stylesCabinet.table_col} >{order.address}</td>
                                    <td className={stylesCabinet.table_col} ><span onClick={() => navigate(`/order/${search}-${order.id}`)}>Посмотреть</span></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        :
                        <div className={stylesCabinet.notHaveFavorites_Container} >
                            <img src="/img/emodji_pechal.png" alt=""/>
                            <p>У вас нет заказов :)</p>
                        </div>
                }
            </div>

        </>
    );
}

export  default OrdersSearch;