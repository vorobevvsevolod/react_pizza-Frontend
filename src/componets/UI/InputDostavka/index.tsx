import React from 'react';
import styles from './InputDostavka.module.scss';

const InputDostavka: React.FC <{ title: string; width?: string; textAlign?: string; onChange: any; type: string}> = (props) => {
    const [valueInput, setValueInput] = React.useState('')
    console.log(props);
    const inChangeValue = (event) =>{
        setValueInput(event.target.value);
        props.onChange(event.target.value, props.type)
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{props.title}</div>
            <input style={{width: props.width, textAlign: props.textAlign}} className={styles.input}
                   value={valueInput}
                   onChange={inChangeValue}
            />
        </div>
    );
};

export default InputDostavka;