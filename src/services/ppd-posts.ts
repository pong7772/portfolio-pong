export interface DocumentItem {
  name: string;
  url: string;
}

export interface PPDPostFormData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail_url?: string;
  featured_image_url?: string;
  images?: string[];
  documents?: DocumentItem[];
  youtube_video_url?: string;
  status?: 'draft' | 'publish';
  is_featured?: boolean;
  tags?: string[];
  published_at?: string;
}

export interface PPDPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  thumbnail_url?: string;
  featured_image_url?: string;
  images?: string;
  documents?: string;
  youtube_video_url?: string;
  status: string;
  is_featured: boolean;
  tags?: string;
  author_id: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

const API_URL = '/api/ppd-posts-admin';

export const getPPDPosts = async (): Promise<PPDPost[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch PPD posts');
  }
  return response.json();
};

export const getPPDPost = async (id: number): Promise<PPDPost> => {
  const response = await fetch(`${API_URL}?id=${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch PPD post');
  }
  return response.json();
};

export const createPPDPost = async (
  data: PPDPostFormData,
): Promise<PPDPost> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: 'Unknown error' }));
      const errorMessage =
        errorData.error || `HTTP ${response.status}: Failed to create PPD post`;
      console.error('PPD Post creation error:', errorMessage, errorData);
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error: any) {
    console.error('PPD Post creation failed:', error);
    throw error;
  }
};

export const updatePPDPost = async (
  id: number,
  data: Partial<PPDPostFormData>,
): Promise<PPDPost> => {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update PPD post');
  }
  return response.json();
};

export const deletePPDPost = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete PPD post');
  }
};
