import type { Data } from './posts.shared';
import { createLazyData } from './lazyData';
import { data as firstPage } from './posts.first-page.data';

export type { Data } from './posts.shared';

const lazyPosts = createLazyData<Data>(
    firstPage,
    async () => (await import('./posts.all.data')).data,
);

export const initialPosts = lazyPosts.initial;
export const loadAllPosts = lazyPosts.loadAll;

// Backward compatibility: existing imports of { data as posts } will receive首屏数据
export const data = initialPosts;
