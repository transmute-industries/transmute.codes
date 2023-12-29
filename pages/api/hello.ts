
import type { NextApiRequest, NextApiResponse } from 'next'


type ResponseData = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const message = 'My lungs taste the air of time blown past falling sands';

  res.status(200).json({ message  })
}