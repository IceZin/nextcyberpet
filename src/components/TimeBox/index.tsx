import { useEffect, useRef } from 'react';
import { Switch } from '../Switch'
import styles from './styles.module.scss'

export function TimeBox(props) {
    let infoRef = useRef<HTMLDivElement>();

    useEffect(() => {
        if (props.params.state) {
            infoRef.current.style.filter = ""
        } else {
            infoRef.current.style.filter = "brightness(0.5)"
        }
    }, [props.params.state])

    return (
        <div className={styles.timeBox}>
            <div className={styles.options}>
                <div className={styles.time} onClick={() => {
                    props.onUpdate({
                        type: "toggleState"
                    })
                }}>
                    <h3>{props.params.time}</h3>
                    <div className={styles.switch}>
                        <span className={props.params.state ? (styles.isActive) : ''}></span>
                    </div>
                </div>

                <button className={styles.edit} onClick={() => {
                    props.onUpdate({
                        type: "toggleEdit"
                    })
                }}>
                    Editar
                </button>
            </div>

            <div className={styles.info} ref={infoRef}>
                <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Quantidade</th>
                            <th>Duração</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Ração</td>
                            <td>{props.params.info.food}g</td>
                            <td>-- --</td>
                        </tr>

                        <tr>
                            <td>Água</td>
                            <td>-- --</td>
                            <td>{props.params.info.water}s</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}