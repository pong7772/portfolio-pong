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
        device_type: visitor.device_type,
        browser: visitor.browser,
        browser_version: visitor.browser_version,
        os: visitor.os,
        os_version: visitor.os_version,
        created_at: visitor.created_at.toISOString(),
      }));

      // Get unique visitor stats
      const [uniqueCountries, deviceTypes, browsers, operatingSystems] =
        await Promise.all([
          prisma.visitors.groupBy({
            by: ['country'],
            where: {
              country: { not: null },
            },
            _count: {
              country: true,
            },
          }),
          prisma.visitors.groupBy({
            by: ['device_type'],
            where: {
              device_type: { not: null },
            },
            _count: {
              device_type: true,
            },
          }),
          prisma.visitors.groupBy({
            by: ['browser'],
            where: {
              browser: { not: null },
            },
            _count: {
              browser: true,
            },
          }),
          prisma.visitors.groupBy({
            by: ['os'],
            where: {
              os: { not: null },
            },
            _count: {
              os: true,
            },
          }),
        ]);

      const stats = {
        total,
        unique_countries: uniqueCountries.length,
        top_countries: uniqueCountries
          .sort((a, b) => b._count.country - a._count.country)
          .slice(0, 10)
          .map((c) => ({
            country: c.country,
            count: c._count.country,
          })),
        device_types: deviceTypes
          .sort((a, b) => b._count.device_type - a._count.device_type)
          .map((d) => ({
            type: d.device_type,
            count: d._count.device_type,
          })),
        top_browsers: browsers
          .sort((a, b) => b._count.browser - a._count.browser)
          .slice(0, 5)
          .map((b) => ({
            browser: b.browser,
            count: b._count.browser,
          })),
        top_os: operatingSystems
          .sort((a, b) => b._count.os - a._count.os)
          .slice(0, 5)
          .map((o) => ({
            os: o.os,
            count: o._count.os,
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
