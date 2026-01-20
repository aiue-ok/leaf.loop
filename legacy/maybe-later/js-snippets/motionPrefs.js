// legacy: reduced-motion experimental implementation (kept for reference)

export function motionPrefs() {
  const m = window.matchMedia("(prefers-reduced-motion: reduce)");
  return {
    reduce: m.matches,
    onChange(handler) {
      const fn = () => handler({ reduce: m.matches });
      m.addEventListener?.("change", fn);
      return () => m.removeEventListener?.("change", fn);
    },
  };
}
// 視差効果を減らす
