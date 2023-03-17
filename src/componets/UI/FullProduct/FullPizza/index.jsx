import React from 'react';
import styles from "../fullProduct.module.scss";
import {
	selectArrayFullProduct, selectCartDopProducts,
	 selectSizes, selectTypes,
	setShowFullProduct
} from "../../../../redux/slice/fullProductSlice";
import CollectionDopProducts from "../../CollectionDopProduct";
import OrangeButton from "../../Buttons/OrangeButton/OrangeButton";
import {useDispatch, useSelector} from "react-redux";

import DopInfo from "../DopInfo/indes";
import {AddProductInCartContext} from "../../../../App";

const FullPizza = () => {
	const arrayFullProduct = useSelector(selectArrayFullProduct);
	const cartDopProducts = useSelector(selectCartDopProducts)
	const sizes = useSelector(selectSizes)
	const types = useSelector(selectTypes)
	const addInCartContext = React.useContext(AddProductInCartContext)
	
	
	const dispatch = useDispatch()
	
	
	const [activeSize, setActiveSize] =React.useState(2)
	const [activeType, setActiveType] =React.useState({
		id: 1,
		typeInfo: {}
	})
	const [price, setPrice] = React.useState(0)
	const [description, setDescription] = React.useState('')
	
	const [sizesAndTypes, setSizesAndTypes] = React.useState([])
	
	const getAllSizesFromPizzas = (pizza) => {
		const sizes = [];
		function traverseSizes() {
			pizza.pizzas_sizes_variants.map(size => {
				const sizeId = size[0].pizzasSizeId;
				let types = size.map( type =>{
						return {
							id: type.pizzas_types_variant.id,
							typeId: type.pizzas_types_variant.pizzasTypeId
						}
					}
				);
				if (!sizes.find(s => s.sizeId === sizeId)) {
					sizes.push({
						sizeId: sizeId,
						types: types
					});
				}
			});
		}
		
		traverseSizes();
		return sizes
	}
	
	const updateActiveTypeInfo = (id) =>{
		let obj;
		arrayFullProduct.pizzas_sizes_variants.map(types =>
			types.map(type =>{
				if(type.pizzas_types_variant.id === id)
					obj = type.pizzas_types_variant;
			})
		)
		setActiveType({typeInfo: obj, id: id})
		
	}
	
	const selectActiveSize = (id) =>{
		updateActiveTypeInfo(sizesAndTypes[id - 1].types[0].id)
		setActiveSize(id)
	}
	
	const addInCart = () => {
		const composition = arrayFullProduct.description + cartDopProducts.reduce((string, obj)=> string + ', ' + obj.name, '')
		const dopProducts = [];
		
		cartDopProducts.map( item => dopProducts.push(item.id))
		
		addInCartContext({
			price: price,
			img_url: activeType.typeInfo.img_url,
			name: arrayFullProduct.name,
			dopProducts: dopProducts,
			composition: composition,
			description: description,
			quantity: 1,
			dopPrice: sizes[activeSize - 1].dopPrice,
			pizzasSizedId: activeType.id,
			typeProduct: arrayFullProduct.productsTypeId
		})
		
	}
	
	
	React.useEffect(() =>{
		setSizesAndTypes(getAllSizesFromPizzas(arrayFullProduct))
	},[arrayFullProduct]);
	
	React.useEffect(() =>{
		setPrice(activeType.typeInfo.price + cartDopProducts.reduce((sum, obj) => sum + obj.price, 0))
	}, [activeType.typeInfo, cartDopProducts])
	
	React.useEffect(() =>{
		setDescription(`${sizes[activeSize- 1]?.size} см, ${types.find(item => item.id === activeType.typeInfo.pizzasTypeId)?.type} тесто, ${activeType.typeInfo.pizza_info?.weight} г`)
	}, [activeType.typeInfo, activeSize])
	
	React.useEffect(() =>{
		if(sizesAndTypes.length)
			updateActiveTypeInfo(sizesAndTypes[activeSize - 1].types[0].id)
	}, [sizesAndTypes])
	return (
			<div className={styles.fullProduct}>
				<img className={styles.overlay_svg} src="/img/cross.svg" alt="" onClick={() => dispatch(setShowFullProduct())}/>
				<div className={styles.item_left}>
					<img
						className={`${styles.item_left_img} ${(activeSize === 1) ? styles.item_left_little : (activeSize === 2) ? styles.item_left_middle : (activeSize === 3) ? styles.item_left_big : ''}`}
						src={`${process.env.REACT_APP_API_SERVER}${activeType?.typeInfo?.img_url}`}
						alt=""/>
					{(activeSize === 1) && <svg className={styles.item_left_img_svg} width="400" height="400"
					                            viewBox="0 0 382 382" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="191" cy="191" r="190" stroke="#6F6E6F" strokeWidth="0.6" strokeLinecap="round"
						        strokeLinejoin="round" strokeDasharray="1 6.1"></circle>
					</svg>}
					
					{(activeSize !== 3) && <svg className={styles.item_left_img_svg} width="500" height="500"
					                            viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg">
						<ellipse opacity="0.6" cx="225" cy="225" rx="224" ry="224" stroke="#6F6E6F"
						         strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"
						         strokeDasharray="2 12.2"></ellipse>
					</svg>}
				</div>
				<div className={styles.item}>
					
					<div className={styles.item_right_description}>
						<div className={styles.item_right_description_title}>
							<h2>{arrayFullProduct.name}</h2>
							<div className={styles.info}>
								<DopInfo infoArray={activeType?.typeInfo?.pizza_info} top='11%' right='3.1%'/>
							</div>
						</div>
						<p>{description}</p>
						<p>{arrayFullProduct.description}</p>
						<div className={styles.selector}>
							<ul>
								{sizesAndTypes.map(item =>
									<li key={item.sizeId}
									    className={(activeSize === item.sizeId) ? styles.active : ''}
									    onClick={() => selectActiveSize(item.sizeId)}
									>{sizes[item.sizeId - 1].size} см</li>
								)}
							</ul>
							<ul>
								{
									sizesAndTypes.map(sizeAndType =>
											(sizeAndType.sizeId === activeSize)
											&& sizeAndType.types.map(type =>
												<li
													key={type.id}
													className={(activeType.id === type.id) ? styles.active : ''}
													onClick={() => updateActiveTypeInfo(type.id)}
												>{types.find(item => item.id === type.typeId).type} </li>
											)
									)
								}
							</ul>
						</div>
						<CollectionDopProducts array = {arrayFullProduct.dop_product_pizzas} size={activeSize} dopPrice={sizes[activeSize - 1]?.dopPrice}/>
					</div>
					<OrangeButton onClick={addInCart} title={`Добавить в корзину за ${price} ₽`}/>
				</div>
			
			</div>
	);
};

export default FullPizza;