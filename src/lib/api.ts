import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { Post, PostKey } from '../types/Post';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: PostKey[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const post: Partial<Post> = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      post[field] = realSlug;
    }
    if (field === 'content') {
      post[field] = content;
    }

    if (data[field]) {
      post[field] = data[field];
    }
  });

  return post;
}

export function getAllPosts(fields: PostKey[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.publishDate > post2.publishDate ? -1 : 1));
  return posts;
}
