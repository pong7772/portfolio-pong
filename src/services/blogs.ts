export interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  status?: 'draft' | 'publish';
  is_featured?: boolean;
  tags?: string[];
  published_at?: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  status: string;
  is_featured: boolean;
  tags?: string;
  author_id: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

const API_URL = '/api/blogs';

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
};

export const getBlog = async (id: number): Promise<Blog> => {
  const response = await fetch(`${API_URL}?id=${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  return response.json();
};

export const createBlog = async (data: BlogFormData): Promise<Blog> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create blog');
  }
  return response.json();
};

export const updateBlog = async (
  id: number,
  data: Partial<BlogFormData>,
): Promise<Blog> => {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update blog');
  }
  return response.json();
};

export const deleteBlog = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete blog');
  }
};
