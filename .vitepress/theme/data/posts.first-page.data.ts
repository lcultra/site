import { createContentLoader } from 'vitepress';
import { FIRST_PAGE_COUNT, patterns, transformPosts } from './posts.shared';

export { Data } from './posts.shared';

declare const data: import('./posts.shared').Data[];
export { data };

export default createContentLoader(
    patterns,
    {
        excerpt: true,
        transform(rawData) {
            return transformPosts(rawData).slice(0, FIRST_PAGE_COUNT);
        },
    },
);
