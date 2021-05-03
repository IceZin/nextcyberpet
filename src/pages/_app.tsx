import '../styles/global.scss'
import styles from "../styles/app.module.scss"

import {WsContext, WsContextProvider} from "../contexts/WsContext"

import {Header} from '../components/Header'
import { useEffect, useState } from 'react'
import { Ws } from '../api/Ws'

console.log("teste")

function MyApp({ Component, pageProps }) {
  return (
    <WsContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
      </div>
    </WsContextProvider>
  )
}

export default MyApp
