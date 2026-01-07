import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const { unread_only } = req.query;
      const unreadOnly = unread_only === 'true';

      const messages = await prisma.contact_messages.findMany({
        where: unreadOnly ? { is_read: false } : undefined,
        orderBy: {
          created_at: 'desc',
        },
        take: 100, // Limit to last 100 messages
      });

      const data = messages.map((msg) => ({
        id: msg.id,
        name: msg.name,
        email: msg.email,
        message: msg.message,
        is_read: msg.is_read,
        created_at: msg.created_at.toISOString(),
      }));

      return res.status(200).json({ status: true, data });
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return res
        .status(500)
        .json({ status: false, error: 'Failed to fetch contact messages' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { id, is_read } = req.body;

      if (typeof id !== 'number') {
        return res.status(400).json({ status: false, error: 'Invalid ID' });
      }

      await prisma.contact_messages.update({
        where: { id },
        data: {
          is_read: is_read === true,
        },
      });

      return res.status(200).json({ status: true });
    } catch (error) {
      console.error('Error updating contact message:', error);
      return res
        .status(500)
        .json({ status: false, error: 'Failed to update contact message' });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).json({ status: false, error: 'Method not allowed' });
}
