import { NextApiRequest, NextApiResponse } from 'next';

import { getAvailableDevices } from '@/services/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await getAvailableDevices();

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=30',
    );

    return res.status(200).json(response?.data);
  } catch (error) {
    if (error instanceof Error) {
      console.log('Spotify API not configured:', error.message);
    } else {
      console.log('Spotify API not configured: An unknown error occurred');
    }
    return res.status(200).json([]);
  }
}
