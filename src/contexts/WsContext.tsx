import { createContext, ReactNode, useEffect, useState } from "react";
import { Ws } from "../api/Ws";

type Packet = {
    type: number,
    data: {
        action: string,
        category: string,
        element: number,
        state: boolean
    }
}

type WsContextData = {
    ws: Ws
}

type ContextProviderProps = {
    children: ReactNode;
}

export const WsContext = createContext({} as WsContextData);

export function WsContextProvider({ children }: ContextProviderProps) {
    const [ws, setWs] = useState(undefined);

    useEffect(() => {
        let wsClient = new Ws();
        setWs(wsClient);
    }, [])

    return (
        <WsContext.Provider value={
            {
                ws
            }
        }>
            { children }
        </WsContext.Provider>
    )
}
