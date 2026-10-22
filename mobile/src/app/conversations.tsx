import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import ConversationRow from "../components/ConversationRow";

import { mockCurrentUser } from "../constants/MockCurrentUser";
import { Colors } from "../constants/Theme";

import {
  getUserByUsername,
  getUserConversations,
  type ApiConversation,
} from "../services/api";

import type { Conversation } from "../types/Conversation";

function mapApiConversation(
  conversation: ApiConversation,
  currentUserId: string,
): Conversation {
  const otherMembers = conversation.members.filter(
    (member) => member.id !== currentUserId,
  );
  const conversationName =
    otherMembers.length > 0
      ? otherMembers.map((member) => member.username).join(", ")
      : "Conversation";

  return {
    id: conversation.id,
    name: conversationName,
    lastMessage: conversation.lastMessage?.content ?? "No messages yet",
    lastMessageAt:
      conversation.lastMessage?.createdAt ?? conversation.createdAt,
    unreadCount: 0,
  };
}

export default function Conversations() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [loadError, setLoadError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      async function loadConversations() {
        setIsLoading(true);
        setLoadError(null);

        try {
          const currentUser = await getUserByUsername(mockCurrentUser.username);

          const apiConversations = await getUserConversations(currentUser.id);

          if (cancelled) {
            return;
          }

          const mappedConversations = apiConversations.map((conversation) =>
            mapApiConversation(conversation, currentUser.id),
          );

          setConversations(mappedConversations);
        } catch (error) {
          console.error("Failed to load conversations:", error);

          if (!cancelled) {
            setConversations([]);
            setLoadError("Unable to load conversations.");
          }
        } finally {
          if (!cancelled) {
            setIsLoading(false);
          }
        }
      }

      loadConversations();

      return () => {
        cancelled = true;
      };
    }, []),
  );

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  let emptyTitle = "No conversations yet";
  let emptyText = "Your conversations will appear here.";

  if (isLoading) {
    emptyTitle = "Loading conversations...";
    emptyText = "Retrieving conversations from Cipher.";
  } else if (loadError) {
    emptyTitle = "Unable to load conversations";
    emptyText = loadError;
  } else if (searchQuery.trim() !== "") {
    emptyTitle = "No conversations found";
    emptyText = "Try searching for a different name.";
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open settings"
          onPress={() => router.push("/settings")}
          style={({ pressed }) => [
            styles.settingsButton,
            pressed && styles.settingsButtonPressed,
          ]}
        >
          <Text style={styles.settingsText}>Settings</Text>
        </Pressable>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationRow
            conversation={item}
            onPress={() => {
              router.push({
                pathname: "/chat/[id]",
                params: {
                  id: item.id,
                  name: item.name,
                },
              });
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>{emptyTitle}</Text>

            <Text style={styles.emptyText}>{emptyText}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
  },

  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 86,
  },

  emptyContainer: {
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 24,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
  },

  emptyText: {
    fontSize: 15,
    color: Colors.secondaryText,
    marginTop: 8,
    textAlign: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  settingsButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  settingsButtonPressed: {
    opacity: 0.5,
  },

  settingsText: {
    fontSize: 16,
    fontWeight: "600",
  },

  searchInput: {
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 14,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    fontSize: 16,
  },
});
