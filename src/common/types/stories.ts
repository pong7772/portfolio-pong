export interface Story {
  id: number;
  title: string;
  description?: string | null;
  image: string;
  images?: string | string[] | null; // JSON string or array of additional images
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
  images?: string[]; // Array of additional images
  link?: string;
  order?: number;
  is_show?: boolean;
}
