export const containerVariants = {
  closed: {
    y: '100vh',
  },
  open: {
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeOut',
    },
  },
  exit: {
    y: '100vh',
    transition: {
      type: 'tween',
      ease: 'easeOut',
    },
  },
};
