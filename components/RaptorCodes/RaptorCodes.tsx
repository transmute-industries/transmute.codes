/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from 'react';
import type { Raptor } from '../../wraptor'

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import pako from 'pako'
import { QRCode } from '@ali1416/qrcode-encoder'

import b45 from 'base45-web'

interface RaptorCodesProps {
  message: Uint8Array
}

/**
 * 二维码boolean[][]转SVG路径
 * @param bytes boolean[][]
 * @param pixelSize 像素尺寸
 * @return string SVG
 */
function QrMatrix2SvgPath(bytes: Array<boolean[]>, pixelSize: number) {
  let length = bytes.length;
  let size = (length + 2) * pixelSize;
  let svg = "<svg width=\"" + size + "\" height=\"" + size + "\" viewBox=\"0 0 " + size + " " + size + "\" xmlns=\"http://www.w3.org/2000/svg\">\n";
  svg += "<path d=\"\n";
  for (let x = 0; x < length; x++) {
    for (let y = 0; y < length; y++) {
      if (bytes[x][y]) {
        let xx = (x + 1) * pixelSize;
        let yy = (y + 1) * pixelSize;
        svg += "M" + xx + " " + yy + "H" + (xx + pixelSize) + "V" + (yy + pixelSize) + "H" + xx + "z\n"
      }
    }
  }
  svg += "\"/>";
  svg += "</svg>\n";
  return svg;
}

const binaryToQrCode = (data: Uint8Array) => {
 
  const base45Encoded = b45.encode(data)
  const content = base45Encoded;
  const qr = new QRCode(content);
  const img = `data:image/svg+xml,${encodeURIComponent(QrMatrix2SvgPath(qr.Matrix, 10))}`
  return img
}

// terrible
const RenderCodes = ({ data }: { data: string[] }) => {
  const [index, setIndex] = useState(0)
  setTimeout(() => {
    setIndex((index + 1) % data.length)
  }, index === 0 ? 2000 : 750)
  return <Box component="img" src={data[index]} alt={'raptor codes'} sx={{
    overflow: 'hidden',
    width: '100%',
  }} />
}

const RaptorCodes = ({ message }: RaptorCodesProps) => {
  const [images, setImages] = useState<string[]>([])
  useEffect(() => {
    (async () => {
      const raptor: Raptor = await import('../../wraptor/pkg');
      const encoded = raptor.encode({
        message,
        maximum_transmission_unit: 1440,
        repair_packets_per_block: 5
      })
      const config = binaryToQrCode(encoded.config)
      const packets = encoded.packets.map((p)=>{
        const compressed = pako.deflate(new Uint8Array(p));
        return binaryToQrCode(compressed)
      })
      // by convention we send the config as the first image
      // it would be better to discover it with higher reliability
      setImages([config, ...packets])
    })()
  }, [message])
  return <>{images.length > 0 ? <>
    <Paper sx={{ maxWidth: '512px', bgcolor: '#fff', p: 4 }}>
      <RenderCodes data={images} />
    </Paper>

  </> : <>loading...</>}</>
}

export default RaptorCodes
