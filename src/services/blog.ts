/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';

import { BlogItemProps } from '@/common/types/blog';

type BlogParamsProps = {
  page?: number;
  per_page?: number;
  categories?: number | undefined;
  search?: string;
};

interface BlogDetailResponseProps {
  status: number;
  data: any;
}

// Dev.to API configuration
const DEVTO_API_URL = 'https://dev.to/api';
const DEVTO_USERNAME = process.env.DEVTO_USERNAME as string;
const DEVTO_API_KEY = process.env.DEVTO_API_KEY as string;

const handleAxiosError = (
  error: AxiosError<any>,
): { status: number; data: any } => {
  if (error?.response) {
    return { status: error?.response?.status, data: error?.response?.data };
  } else {
    return { status: 500, data: { message: 'Internal Server Error' } };
  }
};

// Transform Dev.to article to WordPress-like format
const transformDevToArticle = (article: any): BlogItemProps => {
  return {
    id: article.id,
    date: article.published_at || article.created_at,
    modified: article.edited_at || article.published_at || article.created_at,
    slug: article.slug,
    status: article.published ? 'publish' : 'draft',
    link: article.url,
    title: {
      rendered: article.title,
    },
    content: {
      rendered: article.body_html || '',
      markdown: article.body_markdown || '',
      protected: false,
    },
    excerpt: {
      rendered: article.description || '',
      protected: false,
    },
    author: article.user?.user_id || 0,
    featured_media: 0,
    comment_status: article.comments_count > 0 ? 'open' : 'closed',
    ping_status: 'open',
    sticky: false,
    template: '',
    format: 'standard',
    meta: {
      footnotes: '',
    },
    categories: article.type_of === 'article' ? [1] : [],
    tags: article.tag_list || [],
    tags_list: (article.tag_list || []).map((tag: string, index: number) => ({
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
    featured_image_url: article.cover_image || article.social_image || '',
    total_views_count: article.public_reactions_count || 0,
  };
};

export const getBlogList = async ({
  page = 1,
  per_page = 6,
  categories,
  search,
}: BlogParamsProps): Promise<{ status: number; data: any }> => {
  try {
    const headers: any = {
      'Content-Type': 'application/json',
    };

    // Add API key if available (for fetching your own articles)
    if (DEVTO_API_KEY) {
      headers['api-key'] = DEVTO_API_KEY;
    }

    // Prefer private author endpoint when API key is available; fallback to public username endpoint
    const privateUrl = `${DEVTO_API_URL}/articles/me`;
    const publicUrl = `${DEVTO_API_URL}/articles`;
    const queryParams = new URLSearchParams({
      page: page.toString(),
      per_page: per_page.toString(),
    });

    // For the public endpoint we need the username
    if (DEVTO_USERNAME) {
      queryParams.append('username', DEVTO_USERNAME);
    }

    // Add search/tag filter if provided
    if (search) {
      queryParams.append('tag', search);
    }

    // Try private endpoint first if API key is provided (does not need username)
    const usePrivate = Boolean(DEVTO_API_KEY);
    const privateParams = new URLSearchParams({
      page: page.toString(),
      per_page: per_page.toString(),
    });

    let response = await axios.get(
      usePrivate
        ? `${privateUrl}?${privateParams.toString()}`
        : `${publicUrl}?${queryParams.toString()}`,
      { headers },
    );

    // Transform Dev.to articles to WordPress format
    let transformedPosts = response.data.map(transformDevToArticle);

    // Fallback: if we received fewer posts than requested, retry without API key
    if ((transformedPosts?.length || 0) < per_page) {
      const fallbackHeaders: any = { 'Content-Type': 'application/json' };
      const fallbackResponse = await axios.get(
        `${publicUrl}?${queryParams.toString()}`,
        { headers: fallbackHeaders },
      );
      const fallbackPosts = fallbackResponse.data.map(transformDevToArticle);
      // Use whichever returns more posts
      if (fallbackPosts.length > transformedPosts.length) {
        response = fallbackResponse;
        transformedPosts = fallbackPosts;
      }
    }

    // Dev.to doesn't provide total pages in headers, so we estimate
    const totalPosts = transformedPosts.length;
    const totalPages = Math.ceil(totalPosts / per_page);

    return {
      status: response.status,
      data: {
        posts: transformedPosts,
        page,
        per_page,
        total_pages: totalPages,
        total_posts: totalPosts,
        categories,
      },
    };
  } catch (error) {
    return handleAxiosError(error as AxiosError<any>);
  }
};

export const getBlogDetail = async (
  id: number,
): Promise<BlogDetailResponseProps> => {
  try {
    // Import prisma for server-side database access
    const prisma = (await import('@/common/libs/prisma')).default;

    // Fetch from database
    const blog = await prisma.blogs.findUnique({
      where: { id },
    });

    if (!blog) {
      return { status: 404, data: null };
    }

    // Only return published blogs (or allow draft in development)
    if (blog.status !== 'publish' && process.env.NODE_ENV === 'production') {
      return { status: 404, data: null };
    }

    const tags = blog.tags ? JSON.parse(blog.tags) : [];

    // Get views count
    let views = 0;
    try {
      const contentMeta = await prisma.contentmeta.findUnique({
        where: { slug: blog.slug },
      });
      views = contentMeta?.views || 0;
    } catch (error) {
      // Views not found, use 0
    }

    // Transform database blog to WordPress format
    const transformedArticle: BlogItemProps = {
      id: blog.id,
      date: blog.published_at?.toISOString() || blog.created_at.toISOString(),
      modified: blog.updated_at.toISOString(),
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

    return { status: 200, data: transformedArticle };
  } catch (error: any) {
    console.error('Error fetching blog detail:', error);
    return { status: 500, data: null };
  }
};
