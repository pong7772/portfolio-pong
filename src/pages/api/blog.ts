import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';
import { BlogItemProps } from '@/common/types/blog';

// Transform database blog to WordPress-like format
const transformBlogToWordPressFormat = (
  blog: any,
  views: number = 0,
): BlogItemProps => {
  const tags = blog.tags ? JSON.parse(blog.tags) : [];

  return {
    id: blog.id,
    date: blog.published_at || blog.created_at,
    modified: blog.updated_at,
    slug: blog.slug,
    status: blog.status,
    link: `/blog/${blog.slug}?id=${blog.id}`,
    title: {
      rendered: blog.title,
    },
    content: {
      rendered: blog.content,
      markdown: blog.content,
      protected: false,
    },
    excerpt: {
      rendered: blog.excerpt || '',
      protected: false,
    },
    author: blog.author_id,
    featured_media: 0,
    comment_status: 'open',
    ping_status: 'open',
    sticky: blog.is_featured,
    template: '',
    format: 'standard',
    meta: {
      footnotes: '',
    },
    categories: [],
    tags: tags,
    tags_list: tags.map((tag: string, index: number) => ({
      term_id: index + 1,
      name: tag,
      slug: tag.toLowerCase().replace(/\s+/g, '-'),
      term_group: 0,
      term_taxonomy_id: index + 1,
      taxonomy: 'post_tag',
      description: '',
      parent: 0,
      count: 1,
      filter: 'raw',
    })),
    amp_enabled: false,
    featured_image_url: blog.featured_image_url || '',
    total_views_count: views,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const { page = 1, per_page = 12, search } = req.query;
    const pageNum = Number(page);
    const perPageNum = Number(per_page);
    const skip = (pageNum - 1) * perPageNum;

    // Build where clause
    const where: any = {
      status: 'publish', // Only show published blogs
    };

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { content: { contains: search as string, mode: 'insensitive' } },
        { excerpt: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    // Get blogs from database
    const [blogs, totalCount] = await Promise.all([
      prisma.blogs.findMany({
        where,
        skip,
        take: perPageNum,
        orderBy: [
          { is_featured: 'desc' },
          { published_at: 'desc' },
          { created_at: 'desc' },
        ],
      }),
      prisma.blogs.count({ where }),
    ]);

    // Get views for each blog
    const blogSlugs = blogs.map((blog) => blog.slug);
    const contentMetas = await prisma.contentmeta.findMany({
      where: {
        slug: { in: blogSlugs },
        type: 'blog',
      },
    });

    const viewsMap = new Map(
      contentMetas.map((meta) => [meta.slug, meta.views]),
    );

    // Transform blogs to WordPress format
    const transformedPosts = blogs.map((blog) =>
      transformBlogToWordPressFormat(blog, viewsMap.get(blog.slug) || 0),
    );

    const totalPages = Math.ceil(totalCount / perPageNum);

    const responses = {
      status: true,
      data: {
        total_pages: totalPages,
        total_posts: totalCount,
        page: pageNum,
        per_page: perPageNum,
        posts: transformedPosts,
        categories: [],
      },
    };

    res.status(200).json(responses);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ status: false, error: 'Failed to fetch blogs' });
  }
}
