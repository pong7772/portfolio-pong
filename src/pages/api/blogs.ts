import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      if (id) {
        // Get single blog
        const blog = await prisma.blogs.findUnique({
          where: { id: Number(id) },
        });
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        return res.json(blog);
      } else {
        // Get all blogs
        const blogs = await prisma.blogs.findMany({
          orderBy: { created_at: 'desc' },
        });
        return res.json(blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return res.status(500).json({ error: 'Failed to fetch blogs' });
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        title,
        slug,
        content,
        excerpt,
        featured_image_url,
        images,
        status = 'draft',
        is_featured = false,
        tags,
        published_at,
      } = req.body;

      if (!title || !slug || !content) {
        return res
          .status(400)
          .json({ error: 'Title, slug, and content are required' });
      }

      // Check if slug already exists
      const existingBlog = await prisma.blogs.findUnique({
        where: { slug },
      });

      if (existingBlog) {
        return res.status(400).json({ error: 'Slug already exists' });
      }

      const blog = await prisma.blogs.create({
        data: {
          title,
          slug,
          content,
          excerpt: excerpt || null,
          featured_image_url: featured_image_url || null,
          images: images && images.length > 0 ? JSON.stringify(images) : null,
          status,
          is_featured,
          tags: tags ? JSON.stringify(tags) : null,
          published_at: published_at ? new Date(published_at) : null,
          author_id: 1,
        },
      });

      return res.status(201).json(blog);
    } catch (error) {
      console.error('Error creating blog:', error);
      return res.status(500).json({ error: 'Failed to create blog' });
    }
  }

  if (req.method === 'PUT') {
    try {
      if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' });
      }

      const {
        title,
        slug,
        content,
        excerpt,
        featured_image_url,
        images,
        status,
        is_featured,
        tags,
        published_at,
      } = req.body;

      // Check if slug is being changed and if it already exists
      if (slug) {
        const existingBlog = await prisma.blogs.findUnique({
          where: { slug },
        });

        if (existingBlog && existingBlog.id !== Number(id)) {
          return res.status(400).json({ error: 'Slug already exists' });
        }
      }

      const updateData: any = {};
      if (title) updateData.title = title;
      if (slug) updateData.slug = slug;
      if (content) updateData.content = content;
      if (excerpt !== undefined) updateData.excerpt = excerpt || null;
      if (featured_image_url !== undefined)
        updateData.featured_image_url = featured_image_url || null;
      if (images !== undefined)
        updateData.images =
          images && images.length > 0 ? JSON.stringify(images) : null;
      if (status) updateData.status = status;
      if (is_featured !== undefined) updateData.is_featured = is_featured;
      if (tags) updateData.tags = JSON.stringify(tags);
      if (published_at) updateData.published_at = new Date(published_at);
      updateData.updated_at = new Date();

      const blog = await prisma.blogs.update({
        where: { id: Number(id) },
        data: updateData,
      });

      return res.json(blog);
    } catch (error) {
      console.error('Error updating blog:', error);
      return res.status(500).json({ error: 'Failed to update blog' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      if (!id) {
        return res.status(400).json({ error: 'Blog ID is required' });
      }

      await prisma.blogs.delete({
        where: { id: Number(id) },
      });

      return res.status(204).end();
    } catch (error) {
      console.error('Error deleting blog:', error);
      return res.status(500).json({ error: 'Failed to delete blog' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
