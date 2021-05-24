import styles from './styles.module.scss';
import Link from 'next/link'
import { useEffect, useState } from 'react';

export function BoxButton(props) {
    return (
        <button onClick={() => {
            props.onClick(props.id);
        }} className={styles.boxButton}>
            <img src={props.src} alt=""/>
            <h3>{props.title}</h3>
            {props.children}
        </button>
    )
}