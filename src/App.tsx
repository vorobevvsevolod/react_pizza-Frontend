import React from "react";
import {useSelector} from "react-redux";

import './scss/app.scss'
import Header from "./componets/UI/Header/HeaderUI";

import {
    fetchCombos,
    fetchProducts,
    fetchProductsTypes,
    selectStatusProducts,
    setActiveType,
    setCurrentPage
} from "./redux/slice/productSlice";
import {fetchDopProduct} from "./redux/slice/dopProductSlice";
import Cart from "./componets/UI/Cart/CartUI";
import {clearTokenUser, fetchOrders, fetchOrderStatus, fetchUserInfo, getTokenByCookie} from "./redux/slice/UserSlice";
import {addProductInCart, fetchCart, selectShowCart} from "./redux/slice/cartSlice";
import {
    fetchTypesAndSizes,
    openFullProduct,
    selectActiveTypePizza,
    selectShowFullProduct,
    setActiveTypesPizza,
    setArrayFullProduct,
    setShowFullProduct
} from "./redux/slice/fullProductSlice";
import Router from "./router";
import FullProduct from "./componets/UI/FullProduct/FullProductUI";
import PizzaAxios from "./axios/Pizza-axios";
import {ICartItem} from "./redux/interface/ICartItem";
import {RootState, useAppDispatch} from "./redux/redux";
import {useLocation, useNavigate} from "react-router-dom";
import {StatusFetch} from "./redux/interface/StatusFetch";
import {IProduct} from "./redux/interface/IProduct";
import DOMPurify from 'dompurify';
import ErrorModal from "./componets/UI/ErrorModal/ErrorModalUI";

interface ErrorModalContextType {
    showErrorModalState: {
        show: boolean;
        errorText: string;
        errorDescription: string;
    };
    errorHandler: ((response: {data: any, errorText?: string}) => void);
}

export const AddProductInCartContext = React.createContext<null | ((obj: any) => void)>(null);
export const ShowErrorModalContext = React.createContext<ErrorModalContextType | null>(null);

function App() {
	const dispatch = useAppDispatch();
	const { status, token, error } = useSelector((state: RootState) => state.userInfo)
    const arrayFullProduct = useSelector((state: RootState) => state.fullProduct.product)
    const { activeType, currentPage, search, products } = useSelector((state: RootState) => state.products)
    const showFullProduct = useSelector(selectShowFullProduct);
    const activeTypePizza = useSelector(selectActiveTypePizza)
    const showCart = useSelector(selectShowCart)
    const location = useLocation();

    const navigate = useNavigate()
    const statusProducts = useSelector(selectStatusProducts)
    const [showErrorModalState, setShowErrorModalState] = React.useState({
        show: false,
        errorText: '',
        errorDescription: ''
    });

    const addInCart = React.useCallback(  (obj: ICartItem): void => {
        let data;
        if(obj.productsCombo?.array.length){
            data = {
                basketCombos: obj.productsCombo,
                description: obj.composition
            }
            if(token){

                PizzaAxios.add(data).then(res =>{
                    if (res.status === 200) {
                        dispatch(addProductInCart({id: res.data.message, ...obj}))
                    } else errorHandler({data: res, errorText: 'Ошибка добавления продукта в корзину'});
                });
            }else{
                dispatch(addProductInCart(obj))
            }

        }else{
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
                    if (res.status === 200) {
                        dispatch(addProductInCart({id: res.data.message, ...obj}))
                    } else errorHandler({data: res, errorText: 'Ошибка добавления продукта в корзину'});
                });
            }else{
                dispatch(addProductInCart(obj))
            }
        }

    }, [token]);

    const errorHandler = React.useCallback(( response: {data: any, errorText?: string}): any => {
        switch (response.data.status) {
                case 401:
                    setShowErrorModalState({
                        show: true,
                        errorText: response.errorText ? response.errorText : 'Ошибка валидации',
                        errorDescription: response.data.data.message
                    });
                    break;
                case 500:
                    setShowErrorModalState({
                        show: true,
                        errorText: response.errorText ? response.errorText :'Непредвиденная ошибка',
                        errorDescription: response.data.data.message
                    });
                    break;
            case 404:
                setShowErrorModalState({
                    show: true,
                    errorText: response.errorText ? response.errorText : 'Not Found',
                    errorDescription: response.data.data.message
                });
                break;
                default:
                    setShowErrorModalState({
                        show: true,
                        errorText: 'Ошибка',
                        errorDescription: 'Произошла неизвестная ошибка'
                    });
                    break;
            }
        }, [showErrorModalState]);

    const stringToParams = (str: string): {typeId: number, productId?: number, currentPage?: number} => {
        const searchParams = new URLSearchParams(str);

        const typeId = Number(DOMPurify.sanitize(searchParams.get('typeId')));
        const productId = searchParams.has('productId') ? Number(DOMPurify.sanitize(searchParams.get('productId'))) : undefined;
        const currentPage = searchParams.has('currentPage') ? Number(DOMPurify.sanitize(searchParams.get('currentPage'))) : undefined;

        if (isNaN(typeId) || (productId !== undefined && isNaN(productId)) || (currentPage !== undefined && isNaN(currentPage))) {
            navigate('/home')
        }

        return { typeId, productId, currentPage };
    };
    const paramsToString = (productId?:number | string): void => {
        const searchParams = new URLSearchParams();

        if(productId) searchParams.set('productId', productId.toString());

        searchParams.set('typeId', activeType.toString());
        searchParams.set('currentPage', currentPage.toString());
        navigate(`/home/?${searchParams}`);
    }

    React.useEffect(() =>{
		dispatch(getTokenByCookie())
        dispatch(fetchOrderStatus())
		dispatch(fetchProductsTypes())
        dispatch(fetchTypesAndSizes())
        dispatch(fetchDopProduct())
        dispatch(fetchCombos())
    }, [])

    React.useEffect(() =>{
        if(token){
            dispatch(fetchUserInfo())
            dispatch(fetchCart())
            dispatch(fetchOrders())
        }

        if(token && status === StatusFetch.FAILED){
            dispatch(clearTokenUser());
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

    },[activeType, currentPage, search ])

    React.useEffect(()=>{
        if(statusProducts !== StatusFetch.START) paramsToString(arrayFullProduct.id)
    },[arrayFullProduct.id])

    React.useEffect(() =>{
        if(statusProducts !== StatusFetch.START && activeType === 1) paramsToString(activeTypePizza)
    }, [activeTypePizza])

    React.useEffect(() => {
        if (showFullProduct || showCart) {
            document.documentElement.classList.add('no-scroll');
        } else {
            document.documentElement.classList.remove('no-scroll');
        }
    }, [showFullProduct, showCart]);

    React.useEffect(() => {
        if(status && statusProducts){
            if ((status !== StatusFetch.SUCCESS && status !== StatusFetch.LOADING) ||
                (statusProducts !== StatusFetch.SUCCESS && statusProducts !== StatusFetch.LOADING)) {
                setShowErrorModalState({
                    show: true,
                    errorText: error ? error : 'Ошибка подлючения',
                    errorDescription: 'Нет ответа от сервера, перезагрузите страницу'
                });
            }
            console.log(products.length);
            if(statusProducts === StatusFetch.LOADING || products.length <= 4){
                document.documentElement.classList.add('no-scroll');
            } else {
                document.documentElement.classList.remove('no-scroll');
            }
        }
    },[status, statusProducts])

    return (
        <ShowErrorModalContext.Provider value={{ showErrorModalState, errorHandler }}>
            <AddProductInCartContext.Provider value={addInCart}>
                <div className="wrapper">
                    <ErrorModal/>
                    <Header/>
                    <Cart/>
                    <FullProduct/>
                    <div className={`${'container'} ${location.pathname.startsWith('/home') ? 'container_homeAdaptive' : 'container_defualt'}`}>
                        <Router/>
                    </div>
                </div>
            </AddProductInCartContext.Provider>
        </ShowErrorModalContext.Provider>
	);
}

export default App;
