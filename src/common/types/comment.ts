export type CommentType = 'blog' | 'learn' | 'ppd';

export interface Comment {
  id: number;
  slug: string;
  type: CommentType;
  name: string;
  email: string;
  message: string;
  image?: string | null;
  admin_reply?: string | null;
  replied_at?: string | null;
  created_at: string;
}
