import { StyleSheet, Text, View } from "react-native";

import { Message } from "../types/Message";

interface MessageBubbleProps {
  message: Message;
  isMine: boolean;
}

export default function MessageBubble({ message, isMine }: MessageBubbleProps) {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <View style={[styles.row, isMine ? styles.myRow : styles.theirRow]}>
      <View
        style={[styles.bubble, isMine ? styles.myBubble : styles.theirBubble]}
      >
        <Text style={[styles.messageText, isMine && styles.myMessageText]}>
          {message.content}
        </Text>

        <Text style={[styles.time, isMine && styles.myTime]}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    marginVertical: 4,
  },

  myRow: {
    alignItems: "flex-end",
  },

  theirRow: {
    alignItems: "flex-start",
  },

  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },

  myBubble: {
    backgroundColor: "#222",
    borderBottomRightRadius: 5,
  },

  theirBubble: {
    backgroundColor: "#e9e9e9",
    borderBottomLeftRadius: 5,
  },

  messageText: {
    fontSize: 16,
    lineHeight: 21,
  },

  myMessageText: {
    color: "#fff",
  },

  time: {
    fontSize: 11,
    color: "#777",
    marginTop: 4,
    alignSelf: "flex-end",
  },

  myTime: {
    color: "#ccc",
  },
});
