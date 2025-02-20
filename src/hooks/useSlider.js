import { useState, useEffect } from 'react';

const useSlider = (cardWidth, numCards, autoRotateInterval = 3000) => {
  const [sliderX, setSliderX] = useState(0);
  const sliderResetX = -numCards * cardWidth;

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderX(prev => {
        const nextX = prev - cardWidth;
        return nextX <= sliderResetX ? 0 : nextX;
      });
    }, autoRotateInterval);
    return () => clearInterval(interval);
  }, [cardWidth, sliderResetX, autoRotateInterval]);

  const handleNext = () => {
    setSliderX(prev => {
      const nextX = prev - cardWidth;
      return nextX <= sliderResetX ? 0 : nextX;
    });
  };

  const handlePrev = () => {
    setSliderX(prev => {
      const nextX = prev + cardWidth;
      return nextX > 0 ? sliderResetX : nextX;
    });
  };

  return { sliderX, handleNext, handlePrev, setSliderX };
};

export default useSlider;