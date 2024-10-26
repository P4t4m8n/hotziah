type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const cache: Record<string, CacheEntry<any>> = {};
const CACHE_DURATION = 60 * 1000 * 60; // 1 hour

export async function getCachedData<T>(
  key: string,
  fetcher: Function,
  duration: number = CACHE_DURATION
): Promise<T> {
  const cached = cache[key];
  const now = Date.now();

  if (cached && now - cached.timestamp < duration) {
    return cached.data;
  }

  const data = await fetcher({});
  cache[key] = { data, timestamp: now };
  return data;
}
