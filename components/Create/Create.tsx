"use client"
import Theme from "@/components/Theme"
import AppDrawer from "@/components/AppDrawer"

import FileUploader from "@/components/FileUploader"
import { useState } from "react"

import RaptorCodes from "../RaptorCodes/RaptorCodes"

export default function Create() {

  const [message, setMessage] = useState<Uint8Array>()

  const onFilesAccepted = async (files: File[]) => {
    const [file] = files
    const content = new Uint8Array(await file.arrayBuffer()) ;
    setMessage(content)
  }
  return (
    <Theme>
      <AppDrawer>
        {
          message ? <><RaptorCodes message={message}/></>: <> <FileUploader onFilesAccepted={onFilesAccepted}/></>
        }
      </AppDrawer>
    </Theme>

  )
}
