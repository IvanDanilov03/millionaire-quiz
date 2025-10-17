import { gameConfig } from 'modules/Game/constants';

describe('gameConfig', () => {
  it('contains a dozen ordered questions with strictly increasing rewards', () => {
    expect(gameConfig).toHaveLength(12);

    let previousReward = 0;
    for (const question of gameConfig) {
      expect(question.reward).toBeGreaterThan(previousReward);
      previousReward = question.reward;
    }
  });

  it('ensures all questions expose valid answer metadata', () => {
    const questionIds = new Set<string>();

    for (const question of gameConfig) {
      expect(questionIds.has(question.id)).toBe(false);
      questionIds.add(question.id);

      expect(question.answers.length).toBeGreaterThanOrEqual(4);

      const answerIds = new Set<string>();
      const correctAnswers = question.answers.filter(
        (answer) => answer.isCorrect,
      );

      expect(correctAnswers.length).toBeGreaterThanOrEqual(1);

      for (const answer of question.answers) {
        expect(answerIds.has(answer.id)).toBe(false);
        answerIds.add(answer.id);
        expect(answer.label.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('contains at least one question that allows multiple correct answers', () => {
    expect(
      gameConfig.some(
        (question) =>
          question.answers.filter((answer) => answer.isCorrect).length > 1,
      ),
    ).toBe(true);
  });
});
