<script setup lang="ts">
import Giscus from '@giscus/vue';
import { useData } from 'vitepress';
import { watch } from 'vue';

const { frontmatter, isDark } = useData();

function theme() {
    return isDark.value ? 'noborder_dark' : 'noborder_light';
}

function sendMessage<T>(message: T) {
    document.querySelector('giscus-widget')
        ?.shadowRoot
        ?.querySelector('iframe')
        ?.contentWindow
        ?.postMessage?.(message, 'https://giscus.app');
}

watch(isDark, () => {
    sendMessage({
        giscus: {
            setConfig: {
                theme: theme(),
            },
        },
    });
});
</script>

<template>
    <div
        v-if="frontmatter?.comments ?? true"
        class="pt-10"
    >
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
            lang="zh-CN"
            loading="eager"
            :theme="theme()"
        />
    </div>
</template>
