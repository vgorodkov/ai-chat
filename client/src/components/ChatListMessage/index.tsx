import { Text } from 'react-native';
import React from 'react';
import { ChatRole } from '@/constants/chat';
import { ChatListMessageProps } from './types';

export const ChatListMessage = ({ chatMessage }: ChatListMessageProps) => {
  const isAI = chatMessage.author === ChatRole.AI;
  return (
    <Text
      style={{
        alignSelf: isAI ? 'flex-start' : 'flex-end',
        padding: 8,
        borderWidth: 1,
      }}
    >
      {chatMessage.message}
    </Text>
  );
};
