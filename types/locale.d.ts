/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
// IMPORTANT: this interface is taken from next-intl and should not be edited manually
export interface TFunction {
  <TargetKey extends any>(
    key: TargetKey,
    values?: TranslationValues | undefined,
    formats?: Formats | undefined,
  ): string;
  rich<TargetKey extends any>(
    key: TargetKey,
    values?: RichTranslationValues | undefined,
    formats?: Formats | undefined,
  ): ReactNode;
  markup<TargetKey extends any>(
    key: TargetKey,
    values?: MarkupTranslationValues | undefined,
    formats?: Formats | undefined,
  ): string;
  raw<TargetKey extends any>(key: TargetKey): any;
  has<TargetKey extends any>(key: TargetKey): boolean;
}
