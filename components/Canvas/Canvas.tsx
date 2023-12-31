/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useRef, useEffect, useState } from 'react'
import { Box, Paper, Typography, CircularProgress, Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import GIFEncoder from 'gif-encoder-2-browser';


import { downloader } from '@/utils';

const promiseToDraw = (ctx: any, dataUri: string) => {
  return new Promise((resolve) => {
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 512, 512);
      resolve(ctx)
    }
    img.src = dataUri;
  })
}

const createGif = async (canvas: any, dataUris: string[]) => {
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  const encoder = new GIFEncoder(512, 512);
  encoder.setDelay(500);
  encoder.start();
  for (let i = 0; i < dataUris.length; i++) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    await promiseToDraw(ctx, dataUris[i])
    encoder.setDelay(i === 0 ? 1000 : 500);
    encoder.addFrame(ctx);
  }
  encoder.finish()
  const buffer = encoder.out.getData()
  const base64url = await new Promise(r => {
    const reader = new FileReader()
    reader.onload = () => r(reader.result)
    reader.readAsDataURL(new Blob([buffer]))
  }) as any;
  return `data:image/gif;base64,${base64url.slice(base64url.indexOf(',') + 1)}`;
}

const Canvas = (props: any) => {
  const { data } = props;
  const [gif, setGif] = useState<string>()
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current as any
    if (canvas) {
      (async () => {
        const dataUri = await createGif(canvas, data)
        setGif(dataUri)
      })()
    }
  }, [data])

  return <>{
    !gif ?
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
        <Typography sx={{ p: 2 }}>Creating gif... this may take a minute...</Typography>
        <canvas ref={canvasRef} {...props} width={512} height={512} style={{ display: 'none' }} />
      </Box>
      :
      <Paper sx={{ maxWidth: '512px', bgcolor: '#fff', p: 4 }}>
        <Box component="img" src={gif} alt={'raptor codes'} sx={{
          overflow: 'hidden',
          width: '100%',
        }} />
        <Button variant="contained" endIcon={<CloudDownloadIcon />} onClick={() => {
          downloader(gif, 'message.gif')
        }}>
          Download
        </Button>
      </Paper>
  }
  </>
}

export default Canvas