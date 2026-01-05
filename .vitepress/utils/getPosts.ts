// import { promises as fs } from 'node:fs';
import process from 'node:process';
import { globby } from 'globby';

export async function getPosts(pageSize: number) {
    const isProd = process.env.NODE_ENV === 'production';

    const ignorePaths = isProd
        ? [
                'posts/.draft/**/*.md',
                'posts/.private/**/*.md',
                'posts/.trash/**/*.md',
            ]
        : [];

    const paths = await globby(['posts/**/**.md'], {
        ignore: ignorePaths,
    });

    const posts = await Promise.all(
        paths.map(async (item) => {
            // const content = await fs.readFile(item, 'utf-8');
            // const { data } = matter(content);
            return {
                frontMatter: {
                    // ...data,
                    // date: convertDateV2(data.date),
                    // // 处理 order：非数值时强制转换为 0
                    // order: _convertOrder(data.order),
                },
                regularPath: `/${item.replace('.md', '.html')}`,
            };
        }),
    );

    return posts.slice(0, pageSize);
}
