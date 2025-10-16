import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';
import { BlogItemProps } from '@/common/types/blog';
import { getBlogList } from '@/services/blog';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=30',
    );

    const { page, per_page, categories, search } = req.query;

    const responseData = await getBlogList({
      page: Number(page) || 1,
      per_page: Number(per_page) || 9,
      categories: categories ? Number(categories) : undefined,
      search: search ? String(search) : undefined,
    });

    // For now, skip database queries to test Dev.to integration
    const blogItemsWithViews =
      responseData?.data?.posts?.map((blogItem: BlogItemProps) => ({
        ...blogItem,
        total_views_count: blogItem.total_views_count || 0,
      })) || [];

    const responses = {
      status: true,
      data: {
        total_pages: responseData?.data?.total_pages,
        total_posts: responseData?.data?.total_posts,
        page: responseData?.data?.page,
        per_page: responseData?.data?.per_page,
        posts: blogItemsWithViews,
        categories: responseData?.data?.categories,
      },
    };

    res.status(200).json(responses);
  } catch (error) {
    res.status(200).json({ status: false, error });
  }
}
