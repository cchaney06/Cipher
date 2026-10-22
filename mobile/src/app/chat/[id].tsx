import { useLocalSearchParams, useRouter } from "expo-router";

import { useEffect, useRef, useState } from "react";

import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MessageBubble from "../../components/MessageBubble";
import MessageInput from "../../components/MessageInput";

import { mockCurrentUser } from "../../constants/MockCurrentUser";
import { Colors } from "../../constants/Theme";

import {
  getConversationMessages,
  getUserByUsername,
  sendMessage,
} from "../../services/api";

import type { Message } from "../../types/Message";

export default function Chat() {
  const router = useRouter();

  const { id, name } = useLocalSearchParams<{
    id: string;
    name?: string;
  }>();

  const [messages, setMessages] = useState<Message[]>([]);

  const [newMessage, setNewMessage] = useState("");

  const [currentBackendUserId, setCurrentBackendUserId] = useState<
    string | null
  >(null);

  const [isLoading, setIsLoading] = useState(true);

  const [loadError, setLoadError] = useState<string | null>(null);

  const [isSending, setIsSending] = useState(false);

  const [sendError, setSendError] = useState<string | null>(null);

  const messageListRef = useRef<FlatList<Message>>(null);

  const conversationName =
    typeof name === "string" && name.trim() !== "" ? name : "Conversation";

  useEffect(() => {
    let cancelled = false;

    async function loadMessages() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const currentUser = await getUserByUsername(mockCurrentUser.username);
        const apiMessages = await getConversationMessages(id, currentUser.id);

        if (cancelled) {
          return;
        }

        setCurrentBackendUserId(currentUser.id);
        setMessages(
          apiMessages.map((message) => ({
            id: message.id,
            senderId: message.senderId,
            content: message.content,
            createdAt: message.createdAt,
          })),
        );
      } catch (error) {
        console.error("Failed to load messages:", error);

        if (!cancelled) {
          setLoadError("Unable to load messages.");
          setMessages([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSend() {
    const trimmedMessage = newMessage.trim();

    if (trimmedMessage === "" || !currentBackendUserId || isSending) {
      return;
    }

    setIsSending(true);
    setSendError(null);

    try {
      const createdMessage = await sendMessage(
        id,
        currentBackendUserId,
        trimmedMessage,
      );
      const message: Message = {
        id: createdMessage.id,
        senderId: createdMessage.senderId,
        content: createdMessage.content,
        createdAt: createdMessage.createdAt,
      };

      setMessages((currentMessages) => [...currentMessages, message]);

      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);

      setSendError("Message could not be sent.");
    } finally {
      setIsSending(false);
    }
  }

  let emptyTitle = "No messages yet";
  let emptyText = "Send the first message.";

  if (!isLoading) {
    emptyTitle = "Loading messages...";
    emptyText = "Retrieving messages from Cipher.";
  } else if (loadError) {
    emptyTitle = "Unable to load messages";
    emptyText = loadError;
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

          <Text style={styles.name}>{conversationName}</Text>
        </View>

        <FlatList
          ref={messageListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
              isMine={item.senderId === currentBackendUserId}
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
              <Text style={styles.emptyTitle}>{emptyTitle}</Text>

              <Text style={styles.emptyText}>{emptyText}</Text>
            </View>
          }
        />

        {sendError && <Text style={styles.sendError}>{sendError}</Text>}

        <MessageInput
          value={newMessage}
          onChangeText={setNewMessage}
          onSend={handleSend}
          disabled={
            isSending || currentBackendUserId === null || loadError !== null
          }
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

  sendError: {
    color: Colors.error,
    fontSize: 13,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },

  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
