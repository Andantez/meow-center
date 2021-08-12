export const fadeInAndUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'backInOut',
    },
  },
};

export const stagger = {
  animate: (staggerDuration) => ({
    transition: {
      staggerChildren: staggerDuration,
      delayChildren: 0.2,
    },
  }),
};

export const fadeInDown = {
  initial: {
    y: -60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'backInOut',
      delay: 0.2,
    }
  }
}