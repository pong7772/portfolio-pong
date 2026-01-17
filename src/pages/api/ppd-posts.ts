import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';

interface PPDPostItem {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    markdown: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    footnotes: string;
  };
  categories: never[];
  tags: string[];
  tags_list: Array<{
    term_id: number;
    name: string;
    slug: string;
    term_taxonomy_id: number;
    taxonomy: string;
    description: string;
    parent: number;
    count: number;
    filter: string;
  }>;
  amp_enabled: boolean;
  thumbnail_url: string | null;
  featured_image_url: string | null;
  images: string[];
  documents?: Array<{ name: string; url: string }>;
  youtube_video_url: string | null;
  total_views_count: number;
}

// Transform database PPD post to WordPress-like format
const transformPPDPostToWordPressFormat = (
  post: any,
  views = 0,
): PPDPostItem => {
  const tags = post.tags ? JSON.parse(post.tags) : [];
  const images = post.images ? JSON.parse(post.images) : [];
  const documents = post.documents ? JSON.parse(post.documents) : [];

  return {
    id: post.id,
    date: post.published_at || post.created_at,
    modified: post.updated_at,
    slug: post.slug,
    status: post.status,
    link: `/pxl/personal-professional-development/${post.slug}?id=${post.id}`,
    title: {
      rendered: post.title,
    },
    content: {
      rendered: post.content,
      markdown: post.content,
      protected: false,
    },
    excerpt: {
      rendered: post.excerpt || '',
      protected: false,
    },
    author: post.author_id,
    featured_media: 0,
    comment_status: 'open',
    ping_status: 'open',
    sticky: post.is_featured,
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
      term_taxonomy_id: index + 1,
      taxonomy: 'post_tag',
      description: '',
      parent: 0,
      count: 1,
      filter: 'raw',
    })),
    amp_enabled: false,
    thumbnail_url: post.thumbnail_url || null,
    featured_image_url: post.featured_image_url || null,
    images: images,
    documents: documents.length > 0 ? documents : undefined,
    youtube_video_url: post.youtube_video_url || null,
    total_views_count: views,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    if (req.method === 'GET') {
      const { slug, id } = req.query;

      // Get single post by slug or id
      if (slug || id) {
        const post = await prisma.ppd_posts.findFirst({
          where: {
            ...(slug
              ? { slug: slug as string }
              : { id: parseInt(id as string) }),
          },
        });

        if (!post) {
          return res
            .status(404)
            .json({ status: false, error: 'Post not found' });
        }

        // Get views
        const contentMeta = await prisma.contentmeta.findFirst({
          where: {
            slug: post.slug,
            type: 'ppd',
          },
        });

        const views = contentMeta?.views || 0;

        const transformedPost = transformPPDPostToWordPressFormat(post, views);

        return res.status(200).json({
          status: true,
          data: transformedPost,
        });
      }

      // Get list of posts
      const { page = 1, per_page = 12, search, tag, tags } = req.query;
      const pageNum = Number(page);
      const perPageNum = Number(per_page);
      const skip = (pageNum - 1) * perPageNum;

      // Get all published posts
      const allPosts = await prisma.ppd_posts.findMany({
        where: {
          status: 'publish',
          ...(search && {
            OR: [
              { title: { contains: search as string, mode: 'insensitive' } },
              { content: { contains: search as string, mode: 'insensitive' } },
              { excerpt: { contains: search as string, mode: 'insensitive' } },
            ],
          }),
        },
        orderBy: [
          { is_featured: 'desc' },
          { published_at: 'desc' },
          { created_at: 'desc' },
        ],
      });

      // Filter by tags if provided
      let filteredPosts = allPosts;

      if (tags) {
        const tagArray = (tags as string)
          .split(',')
          .map((t) => t.trim().toLowerCase());
        filteredPosts = allPosts.filter((post) => {
          if (!post.tags) return false;
          try {
            const postTags = JSON.parse(post.tags) as string[];
            return tagArray.some((filterTag) =>
              postTags.some(
                (postTag) => postTag.trim().toLowerCase() === filterTag,
              ),
            );
          } catch {
            return false;
          }
        });
      } else if (tag) {
        filteredPosts = allPosts.filter((post) => {
          if (!post.tags) return false;
          try {
            const tags = JSON.parse(post.tags) as string[];
            return tags.some(
              (t) =>
                t.trim().toLowerCase() === (tag as string).trim().toLowerCase(),
            );
          } catch {
            return false;
          }
        });
      }

      // Apply pagination
      const totalCount = filteredPosts.length;
      const posts = filteredPosts.slice(skip, skip + perPageNum);

      // Get views for each post
      const postSlugs = posts.map((post) => post.slug);
      const contentMetas = await prisma.contentmeta.findMany({
        where: {
          slug: { in: postSlugs },
          type: 'ppd',
        },
      });

      const viewsMap = new Map(
        contentMetas.map((meta) => [meta.slug, meta.views]),
      );

      // Transform posts to WordPress format
      const transformedPosts = posts.map((post) =>
        transformPPDPostToWordPressFormat(post, viewsMap.get(post.slug) || 0),
      );

      // Get all available tags from published posts
      const allPublishedPosts = await prisma.ppd_posts.findMany({
        where: { status: 'publish' },
        select: { tags: true },
      });

      // Extract and count all tags
      const tagCountMap = new Map<string, number>();
      allPublishedPosts.forEach((post) => {
        if (post.tags) {
          try {
            const tags = JSON.parse(post.tags) as string[];
            tags.forEach((tag) => {
              const normalizedTag = tag.trim();
              if (normalizedTag) {
                tagCountMap.set(
                  normalizedTag,
                  (tagCountMap.get(normalizedTag) || 0) + 1,
                );
              }
            });
          } catch (e) {
            // Skip invalid JSON
          }
        }
      });

      // Convert to array and sort by count
      const availableTags = Array.from(tagCountMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

      const totalPages = Math.ceil(totalCount / perPageNum);

      return res.status(200).json({
        status: true,
        data: {
          total_pages: totalPages,
          total_posts: totalCount,
          page: pageNum,
          per_page: perPageNum,
          posts: transformedPosts,
          categories: [],
          available_tags: availableTags,
        },
      });
    }

    res.status(405).json({ status: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('Error fetching PPD posts:', error);
    res.status(500).json({ status: false, error: 'Failed to fetch PPD posts' });
  }
}
