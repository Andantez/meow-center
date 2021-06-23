import { useState, useEffect } from 'react';

const useItsIntersecting = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const options = {
    root: ref.current,
    rootMargin: '50%',
    threshold: 0,
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      options
    );
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
};

export default useItsIntersecting;
