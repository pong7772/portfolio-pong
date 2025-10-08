export interface Story {
  id: number;
  title: string;
  description?: string | null;
  image: string;
  link?: string | null;
  order: number;
  is_show: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface StoryFormData {
  title: string;
  description?: string;
  image: string;
  link?: string;
  order?: number;
  is_show?: boolean;
}

