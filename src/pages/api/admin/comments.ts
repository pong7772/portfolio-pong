import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const comments = await prisma.comments.findMany({
        orderBy: {
          created_at: 'desc',
        },
        take: 200, // Limit to last 200 comments
      });

      const data = comments.map((comment) => ({
        id: comment.id,
        slug: comment.slug,
        type: comment.type,
        name: comment.name,
        email: comment.email,
        message: comment.message,
        image: comment.image,
        admin_reply: comment.admin_reply,
        replied_at: comment.replied_at?.toISOString() || null,
        is_show: comment.is_show,
        created_at: comment.created_at.toISOString(),
      }));

      return res.status(200).json({ status: true, data });
    } catch (error) {
      console.error('Error fetching comments:', error);
      return res
        .status(500)
        .json({ status: false, error: 'Failed to fetch comments' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { id, admin_reply, is_show } = req.body;

      if (typeof id !== 'number') {
        return res.status(400).json({ status: false, error: 'Invalid ID' });
      }

      const updateData: {
        admin_reply?: string | null;
        replied_at?: Date | null;
        is_show?: boolean;
      } = {};

      if (admin_reply !== undefined) {
        updateData.admin_reply =
          admin_reply && admin_reply.trim() ? admin_reply.trim() : null;
        updateData.replied_at = updateData.admin_reply ? new Date() : null;
      }

      if (is_show !== undefined) {
        updateData.is_show = is_show === true;
      }

      const updated = await prisma.comments.update({
        where: { id },
        data: updateData,
      });

      return res.status(200).json({
        status: true,
        data: {
          id: updated.id,
          admin_reply: updated.admin_reply,
          replied_at: updated.replied_at?.toISOString() || null,
          is_show: updated.is_show,
        },
      });
    } catch (error) {
      console.error('Error updating comment:', error);
      return res
        .status(500)
        .json({ status: false, error: 'Failed to update comment' });
    }
  }

  res.setHeader('Allow', ['GET', 'PATCH']);
  return res.status(405).json({ status: false, error: 'Method not allowed' });
}
