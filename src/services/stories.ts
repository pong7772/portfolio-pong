import { Story, StoryFormData } from '@/common/types/stories';

const API_URL = '/api/stories';

export const getStories = async (): Promise<Story[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch stories');
  }
  return response.json();
};

export const createStory = async (data: StoryFormData): Promise<Story> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create story');
  }
  return response.json();
};

export const deleteStory = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete story');
  }
};

export const updateStory = async (
  id: number,
  data: Partial<StoryFormData>,
): Promise<Story> => {
  const response = await fetch(`${API_URL}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update story');
  }
  return response.json();
};
