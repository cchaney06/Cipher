import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { mockCurrentUser } from "../../constants/MockCurrentUser";

import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import MessageBubble from "../../components/MessageBubble";
import MessageInput from "../../components/MessageInput";
import { mockConversations } from "../../constants/MockConversations";
import { mockMessages } from "../../constants/MockMessages";
import { Message } from "../../types/Message";

import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../../constants/Theme";

export default function Chat() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const conversation = mockConversations.find((item) => item.id === id);

  const [messages, setMessages] = useState<Message[]>(mockMessages[id] ?? []);

  const [newMessage, setNewMessage] = useState("");

  const messageListRef = useRef<FlatList<Message>>(null);

  function handleSend() {
    const trimmedMessage = newMessage.trim();

    if (trimmedMessage === "") {
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      senderId: mockCurrentUser.id,
      content: trimmedMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages((currentMessages) => [...currentMessages, message]);

    setNewMessage("");
  }

  if (!conversation) {
    return (
      <View style={styles.center}>
        <Text>Conversation not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right", "bottom"]}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to conversation"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>Back</Text>
          </Pressable>

          <Text style={styles.name}>{conversation.name}</Text>
        </View>

        <FlatList
          ref={messageListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              isMine={item.senderId === mockCurrentUser.id}
            />
          )}
          contentContainerStyle={styles.messageList}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => {
            messageListRef.current?.scrollToEnd({
              animated: true,
            });
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No messages yet</Text>

              <Text style={styles.emptyText}>Send the first message.</Text>
            </View>
          }
        />

        <MessageInput
          value={newMessage}
          onChangeText={setNewMessage}
          onSend={handleSend}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 4,
  },

  backText: {
    fontSize: 16,
  },

  name: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 6,
  },

  messageList: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexGrow: 1,
    justifyContent: "flex-end",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
  },

  emptyText: {
    fontSize: 15,
    color: Colors.secondaryText,
    marginTop: 6,
  },

  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
