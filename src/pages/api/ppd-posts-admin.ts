import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      if (id) {
        // Get single post
        const post = await prisma.ppd_posts.findUnique({
          where: { id: parseInt(id as string) },
        });
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        return res.json(post);
      } else {
        // Get all posts
        const posts = await prisma.ppd_posts.findMany({
          orderBy: [
            { is_featured: 'desc' },
            { published_at: 'desc' },
            { created_at: 'desc' },
          ],
        });
        return res.json(posts);
      }
    } catch (error: any) {
      console.error('Error fetching PPD posts:', error);
      return res.status(500).json({
        error: 'Failed to fetch PPD posts',
        details:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        title,
        slug,
        content,
        excerpt,
        thumbnail_url,
        featured_image_url,
        images,
        documents,
        youtube_video_url,
        status = 'draft',
        is_featured = false,
        tags,
        published_at,
      } = req.body;

      // Validate required fields
      if (!title || !title.trim()) {
        return res.status(400).json({ error: 'Title is required' });
      }
      if (!slug || !slug.trim()) {
        return res.status(400).json({ error: 'Slug is required' });
      }
      if (!content || !content.trim()) {
        return res.status(400).json({ error: 'Content is required' });
      }

      // Validate slug format (no spaces, lowercase)
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(slug.trim())) {
        return res.status(400).json({
          error:
            'Slug must be lowercase and contain only letters, numbers, and hyphens',
        });
      }

      // Check if slug already exists
      const existingPost = await prisma.ppd_posts.findUnique({
        where: { slug: slug.trim() },
      });

      if (existingPost) {
        return res.status(400).json({ error: 'Slug already exists' });
      }

      // Prepare data
      const postData: any = {
        title: title.trim(),
        slug: slug.trim(),
        content: content.trim(),
        excerpt: excerpt && excerpt.trim() ? excerpt.trim() : null,
        thumbnail_url:
          thumbnail_url && thumbnail_url.trim() ? thumbnail_url.trim() : null,
        featured_image_url:
          featured_image_url && featured_image_url.trim()
            ? featured_image_url.trim()
            : null,
        images:
          images && Array.isArray(images) && images.length > 0
            ? JSON.stringify(images)
            : null,
        documents:
          documents && Array.isArray(documents) && documents.length > 0
            ? JSON.stringify(documents)
            : null,
        youtube_video_url:
          youtube_video_url && youtube_video_url.trim()
            ? youtube_video_url.trim()
            : null,
        status: status === 'publish' ? 'publish' : 'draft',
        is_featured: Boolean(is_featured),
        tags:
          tags && Array.isArray(tags) && tags.length > 0
            ? JSON.stringify(tags)
            : null,
        published_at:
          status === 'publish' && published_at
            ? new Date(published_at)
            : status === 'publish'
              ? new Date()
              : null,
        author_id: 1,
      };

      const post = await prisma.ppd_posts.create({
        data: postData,
      });

      return res.status(201).json(post);
    } catch (error: any) {
      console.error('Error creating PPD post:', error);

      // Provide more specific error messages
      if (error.code === 'P2002') {
        return res.status(400).json({
          error: 'A post with this slug already exists',
        });
      }

      if (error.code === 'P2003') {
        return res.status(400).json({
          error: 'Invalid author ID',
        });
      }

      return res.status(500).json({
        error: error.message || 'Failed to create PPD post',
        details:
          process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
    }
  }

  if (req.method === 'PUT') {
    try {
      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }

      const {
        title,
        slug,
        content,
        excerpt,
        thumbnail_url,
        featured_image_url,
        images,
        documents,
        youtube_video_url,
        status,
        is_featured,
        tags,
        published_at,
      } = req.body;

      // Check if post exists
      const existingPost = await prisma.ppd_posts.findUnique({
        where: { id: parseInt(id as string) },
      });

      if (!existingPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Check if slug is being changed and if new slug already exists
      if (slug && slug !== existingPost.slug) {
        const slugExists = await prisma.ppd_posts.findUnique({
          where: { slug },
        });
        if (slugExists) {
          return res.status(400).json({ error: 'Slug already exists' });
        }
      }

      const updatedPost = await prisma.ppd_posts.update({
        where: { id: parseInt(id as string) },
        data: {
          ...(title && { title }),
          ...(slug && { slug }),
          ...(content && { content }),
          ...(excerpt !== undefined && { excerpt: excerpt || null }),
          ...(thumbnail_url !== undefined && {
            thumbnail_url: thumbnail_url || null,
          }),
          ...(featured_image_url !== undefined && {
            featured_image_url: featured_image_url || null,
          }),
          ...(images !== undefined && {
            images: images && images.length > 0 ? JSON.stringify(images) : null,
          }),
          ...(documents !== undefined && {
            documents:
              documents && documents.length > 0
                ? JSON.stringify(documents)
                : null,
          }),
          ...(youtube_video_url !== undefined && {
            youtube_video_url: youtube_video_url || null,
          }),
          ...(status && { status }),
          ...(is_featured !== undefined && { is_featured }),
          ...(tags !== undefined && {
            tags: tags ? JSON.stringify(tags) : null,
          }),
          ...(published_at !== undefined && {
            published_at: published_at ? new Date(published_at) : null,
          }),
          updated_at: new Date(),
        },
      });

      return res.json(updatedPost);
    } catch (error: any) {
      console.error('Error updating PPD post:', error);

      if (error.code === 'P2002') {
        return res.status(400).json({
          error: 'A post with this slug already exists',
        });
      }

      return res.status(500).json({
        error: error.message || 'Failed to update PPD post',
        details:
          process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }

      const existingPost = await prisma.ppd_posts.findUnique({
        where: { id: parseInt(id as string) },
      });

      if (!existingPost) {
        return res.status(404).json({ error: 'Post not found' });
      }

      await prisma.ppd_posts.delete({
        where: { id: parseInt(id as string) },
      });

      return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting PPD post:', error);
      return res.status(500).json({
        error: error.message || 'Failed to delete PPD post',
        details:
          process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).json({ error: 'Method not allowed' });
}
