import React from "react";
import styles from "../../PizzaBlock/pizzaBlock.module.scss";
import {ICombos} from "../../../../redux/interface/Combos/ICombos";
import {selectShowFullProduct, setShowFullProduct} from "../../../../redux/slice/fullProductSlice";
import {RootState, useAppDispatch} from "../../../../redux";
import {setActiveCombo} from "../../../../redux/slice/productSlice";
import {useSelector} from "react-redux";

const ComboBlock: React.FC<ICombos> = (props) => {

    const showFullProduct = useSelector(selectShowFullProduct);
    const dispatch = useAppDispatch();
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const clickFullProduct = () => {
        dispatch(setShowFullProduct())
        dispatch(setActiveCombo(props.id))
        console.log(typeof props.id);
    }

    return (
        <div className={styles.wrapper} >
            <div className={styles.pizzaBlock}>
                <div className={styles.cu}>
                    <div onClick={clickFullProduct}>
                        <img
                            className={styles.image}
                            src={imageLoaded ? `${process.env.REACT_APP_API_SERVER}/${props.img_url}` : '/img/pizzaLoad.svg'}
                            alt="Combo"
                            onLoad={() => setImageLoaded(true)}
                        />
                        <h4 className={styles.title}>{props.title}</h4>
                        <div className={styles.text}>{props.description}</div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.price}> {props.priceDefault} ₽</div>
                    <div>

                        <button className="button button--outline button--add" onClick={clickFullProduct}>
                            <span>Выбрать</span>
                        </button>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default ComboBlock;