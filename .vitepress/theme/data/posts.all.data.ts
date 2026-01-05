import { createContentLoader } from 'vitepress';
import { patterns, transformPosts } from './posts.shared';

export { Data } from './posts.shared';

declare const data: import('./posts.shared').Data[];
export { data };

export default createContentLoader(
    patterns,
    {
        excerpt: true,
        transform: transformPosts,
    },
);
