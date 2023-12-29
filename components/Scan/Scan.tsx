"use client"
import Theme from "@/components/Theme"
import AppDrawer from "@/components/AppDrawer"
import { useState } from "react"

import Scanner from "../Scanner/Scanner"

import b45 from 'base45-web'
import pako from 'pako'
import type { Raptor } from '../RaptorCodes/wraptor'

export default function Scan() {

  const [config, setConfig] = useState<Uint8Array>()
  const [packets, setPackets] = useState<Array<Uint8Array>>([])

  const onScan = async (text: string) => {
    // console.log('read text: ', text)
    const data = new Uint8Array(b45.decode(text))
    // console.log('decoded base45 data: ', data)
    try {
      if (data.byteLength === 12) {
        setConfig(data)
      } else {
        const decompressed = pako.inflate(data);
        // console.log(decompressed)
        // only add new packets...
        let newPackets = [...packets, decompressed]
        setPackets(newPackets)
        // we may get packets before config...
        if (config) {
          const raptor: Raptor = await import('../RaptorCodes/wraptor/pkg');
          try {
            const decoded = raptor.decode({
              config,
              packets: newPackets
            })
            if (decoded){
              console.log(new TextDecoder().decode(new Uint8Array(decoded.message)) )
            }
          } catch (e2) {
            console.log(e2)
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Theme>
      <AppDrawer>
        {config && <>Found config... searching for packets...</>}
        <Scanner onScan={onScan} />
      </AppDrawer>
    </Theme>

  )
}
