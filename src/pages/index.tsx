import {Box} from '../components/Box'
import {BoxButton} from '../components/BoxButton'
import {BoxSwitch} from '../components/BoxSwitch'
import {BoxHrefButton} from '../components/BoxHrefButton'

import { useContext, useEffect, useState } from 'react'

import styles from './index.module.scss'
import { WsContext } from '../contexts/WsContext'

type PageInfo = {
  nightMode: boolean
  autoTempCtrl: boolean
  airFlow: boolean
}

type Props = {
  mainInfo: PageInfo
}

export default function Home(props: PageInfo) {
  let [pageInfo, setPageInfo] = useState({} as PageInfo);
  let {ws} = useContext(WsContext)

  useEffect(() => {
    console.log(props);
    setPageInfo(props);
  }, [])

  useEffect(() => {
    if (ws == undefined) return;

    ws.on("Main", "data", (packet) => {
      console.log(packet);

      if (packet.action == "toggleOption") {
        setPageInfo({...pageInfo, ...{[packet.option]: packet.state}});
        console.log(pageInfo);
      }
    })
  }, [ws, pageInfo])

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
        <BoxSwitch 
          src="/moon-solid.svg" 
          state={pageInfo.nightMode} onClick={(e) => {
              ws.sendJSON({
                  type: 0x1,
                  data: {
                      channel: "Main",
                      action: "toggleOption",
                      option: "nightMode"
                  }
              })
          }} 
          title="Modo noturno">
        </BoxSwitch>
        <BoxSwitch 
          src="/thermometer-half-solid.svg" 
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
          title="Controle automático de temperatura">
        </BoxSwitch>
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
          title="Ativar ventilação">
        </BoxSwitch>
      </Box>

      <Box name="Camera interna" displayType="flex">
        <div className={styles.containerCameraView}>

        </div>
      </Box>
    </div>
  )
}

export const getStaticProps = async (ctx) => {
  let data = await fetch('http://localhost:1108/api/main_info');
  const jsondata: Props = await data.json();

  console.log(jsondata);

  return {
    props: jsondata?.mainInfo
  }
}