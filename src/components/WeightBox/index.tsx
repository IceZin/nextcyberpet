import styles from './styles.module.scss';
import Link from 'next/link'
import { useEffect, useState } from 'react';

function createWarningBox(style, msg) {
    return (
        <div className={styles.warningBox}>
            <img src="/exclamation-triangle-solid.svg" alt=""/>
            <h3>{msg}</h3>
        </div>
    )
}

function checkWarning(type) {
    if (type == "overweight") {
        return (
            <>
                <img src="/exclamation-triangle-solid.svg" alt=""/>
                <h3>Seu pet está acima da faixa de peso ideal</h3>
            </>
        )
    } else if (type == "underweight") {
        return (
            <>
                <img src="/exclamation-triangle-solid.svg" alt=""/>
                <h3>Seu pet está abaixo da faixa de peso ideal</h3>
            </>
        )
    } else if (type == "normal") {
        return (
            <>
                <img src="/check-solid.svg" alt=""/>
                <h3>Seu pet está dentro da faixa de peso ideal</h3>
            </>
        )
    } else if (type == undefined) {
        return (
            <>
                <img src="/exclamation-triangle-solid.svg" alt=""/>
                <h3>Faixa de peso ideal não definido</h3>
            </>
        )
    }
}

function checkSeverity(type) {
    if (type == "overweight") {
        return styles.severityOrange;
    } else if (type == "underweight") {
        return styles.severityOrange;
    } else if (type == "normal") {
        return styles.severityLightBlue;
    } else if (type == undefined) {
        return styles.severityBlack;
    }
}

export function WeightBox(props) {
    return (
        <div className={styles.box}>
            <div className={styles.info}>
                <div className={styles.weightInfo}>
                    <div className={styles.date}><h3>{props.date}</h3></div>
                    <div className={styles.time}><h3>{props.time}</h3></div>
                    <div className={styles.weightBox}>
                        <h3>Peso</h3>
                        <div className={styles.weight}>
                            <h4>{props.weight}</h4>
                        </div>
                    </div>
                </div>
                <div className={styles.warningBox}>
                    {checkWarning(props.severity)}
                </div>
            </div>

            <div className={checkSeverity(props.severity)}></div>
        </div>
    )
}