import Link from 'next/link'
import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <Link href="/">
                <img src="/cyberpet.svg" alt=""/>
            </Link>
            <h1>CyberPet</h1>
            <span></span>
            <h4>De a melhor experiencia para seu pet</h4>
        </header>
    )
}