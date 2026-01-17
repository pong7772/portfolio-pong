export type PPDPostItemProps = {
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
  tags_list: {
    term_id: number;
    name: string;
    slug: string;
    term_taxonomy_id: number;
    taxonomy: string;
    description: string;
    parent: number;
    count: number;
    filter: string;
  }[];
  amp_enabled: boolean;
  thumbnail_url: string | null;
  featured_image_url: string | null;
  images?: string[];
  documents?: Array<{ name: string; url: string }>;
  youtube_video_url: string | null;
  total_views_count: number;
};

export type PPDPostDetailProps = PPDPostItemProps & {
  date_gmt: string;
  modified_gmt: string;
  type: string;
  guid: {
    rendered: string;
  };
  replies: {
    embeddable: boolean;
    href: string;
  };
  version_history: {
    count: number;
    href: string;
  };
  predecessor_version: {
    id: number;
    href: string;
  };
  wp_featuredmedia: {
    embeddable: boolean;
    href: string;
  };
  wp_attachment: {
    href: string;
  };
  wp_term: {
    taxonomy: string;
    embeddable: boolean;
    href: string;
  }[];
  curies: {
    name: string;
    href: string;
    templated: boolean;
  }[];
};
