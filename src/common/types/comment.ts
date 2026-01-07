export type CommentType = 'blog' | 'learn';

export interface Comment {
  id: number;
  slug: string;
  type: CommentType;
  name: string;
  email: string;
  message: string;
  image?: string | null;
  created_at: string;
}
