import React from 'react';
import styles from './InputDostavka.module.scss';
import OrangeButton from "../Buttons/OrangeButton/orangeButton";

const InputAddress: React.FC <{ title: string; width?: string; textAlign?: 'center' | 'left'; value: string, setValue: any, placeholder: string, pattern?: any}> = (props) => {
    const inChangeValue: React.ChangeEventHandler<HTMLInputElement> = (event) =>{
        props.setValue(event.target.value);
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{props.title}</div>
                <input style={{textAlign: props.textAlign, width: props.width}} className={styles.input}
                       value={props.value}
                       onChange={inChangeValue}
                       placeholder={props.placeholder}
                />

        </div>
    );
};

export default InputAddress;