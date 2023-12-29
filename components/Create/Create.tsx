"use client"
import { useState } from "react"
import Theme from "@/components/Theme"
import AppDrawer from "@/components/AppDrawer"
import FileUploader from "@/components/FileUploader"
import RaptorCodes from "../RaptorCodes/RaptorCodes"

export default function Create() {
  const [message, setMessage] = useState<Uint8Array>()
  const onFilesAccepted = async (files: File[]) => {
    const [file] = files
    const content = new Uint8Array(await file.arrayBuffer());
    const dataURL = `data:${file.type};base64,${btoa(new TextDecoder('utf8').decode(content))}`
    setMessage(new TextEncoder().encode(dataURL))
  }
  return (
    <Theme>
      <AppDrawer>
        {
          !message ? <>
            <FileUploader onFilesAccepted={onFilesAccepted} />
          </> : <>
            <RaptorCodes message={message} />
          </>
        }
      </AppDrawer>
    </Theme>

  )
}
