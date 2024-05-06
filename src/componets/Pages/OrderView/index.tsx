import React from 'react';
import styles from './styles.module.scss'
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import OrdersAxios from "../../../axios/Orders-axios";
import {RootState} from "../../../redux";
import formatDate from "../../../Utilities/FormatDate";

interface Order {

}
const OrderView:React.FC = () => {
    const params = useParams();
    const orderStatus = useSelector((state: RootState) => state.userInfo.orderStatus)
    const [order, setOrder] = React.useState<{}[]>([{}]);

    React.useEffect(()=>{
        OrdersAxios.getByIdAndPhoneOrToken( params?.id?.split('-')[1], params?.id?.split('-')[0]).then(res =>{
            setOrder(res[0])
            console.log(res);
        })
    },[])
    return (
        <div>
            {
                order &&
                <>
	                <h1 className={styles.title}>Заказ № {params.id}</h1>
	                <div className={styles.subtitle}> Статус заказа: <span>{orderStatus?.find(item => item.id === order.orderStatusId)?.name}</span></div>
	                <div className={styles.status_container}>
                        {orderStatus.map(item =>
                            <div className={styles.status_container_item} key={item.id}>
                                <img
                                    className={styles.status_container_item_content_img}
                                    width={100}
                                    src={`${item.id === 1 ? "/img/processing.png" : item.id === 2 ? "/img/cooking.png" : item.id === 3 ? "/img/delivery.png" : "/img/success.png"}`}
                                    alt=""
                                />
                                <div className={styles.status_container_item_content}>

                                    <div className={styles.status_container_item_content_title}>{item.name}</div>
                                </div>
                                {
                                    (item.id !== 4) &&
					                <>

                                        {
                                            item.id === order.orderStatusId
                                                ? <div className={styles.indeterminate_progress_bar}>
                                                    <div className={styles.indeterminate_progress_bar_progress}></div>
                                                </div>
                                                : <div
                                                    className={`${styles.status_container_item_content_line} ${item.id < order.orderStatusId ? styles.status_container_item_content_line_active : styles.status_container_item_content_line_noActive}`}></div>
                                        }

					                </>
                                }
                            </div>
                        )}
	                </div>

	                <>
		                <div className={styles.info}> Время заказа: <span>{formatDate(order.createdAt)}</span></div>
		                <div className={styles.info}> Адрес доставки: <span>{order.address}</span></div>
		                <div className={styles.info}> Стоимость: <span>{order.total_price} ₽</span></div>
	                </>
                </>
            }
        </div>
    );
};

export default OrderView;