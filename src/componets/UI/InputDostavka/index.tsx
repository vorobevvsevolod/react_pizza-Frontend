import React from 'react';
import styles from './InputDostavka.module.scss';

const InputAddress: React.FC <{ title?: string; width?: string; textAlign?: 'center' | 'left'; value: string, setValue: any, placeholder: string, pattern?: any, name?: string}> = (props) => {
    const inChangeValue: React.ChangeEventHandler<HTMLInputElement> = (event) =>{
        props.setValue(event.target.value);
    }
    return (
        <div className={styles.wrapper}>
            {props.title && <div className={styles.title}>{props.title}</div>}
                <input style={{textAlign: props.textAlign, width: props.width}} className={styles.input}
                       value={props.value}
                       onChange={inChangeValue}
                       placeholder={props.placeholder}
                       name={props.name ? props.name : ""}
                />

        </div>
    );
};

export default InputAddress;