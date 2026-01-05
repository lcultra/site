import dayjs from 'dayjs';

export interface Data {
    title: string;
    date: string;
    tags: string[];
    summary: string;
    url: string;
}

export const FIRST_PAGE_COUNT = 8;

export const patterns = [
    '!*.md',
    '!**/index.md',
    '**/*.md',
];

export function transformPosts(rawData: any[]): Data[] {
    return rawData
        .filter((page) => {
            return !true
                || ![
                    'draft',
                    'private',
                    'trash',
                ].includes(page.frontmatter.status ?? '');
        })
        .sort((a, b) => {
            return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date);
        })
        .map((page) => {
            const summary = (page.frontmatter.description ?? page.excerpt ?? '').trim().replace(/\s+/g, ' ');
            const compactSummary = summary.length > 160 ? `${summary.slice(0, 157)}...` : summary;

            return {
                title: page.frontmatter.title as string,
                date: page.frontmatter.date && dayjs(page.frontmatter.date).format('YYYY-MM-DD'),
                tags: (page.frontmatter.tags ?? []) as string[],
                summary: compactSummary,
                url: page.url,
            };
        });
}
