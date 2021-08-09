import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { Post } from '../types/Post';
import { uri, basePath } from 'src/constants/env';

const postsDirectory = join(process.cwd(), '_posts');
const privatePostPrefix = '_' as const;

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const { title, publishDate, coverImage, excerpt, ogImage } = data;
  const url = `${uri}${basePath}/${realSlug}`;
  const isPrivate = realSlug.startsWith(privatePostPrefix);

  const post: Post = {
    slug: realSlug,
    title: title ?? '',
    publishDate: publishDate ?? '',
    coverImage: coverImage ?? '',
    excerpt: excerpt ?? '',
    ogImage: {
      url: '',
      ...ogImage,
    },
    content,
    url,
    isPrivate,
  };

  return post;
}

export function getAllPosts(scope: 'public' | 'all' = 'public') {
  const slugs = getPostSlugs();
  const targetSlugs = scope === 'public' ? slugs.filter((slug) => slug.charAt(0) !== privatePostPrefix) : slugs;
  const posts = targetSlugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.publishDate > post2.publishDate ? -1 : 1));
  return posts;
}
