import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import Archive from './components/Archive.vue';
import Giscus from './components/Giscus.vue';
import Index from './components/Index.vue';
import './style.css';

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
            'doc-after': () => h(Giscus, null, {}),
        });
    },
    enhanceApp({ app, router, siteData }) {
        ((_) => {})({ app, router, siteData });
        app.component('Index', Index);
        app.component('Archive', Archive);
    },
} satisfies Theme;
