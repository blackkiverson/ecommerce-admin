import { useEffect, useState } from "react";

/**
 * The `useOrigin` function returns the origin of the current window location in a React component, or
 * an empty string if it is not available.
 * @returns The function `useOrigin` returns the origin of the current window location as a string. If
 * the window object is not available or the origin is not defined, an empty string is returned.
 */
export const useOrigin = () => {
    const [mounted, setMounted] = useState(false);
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : '';

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return '';
    }

    return origin;
};