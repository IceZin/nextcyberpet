import styles from './styles.module.scss';
import Link from 'next/link'

export function BoxHrefButton(props) {
    return (
        <Link href={props.href}>
            <a className={styles.boxButton}>
                <img src={props.src} alt=""/>
                <h3>{props.title}</h3>
            </a>
        </Link>
    )
}