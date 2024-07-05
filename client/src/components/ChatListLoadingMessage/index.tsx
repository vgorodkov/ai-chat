import React from 'react';
import { ChatListLoadingMessageProps } from './types';
import { ChatRole } from '@/constants/chat';
import { ChatListMessage } from '../ChatListMessage';

export const ChatListLoadingMessage = ({
  isLoading,
}: ChatListLoadingMessageProps) => {
  if (!isLoading) {
    return null;
  }
  return (
    <ChatListMessage
      chatMessage={{ author: ChatRole.AI, message: 'Thinking...' }}
    />
  );
};
