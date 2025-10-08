import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';

// Increase body size limit to handle base64 images (10MB)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const stories = await prisma.stories.findMany({
        where: {
          is_show: true,
        },
        orderBy: {
          order: 'asc',
        },
      });

      res.status(200).json(stories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching stories' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description, image, link, order, is_show } = req.body;

      if (!title || !image) {
        return res
          .status(400)
          .json({ message: 'Title and image are required' });
      }

      const story = await prisma.stories.create({
        data: {
          title,
          description: description || null,
          image,
          link: link || null,
          order: order || 0,
          is_show: is_show ?? true,
        },
      });

      res.status(201).json(story);
    } catch (error) {
      res.status(500).json({ message: 'Error creating story' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: 'Story ID is required' });
      }

      await prisma.stories.delete({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting story' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { title, description, image, link, order, is_show } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'Story ID is required' });
      }

      const story = await prisma.stories.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          description,
          image,
          link,
          order,
          is_show,
          updated_at: new Date(),
        },
      });

      res.status(200).json(story);
    } catch (error) {
      res.status(500).json({ message: 'Error updating story' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

