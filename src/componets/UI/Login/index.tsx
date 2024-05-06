import React from 'react';
import styles from './styles.module.scss'
import OrangeButton from "../Buttons/OrangeButton/orangeButton";
import UserAxios from "../../../axios/User-axios";
import {useAppDispatch} from "../../../redux";
import {setTokenUser} from "../../../redux/slice/UserSlice";

const Login:React.FC <{showLogin: boolean, setShowLogin: any}> = ({showLogin, setShowLogin}) => {
    const [value, setValue] = React.useState<string>("");
    const [isValid, setIsValid] = React.useState<boolean>(false);
    const [next, setNext] = React.useState<boolean>(false)
    const [digits, setDigits] = React.useState(["", "", "", "", "", ""]); // массив для хранения введенных цифр
    const inputRefs = React.useRef<Array<HTMLInputElement>>([]); // массив для хранения ссылок на input
    const [isValidCode, setIsValidCode] = React.useState<boolean>(false);
    const [timer, setTimer] = React.useState<number>(5)
    const dispatch = useAppDispatch();

    // обработчик изменения значения в input
    function handleChange(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        const { value } = e.target as HTMLInputElement;
        // проверяем, что введенное значение является одним символом или Backspace
        if (value.length <= 1 || e.keyCode === 8) {
            setDigits((prevDigits) => {
                const newDigits = [...prevDigits];
                newDigits[index] = value;
                return newDigits;
            });
            // перенаправляем фокус на следующий или предыдущий input в зависимости от нажатой клавиши
            if (e.keyCode === 8 && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            } else if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
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
        setValue(inputValue);
        setIsValid(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputValue));
    }



    React.useEffect(() => {
        if (digits.every((digit) => digit !== "")) {
            inputRefs.current[5].blur();
            const code = digits.join("");
            UserAxios.login("", code).then(res =>{
                if(res.code){
                    setIsValidCode(true);
                } else {
                    dispatch(setTokenUser(res))
                    setShowLogin(!showLogin)
                    setNext(!next);
                    setDigits(["", "", "", "", "", ""])
                    setTimer(5)
                    setValue("")
                }

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





        function clear (flag: boolean){
            if(flag)setNext(!next);
            setDigits(["", "", "", "", "", ""])
            setTimer(5)
            timerid = setInterval( function interval(){
                setTimer(prev => prev - 1)
            }, 1000)

            setTimeout(() => {
                clearInterval(timerid);
            }, 5 * 1000);
            UserAxios.login(value).then(res =>
                console.log(res)
            );

        }
    }


    return (
        <div className={`${styles.overlay} ${showLogin ? styles.overlay_visible : styles.overlay_hidden}`}>
            <div className={styles.modal}>
                <img className={styles.overlay_svg} src="/img/cross.svg" alt="" onClick={() => setShowLogin(!showLogin)}/>
                <div className={styles.modal_title}>Вход на сайт</div>
                {next
                    ? <div className={styles.modal_subtitle}>   Код отправили сообщением на <b>{value}</b> <span onClick={() => setNext(!next)}>Изменить</span>  </div>
                    : <div className={styles.modal_subtitle}>  Подарим подарок на день рождения, сохраним адрес доставки и расскажем об акциях </div>
                }
                {
                    next
                    ? <div className={styles.modal_container_input} style={{marginTop: "20px"}}>
                            {digits.map((digit, index) => (
                                <input
                                    key={index}
                                    className={`${styles.inputCode} ${isValidCode ? styles.inputCode_notValid : ""} `}
                                    type="text"
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
                                    value={value}
                                    onChange={inChangeValue}
                                    type="email"
                                    placeholder={"example@mail.ru"}
                            />
                        </div>
                }


                <OrangeButton title={`${next ? timer ? `Получить новый код ${timer} c`: "Выслать код"  : "Выслать код"}`} disabled={ Boolean( (!next && !isValid) || (next && timer) )} onClick={submit}/>
                <div className={styles.modal_licence}>Продолжая, вы соглашаетесь <span>со сбором и обработкой персональных данных и пользовательским соглашением</span></div>
            </div>
        </div>
    );
};

export default Login;
