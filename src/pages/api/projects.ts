/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';

type Data = {
  status: boolean;
  data?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    if (req.method === 'GET') {
      const response = await prisma.projects.findMany({
        orderBy: { updated_at: 'desc' },
      });
      return res.status(200).json({ status: true, data: response });
    }

    if (req.method === 'POST') {
      const {
        title,
        slug,
        description,
        image,
        images,
        link_demo,
        link_github,
        stacks,
        is_show = true,
        is_featured = false,
        content,
      } = req.body || {};

      const created = await prisma.projects.create({
        data: {
          title,
          slug,
          description,
          image,
          images: images && images.length > 0 ? JSON.stringify(images) : null,
          link_demo,
          link_github,
          stacks,
          is_show,
          is_featured,
          content,
        },
      });
      return res.status(201).json({ status: true, data: created });
    }

    if (req.method === 'PUT') {
      const { id, images, ...updates } = req.body || {};
      if (!id) {
        return res.status(400).json({ status: false, error: 'Missing id' });
      }
      const updateData: any = { ...updates };
      if (images !== undefined) {
        updateData.images =
          images && images.length > 0 ? JSON.stringify(images) : null;
      }
      const updated = await prisma.projects.update({
        where: { id: Number(id) },
        data: updateData,
      });
      return res.status(200).json({ status: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const id = Number(req.query.id || req.body?.id);
      if (!id) {
        return res.status(400).json({ status: false, error: 'Missing id' });
      }
      await prisma.projects.delete({ where: { id } });
      return res.status(200).json({ status: true });
    }

    res.setHeader('Allow', 'GET,POST,PUT,DELETE');
    return res.status(405).json({ status: false, error: 'Method Not Allowed' });
  } catch (error) {
    return res.status(200).json({ status: false, error: error });
  }
}
