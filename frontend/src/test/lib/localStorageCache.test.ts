import { describe, it, expect, beforeEach, vi } from "vitest";
import { setCache, getCache } from "../../utils/localStorageCache";

describe("cache utilities", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it("stores and retrieves cached data", () => {
        const data = { name: "John", age: 30 };

        setCache("user", data, 1000);
        const result = getCache<typeof data>("user");

        expect(result).toEqual(data);
    });

    it("returns null when cache does not exist", () => {
        const result = getCache("missing-key");

        expect(result).toBeNull();
    });

    it("expires cache after ttl", () => {
        const now = Date.now();
        vi.spyOn(Date, "now").mockReturnValue(now);

        setCache("temp", "value", 1000);

        // simulate time passing
        vi.spyOn(Date, "now").mockReturnValue(now + 1001);

        const result = getCache("temp");

        expect(result).toBeNull();
        expect(localStorage.getItem("temp")).toBeNull();
    });

    it("removes cache if stored data is corrupted", () => {
        localStorage.setItem("bad", "{ invalid json");

        const result = getCache("bad");

        expect(result).toBeNull();
        expect(localStorage.getItem("bad")).toBeNull();
    });
});
