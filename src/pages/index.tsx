import styles from './index.module.scss'
import {Box} from '../components/Box'
import {BoxButton} from '../components/BoxButton'
import {BoxHrefButton} from '../components/BoxHrefButton'

function btnOnUpdate(e) {
  console.log(e);
}

export default function Home() {
  return (
    <div className={styles.content}>
      <Box name="Monitoramento & Controle" displayType="grid">
        <BoxHrefButton src="/lightbulb-solid.svg" title="Iluminacao" href="/monitor/light"></BoxHrefButton>
        <BoxHrefButton src="/bone-solid.svg" title="Alimentacao" href="/monitor/food"></BoxHrefButton>
        <BoxHrefButton src="/video-solid.svg" title="Camera" href="/monitor/camera"></BoxHrefButton>
        <BoxHrefButton src="/thermometer-half-solid.svg" title="Temperatura" href="/monitor/temperature"></BoxHrefButton>
      </Box>

      <Box name="Controle Rapido" displayType="flex">
        <BoxButton onUpdate={btnOnUpdate} src="/moon-solid.svg" title="Modo noturno"></BoxButton>
        <BoxButton src="/thermometer-half-solid.svg" title="Controle automático de temperatura"></BoxButton>
        <BoxButton src="/wind-solid.svg" title="Remover odor"></BoxButton>
      </Box>

      <Box name="Camera interna" displayType="flex">
        <div className={styles.containerCameraView}>

        </div>
      </Box>
    </div>
  )
}
