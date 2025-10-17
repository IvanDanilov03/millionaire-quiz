import { forwardRef } from 'react';

type ImageProps = {
  alt?: string;
  src?: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

const NextImageMock = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      alt = '',
      src: source = 'mock-image',
      fill: _fill,
      priority: _priority,
      ...rest
    },
    reference,
  ) => (
    <img
      ref={reference}
      alt={alt}
      src={typeof source === 'string' ? source : 'mock-image'}
      {...rest}
    />
  ),
);

NextImageMock.displayName = 'NextImageMock';

export default NextImageMock;
