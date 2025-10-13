import type { StaticImageData } from 'next/image';

declare module '*.svg' {
  const source: StaticImageData;
  export default source;
}

declare module '*.png' {
  const source: StaticImageData;
  export default source;
}
