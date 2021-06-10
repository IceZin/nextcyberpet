import { Chart, LineController, LineElement, PointElement, LinearScale, Tooltip, CategoryScale } from 'chart.js'
import { useContext, useEffect, useRef, useState } from 'react'
import { Box } from '../../../components/Box'
import { BoxButton } from '../../../components/BoxButton'
import { BoxSwitch } from '../../../components/BoxSwitch'
import { TimeBox } from '../../../components/TimeBox'
import { WsContext } from '../../../contexts/WsContext'
import styles from './styles.module.scss'

type MonitorProps = {
    pageInfo: PageInfo
}

type ChartData = {
    time: Array<number>
    temp: number
}

type PageInfo = {
    autoTempCtrl: boolean
    airFlow: boolean
    chartData: Array<ChartData>
}

export function TempMonitor(props: MonitorProps) {
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
                    label: "Temperatura",
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
        if (chart != undefined) {
            props.pageInfo.chartData.forEach(data => {
                chart.data.labels.push(`${data.time[0]}:${data.time[1]}`);
                chart.data.datasets[0].data.push(data.temp);
            })

            updateChart();
        }
    }, [chart])

    useEffect(() => {
        if (ws == undefined) return;

        ws.on("TempMonitor", "data", (packet) => {
            if (packet.action == "newTemperatureTime") {
                let dataset = chart.data.datasets[0];

                if (chart.data.labels.length == 10) {
                    chart.data.labels.shift();
                    dataset.data.shift();
                }

                console.log(packet);

                chart.data.labels.push(packet.time);
                dataset.data.push(packet.value);

                updateChart();
            } else if (packet.action == "toggleOption") {
                setPageInfo({...pageInfo, ...{[packet.option]: packet.state}})
            }
        })

        return () => {
            ws.on("TempMonitor", "data", null);
        }
    }, [ws, pageInfo, chart])

    return (
        <div className={styles.content}>
            <Box name="Controle de temperatura">
                <BoxSwitch 
                    src="/wind-solid.svg" 
                    state={pageInfo.airFlow} onClick={(e) => {
                        ws.sendJSON({
                            type: 0x1,
                            data: {
                                channel: "TempMonitor",
                                action: "toggleOption",
                                option: "airFlow"
                            }
                        })
                    }} 
                    title="Ventilação">
                </BoxSwitch>
                <BoxSwitch 
                    src="/plug-solid.svg" 
                    state={pageInfo.autoTempCtrl} onClick={(e) => {
                        ws.sendJSON({
                            type: 0x1,
                            data: {
                                channel: "TempMonitor",
                                action: "toggleOption",
                                option: "autoTempCtrl"
                            }
                        })
                    }} 
                    title="Modo automático">
                </BoxSwitch>
            </Box>

            <Box name="Níveis de temperatura">
                <canvas ref={canvasRef}></canvas>
            </Box>
        </div>
    )
}