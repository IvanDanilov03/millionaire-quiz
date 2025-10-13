export interface MoneyLadderStep {
  id: string;
  amount: number;
  isCompleted: boolean;
  isCurrent: boolean;
}

export type MoneyLadderVariant = 'desktop' | 'mobile';
