import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const entries = await prisma.guestbook.findMany({
        where: {
          is_show: true,
        },
        orderBy: {
          created_at: 'asc',
        },
      });

      const formattedEntries = entries.map((entry) => ({
        id: entry.id.toString(),
        name: entry.name,
        email: entry.email,
        message: entry.message,
        image: entry.image || null,
        created_at: entry.created_at.toISOString(),
        is_show: entry.is_show,
      }));

      return res.status(200).json(formattedEntries);
    } catch (error) {
      console.error('Error fetching guestbook entries:', error);
      return res
        .status(500)
        .json({ error: 'Failed to fetch guestbook entries' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, message, image } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          error: 'Name, email, and message are required',
        });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      // Message length validation
      if (message.trim().length < 3) {
        return res.status(400).json({
          error: 'Message must be at least 3 characters long',
        });
      }

      if (message.trim().length > 1000) {
        return res.status(400).json({
          error: 'Message must be less than 1000 characters',
        });
      }

      const entry = await prisma.guestbook.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          image: image || null,
          is_show: true,
        },
      });

      return res.status(201).json({
        id: entry.id.toString(),
        name: entry.name,
        email: entry.email,
        message: entry.message,
        image: entry.image,
        created_at: entry.created_at.toISOString(),
        is_show: entry.is_show,
      });
    } catch (error) {
      console.error('Error creating guestbook entry:', error);
      return res
        .status(500)
        .json({ error: 'Failed to create guestbook entry' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Entry ID is required' });
      }

      await prisma.guestbook.delete({
        where: {
          id: parseInt(id as string),
        },
      });

      return res.status(200).json({ message: 'Entry deleted successfully' });
    } catch (error) {
      console.error('Error deleting guestbook entry:', error);
      return res
        .status(500)
        .json({ error: 'Failed to delete guestbook entry' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
