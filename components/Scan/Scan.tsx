"use client"
import Theme from "@/components/Theme"
import AppDrawer from "@/components/AppDrawer"
import { useState } from "react"

import * as React from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Scanner from "../Scanner/Scanner"

import b45 from 'base45-web'
import pako from 'pako'
import type { Raptor } from '../../wraptor'

import CircularProgress from '@mui/material/CircularProgress';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function dataURItoBlob(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

}



function downloadURI(uri: string, name: string) {
  let link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}

function downloader(dataURI: string, name: string) {
  let blob = dataURItoBlob(dataURI)
  let url = window.URL.createObjectURL(blob);
  downloadURI(url, name);
  window.URL.revokeObjectURL(url);
}

export default function Scan() {

  const [scanning, setScanning] = useState(true)
  const [config, setConfig] = useState<Uint8Array>()
  const [packets, setPackets] = useState<Array<Uint8Array>>([])
  const [dataURL, setDataURL] = useState<string>()

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
            if (decoded) {
              const content = new Uint8Array(decoded.message);
              const dataURL = new TextDecoder().decode(content)
              setDataURL(dataURL)
              toast("Life finds a way.")
              setScanning(false)
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


        {scanning ? <> {!config ? <>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
            <Typography sx={{ p: 2 }} >Searching for transmission...</Typography>

          </Box>
        </> : <>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
            <Typography sx={{ p: 2 }} >Gathering packets...</Typography>

          </Box>
        </>}
          <Scanner onScan={onScan} />
        </> :
          <Box>
            <Typography sx={{ pb: 2 }} >Transmission recieved.</Typography>
            <Button variant="contained" endIcon={<CloudDownloadIcon />} onClick={() => {
              if (dataURL) {
                downloader(dataURL, 'message.txt')
              }
            }}>
              Download
            </Button>
          </Box>}
        <ToastContainer />
      </AppDrawer>
    </Theme>

  )
}
