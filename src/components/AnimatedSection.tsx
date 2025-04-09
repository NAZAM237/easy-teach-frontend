import React, {useEffect, useRef, useState} from 'react';
import {cn} from '@/libs/utils';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  threshold?: number;
  animation?: 'fade-in' | 'fade-in-right' | 'fade-in-left' | 'scale-in';
  delay?: number;
}

const AnimatedSection = ({ 
  children, 
  threshold = 0.1, 
  animation = 'fade-in',
  delay = 0,
  className,
  ...props 
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // Utilisons une classe personnalisée pour chaque animation
  const getAnimationClass = () => {
    if (!isVisible) return '';
    
    switch (animation) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'fade-in-right':
        return 'animate-fade-in-right';
      case 'fade-in-left':
        return 'animate-fade-in-left';
      case 'scale-in':
        return 'animate-scale-in';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        isVisible ? getAnimationClass() : 'opacity-0',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
