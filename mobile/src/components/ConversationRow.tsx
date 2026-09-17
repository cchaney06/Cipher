import { Pressable, StyleSheet, Text, View } from "react-native";

import { Conversation } from "../types/Conversation";
import { formatConversationTime } from "../utils/formatConversationTime";

interface ConversationRowProps {
  conversation: Conversation;
  onPress: () => void;
}

export default function ConversationRow({
  conversation,
  onPress,
}: ConversationRowProps) {
  const initials = conversation.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text
            style={[
              styles.name,
              conversation.unreadCount > 0 && styles.unreadText,
            ]}
            numberOfLines={1}
          >
            {conversation.name}
          </Text>

          <Text style={styles.time}>
            {formatConversationTime(conversation.lastMessageAt)}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text
            style={[
              styles.preview,
              conversation.unreadCount > 0 && styles.unreadText,
            ]}
            numberOfLines={1}
          >
            {conversation.lastMessage}
          </Text>

          {conversation.unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{conversation.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  pressed: {
    opacity: 0.6,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  avatarText: {
    fontSize: 18,
    fontWeight: "600",
  },

  content: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  name: {
    flex: 1,
    fontSize: 17,
    marginRight: 10,
  },

  preview: {
    flex: 1,
    fontSize: 15,
    color: "#666",
    marginRight: 10,
  },

  time: {
    fontSize: 13,
    color: "#777",
  },

  unreadText: {
    fontWeight: "600",
  },

  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
