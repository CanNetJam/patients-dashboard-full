import type { CacheEntry } from "../types/Cache";

export const setCache = <T>(
    key: string,
    data: T,
    ttlMs: number
) => {
    const entry: CacheEntry<T> = {
        data,
        expiresAt: Date.now() + ttlMs,
    };

    localStorage.setItem(key, JSON.stringify(entry));
};

export const getCache = <T>(key: string): T | null => {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    try {
        const entry: CacheEntry<T> = JSON.parse(raw);

        if (Date.now() > entry.expiresAt) {
            localStorage.removeItem(key);
            return null;
        }

        return entry.data;
    } catch {
        localStorage.removeItem(key);
        return null;
    }
};