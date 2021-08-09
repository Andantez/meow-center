export const fadeInOut = {
  show: {
    x: 0,
    opacity: 1,
  },
  hide: {
    x: -60,
    opacity: 0,
  },
  exit: {
    x: 60,
    opacity: 0,
  },
};

export const stagger = {
  show: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};
export const parentVariants = {
  show: {
    x: 0,
    opacity: 1,
    transition: {
      when: 'beforeChildren',
    },
  },
  hide: {
    x: -60,
    opacity: 0,
  },
  exit: {
    opacity: 0,
    // x: 60,
    transition: {
      when: 'afterChildren',
    },
  },
};
