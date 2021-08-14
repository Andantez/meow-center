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
  animate: ({ staggerDuration, staggerDirection, delayChildren }) => ({
    transition: {
      staggerChildren: staggerDuration,
      delayChildren,
      staggerDirection,
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
    },
  },
};

export const containerVariants = {
  initial: {
    x: -60,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      staggerDirection: -1,
      duration: 0.5,
      ease: 'backInOut',
    },
  },
};

export const fadeIn = {
  initial: {
    x: -60,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'backInOut',
    },
  },
};
