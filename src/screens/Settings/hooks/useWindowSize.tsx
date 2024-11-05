import { useEffect, useState } from 'react';
interface WindowSize {
    width: number | undefined;  // width может быть числом или undefined
    height: number | undefined; // height может быть числом или undefined
  }
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Установить начальные размеры

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};