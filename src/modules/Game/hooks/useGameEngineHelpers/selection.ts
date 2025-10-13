export interface SelectionUpdate {
  nextSelectedAnswerIds: string[];
  isAlreadySelected: boolean;
}

export const getNextSelectedAnswerIds = (
  currentSelectedAnswerIds: string[],
  answerId: string,
  allowsMultipleAnswers: boolean,
): SelectionUpdate => {
  const isAlreadySelected = currentSelectedAnswerIds.includes(answerId);

  if (allowsMultipleAnswers) {
    const nextSelectedAnswerIds = isAlreadySelected
      ? currentSelectedAnswerIds.filter((existingId) => existingId !== answerId)
      : [...currentSelectedAnswerIds, answerId];

    return { nextSelectedAnswerIds, isAlreadySelected };
  }

  const nextSelectedAnswerIds = isAlreadySelected ? [] : [answerId];
  return { nextSelectedAnswerIds, isAlreadySelected };
};
