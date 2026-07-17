export function stagger(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: 0.15 + delay,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };
}
