import { Chart, LineController, LineElement, PointElement, LinearScale, Tooltip, CategoryScale } from 'chart.js'
import { useContext, useEffect, useRef, useState } from 'react'
import { Box } from '../../../components/Box'
import { BoxButton } from '../../../components/BoxButton'
import { BoxSwitch } from '../../../components/BoxSwitch'
import { TimeBox } from '../../../components/TimeBox'
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
    boxes: BoxObject
    pageInfo: PageInfo
}

type FormInfo = {
    info: {
        type: string
        boxTime: string
    },
    state: boolean
}

type PageInfo = {
    auto: boolean
    light: boolean
}

export function LightMonitor(props: MonitorProps) {
    let [pageInfo, setPageInfo] = useState({} as PageInfo);
    let [chart, setChart] = useState<Chart>();

    let {ws} = useContext(WsContext)

    let canvasRef = useRef<HTMLCanvasElement>();

    const renderChart = () => {
        let ctx = canvasRef.current.getContext('2d');

        setChart(new Chart(ctx, {
            type: "line",
            data: {
                labels: [],
                datasets: [{
                    label: "Light Level",
                    data: [],
                    fill: false,
                    backgroundColor: '#ffffff',
                    borderColor: '#ffffff',
                    tension: 0.5
                }]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            color: '#FFFFFF'
                        },
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#FFFFFF'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            },
            plugins: [Tooltip]
        }))
    }

    const updateChart = () => {
        if (!chart) return;

        chart.update();
    };

    useEffect(() => {
        setPageInfo({...props.pageInfo});

        Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip)

        if (chart != undefined) {
            chart.destroy();
        }

        renderChart();
    }, [])

    useEffect(() => {
        if (ws == undefined) return;

        ws.on("TempMonitor", "data", (packet) => {
            if (packet.action == "newLightTime") {
                let dataset = chart.data.datasets[0];

                if (chart.data.labels.length == 10) {
                    chart.data.labels.shift();
                    dataset.data.shift();
                }

                chart.data.labels.push(packet.params.time);
                dataset.data.push(packet.params.lightLevel);

                updateChart();
            } else if (packet.action == "toggleOption") {
                setPageInfo({...pageInfo, ...{[packet.option]: packet.state}})
                console.log(pageInfo)
            }
        })
    }, [ws, pageInfo, chart])

    return (
        <div className={styles.content}>
            <Box name="Controle de Iluminação">
                <BoxSwitch 
                    src="/wind-solid.svg" 
                    state={pageInfo.light} onClick={(e) => {
                        ws.sendJSON({
                            type: 0x1,
                            data: {
                                channel: "LightMonitor",
                                action: "toggleOption",
                                option: "light"
                            }
                        })
                    }}
                    title="Iluminação">
                </BoxSwitch>
                <BoxSwitch 
                    src="/plug-solid.svg" 
                    state={pageInfo.auto} onClick={(e) => {
                        ws.sendJSON({
                            type: 0x1,
                            data: {
                                channel: "LightMonitor",
                                action: "toggleOption",
                                option: "auto"
                            }
                        })
                    }} 
                    title="Controle de nível de iluminação">
                </BoxSwitch>
            </Box>

            <Box name="Níveis de luz">
                <canvas ref={canvasRef}></canvas>
            </Box>
        </div>
    )
}