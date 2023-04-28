import React from "react";
import { useSelector} from "react-redux";

import './scss/app.scss'
import Header from "./componets/UI/Header";

import {
    fetchProducts,
    fetchProductsTypes,
    selectStatusProducts,
    setActiveType,
    setCurrentPage
} from "./redux/slice/productSlice";
import {fetchDopProduct} from "./redux/slice/dopProductSlice";
import Cart from "./componets/UI/Cart";
import {clearTokenUser, fetchOrders, fetchUserInfo, getTokenByCookie, setTokenUser} from "./redux/slice/UserSlice";
import {addProductInCart, fetchCart} from "./redux/slice/cartSlice";
import {
    fetchTypesAndSizes, openFullProduct, selectActiveTypePizza,
    selectArrayFullProduct, setActiveTypesPizza,
    setArrayFullProduct,
    setShowFullProduct
} from "./redux/slice/fullProductSlice";
import Router from "./router";
import FullProduct from "./componets/UI/FullProduct";
import PizzaAxios from "./axios/Pizza-axios";
import {ICartItem} from "./redux/interface/ICartItem";
import {RootState, useAppDispatch} from "./redux";
import {useNavigate, useParams, useLocation} from "react-router-dom";
import {StatusFetch} from "./redux/interface/StatusFetch";
import {IProduct} from "./redux/interface/IProduct";
import axios from "./axios";

export const AddProductInCartContext = React.createContext<null | ((obj: any) => void)>(null);


function App() {
	const dispatch = useAppDispatch();
	const { status, token } = useSelector((state: RootState) => state.userInfo)
    const arrayFullProduct = useSelector((state: RootState) => state.fullProduct.product)
    const { activeType, currentPage, search } = useSelector((state: RootState) => state.products)
    const activeTypePizza = useSelector(selectActiveTypePizza)

    const navigate = useNavigate()
    const statusProducts = useSelector(selectStatusProducts)

    const addInCart = React.useCallback(  (obj: ICartItem): void => {
        let data;
        if(obj.typeProduct !== 1){
            data = {
                productId: obj.productId,
                description: obj.description
            }
        }else{
            data = {
                pizzasSizedId: obj.pizzasSizedId,
                description: obj.description,
                dopProducts: obj.dopProducts
            }
            dispatch(setShowFullProduct())
        }
        if(token){

            PizzaAxios.add(data).then(res =>{
                dispatch(addProductInCart({id: res, ...obj}))
            });
        }else{
            dispatch(addProductInCart(obj))
        }
    }, [token]);

    const stringToParams = (str: string): {typeId: number, productId?: number, currentPage?: number} => {
        const searchParams = new URLSearchParams(str);
        const typeId = Number(searchParams.get('typeId'));
        const productId = Number(searchParams.get('productId'));
        const currentPage = Number(searchParams.get('currentPage'));
        return { typeId, productId, currentPage };
    }
    const paramsToString = (productId?:number | string): void => {
        const searchParams = new URLSearchParams();

        if(productId) searchParams.set('productId', productId.toString());

        searchParams.set('typeId', activeType.toString());
        searchParams.set('currentPage', currentPage.toString());
        navigate(`/home/?${searchParams}`);
    }

    React.useEffect(() =>{
		dispatch(getTokenByCookie())

		dispatch(fetchProductsTypes())
        dispatch(fetchTypesAndSizes())
        dispatch(fetchDopProduct())

    }, [])

    React.useEffect(() =>{
        if(token){
            dispatch(fetchUserInfo())
            dispatch(fetchCart())
            dispatch(fetchOrders())
        }
    }, [token])

    React.useEffect(()=>{

        const params = stringToParams(window.location.search.substring(1));
        if(params.typeId){
            dispatch(setActiveType(params.typeId))
            if(params.currentPage) dispatch(setCurrentPage(params.currentPage))
        }

        dispatch(fetchProducts({isCount: true})).then(res =>{
            // @ts-ignore
            const productArray: IProduct[] = res.payload.products;

            if(params.productId && params.typeId !== 1){

                const productOne: IProduct | undefined = productArray.find(item => item.id === params.productId)

                if(productOne) {
                    dispatch(setArrayFullProduct(productOne))
                    dispatch(openFullProduct())
                }
            }

            if(params.typeId === 1 && params.productId){
                const result = productArray.find(product => {
                    if(product.pizzas_sizes_variants)
                        return product.pizzas_sizes_variants.find(item =>{
                            return item.find(size =>{
                                if(size.pizzas_types_variant.id === params.productId){
                                    return size
                                }
                            })
                        })
                });
                if(result){
                    dispatch(setActiveTypesPizza(params.productId))
                    dispatch(setArrayFullProduct(result))
                    dispatch(openFullProduct())
                }

            }


        })
    },[])

    React.useEffect(() =>{
        if(statusProducts !== StatusFetch.START) {
            dispatch(fetchProducts({isCount: true}))
            paramsToString()
        }

    },[activeType, currentPage, search])

    React.useEffect(()=>{
        if(statusProducts !== StatusFetch.START) paramsToString(arrayFullProduct.id)
    },[arrayFullProduct.id])

    React.useEffect(() =>{
        if(statusProducts !== StatusFetch.START && activeType === 1) paramsToString(activeTypePizza)

    }, [activeTypePizza])
    



    return (
		<AddProductInCartContext.Provider value={addInCart}>
			<div className="wrapper">
				<Header/>
				<Cart/>
				<FullProduct/>
				<div className="container">
					<Router/>
				</div>
			</div>
		</AddProductInCartContext.Provider>
	);
}

export default App;
