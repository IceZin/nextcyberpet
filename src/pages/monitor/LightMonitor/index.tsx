import { Chart, LineController, LineElement, PointElement, LinearScale, Tooltip, CategoryScale } from 'chart.js'
import { useContext, useEffect, useRef, useState } from 'react'
import { Box } from '../../../components/Box'
import { BoxButton } from '../../../components/BoxButton'
import { BoxSwitch } from '../../../components/BoxSwitch'
import { TimeBox } from '../../../components/TimeBox'
import { WsContext } from '../../../contexts/WsContext'
import styles from './styles.module.scss'

const channel = "LightMonitor";

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

type ChartData = {
    time: Array<number>
    lightLevel: number
}

type PageInfo = {
    auto: boolean
    light: boolean
    spectrum: boolean
    mobileAudio: boolean
    chartData: Array<ChartData>
}

export function LightMonitor(props: MonitorProps) {
    let [formInfo, setFormInfo] = useState(Boolean);
    let [pageInfo, setPageInfo] = useState({} as PageInfo);
    let [chart, setChart] = useState<Chart>();

    let {ws} = useContext(WsContext)

    let contentRef = useRef<HTMLDivElement>();
    let formRef = useRef<HTMLFormElement>();
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
        if (chart != undefined) {
            props.pageInfo.chartData.forEach(data => {
                chart.data.labels.push(`${data.time[0]}:${data.time[1]}`);
                chart.data.datasets[0].data.push(data.lightLevel);
            })

            console.log(props.pageInfo)

            updateChart();
        }
    }, [chart])

    useEffect(() => {
        if (ws == undefined) return;

        ws.on("LightMonitor", "data", (packet) => {
            if (packet.action == "newLightTime") {
                let dataset = chart.data.datasets[0];

                if (chart.data.labels.length == 10) {
                    chart.data.labels.shift();
                    dataset.data.shift();
                }

                chart.data.labels.push(packet.time);
                dataset.data.push(packet.lightLevel);

                updateChart();
            } else if (packet.action == "toggleOption") {
                setPageInfo({...pageInfo, ...{[packet.option]: packet.state}})
                console.log(pageInfo)
            }
        })

        return () => {
            ws.on("LightMonitor", "data", null);
        }
    }, [ws, pageInfo, chart])

    function validateForm(e) {
        e.preventDefault();

        if (e.target.color.value == null) {
            return;
        }

        ws.sendJSON({
            type: 0x1,
            data: {
                channel: "LightMonitor",
                action: "setColor",
                color: e.target.color.value
            }
        })

        let notify = e.target.querySelector("#notify");

        notify.style.width = "11rem";

        setTimeout(() => {
            notify.style.width = "0rem";
        }, 1000)
    }

    function showForm() {
        setFormInfo(true);

        contentRef.current.style.filter = "brightness(0.6)";
    }

    function hideForm() {
        setFormInfo(false);

        contentRef.current.style.filter = "";
    }

    return (
        <div>
            <form 
                className={styles.editBox + ' ' + (formInfo ? (styles.visible) : (styles.hidden))} 
                onSubmit={validateForm}
                ref={formRef}
            >
                <div className={styles.notification} id="notify">
                    <img src="/check-solid.svg" alt=""/>
                    <h3>Cor aplicada</h3>
                </div>

                <header>
                    <h3>Cor da iluminação</h3>

                    <div className={styles.optionBox}>
                        <button type="button" onClick={hideForm}><img src="/times-solid.svg" alt=""/></button>
                        <button type="submit"><img src="/check-solid.svg" alt=""/></button>
                    </div>
                </header>

                <div className={styles.editContent}>
                    <div className={styles.config}>
                        <h3>Cor</h3>
                        <input type="color" id="color" className={styles.colorInput}/>
                    </div>
                </div>
            </form>

            <div className={styles.content} ref={contentRef}>
                <Box name="Controle de Iluminação">
                    <BoxSwitch 
                        src="/lightbulb-solid.svg" 
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
                        src="/gift-solid.svg" 
                        state={pageInfo.spectrum} onClick={(e) => {
                            ws.sendJSON({
                                type: 0x1,
                                data: {
                                    channel: "LightMonitor",
                                    action: "toggleOption",
                                    option: "spectrum"
                                }
                            })
                        }}
                        title="???">
                    </BoxSwitch>
                    <BoxSwitch 
                        src="/volume-up-solid.svg" 
                        state={pageInfo.mobileAudio} onClick={(e) => {
                            ws.sendJSON({
                                type: 0x1,
                                data: {
                                    channel: "LightMonitor",
                                    action: "toggleOption",
                                    option: "mobileAudio"
                                }
                            })
                        }}
                        title="Áudio Mobile">
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
                    <BoxButton
                        src="/swatchbook-solid.svg" 
                        onClick={(e) => {
                            showForm();
                        }}
                        title="Cor da Iluminação">
                    </BoxButton>
                </Box>

                <Box name="Níveis de luz">
                    <canvas ref={canvasRef}></canvas>
                </Box>
            </div>
        </div>
    )
}