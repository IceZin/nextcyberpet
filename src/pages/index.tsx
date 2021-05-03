import {Box} from '../components/Box'
import {BoxButton} from '../components/BoxButton'
import {BoxSwitch} from '../components/BoxSwitch'
import {BoxHrefButton} from '../components/BoxHrefButton'

import { useContext, useEffect, useState } from 'react'

import styles from './index.module.scss'
import { WsContext } from '../contexts/WsContext'

export default function Home() {
  let [state, setState] = useState(Boolean);
  let {ws} = useContext(WsContext)

  useEffect(() => {
    if (ws == undefined) return;

    ws.on("Home", "data", (packet) => {
      console.log(packet);

      if (packet.action == "updateState") {
        setState(state => (!state));
      }
    })
  }, [ws])

  function shortcutClick(btn: string) {
    console.log(btn)
  
    ws.sendJSON({
      type: 0x1,
      data: {
        action: "toggle",
        trigger: btn
      }
    })
  }

  return (
    <div className={styles.content}>
      <Box name="Monitoramento & Controle" displayType="grid">
        <BoxHrefButton src="/lightbulb-solid.svg" title="Iluminacao" href="/monitor/light"></BoxHrefButton>
        <BoxHrefButton src="/bone-solid.svg" title="Alimentacao" href="/monitor/food"></BoxHrefButton>
        <BoxHrefButton src="/video-solid.svg" title="Camera" href="/monitor/camera"></BoxHrefButton>
        <BoxHrefButton src="/thermometer-half-solid.svg" title="Temperatura" href="/monitor/temperature"></BoxHrefButton>
      </Box>

      <Box name="Controle Rapido" displayType="flex">
        <BoxSwitch state={state} onClick={shortcutClick} id="night-btn" src="/moon-solid.svg" title="Modo noturno"></BoxSwitch>
        <BoxSwitch state={false} onClick={shortcutClick} src="/thermometer-half-solid.svg" title="Controle automático de temperatura"></BoxSwitch>
        <BoxSwitch state={false} onClick={shortcutClick} src="/wind-solid.svg" title="Remover odor"></BoxSwitch>
      </Box>

      <Box name="Camera interna" displayType="flex">
        <div className={styles.containerCameraView}>

        </div>
      </Box>
    </div>
  )
}