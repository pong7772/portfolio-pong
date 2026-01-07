import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === 'GET') {
    try {
      const { slug, type = 'blog' } = req.query;

      if (!slug || typeof slug !== 'string') {
        res.status(400).json({ status: false, error: 'Slug is required' });
        return;
      }

      const comments = await prisma.comments.findMany({
        where: {
          slug,
          type: String(type),
          is_show: true,
        },
        orderBy: {
          created_at: 'asc',
        },
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
        created_at: comment.created_at.toISOString(),
      }));

      res.status(200).json({ status: true, data });
    } catch (error) {
      res
        .status(500)
        .json({ status: false, error: 'Failed to fetch comments' });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const { slug, type = 'blog', name, email, message, image } = req.body;

      if (!slug || !name || !email || !message) {
        res.status(400).json({
          status: false,
          error: 'Slug, name, email, and message are required',
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ status: false, error: 'Invalid email address' });
        return;
      }

      if (message.trim().length < 3) {
        res.status(400).json({
          status: false,
          error: 'Message must be at least 3 characters long',
        });
        return;
      }

      const newComment = await prisma.comments.create({
        data: {
          slug,
          type,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          image: image || null,
          is_show: true,
        },
      });

      // Send Telegram notification (non-blocking)
      const { notifyNewComment } = await import('@/services/telegram');
      notifyNewComment(name.trim(), slug, type, message.trim()).catch((err) => {
        console.error('Failed to send Telegram notification:', err);
      });

      res.status(201).json({
        status: true,
        data: {
          id: newComment.id,
          slug: newComment.slug,
          type: newComment.type,
          name: newComment.name,
          email: newComment.email,
          message: newComment.message,
          image: newComment.image,
          created_at: newComment.created_at.toISOString(),
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ status: false, error: 'Failed to create comment' });
    }
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).json({ status: false, error: 'Method not allowed' });
}
