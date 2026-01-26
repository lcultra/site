import type { InternalAxiosRequestConfig } from 'axios';
import { setTimeout } from 'node:timers/promises';

/**
 * 创建一个简单的顺序节流阀，强制执行任务之间的最小间隔
 * @param minInterval - 最小间隔时间（毫秒）
 * @returns - 节流阀函数，用于 http.interceptors.request.use
 */
export function createRequestThrottle(minInterval: number) {
    let chain: Promise<void> = Promise.resolve();
    let lastExecutedAt = 0;

    async function executeTimeout() {
        const now = Date.now();
        if (lastExecutedAt > 0) {
            const elapsed = now - lastExecutedAt;
            if (elapsed < minInterval) {
                const remaining = minInterval - elapsed;
                await setTimeout(remaining);
            }
        }

        lastExecutedAt = Date.now();
    }

    return function (config: InternalAxiosRequestConfig) {
        const runner = () => executeTimeout().then(() => {
            return config;
        });
        const runPromise = chain.then(runner, runner);
        chain = runPromise.then(
            () => undefined,
            () => undefined,
        );
        return runPromise;
    };
}
