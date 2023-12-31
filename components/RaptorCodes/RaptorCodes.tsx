
"use client";

import { useEffect, useState } from 'react';
import { raptor } from '../../utils'
import Canvas from '@/components/Canvas';
import { Box, Typography, CircularProgress } from '@mui/material';

interface RaptorCodesProps {
  dataURL: string
}

const RaptorCodes = ({ dataURL }: RaptorCodesProps) => {
  const [images, setImages] = useState<string[]>([])
  useEffect(() => {
    (async () => {
      const dataURLs = await raptor.encode(dataURL)
      setImages(dataURLs)
    })()
  }, [dataURL])
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
