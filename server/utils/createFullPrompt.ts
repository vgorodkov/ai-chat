export const createFullPrompt = (sessionHistory: string[]): string => {
  return sessionHistory.join('\n') + '\nAI:';
};
