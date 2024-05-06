import React from 'react';
import styles from './inputCabinet.module.scss';

interface InputCabinetProps {
    value: string;
    onChangeUserInfo: (value: string, title: string) => void;
    title: string;
    typeInput: string;
    validationRegex?: RegExp;
    errorMessage?: string;
}

const InputCabinet: React.FC<InputCabinetProps> = (props) => {
    const [changeValue, setChangeValue] = React.useState(false);
    const [disabledButton, setDisabledButton] = React.useState(false);
    const [valueInput, setValueInput] = React.useState(props.value);
    const [beforeValueInput, setBeforeValueInput] = React.useState(props.value);
    const [error, setError] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const changedValueUser = (): void => {
        setChangeValue(!changeValue);
        inputRef?.current?.focus();
        if (valueInput !== props.value) {
            setBeforeValueInput(valueInput);
            props.onChangeUserInfo(valueInput, props.title);
        }
    };

    const clickCancel = () => {
        setChangeValue(!changeValue);
        setValueInput(beforeValueInput);
        setError(null);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = '';
        if(props.typeInput === 'tel' && event.target.value[0] !== "+"){
             newValue = `+${event.target.value}`;
        } else newValue = event.target.value;
        setValueInput(newValue);
        if (props.validationRegex && !props.validationRegex.test(newValue)) {
            setError(props.errorMessage || 'Неверные данные!');
        } else {
            setError(null);
        }
    };

    React.useEffect(() => {
        inputRef?.current?.focus();
    }, [changeValue]);

    React.useEffect(() => {
        if (valueInput !== beforeValueInput && !error) {
            setDisabledButton(false);
        } else setDisabledButton(true);
    }, [valueInput, changeValue, error]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{ error ? error : props.title}</div>
            <div className={styles.containerInput}>
                <input
                    className={`${styles.input} ${(error ? styles.containerInput_invalid : (changeValue ? styles.containerInput_active : styles.containerInput_disabled))}`}
                    type={props.typeInput}
                    ref={inputRef}
                    disabled={!changeValue}
                    value={valueInput}
                    onChange={handleInputChange}
                />
                <button
                    disabled={(changeValue) && (disabledButton)}
                    className={`${styles.a_changeInput} ${styles.innerInput} ${(changeValue && disabledButton) && styles.active}`}
                    onClick={changedValueUser}
                >
                    {changeValue && valueInput !== beforeValueInput && !error ? 'Сохранить' : 'Изменить'}
                </button>
            </div>
            {(changeValue) && <div className={`${styles.a_changeInput} ${styles.cancelButton}`} onClick={clickCancel}>Отменить</div>}
        </div>
    );
};

export default InputCabinet;
