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

export function CameraMonitor(props: MonitorProps) {
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
            <BoxList 
                name="Monitoramento de Peso"
                onFilterClick={() => {

                }}
            >
                <WeightBox
                    date="09/06"
                    time="13:00"
                    weight="18.7Kg"
                    severity="overweight"
                />
            </BoxList>
        </div>
    )
}