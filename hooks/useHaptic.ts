"use client";

import { useCallback } from "react";

export const useHaptic = () => {
    const triggerHaptic = useCallback(() => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            // "Soft cute" haptic pattern: a short, light vibration
            navigator.vibrate(10);
        }
    }, []);

    return { triggerHaptic };
};
