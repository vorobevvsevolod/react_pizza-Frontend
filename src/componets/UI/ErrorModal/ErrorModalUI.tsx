import React, {useContext} from "react";
import styles from './styles.module.scss';
import {ShowErrorModalContext} from "../../../App";

const ErrorModal: React.FC = () => {
    const context = useContext(ShowErrorModalContext);
    const [show, setShow] = React.useState<boolean>(false);

    if (!context) {
        throw new Error('ShowErrorModalContext must be used within a ShowErrorModalContext.Provider');
    }
    const { showErrorModalState } = context;

    React.useEffect(() => {
        if(showErrorModalState.show){
            setShow(true)
            setTimeout(() => setShow(false), 5000);
        }
    }, [showErrorModalState])

    return(
        <div className={`${styles.errorModal} ${show ? styles.errorModal_show : styles.errorModal_hidden}`}>
                <div className={styles.errorModal_title}> Ошибка! </div>
                <div className={styles.errorModal_text}> {showErrorModalState.errorText}</div>
                <div className={styles.errorModal_description}>Ответ от сервера: <span>{showErrorModalState.errorDescription}</span></div>
        </div>
    )
}

export default ErrorModal;