import type { DefaultTheme, HeadConfig } from 'vitepress';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: '牧村',
    description: '个人博客_web前端技术文章',
    themeConfig: {
        // 本地搜索
        search: {
            provider: 'local',
        },

        // 社交账号
        socialLinks: [
            { icon: 'github', link: 'https://github.com/lcultra/site' },
        ],

        docFooter: {
            prev: '上一页',
            next: '下一页',
        },

        outline: {
            label: '页面导航',
        },

        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
            },
        },

        notFound: {
            title: '页面未找到',
            quote: '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
            linkLabel: '前往首页',
            linkText: '带我回首页',
        },

        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        skipToContentLabel: '跳转到内容',

        // https://vitepress.dev/reference/default-theme-config
        nav: nav(),

        sidebar: sidebar(),

    },

    head: head(),

    /* ~^v^~ */

    srcDir: 'posts',
    lastUpdated: true,
    cleanUrls: true,
    // metaChunk: true,
    sitemap: {
        hostname: 'https://lclove.de5.net',
        transformItems(items) {
            return items.filter(item => !item.url.includes('trash'));
        },
    },
    vite: {
        publicDir: '../public',
        plugins: [
            tailwindcss(),
        ],
    },
});

function head(): HeadConfig[] {
    return [
        [
            'link',
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
        [
            'script',
            { async: 'true', src: 'https://www.googletagmanager.com/gtag/js?id=G-5W9YGL9FZR' },
        ],
        [
            'script',
            { },
            `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5W9YGL9FZR');
            `,
        ],
    ];
}

function nav(): DefaultTheme.NavItem[] {
    return [
        { text: '文章', link: '/' },
        { text: '归档', link: '/archive' },
        { text: '关于', link: '/about' },
    ];
}

function sidebar(): DefaultTheme.Sidebar {
    // {

    // }
    return {
        // '/posts/': [
        //     {
        //         text: '文章',
        //         items: [
        //             { text: '搭建 VitePress 博客结构', link: '/posts/vitepress-blog-setup' },
        //             { text: '少量自动化带来的安心感', link: '/posts/light-automation' },
        //             { text: '夜读记录：写给未来的自己', link: '/posts/night-reading' },
        //         ],
        //     },
        // ],
        // '/': [
        //     {
        //         text: '关于这个站点',
        //         items: [
        //             { text: '归档', link: '/archive' },
        //             { text: '工具箱', link: '/toolbox' },
        //             { text: '关于', link: '/about' },
        //         ],
        //     },
        // ],
    };
}
