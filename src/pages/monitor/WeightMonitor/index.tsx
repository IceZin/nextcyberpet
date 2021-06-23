import { useContext, useEffect, useRef, useState } from 'react'
import { Box } from '../../../components/Box'
import { BoxButton } from '../../../components/BoxButton'
import { BoxList } from '../../../components/BoxList'
import { BoxSwitch } from '../../../components/BoxSwitch'
import { WeightBox } from '../../../components/WeightBox'
import { WsContext } from '../../../contexts/WsContext'
import styles from './styles.module.scss'

type Box = {
    state: boolean
    info: {
        food: number
        water: number
    }
}

type BoxObject = {
    [key: string]: Box
}

type MonitorProps = {
    pageInfo: PageInfo
}

type PageInfo = {
    showOnMenu: boolean
    img64: String
}

export function WeightMonitor(props: MonitorProps) {
    let [pageInfo, setPageInfo] = useState({} as PageInfo);

    let canvasRef = useRef<HTMLCanvasElement>();

    let {ws} = useContext(WsContext)

    useEffect(() => {
        setPageInfo({...props.pageInfo});
    }, [])

    useEffect(() => {
        if (ws == undefined) return;

        ws.on("WeightMonitor", "data", (packet) => {

        });

        return () => {
            ws.on("WeightMonitor", "data", null);
        }
    }, [ws, pageInfo])

    return (
        <div className={styles.content}>
            <Box
                name="Peso ideal"
            >
                <div className={styles.idealWeight}>
                    <h3>Peso máximo</h3>
                    <div className={styles.weightBox}>
                        <h3>20Kg</h3>
                    </div>
                </div>
                <div className={styles.idealWeight}>
                    <h3>Peso minimo</h3>
                    <div className={styles.weightBox}>
                        <h3>14Kg</h3>
                    </div>
                </div>
            </Box>

            <Box
                name="Definição de peso"
            >
                <div className={styles.weightDef}>
                    <h3>Peso máximo</h3>
                    <input max="40" type="number" name="" id="" />
                </div>

                <div className={styles.weightDef}>
                    <h3>Peso minimo</h3>
                    <input max="40" type="number" name="" id="" />
                </div>

                <BoxButton
                    src="/check-solid.svg" 
                    onClick={(e) => {
                        
                    }}
                    title="Definir limites de peso">
                </BoxButton>
            </Box>

            <BoxList 
                name="Monitoramento de Peso"
                onFilterClick={() => {

                }}
            >
                <WeightBox
                    date="09/06/2021"
                    time="13:00"
                    weight="18.7Kg"
                    severity="normal"
                />
                <WeightBox
                    date="10/06/2021"
                    time="16:23"
                    weight="18.9Kg"
                    severity="normal"
                />
                <WeightBox
                    date="11/06/2021"
                    time="12:40"
                    weight="18.8Kg"
                    severity="normal"
                />
                <WeightBox
                    date="12/06/2021"
                    time="19:12"
                    weight="19Kg"
                    severity="normal"
                />
                <WeightBox
                    date="13/06/2021"
                    time="16:50"
                    weight="19.2Kg"
                    severity="normal"
                />
                <WeightBox
                    date="14/06/2021"
                    time="11:10"
                    weight="19.3Kg"
                    severity="normal"
                />
                <WeightBox
                    date="16/06/2021"
                    time="18:27"
                    weight="19.6Kg"
                    severity="normal"
                />
                <WeightBox
                    date="17/06/2021"
                    time="17:34"
                    weight="19.8Kg"
                    severity="normal"
                />
                <WeightBox
                    date="18/06/2021"
                    time="18:40"
                    weight="20.3Kg"
                    severity="overweight"
                />
            </BoxList>
        </div>
    )
}