import React from 'react';
import styles from './InputDostavka.module.scss';

const InputAddress: React.FC <{ title: string; width?: string; textAlign?: 'center' | 'left'; onChange: any; type?: string}> = (props) => {
    const [valueInput, setValueInput] = React.useState('')
    const inChangeValue: React.ChangeEventHandler<HTMLInputElement> = (event) =>{
        setValueInput(event.target.value);
        props.onChange(event.target.value, props.type)
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{props.title}</div>
            <input style={{textAlign: props.textAlign, width: props.width}} className={styles.input}
                   value={valueInput}
                   onChange={inChangeValue}
            />
        </div>
    );
};

export default InputAddress;