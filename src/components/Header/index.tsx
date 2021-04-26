import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <img src="/cyberpet.svg" alt=""/>
            <h1>CyberPet</h1>
            <span></span>
            <h4>De a melhor experiencia para seu pet</h4>
        </header>
    )
}