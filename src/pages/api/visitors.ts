import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';

type VisitorsResponse = { count: number } | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VisitorsResponse>,
) {
  const SLUG = 'site_total_visitors';
  const TYPE = 'site';

  if (req.method === 'GET') {
    try {
      const record = await prisma.contentmeta.findUnique({
        where: { slug: SLUG },
        select: { views: true },
      });
      return res.status(200).json({ count: record?.views ?? 0 });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to fetch visitors count' });
    }
  }

  if (req.method === 'POST') {
    try {
      const upserted = await prisma.contentmeta.upsert({
        where: { slug: SLUG },
        update: { views: { increment: 1 } },
        create: { slug: SLUG, type: TYPE, views: 1 },
        select: { views: true },
      });
      return res.status(200).json({ count: upserted.views });
    } catch (e) {
      return res
        .status(500)
        .json({ error: 'Failed to increment visitors count' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'Method Not Allowed' });
}
