export const fadeInOut = {
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  hide: {
    x: -60,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    }, 
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
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  hide: {
    x: -60,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    // x: 60,
    transition: {
      when: 'afterChildren',
    },
  },
};
