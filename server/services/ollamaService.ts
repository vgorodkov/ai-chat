import { Ollama } from '@langchain/community/llms/ollama';

const ollama = new Ollama({
  baseUrl: 'http://localhost:11434',
  model: 'llama3',
  temperature: 0.3,
  stop: ['User:'],
});

export const getAIResponseStream = async (fullPrompt: string) => {
  return await ollama.stream(fullPrompt);
};
