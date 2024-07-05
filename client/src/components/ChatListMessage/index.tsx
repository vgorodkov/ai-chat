import React from 'react';
import { ChatRole } from '@/constants/chat';
import { ChatListMessageProps } from './types';
import { colors } from '@/constants/colors';
import { styles } from './styles';
import { Typography } from '../UI';

export const ChatListMessage = ({ chatMessage }: ChatListMessageProps) => {
  const isAI = chatMessage.author === ChatRole.AI;
  return (
    <Typography
      style={[
        styles.chatListMessage,
        {
          backgroundColor: isAI ? '#230023' : colors.surface,
          color: isAI ? 'white' : 'black',
          alignSelf: isAI ? 'flex-start' : 'flex-end',
        },
      ]}
    >
      {chatMessage.message}
    </Typography>
  );
};
