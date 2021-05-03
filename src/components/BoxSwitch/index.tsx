import { Switch } from '../Switch';
import styles from './styles.module.scss';

export function BoxSwitch(props) {
    return (
        <button onClick={() => {
            props.onClick(props.id);
        }} className={styles.boxButton}>
            <img src={props.src} alt=""/>
            <h3>{props.title}</h3>
            <Switch enabled={props.state}></Switch>
        </button>
    )
}