<script setup lang="ts">
import type { Data } from '../data/posts';
import { onMounted, ref } from 'vue';
import { useInfiniteScroll } from '../composables/useInfiniteScroll';
import { initialPosts, loadAllPosts } from '../data/posts';
import { FIRST_PAGE_COUNT } from '../data/posts.shared';

const normalize = (list: Data[]) => list;

const articles = ref<Data[]>(normalize(initialPosts));

onMounted(async () => {
    const all = await loadAllPosts();
    articles.value = normalize(all);
});

const { visibleItems, hasMore, sentinel, loading } = useInfiniteScroll(
    () => articles.value,
    {
        batchSize: FIRST_PAGE_COUNT,
        rootMargin: '200px 0px 0px 0px',
    },
);
</script>

<template>
    <section>
        <div class="mx-auto max-w-3xl px-5 pt-16 pb-12 sm:px-6 lg:px-0">
            <ul class="">
                <li
                    v-for="post in visibleItems"
                    :key="post.url"
                    class="group border-b border-divider"
                >
                    <a
                        class="-mx-2 flex flex-col gap-2 border-l-2 border-transparent px-2 py-5"
                        :href="post.url"
                        data-variant="card"
                    >
                        <div class="flex items-center gap-2 text-xs text-muted">
                            <div
                                v-if="post.date"
                                class="font-mono uppercase tracking-[0.08em]"
                            >
                                {{ post.date }}
                            </div>
                        </div>
                        <h2 class="text-lg font-semibold leading-tight">
                            {{ post.title }}
                        </h2>
                        <div class="flex items-center gap-2">
                            <p
                                v-if="post.summary"
                                class="flex-1 truncate text-sm text-text-muted"
                            >
                                {{ post.summary }}
                            </p>
                            <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-subtle transition group-hover:translate-x-0.5 group-hover:text-brand">
                                查看全文
                                <span class="text-sm leading-none">
                                    >>
                                </span>
                            </span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>

        <div
            v-if="hasMore"
            ref="sentinel"
            class="mx-auto max-w-3xl px-5 pb-12 sm:px-6 lg:px-0"
            aria-live="polite"
        >
            <div
                class="flex items-center justify-center gap-2 rounded-full bg-bg px-4 py-2 text-xs text-subtle"
            >
                <span
                    class="h-2 w-2 animate-pulse rounded-full bg-brand"
                    aria-hidden="true"
                />
                {{ loading ? '正在加载更多...' : '继续下拉以加载更多' }}
            </div>
        </div>
    </section>
</template>
