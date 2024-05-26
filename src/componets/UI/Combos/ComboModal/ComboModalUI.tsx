import React from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../../redux/redux";
import {ICombos} from "../../../../redux/interface/Combos/ICombos";
import {setShowFullProduct} from "../../../../redux/slice/fullProductSlice";

import styles from './styles.module.scss';
import {setActiveCombo} from "../../../../redux/slice/productSlice";
import {IProduct} from "../../../../redux/interface/IProduct";
import OrangeButtonUI from "../../Buttons/OrangeButton/OrangeButtonUI";
import {IComboProductDefault} from "../../../../redux/interface/Combos/IComboProductDefault";
import {current} from "@reduxjs/toolkit";
import PizzaAxios from "../../../../axios/Pizza-axios";
import {AddProductInCartContext} from "../../../../App";
import {ICartItem} from "../../../../redux/interface/ICartItem";

const ComboModal: React.FC = () => {
    const { combos, activeCombo} = useSelector((state: RootState) => state.products)
    const { types, sizes} = useSelector((state: RootState) => state.fullProduct)
    const dispatch = useAppDispatch();
    const addInCart = React.useContext(AddProductInCartContext)
    const [showArrayProductMobile, setShowArrayProductMobile] = React.useState<boolean>(false);

    const [combo, setCombo] = React.useState<ICombos>({
        id: 0,
        title: '',
        description: '',
        img_url: 'string',
        priceDefault: 0,
        products: [],
        productDefault: [],
    })

    const[selectProducts, setSelectProducts] = React.useState<(IComboProductDefault & { typeId: number })[]>();
    const [activeProductRight, setActiveProductRight] = React.useState<number>(0);

    React.useEffect(() => {
        if(combos.length){
            const foundCombo = combos.find(combo => combo.id === activeCombo);
            setCombo(foundCombo ? foundCombo : {} as ICombos);
            setSelectProducts(foundCombo?.productDefault.map(item => ({ ...item, typeId: 1 })) || []);
        }
    }, [combos.length])

    React.useEffect(() => {

    }, [activeProductRight])
    return (
        <>
            <div className={styles.container}>
                <div className={`${styles.svg_container} ${styles.svg_container_mobile}`}>
                    <img className={`${showArrayProductMobile ? styles.svg_container_mobile_back : styles.svg_container_mobile_close}`} src= {`${ showArrayProductMobile ? "/img/arrow.svg" : "/img/cross.svg"}`} alt="" onClick={() => {
                        if(showArrayProductMobile){
                            setShowArrayProductMobile(false)
                        }else {
                            dispatch(setShowFullProduct());
                            dispatch(setActiveCombo(0));
                        }
                    }}/>
                </div>

                <div className={`${styles.svg_container} ${styles.svg_container_pc}`}>
                    <img className={styles.svg} src="/img/cross.svg" alt="" onClick={() => {
                        dispatch(setShowFullProduct());
                        dispatch(setActiveCombo(0));
                    }}/>
                </div>

                <div className={styles.item}>

                    <div className={`${styles.item_left} ${styles.item_left_pc}`}>
                        {
                            activeProductRight
                                ? <div className={styles.item_left_container}>
                                    {
                                        combo && combo.products.length && combo.products.find(com => com.productsTypeId === selectProducts.find(sel => sel.id === activeProductRight).productsTypeId)?.array.map(product => {
                                            if(product.pizzas_sizes_variants?.length){
                                                return(
                                                        <div className={`${styles.item_left_item} ${product.pizzas_sizes_variants[0]?.find(pr => pr.id === selectProducts?.find(sel => sel.id === activeProductRight).pizzasSizesVariantId) ? styles.item_left_item_active : ''}`}
                                                             onClick={() => {
                                                                 setSelectProducts(prevData => prevData.map(item => {
                                                                     if (item.id === activeProductRight) {
                                                                         return { ...item, pizzasSizesVariantId: product.pizzas_sizes_variants[0].find(pr1 => pr1.pizzas_types_variant.pizzasTypeId === selectProducts?.find(sel => sel.id === activeProductRight).typeId).id  };
                                                                     }
                                                                     return item;
                                                                 }));
                                                             }}>
                                                            <img  src={`${process.env.REACT_APP_API_SERVER}/${product.img_url}`} alt=""/>
                                                            <p className={styles.item_left_item_name}>{product.name}</p>
                                                            {
                                                                product.increase ? <p className={styles.item_left_item_price}>+{product.increase}₽</p>  : ''
                                                            }
                                                        </div>
                                                )
                                            } else {
                                                return(
                                                    <div className={`${styles.item_left_item} ${product.id === selectProducts?.find(sel => sel.id === activeProductRight).productId ? styles.item_left_item_active : ''}`}
                                                         onClick={() => {
                                                             setSelectProducts(prevData => prevData.map(item => {
                                                                 if (item.id === activeProductRight) {
                                                                     if(product.pizzas_sizes_variants){
                                                                         return { ...item, pizzasSizesVariantId: product.pizzas_sizes_variants[0].find(pr1 => pr1.pizzas_types_variant.pizzasTypeId === selectProducts?.find(sel => sel.id === activeProductRight).typeId).id  };

                                                                     } else {
                                                                         return { ...item, productId: product.id  };
                                                                     }
                                                                 }
                                                                 return item;
                                                             }));
                                                         }}>
                                                        <img width={156} height={156} src={`${process.env.REACT_APP_API_SERVER}/${product.img_url}`} alt=""/>
                                                        <p className={styles.item_left_item_name}>{product.name}</p>
                                                        {
                                                            product.increase ? <p className={styles.item_left_item_price}>+{product.increase}₽</p>  : ''
                                                        }
                                                    </div>
                                                )
                                            }
                                    })
                                    }
                                </div>
                                :  <img
                                    className={styles.item_left_defualtImg}
                                    src={`${process.env.REACT_APP_API_SERVER}${combo.img_url}`}
                                    alt="combo_img"
                                />
                        }

                    </div>
                    {
                        showArrayProductMobile
                            ? <div className={`${styles.item_left} ${styles.item_left_mobile}`}>
                            {
                                activeProductRight
                                    ? <div className={styles.item_left_container}>
                                        {
                                            combo && combo.products.length && combo.products.find(com => com.productsTypeId === selectProducts.find(sel => sel.id === activeProductRight).productsTypeId)?.array.map(product => {
                                                if(product.pizzas_sizes_variants?.length){
                                                    return(
                                                        <div className={`${styles.item_left_item} ${product.pizzas_sizes_variants[0]?.find(pr => pr.id === selectProducts?.find(sel => sel.id === activeProductRight).pizzasSizesVariantId) ? styles.item_left_item_active : ''}`}
                                                             onClick={() => {
                                                                 setSelectProducts(prevData => prevData.map(item => {
                                                                     if (item.id === activeProductRight) {
                                                                         return { ...item, pizzasSizesVariantId: product.pizzas_sizes_variants[0].find(pr1 => pr1.pizzas_types_variant.pizzasTypeId === selectProducts?.find(sel => sel.id === activeProductRight).typeId).id  };
                                                                     }
                                                                     return item;
                                                                 }));

                                                                 setShowArrayProductMobile(false);
                                                             }}>
                                                            <img  src={`${process.env.REACT_APP_API_SERVER}/${product.img_url}`} alt=""/>
                                                            <p className={styles.item_left_item_name}>{product.name}</p>
                                                            {
                                                                product.increase ? <p className={styles.item_left_item_price}>+{product.increase}₽</p>  : ''
                                                            }
                                                        </div>
                                                    )
                                                } else {
                                                    return(
                                                        <div className={`${styles.item_left_item} ${product.id === selectProducts?.find(sel => sel.id === activeProductRight).productId ? styles.item_left_item_active : ''}`}
                                                             onClick={() => {
                                                                 setSelectProducts(prevData => prevData.map(item => {
                                                                     if (item.id === activeProductRight) {
                                                                         if(product.pizzas_sizes_variants){
                                                                             return { ...item, pizzasSizesVariantId: product.pizzas_sizes_variants[0].find(pr1 => pr1.pizzas_types_variant.pizzasTypeId === selectProducts?.find(sel => sel.id === activeProductRight).typeId).id  };

                                                                         } else {
                                                                             return { ...item, productId: product.id  };
                                                                         }
                                                                     }
                                                                     return item;
                                                                 }));
                                                                 setShowArrayProductMobile(false);
                                                             }}>
                                                            <img width={156} height={156} src={`${process.env.REACT_APP_API_SERVER}/${product.img_url}`} alt=""/>
                                                            <p className={styles.item_left_item_name}>{product.name}</p>
                                                            {
                                                                product.increase ? <p className={styles.item_left_item_price}>+{product.increase}₽</p>  : ''
                                                            }
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                    :  <img
                                        className={styles.item_left_defualtImg}
                                        src={`${process.env.REACT_APP_API_SERVER}${combo.img_url}`}
                                        alt="combo_img"
                                    />
                            }

                        </div>
                            : <></>
                    }


                    <div className={styles.item_right}>
                        <div className={styles.item_right_content}>
                            <div className={styles.item_right_title}>
                                <img
                                    className={styles.item_left_defualtImg_mobile}
                                    src={`${process.env.REACT_APP_API_SERVER}${combo.img_url}`}
                                    alt="combo_img"
                                />
                                <h2>{combo.title}</h2>

                                {/*{(arrayFullProduct.pizza_info) && <DopInfo infoArray={arrayFullProduct.pizza_info}*/}
                                {/*                                           typeProduct={arrayFullProduct.productsTypeId} top='14%' right='-5%'/>}*/}
                            </div>
                            <div className={styles.item_right_description}>{combo.description}</div>

                            <div className={styles.item_right_content_prosuctSelect_container}>
                                {
                                    selectProducts?.length && selectProducts.map((product, index) => {
                                        let productArray = null;
                                        if(product.productsTypeId === 1){
                                            const filteredProducts = combo.products
                                                .find(pr => pr.productsTypeId === product.productsTypeId)
                                                ?.array.filter(pr => pr.pizzas_sizes_variants[0].find(pr1 => pr1.id === product.pizzasSizesVariantId));

                                            // Если массив не пустой, возвращаем первый элемент
                                            if (filteredProducts && filteredProducts.length > 0) {
                                                productArray = filteredProducts[0];
                                            }

                                            if(productArray)
                                                return(
                                                <div className={`${styles.item_right_content_prosuctSelect} ${activeProductRight === product.id ? styles.item_right_content_prosuctSelect_active : ''}`} onClick={() => {
                                                    setShowArrayProductMobile(true);
                                                    setActiveProductRight(product.id)}
                                                }>
                                                    {activeProductRight === product.id ? <div className={styles.item_right_content_prosuctSelect_treangle}></div> : <></>}
                                                    <div className={styles.item_right_content_prosuctSelect_top}>
                                                        <img height={68} width={68} src={`${process.env.REACT_APP_API_SERVER}/${productArray.pizzas_sizes_variants[0].find(pr1 => pr1.id === product.pizzasSizesVariantId).pizzas_types_variant.img_url}`} alt=""/>
                                                        <div>
                                                            <div className={styles.item_right_content_prosuctSelect_top_title}> {productArray.name} </div>
                                                            <div className={styles.item_right_content_prosuctSelect_top_description}>
                                                                {`${sizes.find(size => size.id === productArray.pizzas_sizes_variants[0][0].pizzasSizeId)?.size} см, 
                                                                  ${types.find(type => type.id === productArray.pizzas_sizes_variants[0].find(pr1 => pr1.id === product.pizzasSizesVariantId).pizzas_types_variant.pizzasTypeId)?.type} тесто,
                                                                  ${productArray.pizzas_sizes_variants[0][0].pizzas_types_variant.pizza_info.weight} г
                                                                `}
                                                            </div>
                                                            <div className={styles.item_right_content_prosuctSelect_top_products}>{productArray.description}</div>
                                                            {
                                                                productArray.increase ? <div className={styles.item_right_content_prosuctSelect_top_dopPrice}>+{productArray.increase} ₽ </div> : ''
                                                            }


                                                        </div>

                                                    </div>

                                                    <div className={styles.item_right_content_prosuctSelect_bottom}>
                                                        {
                                                            activeProductRight === product.id
                                                                ? (
                                                                    productArray.pizzas_sizes_variants[0].find(pr1 => pr1.id === product.pizzasSizesVariantId).pizzasSizeId !== 1 ? <div className={styles.item_right_content_prosuctSelect_bottom_selector}>
                                                                            {
                                                                                types.length && types.map(type => (
                                                                                    <div  className={`${productArray.pizzas_sizes_variants[0].find(pr1 => pr1.id === product.pizzasSizesVariantId).pizzas_types_variant.pizzasTypeId === type.id ? styles.item_right_content_prosuctSelect_bottom_selector_itemActive : styles.item_right_content_prosuctSelect_bottom_selector_item}`}
                                                                                          onClick={() => {
                                                                                              setSelectProducts(prevData => prevData.map(item => {
                                                                                                  if (item.id === product.id) {
                                                                                                      return { ...item, pizzasSizesVariantId: productArray.pizzas_sizes_variants[0].find(pr1 => pr1.pizzas_types_variant.pizzasTypeId === type.id).id, typeId: type.id };
                                                                                                  }
                                                                                                  return item;
                                                                                              }));
                                                                                          }}>{type.type}</div>
                                                                                ))
                                                                            }
                                                                        </div> : <></>
                                                                )
                                                                :   <button className={styles.item_right_content_prosuctSelect_bottom_btn} >
                                                                        <span>Заменить</span>
                                                                    </button>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            const filteredProducts = combo.products
                                                .find(pr => pr.productsTypeId === product.productsTypeId)
                                                ?.array.filter(pr => pr.id === product.productId)

                                            if (filteredProducts && filteredProducts.length > 0) {
                                                productArray = filteredProducts[0];
                                            }


                                            if(productArray)
                                                return(
                                                    <div className={`${styles.item_right_content_prosuctSelect} ${activeProductRight === product.id ? styles.item_right_content_prosuctSelect_active : ''}`} onClick={() => {
                                                        setShowArrayProductMobile(true);
                                                        setActiveProductRight(product.id)}
                                                    }>
                                                        {activeProductRight === product.id ? <div className={styles.item_right_content_prosuctSelect_treangle}></div> : <></>}
                                                        <div className={styles.item_right_content_prosuctSelect_top}>
                                                            <img height={68} width={68} src={`${process.env.REACT_APP_API_SERVER}/${productArray.img_url}`} alt=""/>
                                                            <div>
                                                                <div className={styles.item_right_content_prosuctSelect_top_title}> {productArray.name} </div>
                                                                <div className={styles.item_right_content_prosuctSelect_top_description}>
                                                                    {`${productArray.productsTypeId === 4 ? productArray.pizza_info.weight + ' л' : (productArray.pizza_info.weight * 1000 + ' г') }`}
                                                                </div>
                                                                <div className={styles.item_right_content_prosuctSelect_top_products}>{productArray.description}</div>
                                                                {
                                                                    productArray.increase ? <div className={styles.item_right_content_prosuctSelect_top_dopPrice}>+{productArray.increase} ₽ </div> : ''
                                                                }


                                                            </div>

                                                        </div>

                                                        <div className={styles.item_right_content_prosuctSelect_bottom}>
                                                            {
                                                                activeProductRight === product.id
                                                                    ?  <></>
                                                                    :   <button className={styles.item_right_content_prosuctSelect_bottom_btn} >
                                                                        <span>Заменить</span>
                                                                    </button>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                        }

                                    } )
                                }
                            </div>
                        </div>
                        <div className={styles.item_right_bottom}>
                            <div className={styles.item_right_bottom_top}>


                            </div>
                            <div className={styles.item_right_bottom_bottom}>
                                <div className={styles.item_right_bottom_bottom_price}>
                                    {combo.priceDefault + (selectProducts?.reduce((acc, current) => {
                                        const product = combo.products.find(pr => pr.productsTypeId === current.productsTypeId);

                                        if (product) {
                                            const productItem = product.array.find(pr => {
                                                    if(product.productsTypeId === 1){
                                                        return pr.pizzas_sizes_variants[0].find(pr1 => pr1.id === current.pizzasSizesVariantId)
                                                    } else {
                                                        return pr.id === current.productId
                                                    }
                                            }
                                            );
                                            if (productItem) {
                                                acc += productItem.increase;
                                            }
                                        }
                                        return acc;
                                    }, 0) || 0)} ₽
                                </div>


                                <OrangeButtonUI title={'В корзину'} width={'187px'} disabled={false} onClick={() => {
                                    let description: string = "";

                                    selectProducts.map((sel, index) => {
                                         combo.products.map(pr => {
                                            pr.array.map(prArray => {
                                                if(prArray.productsTypeId === 1){
                                                    if(prArray.pizzas_sizes_variants[0].find(pr1 => pr1.id === sel.pizzasSizesVariantId))
                                                        if(index !== selectProducts?.length - 1)
                                                            description += prArray.name + ", "
                                                        else  description += prArray.name + ".";

                                                } else {
                                                    if(prArray.id === sel.productId)
                                                        if(index !== selectProducts?.length - 1)
                                                            description += prArray.name + ", "
                                                        else  description += prArray.name + ".";
                                                }
                                            })

                                            }
                                        );
                                    })

                                    dispatch(setShowFullProduct())

                                    if (addInCart) {
                                        addInCart({
                                            productId: 0,
                                            dopProducts: [],
                                            composition: description,
                                            description: '',
                                            quantity: 1,
                                            name: 'Комбо ' + combo.title,
                                            img_url: combo.img_url,
                                            productsCombo: {
                                                comboId: combo.id,
                                                array: selectProducts
                                            },
                                            price: combo.priceDefault + (selectProducts?.reduce((acc, current) => {
                                                const product = combo.products.find(pr => pr.productsTypeId === current.productsTypeId);

                                                if (product) {
                                                    const productItem = product.array.find(pr => {
                                                            if(product.productsTypeId === 1){
                                                                return pr.pizzas_sizes_variants[0].find(pr1 => pr1.id === current.pizzasSizesVariantId)
                                                            } else {
                                                                return pr.id === current.productId
                                                            }
                                                        }
                                                    );
                                                    if (productItem) {
                                                        acc += productItem.increase;
                                                    }
                                                }
                                                return acc;
                                            }, 0) || 0),
                                        } as ICartItem)
                                    }
                                }}/>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ComboModal;