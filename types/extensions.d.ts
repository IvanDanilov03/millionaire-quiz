declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  import React = require('react');

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  // eslint-disable-next-line unicorn/prevent-abbreviations
  const src: string;
  export default src;
}
