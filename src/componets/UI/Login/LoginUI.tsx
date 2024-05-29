import React, {useContext} from 'react';
import styles from './styles.module.scss'
import OrangeButtonUI from "../Buttons/OrangeButton/OrangeButtonUI";
import UserAxios from "../../../axios/User-axios";
import {useAppDispatch} from "../../../redux/redux";
import {setTokenUser} from "../../../redux/slice/UserSlice";
import DOMPurify from 'dompurify';
import {ShowErrorModalContext} from "../../../App";

const Login:React.FC <{showLogin: boolean, setShowLogin: any}> = ({showLogin, setShowLogin}) => {
    const [email, setEmail] = React.useState<string>("");
    const [isValid, setIsValid] = React.useState<boolean>(false);
    const [next, setNext] = React.useState<boolean>(false)
    const [digits, setDigits] = React.useState(["", "", "", "", "", ""]); // массив для хранения введенных цифр
    const inputRefs = React.useRef<Array<HTMLInputElement>>([]); // массив для хранения ссылок на input
    const [isValidCode, setIsValidCode] = React.useState<boolean>(false);
    const [timer, setTimer] = React.useState<number>(5)
    const dispatch = useAppDispatch();
    const { errorHandler } = useContext(ShowErrorModalContext);
    // обработчик изменения значения в input
    function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        let { value } = e.target as HTMLInputElement;

        // Фильтруем вводимые символы, оставляя только цифры или пробелы
        value = value.replace(/[^0-9\s]/g, '');
        value = DOMPurify.sanitize(value);
        // Устанавливаем отфильтрованное значение в состояние
        setDigits((prevDigits) => {
            const newDigits = [...prevDigits];
            newDigits[index] = value;
            return newDigits;
        });

        // Если значение не пустое и не последнее, фокусируемся на следующем поле
        if (value.trim() !== "" && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }

        // Если значение пустое и не первое, фокусируемся на предыдущем поле
        if (value.trim() === "" && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    }





    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        // Перенаправляем фокус на предыдущий input при нажатии Backspace в пустом input
        if (e.keyCode === 8 && !digits[index]) {
            e.preventDefault();
            if (inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
                setDigits((prevDigits) => {
                    const newDigits = [...prevDigits];
                    newDigits[index - 1] = "";
                    return newDigits;
                });
            }
        }
    }

    const inChangeValue: React.ChangeEventHandler<HTMLInputElement> = (event) =>{
        const inputValue = event.target.value;
        const cleanedValue = DOMPurify.sanitize(inputValue);
        setEmail(cleanedValue);
        setIsValid(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(cleanedValue));
    }




    React.useEffect(() => {
        if (digits.every((digit) => digit !== "")) {
            inputRefs.current[5].blur();
            const code = digits.join("");
            UserAxios.login(email, code).then(res =>{
                if(res.status === 404){
                    setIsValidCode(true);
                } else if(res.status === 200 && res.data.message){
                    dispatch(setTokenUser(res.data.message))
                    setShowLogin(!showLogin)
                    setNext(!next);
                    setDigits(["", "", "", "", "", ""])
                    setTimer(5)
                    setEmail("")
                } else errorHandler({data: res, errorText: 'Ошибка аутентификации'});

            })

        }else {
            setIsValidCode(false)
        }
    }, [digits]);

    React.useEffect(() =>{
        if(next)
        inputRefs?.current[0]?.focus()
    }, [next])

    const submit = () =>{
        let timerid: any = undefined;
        if(next){
            if(timer === 0) clear(false)
        }else if(!timerid) clear(true)


        function clear(flag: boolean) {
            if (flag) {
                setNext(!next);
            }

            setDigits(["", "", "", "", "", ""]);
            setTimer(5);

            const timerId = setTimeout(() => {
                clearInterval(intervalId);
                clearTimeout(timerId);
            }, 6 * 1000);

            const intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            UserAxios.login(email).then(res => {
                if(res.status !== 200){
                    errorHandler({data: res, errorText: 'Ошибка аутентификации'});
                }
            });
        }


    }


    return (
        <div className={`${styles.overlay} ${showLogin ? styles.overlay_visible : styles.overlay_hidden}`}>
            <div className={styles.modal}>
                <img className={styles.overlay_svg} src="/img/cross.svg" alt="" onClick={() => setShowLogin(!showLogin)}/>
                <div className={styles.modal_title}>Вход на сайт</div>
                {next
                    ? <div className={styles.modal_subtitle}>   Код отправили сообщением на <b>{email}</b> <span onClick={() => setNext(!next)}>Изменить</span>  </div>
                    : <div className={styles.modal_subtitle}>  Подарим подарок на день рождения, сохраним адрес доставки и расскажем об акциях </div>
                }
                {
                    next
                    ? <div className={styles.modal_container_input} style={{marginTop: "20px"}}>
                            {digits.map((digit, index) => (
                                <input
                                    key={index}
                                    className={`${styles.inputCode} ${isValidCode ? styles.inputCode_notValid : ""} `}
                                    inputMode="numeric"
                                    value={digit}
                                    maxLength={1}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)} // сохраняем ссылку на input
                                />
                            ))
                            }
                        </div>
                    :   <div className={styles.modal_container_input}>
                            <div className={styles.input_subtitle}>Электронная почта</div>
                            <input  className={styles.input}
                                    value={email}
                                    onChange={inChangeValue}
                                    type="email"
                                    placeholder={"example@mail.ru"}
                            />
                        </div>
                }


                <OrangeButtonUI title={`${next ? timer ? `Получить новый код ${timer} c`: "Выслать код"  : "Выслать код"}`} disabled={ Boolean( (!next && !isValid) || (next && timer) )} onClick={submit}/>
                <div className={styles.modal_licence}>Продолжая, вы соглашаетесь <span>со сбором и обработкой персональных данных и пользовательским соглашением</span></div>
            </div>
        </div>
    );
};

export default Login;
