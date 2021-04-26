import styles from './styles.module.scss';
import Link from 'next/link'

export function BoxButton(props) {
    let state = false;

    let onClick = () => {
        state = !state;
        console.log(state);
    }

    return (
        <button onClick={onClick} className={styles.boxButton}>
            <img src={props.src} alt=""/>
            <h3>{props.title}</h3>
        </button>
    )
}