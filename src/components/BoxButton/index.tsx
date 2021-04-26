import styles from './styles.module.scss';
import Link from 'next/link'
import { useEffect, useState } from 'react';

export function BoxButton(props) {
    let [state, setState] = useState(Boolean);

    useEffect(() => {
        console.log(state);
    }, [state])

    let onClick = () => {
        setState(!state);
    }

    return (
        <button onClick={onClick} className={styles.boxButton}>
            <img src={props.src} alt=""/>
            <h3>{props.title + ' ' + state}</h3>
        </button>
    )
}