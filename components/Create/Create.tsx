"use client"
import { useState } from "react"
import Theme from "@/components/Theme"
import AppDrawer from "@/components/AppDrawer"
import FileUploader from "@/components/FileUploader"
import RaptorCodes from "../RaptorCodes/RaptorCodes"


const readAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(file);
  });
}


export default function Create() {
  const [dataURL, setDataURL] = useState<string>()
  const onFilesAccepted = async (files: File[]) => {
    const [file] = files
    const dataURL = await readAsDataURL(file)
    setDataURL(dataURL)
  }
  return (
    <Theme>
      <AppDrawer>
        {
          !dataURL ? <>
            <FileUploader onFilesAccepted={onFilesAccepted} />
          </> : <>
            <RaptorCodes dataURL={dataURL} />
          </>
        }
      </AppDrawer>
    </Theme>

  )
}
