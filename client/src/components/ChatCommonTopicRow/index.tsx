import { View } from 'react-native';
import React from 'react';
import { commonTopics } from './constants';
import { ChatCommonTopic } from './ChatCommonTopic';
import { styles } from './styles';

export const ChatCommonTopicRow = ({
  sendMessage,
}: {
  sendMessage: (message: string) => void;
}) => {
  return (
    <View style={styles.chatCommonTopicRow}>
      {commonTopics.map(({ icon, content, id }) => (
        <ChatCommonTopic
          key={id}
          content={content}
          icon={icon}
          sendMessage={sendMessage}
        />
      ))}
    </View>
  );
};
