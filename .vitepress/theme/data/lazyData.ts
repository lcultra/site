export interface LazyData<T> {
    initial: T[];
    loadAll: () => Promise<T[]>;
}

export function createLazyData<T>(
    initial: T[],
    loader: () => Promise<T[]>,
): LazyData<T> {
    let cache: T[] | null = null;
    let pending: Promise<T[]> | null = null;

    const loadAll = async () => {
        if (cache)
            return cache;
        if (!pending) {
            pending = loader().then((result) => {
                cache = result;
                return result;
            });
        }
        return pending;
    };

    return {
        initial,
        loadAll,
    };
}
