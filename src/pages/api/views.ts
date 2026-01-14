import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';

interface ResponseData {
  views: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { slug, type = 'blog' } = req.query;
  const contentType = (type as string) || 'blog';

  if (req.method === 'GET') {
    try {
      const contentMeta = await prisma.contentmeta.findFirst({
        where: {
          slug: slug as string,
          type: contentType,
        },
        select: { views: true },
      });

      const contentViewsCount = contentMeta?.views ?? 0;

      const response: ResponseData = {
        views: contentViewsCount,
      };

      return res.json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch content meta' });
    }
  } else if (req.method === 'POST') {
    try {
      // Find existing record by slug and type
      const existing = await prisma.contentmeta.findFirst({
        where: {
          slug: slug as string,
          type: contentType,
        },
      });

      if (existing) {
        // Update existing record
        const updated = await prisma.contentmeta.update({
          where: { id: existing.id },
          data: {
            views: {
              increment: 1,
            },
          },
          select: { views: true },
        });
        return res.json(updated);
      } else {
        // Create new record
        // Note: Since slug is unique, we need to check if slug exists with different type
        const existingSlug = await prisma.contentmeta.findUnique({
          where: { slug: slug as string },
        });

        if (existingSlug) {
          // If slug exists but with different type, we can't create a new one
          // Instead, update the existing one (this handles edge case)
          const updated = await prisma.contentmeta.update({
            where: { id: existingSlug.id },
            data: {
              type: contentType,
              views: {
                increment: 1,
              },
            },
            select: { views: true },
          });
          return res.json(updated);
        } else {
          // Create new record
          const created = await prisma.contentmeta.create({
            data: {
              slug: slug as string,
              type: contentType,
              views: 1,
            },
            select: { views: true },
          });
          return res.json(created);
        }
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update views count' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
