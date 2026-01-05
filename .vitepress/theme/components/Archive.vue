<script setup lang="ts">
import type { Data } from '../data/posts';

import { computed, ref } from 'vue';
import { data as posts } from '../data/posts.archive.data';

const normalize = (list: Data[]) => list;

const articles = ref<Data[]>(normalize(posts));

const groups = computed(() => {
    const buckets = new Map<string, Data[]>();

    for (const post of articles.value) {
        const year = post.date.slice(0, 4);
        if (!buckets.has(year))
            buckets.set(year, []);
        buckets.get(year)!.push(post);
    }

    return Array.from(buckets.entries())
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([year, items]) => ({ year, items }));
});
</script>

<template>
    <section
        v-for="group in groups"
        :key="group.year"
    >
        <h2 :id="group.year">
            {{ group.year }}
        </h2>
        <ul>
            <li
                v-for="post in group.items"
                :key="post.url"
            >
                <a :href="post.url">
                    {{ post.title }}
                </a>
            </li>
        </ul>
    </section>
</template>
