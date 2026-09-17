import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

import ConversationRow from "../components/ConversationRow";
import { mockConversations } from "../constants/MockConversations";

export default function Conversations() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>

      <FlatList
        data={mockConversations}
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
            <Text style={styles.emptyTitle}>No conversations yet</Text>

            <Text style={styles.emptyText}>
              Your conversations will appear here.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  separator: {
    height: 1,
    backgroundColor: "#eee",
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
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
});
