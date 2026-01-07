import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const { limit = '50', offset = '0' } = req.query;
      const limitNum = Math.min(parseInt(String(limit), 10) || 50, 200);
      const offsetNum = parseInt(String(offset), 10) || 0;

      const [visitors, total] = await Promise.all([
        prisma.visitors.findMany({
          orderBy: {
            created_at: 'desc',
          },
          take: limitNum,
          skip: offsetNum,
        }),
        prisma.visitors.count(),
      ]);

      const data = visitors.map((visitor) => ({
        id: visitor.id,
        path: visitor.path,
        ip: visitor.ip,
        country: visitor.country,
        city: visitor.city,
        user_agent: visitor.user_agent,
        created_at: visitor.created_at.toISOString(),
      }));

      // Get unique visitor stats
      let uniqueCountries: Array<{
        country: string | null;
        _count: { country: number };
      }> = [];
      try {
        uniqueCountries = await prisma.visitors.groupBy({
          by: ['country'],
          where: {
            country: { not: null },
          },
          _count: {
            country: true,
          },
        });
      } catch (groupByError) {
        // If groupBy fails (e.g., no data yet), use empty array
        console.error('Error grouping countries:', groupByError);
        uniqueCountries = [];
      }

      const stats = {
        total,
        unique_countries: uniqueCountries.length,
        top_countries: uniqueCountries
          .sort((a, b) => b._count.country - a._count.country)
          .slice(0, 10)
          .map((c) => ({
            country: c.country || 'Unknown',
            count: c._count.country,
          })),
      };

      return res.status(200).json({
        status: true,
        data,
        stats,
        pagination: {
          total,
          limit: limitNum,
          offset: offsetNum,
        },
      });
    } catch (error) {
      console.error('Error fetching visitors:', error);
      return res
        .status(500)
        .json({ status: false, error: 'Failed to fetch visitors' });
    }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).json({ status: false, error: 'Method not allowed' });
}
