import { Pressable } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ChatCommonTopicProps } from './types';
import { Card, Typography, TypographyVariant } from '@/components/UI';

export const ChatCommonTopic = ({
  sendMessage,
  icon,
  content,
}: ChatCommonTopicProps) => {
  return (
    <Pressable
      onPress={() => {
        sendMessage(content);
      }}
    >
      <Card>
        <Ionicons name={icon} size={24} color="white" />
        <Typography variant={TypographyVariant.LABEL_LARGE}>
          {content}
        </Typography>
      </Card>
    </Pressable>
  );
};
