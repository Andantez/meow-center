export const itemVariants = {
  open: {
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
  closed: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
};
export const containerVariants = {
  closed: {
    y: '-100vh',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      mass: 0.4,
    },
  },
  exit: {
    y: '-100vh',
    transition: {
      type: 'spring',
      stiffness: 150,
      mass: 0.4,
    },
  },
};

export const buttonVariants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
