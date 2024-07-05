export interface PromptInputProps {
  promptQuery: string;
  onChangeText: (text: string) => void;
  sendPrompt: (promt: string) => void;
  isLoading: boolean;
}
