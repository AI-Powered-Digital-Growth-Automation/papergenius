import { blog1Post } from './blogs/blog1';
import { blog2Post } from './blogs/blog2';
import { blog3Post } from './blogs/blog3';

export const initialBlogPosts = [
  blog1Post,
  blog2Post,
  blog3Post
];

export const getBlogPostBySlug = (slug) => {
  return initialBlogPosts.find(post => post.slug === slug);
};
