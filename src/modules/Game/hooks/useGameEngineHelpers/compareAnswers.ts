export const areIdSetsEqualIgnoreOrder = (
  leftIds: string[],
  rightIds: string[],
): boolean => {
  if (leftIds.length !== rightIds.length) return false;
  if (leftIds.length === 0) return true;

  const uniqueIdSet = new Set(leftIds);

  if (uniqueIdSet.size === leftIds.length) {
    for (const rightId of rightIds) {
      if (!uniqueIdSet.has(rightId)) return false;
    }
    return true;
  }

  const leftCountsById = new Map<string, number>();

  for (const leftId of leftIds) {
    leftCountsById.set(leftId, (leftCountsById.get(leftId) ?? 0) + 1);
  }

  for (const rightId of rightIds) {
    const currentCount = leftCountsById.get(rightId);
    if (!currentCount) return false;
    leftCountsById.set(rightId, currentCount - 1);
  }

  for (const remainingCount of leftCountsById.values()) {
    if (remainingCount !== 0) return false;
  }

  return true;
};
