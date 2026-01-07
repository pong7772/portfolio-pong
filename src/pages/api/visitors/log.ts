import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';
import { notifyNewVisit } from '@/services/telegram';
import { parseUserAgent } from '@/common/utils/userAgentParser';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { path } = req.body;

    if (!path || typeof path !== 'string') {
      return res.status(400).json({ error: 'Path is required' });
    }

    // Get visitor info from Vercel headers or request
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.socket.remoteAddress ||
      null;
    const country =
      (req.headers['x-vercel-ip-country'] as string) ||
      (req.headers['cf-ipcountry'] as string) ||
      null;
    const city =
      (req.headers['x-vercel-ip-city'] as string) ||
      (req.headers['cf-ipcity'] as string) ||
      null;
    const userAgent = req.headers['user-agent'] || null;

    // Parse device information from user agent
    const deviceInfo = parseUserAgent(userAgent);

    // Save to database
    await prisma.visitors.create({
      data: {
        path: path.substring(0, 500), // Limit path length
        ip: ip ? String(ip).substring(0, 50) : null,
        country: country ? String(country).substring(0, 100) : null,
        city: city ? String(city).substring(0, 100) : null,
        user_agent: userAgent ? String(userAgent).substring(0, 500) : null,
        device_type: deviceInfo.device_type,
        browser: deviceInfo.browser,
        browser_version: deviceInfo.browser_version,
        os: deviceInfo.os,
        os_version: deviceInfo.os_version,
      },
    });

    // Send Telegram notification (non-blocking, only for non-dashboard paths)
    if (!path.startsWith('/dashboard') && !path.startsWith('/api')) {
      notifyNewVisit(path, country || undefined, city || undefined).catch(
        (err) => {
          console.error('Failed to send Telegram notification:', err);
        },
      );
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Visitor tracking error:', error);
    // Don't fail the request if tracking fails
    return res.status(200).json({ success: false, error: error?.message });
  }
}
