import React from "react";
import styles from "./styles.module.scss";

const Contact: React.FC = () =>{
    return(

        <>
            <div className={styles.content__top} style={{marginTop: "-30px"}}>
                <h1 className={styles.content__title}>Доставка</h1>

            </div>
            <div style={{marginBottom: "20px", fontSize: "20px"}}>В городе Санкт-Петербург находятся несколько наших ресторанов для вас.</div>
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A81ed04ae3c8545dc35775394d19707bf7d75a5bd8499e1a45e3f63741c127abd&amp;source=constructor"
                width="100%" height="650" frameBorder="0" style={{borderRadius: "10px", marginBottom: "20px"}}>

            </iframe>
        </>
    );
}

export  default Contact;