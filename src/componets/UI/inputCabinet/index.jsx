import React, {useRef} from 'react';
import styles from './inputCabinet.module.scss'
const InputCabinet = (props) => {
    const [changeValue, setChangeValue] = React.useState(false)
    const [disabledButton, setDisabledButton] = React.useState(false)
    const [valueInput, setValueInput] = React.useState(props.value)
    const [beforeValueInput, setBeforeValueInput ] = React.useState(props.value)
    const inputRef = useRef(null);

    const changedValueUser = () =>{
        setChangeValue(!changeValue)
        inputRef.current.focus();
        if(valueInput !== props.value){
            setBeforeValueInput(valueInput)
            props.onChangeUserInfo(valueInput, props.title)
        }
    }

    const clickCancel = () =>{
        setChangeValue(!changeValue)
        setValueInput(beforeValueInput)
    }
    React.useEffect(() =>{
        inputRef.current.focus();
    },[ changeValue])

    React.useEffect(() =>{
        if(valueInput !== beforeValueInput){
            setDisabledButton(false)
        } else setDisabledButton(true)
    },[valueInput, changeValue])
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.containerInput}>
                <input className={`${styles.input} ${(changeValue) ? styles.containerInput_active : styles.containerInput_disabled}`}
                       type={props.typeInput}
                       ref={inputRef}
                       disabled={(changeValue) ? false : true}
                       value={valueInput}
                       onChange={event => setValueInput(event.target.value)}
                />

                <button
                    disabled={ (changeValue) && (disabledButton) }
                    className={`${styles.a_changeInput} ${styles.innerInput} ${(changeValue && disabledButton) && styles.active}`}
                    onClick={changedValueUser}
                >Изменить</button>

            </div>
            {(changeValue) && <div className={`${styles.a_changeInput} ${styles.cancelButton}`} onClick={clickCancel}>Отменить</div>}
        </div>

    );
};

export default InputCabinet;