import {Box} from '../components/Box'
import {BoxButton} from '../components/BoxButton'
import {BoxSwitch} from '../components/BoxSwitch'
import {BoxHrefButton} from '../components/BoxHrefButton'

import { useContext, useEffect, useState } from 'react'

import styles from './index.module.scss'
import { WsContext } from '../contexts/WsContext'

type PageInfo = {
  nightMode: boolean
  autoLightCtrl: boolean
  light: boolean
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

    return () => {
      ws.on("Main", "data", null);
    }
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
        <BoxHrefButton src="/weight-solid.svg" title="Peso" href="/monitor/weight"></BoxHrefButton>
        <BoxHrefButton src="/thermometer-half-solid.svg" title="Temperatura" href="/monitor/temperature"></BoxHrefButton>
      </Box>

      <Box name="Controle Rapido" displayType="flex">
        <BoxSwitch 
          src="/moon-solid.svg" 
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
          src="/moon-solid.svg" 
          state={pageInfo.autoLightCtrl} onClick={(e) => {
              ws.sendJSON({
                  type: 0x1,
                  data: {
                      channel: "LightMonitor",
                      action: "toggleOption",
                      option: "auto"
                  }
              })
          }} 
          title="Controle automático de luminosidade">
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