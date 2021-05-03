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
}

type FormInfo = {
    info: {
        type: string
        boxTime: string
    },
    state: boolean
}

export function FoodMonitor(props: MonitorProps) {
    let [formInfo, setFormInfo] = useState({} as FormInfo);
    let [timeBoxes, setTimeBoxes] = useState({} as BoxObject)

    let {ws} = useContext(WsContext)

    let contentRef = useRef<HTMLDivElement>();
    let formRef = useRef<HTMLFormElement>();

    useEffect(() => {
        setTimeBoxes({...props.boxes});
    }, [])

    useEffect(() => {
        console.log(timeBoxes);
    }, [timeBoxes])

    useEffect(() => {
        if (ws == undefined) return;

        ws.on("FeedMonitor", "data", (packet) => {
            console.log(packet)

            if (packet.action == "newFeedTime") {
                addTimeBox(packet);
            } else if (packet.action == "deleteFeedTime") {
                removeTimeBox(packet.boxTime);
            } else if (packet.action == "toggleFeedTime") {
                let tmpArr = {...timeBoxes};
                tmpArr[packet.box.time].state = packet.box.state;
                setTimeBoxes(tmpArr);
            } else if (packet.action == "editFeedTime") {
                let tmpArr = {...timeBoxes};

                if (packet.boxTime != packet.params.newTime) {
                    tmpArr[packet.params.newTime] = {...tmpArr[packet.boxTime]};

                    delete tmpArr[packet.boxTime];
                }

                tmpArr[packet.params.newTime].info.food = packet.params.food;
                tmpArr[packet.params.newTime].info.water = packet.params.water;

                setTimeBoxes(tmpArr);
            }
        })
    }, [ws, timeBoxes])

    function addTimeBox(packet) {
        let boxInfo: Box = {
            state: packet.box.state,
            info: {
                food: packet.box.info.food,
                water: packet.box.info.water
            }
        }

        setTimeBoxes({
            ...timeBoxes, 
            ...{[packet.box.time]: boxInfo}
        })
    }

    function removeTimeBox(time) {
        let tmpArr = {...timeBoxes};
        delete tmpArr[time];

        setTimeBoxes(tmpArr);
    }

    function validateForm(e) {
        e.preventDefault();

        if (e.target.time.value == null || e.target.food.value == null || e.target.water.value == null) {
            return;
        }

        if (formInfo.info.type == "newFeedTime") {
            ws.sendJSON({
                type: 0x1,
                data: {
                    action: formInfo.info.type,
                    params: {
                        time: e.target.time.value,
                        state: false,
                        info: {
                            food: parseInt(e.target.food.value),
                            water: parseInt(e.target.water.value)
                        }
                    }
                }
            });
        } else if (formInfo.info.type == "editFeedTime") {
            ws.sendJSON({
                type: 0x1,
                data: {
                    action: formInfo.info.type,
                    boxTime: formInfo.info.boxTime,
                    params: {
                        time: e.target.time.value,
                        food: parseInt(e.target.food.value),
                        water: parseInt(e.target.water.value),
                    }
                }
            });
        }

        hideForm();
    }

    function showForm(info) {
        if (info.type == "newFeedTime") {
            let timeInput = formRef.current.querySelector<HTMLDataElement>("#time");
            let foodInput = formRef.current.querySelector<HTMLInputElement>("#food");
            let waterInput = formRef.current.querySelector<HTMLInputElement>("#water");

            timeInput.value = "00:00";
            foodInput.value = "100";
            waterInput.value = "60";
        }

        setFormInfo({
            info,
            state: true
        });

        contentRef.current.style.filter = "brightness(0.6)";
    }

    function hideForm() {
        setFormInfo({
            info: {
                type: null,
                boxTime: null
            },
            state: false
        });

        contentRef.current.style.filter = "";
    }

    function EditBoxType() {
        if (!formInfo.info) return null;

        if (formInfo.info.type == "editFeedTime") {
            return <h3>Edição</h3>
        } else if (formInfo.info.type == "new") {
            return <h3>Novo horário</h3>
        }

        return null;
    }

    function DelButton() {
        if (!formInfo.info) return null;

        if (formInfo.info.type == "editFeedTime") {
            return (
                <button className={styles.config} type="button" onClick={() => {
                    ws.sendJSON({
                        type: 0x1,
                        data: {
                            action: "deleteFeedTime",
                            boxTime: formInfo.info.boxTime
                        }
                    });

                    hideForm();
                }}>
                    <img src="/trash-alt-solid.svg" alt=""/>
                    <h3>Excluir</h3>
                </button>
            )
        }

        return null;
    }

    function genTimeBox(boxTime) {
        return (
            <TimeBox 
                key={'tm-box-' + boxTime} 
                params={{time: boxTime, ...timeBoxes[boxTime]}} 
                onUpdate={(data) => {
                    if (data.type == "toggleState") {
                        ws.sendJSON({
                            type: 0x1,
                            data: {
                                action: "toggleFeedTime",
                                boxTime
                            }
                        })
                    } else if (data.type == "toggleEdit") {
                        let timeInput = formRef.current.querySelector<HTMLDataElement>("#time");
                        let foodInput = formRef.current.querySelector<HTMLInputElement>("#food");
                        let waterInput = formRef.current.querySelector<HTMLInputElement>("#water");

                        timeInput.value = boxTime;
                        foodInput.value = timeBoxes[boxTime].info.food.toString();
                        waterInput.value = timeBoxes[boxTime].info.water.toString();

                        showForm({
                            type: "editFeedTime",
                            boxTime
                        });
                    }
                }}
            />
        )
    }

    return (
        <>
            <form 
                className={styles.editBox + ' ' + (formInfo.state ? (styles.visible) : (styles.hidden))} 
                onSubmit={validateForm}
                ref={formRef}
            >
                <header>
                    <EditBoxType></EditBoxType>

                    <div className={styles.optionBox}>
                        <button type="button" onClick={hideForm}><img src="/times-solid.svg" alt=""/></button>
                        <button type="submit"><img src="/check-solid.svg" alt=""/></button>
                    </div>
                </header>

                <div className={styles.editContent}>
                    <div className={styles.config}>
                        <h3>Horário</h3>
                        <input type="time" id="time" className={styles.timeInput}/>
                    </div>

                    <div className={styles.config}>
                        <h3>Ração</h3>
                        <div className={styles.value}>
                            <input type="number" id="food"></input>
                            <span>g</span>
                        </div>
                    </div>

                    <div className={styles.config}>
                        <h3>Água</h3>
                        <div className={styles.value}>
                            <input type="number" id="water"></input>
                            <span>min</span>
                        </div>
                    </div>

                    <DelButton/>
                </div>
            </form>

            <div className={styles.content} ref={contentRef}>
                <Box name="Alimentação">
                    <BoxButton src="/bone-solid.svg" state={false} onClick={(e) => console.log(e)} title="Despejar ração"></BoxButton>
                    <BoxSwitch src="/tint-solid.svg" state={false} onClick={(e) => console.log(e)} title="Fluxo de água"></BoxSwitch>
                    <BoxSwitch src="/plug-solid.svg" state={false} onClick={(e) => console.log(e)} title="Modo automático"></BoxSwitch>
                </Box>

                <div className={styles.timeList}>
                    <header>
                        <h3>Horários</h3>
                        <button onClick={() => {
                            showForm({
                                type: "newFeedTime"
                            })
                        }}>
                            <img src="/plus-solid.svg" alt=""/>
                        </button>
                    </header>
                    <div className={styles.timeContent}>
                        {
                            Object.keys(timeBoxes).sort().map((boxTime, index) => {
                                return genTimeBox(boxTime);
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}