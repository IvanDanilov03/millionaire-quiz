type StaticAssetWithSource = { src: string };

const isStaticAssetWithSource = (
  value: unknown,
): value is StaticAssetWithSource =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as { src?: unknown }).src === 'string';

export const getAssetUrlString = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (isStaticAssetWithSource(value)) return value.src;
  return '';
};
