<script setup lang="ts">
import Giscus from '@giscus/vue';
import { useData } from 'vitepress';

const { isDark } = useData();
function theme() {
    return isDark.value ? 'noborder_dark' : 'noborder_light';
}
</script>

<template>
    <Giscus
        repo="lcultra/site"
        repo-id="R_kgDOQz__LQ"
        category="General"
        category-id="DIC_kwDOQz__Lc4C02ki"
        mapping="title"
        strict="0"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="top"
        :theme="theme()"
        lang="zh-CN"
    />
</template>
