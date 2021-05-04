export type Post = {
  slug: string;
  title: string;
  publishDate: string;
  coverImage: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
};

export type PostKey = keyof Post;
