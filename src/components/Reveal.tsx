import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  id,
  style,
}: RevealProps) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
