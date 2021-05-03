import styles from './styles.module.scss'

export function Switch(props) {
    return (
        <div className={styles.box}>
            <span className={props.enabled ? styles.on : ''}></span>
        </div>
    )
}