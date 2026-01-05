import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

interface Options {
    batchSize?: number;
    rootMargin?: string;
    threshold?: number;
}

export function useInfiniteScroll<T>(
    source: () => T[],
    {
        batchSize = 8,
        rootMargin = '200px 0px 0px 0px',
        threshold = 0,
    }: Options = {},
) {
    const items = computed(() => source());
    const visibleCount = ref(batchSize);
    const sentinel = ref<HTMLElement | null>(null);
    const loading = ref(false);
    let observer: IntersectionObserver | null = null;

    const visibleItems = computed(() => items.value.slice(0, visibleCount.value));
    const hasMore = computed(() => visibleCount.value < items.value.length);

    const detachObserver = () => {
        if (observer && sentinel.value)
            observer.unobserve(sentinel.value);
    };

    const loadMore = () => {
        if (loading.value || !hasMore.value)
            return;

        loading.value = true;
        visibleCount.value = Math.min(
            visibleCount.value + batchSize,
            items.value.length,
        );
        loading.value = false;
        if (!hasMore.value)
            detachObserver();
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting)
                loadMore();
        });
    };

    const attachObserver = () => {
        if (typeof IntersectionObserver === 'undefined')
            return;
        if (!observer) {
            observer = new IntersectionObserver(handleIntersect, {
                rootMargin,
                threshold,
            });
        }
        if (sentinel.value)
            observer.observe(sentinel.value);
    };

    onMounted(() => {
        attachObserver();
    });

    onBeforeUnmount(() => {
        if (observer)
            observer.disconnect();
    });

    watch(sentinel, () => {
        if (!hasMore.value)
            return;
        detachObserver();
        attachObserver();
    });

    watch(
        () => items.value.length,
        () => {
            visibleCount.value = Math.min(visibleCount.value, items.value.length);
            if (!hasMore.value)
                detachObserver();
        },
    );

    return {
        visibleItems,
        hasMore,
        sentinel,
        loadMore,
        loading,
    };
}
