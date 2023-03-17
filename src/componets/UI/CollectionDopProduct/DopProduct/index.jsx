import React from 'react';
import styles from './dopProduct.module.scss'
import {useDispatch} from "react-redux";
import {addDopProduct, deleteDopProduct, updatePriceDopProduct} from "../../../../redux/slice/fullProductSlice";

const DopProduct = (props) => {
	const [addInBasket, setAddBasket] = React.useState(false);
	const dispatch = useDispatch();
	const onClick = () => {
		setAddBasket(!addInBasket)
		if(!addInBasket){
			dispatch(addDopProduct({id:props.id, price: props.price, name: props.name}))
		} else {
			dispatch(deleteDopProduct(props.id))
		}
	}
	
	React.useEffect(() =>{
		if(addInBasket){
			dispatch(updatePriceDopProduct({id: props.id, price: props.price}))
		}
	}, [])
	
	React.useEffect(() =>{
	
	}, [addInBasket])

	return (
		<div
			className={`${styles.container} ${(addInBasket) ? styles.container_active : ''}`}
			onClick={onClick}
		>
			 <svg className={`${styles.svg} ${(addInBasket) ? styles.visible : styles.hidden}`} width="28" height="28" viewBox="0 0 24 24" fill="none" >
				<path fillRule="evenodd" clipRule="evenodd"
				      d="M12 20a8 8 0 100-16 8 8 0 000 16zm0 2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
				      fill="#ff6900"></path>
				<path fillRule="evenodd" clipRule="evenodd"
				      d="M16.602 7.864a1 1 0 01.2 1.4l-4.576 6.101c-.061.082-.146.197-.23.29a1.346 1.346 0 01-.513.366c-.311.121-.656.121-.967 0a1.346 1.346 0 01-.513-.365c-.084-.094-.17-.209-.23-.29l-2.075-2.767a1 1 0 011.6-1.2l1.701 2.269 4.202-5.604a1 1 0 011.4-.2z"
				      fill="#ff6900"></path>
			</svg>
			<img width={90} height={90} src={`${process.env.REACT_APP_API_SERVER}/${props.img_url}`} alt=""/>
			<p className={styles.name}>{props.name}</p>
			<p className={styles.price}>{props.price} ₽</p>
		</div>
	);
};

export default DopProduct;