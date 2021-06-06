import { useContext, useEffect, useRef, useState } from 'react'
import { Box } from '../../../components/Box'
import { BoxButton } from '../../../components/BoxButton'
import { BoxSwitch } from '../../../components/BoxSwitch'
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

        ws.on("CameraMonitor", "data", (packet) => {
            if (packet.action == "toggleOption") {
                setPageInfo({...pageInfo, ...{[packet.option]: packet.state}});
                console.log(pageInfo);
            } else if (packet.action == "showImage") {
                let pixels = [];
                var ctx = canvasRef.current.getContext("2d");

                for (let h = 0; h < 120; h++) {
                    pixels.push([]);

                    for (let w = 0; w < 160; w++) {
                        let i = ((h * 160) + w) * 2;
                        let c = packet.camImg.data[i] + (packet.camImg.data[i+1]<<8);
                        let r = ((c & 0xF800) >> 11) << 3;
                        let g = ((c & 0x7E0) >> 5) << 2;
                        let b = ((c & 0x1F)) << 3;
                        pixels[h].push([r, g, b])
                    }
                }

                var height = pixels.length;
                var width = pixels[0].length;

                var h = ctx.canvas.height;
                var w = ctx.canvas.width;

                var imgData = ctx.getImageData(0, 0, w, h);
                var data = imgData.data;  // the array of RGBA values

                for(var i = 0; i < height; i++) {
                    for(var j = 0; j < width; j++) {
                        var s = 4 * i * w + 4 * j;  // calculate the index in the array
                        var x = pixels[i][j];  // the RGB values
                        data[s] = x[0];
                        data[s + 1] = x[1];
                        data[s + 2] = x[2];
                        data[s + 3] = 255;  // fully opaque
                    }
                }

                ctx.putImageData(imgData, 0, 0);
            }
        })

        return () => {
            ws.on("CameraMonitor", "data", null);
        }
    }, [ws, pageInfo])

    return (
        <div className={styles.content}>
            <Box name="Monitoramento e Controle da camera">
                <BoxSwitch 
                    src="/plug-solid.svg" 
                    state={pageInfo.showOnMenu} onClick={(e) => {
                        ws.sendJSON({
                            type: 0x1,
                            data: {
                                channel: "CameraMonitor",
                                action: "toggleOption",
                                option: "showOnMenu"
                            }
                        })
                    }} 
                    title="Visualizar vídeo">
                </BoxSwitch>
            </Box>

            <Box name="Vídeo">
                <canvas ref={canvasRef}></canvas>
            </Box>
        </div>
    )
}