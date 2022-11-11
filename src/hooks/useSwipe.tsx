import { MutableRefObject, useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';

type Point = { x: number; y: number };

interface OptionsProps {
  beforeStart?: (e: TouchEvent) => void;
  beforeMove?: (e: TouchEvent) => void;
  beforeEnd?: (e: TouchEvent) => void;
  endStart?: (e: TouchEvent) => void;
  endMove?: (e: TouchEvent) => void;
  endEnd?: (e: TouchEvent) => void;
}

export const useSwipe = (
  element: HTMLElement | undefined,
  options?: OptionsProps
) => {
  const [start, setStart] = useState<Point>();
  const [end, setEnd] = useState<Point>();
  const [swiping, setSwiping] = useState(false);
  const distance = useMemo(() => {
    if (!start || !end) return undefined;
    return {
      x: end.x - start.x,
      y: end.y - start.y,
    };
  }, [start, end]);
  const direction = useMemo(() => {
    if (!swiping) return '';
    if (!distance) return '';
    const { x, y } = distance;
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left';
    } else {
      return y > 0 ? 'down' : 'up';
    }
  }, [swiping, distance]);
  const onStart = (e: TouchEvent) => {
    options?.beforeStart?.(e);
    e.preventDefault();
    setSwiping(true);
    setStart(() => ({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }));
    setEnd(undefined);
    options?.endStart?.(e);
  };
  const onMove = (e: TouchEvent) => {
    options?.beforeMove?.(e);
    e.preventDefault();
    setEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    options?.endMove?.(e);
  };
  const onEnd = (e: TouchEvent) => {
    options?.beforeEnd?.(e);
    e.preventDefault();
    setSwiping(false);
    options?.endEnd?.(e);
  };
  useEffect(() => {
    if (!element) return;
    element?.addEventListener('touchstart', onStart);
    element?.addEventListener('touchmove', onMove);
    element?.addEventListener('touchend', onEnd);
    return () => {
      if (!element) return;
      element?.removeEventListener('touchstart', onStart);
      element?.removeEventListener('touchmove', onMove);
      element?.removeEventListener('touchend', onEnd);
    };
  }, []);
  return {
    swiping,
    distance,
    direction,
    start,
    end,
  };
};
