
"use client";

import { useEffect, useState } from 'react';
import { raptor } from '../../utils'
import Canvas from '@/components/Canvas';
import { Box, Paper, Typography, CircularProgress, Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
interface RaptorCodesProps {
  message: Uint8Array
}

const RaptorCodes = ({ message }: RaptorCodesProps) => {
  const [images, setImages] = useState<string[]>([])
  useEffect(() => {
    (async () => {
      const dataURIs = await raptor.encode(message)
      setImages(dataURIs)
    })()
  }, [message])
  return <>
    {
      images.length === 0 ?
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
          <Typography sx={{ p: 2 }} >Encoding for transmission...</Typography>
        </Box>
        :
        <>
          <Canvas data={images} />
        </>
    }
  </>
}

export default RaptorCodes
