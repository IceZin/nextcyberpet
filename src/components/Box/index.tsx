import styles from './styles.module.scss';

export function Box(props) {
    let contentClass = styles.contentFlex;

    if (props.displayType == "grid") {
        contentClass = styles.contentGrid;
    }

    return (
        <div className={styles.box}>
            <header><h3>{props.name}</h3></header>
            <div className={contentClass}>
                {props.children}
            </div>
        </div>
    )
}