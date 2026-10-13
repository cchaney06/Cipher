import { useRouter } from "expo-router";
import { useState } from "react";

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import ConversationRow from "../components/ConversationRow";
import { mockConversations } from "../constants/MockConversations";

import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../constants/Theme";

export default function Conversations() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

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
                },
              });
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              {searchQuery.trim() === ""
                ? "No conversations yet"
                : "No conversations found"}
            </Text>

            <Text style={styles.emptyText}>
              {searchQuery.trim() === ""
                ? "Your conversations will appear here."
                : "Try searching for a different name."}
            </Text>
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
