import { useEffect, useRef, useState } from "react";

const DEFAULT_OPTIONS: IntersectionObserverInit = { threshold: 0.1 };

export function useScrollAnimation(
  options: IntersectionObserverInit = DEFAULT_OPTIONS
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, optionsRef.current);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, isVisible];
}
