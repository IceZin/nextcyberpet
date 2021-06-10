import styles from './styles.module.scss';

export function BoxList(props) {
    let contentClass = styles.contentFlex;

    if (props.displayType == "grid") {
        contentClass = styles.contentGrid;
    }

    return (
        <div className={styles.box}>
            <header>
                <h3>{props.name}</h3>
                <button onClick={() => {props.onFilterClick()}}>Filtrar</button>
            </header>
            <div className={contentClass}>
                {props.children}
            </div>
        </div>
    )
}