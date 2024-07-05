import { ChatMessage } from '@/types/chat';

export interface ChatListProps {
  chatMessages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (message: string) => void;
}
