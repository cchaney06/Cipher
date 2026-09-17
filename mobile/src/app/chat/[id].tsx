import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { mockConversations } from "../../constants/MockConversations";

export default function Chat() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const conversation = mockConversations.find((item) => item.id === id);

  if (!conversation) {
    return (
      <View style={styles.center}>
        <Text>Conversation not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>Back</Text>
        </Pressable>

        <Text style={styles.name}>{conversation.name}</Text>
      </View>

      <View style={styles.center}>
        <Text style={styles.placeholder}>Chat with {conversation.name}</Text>

        <Text style={styles.subtext}>Messages will go here tomorrow.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  back: {
    fontSize: 22,
    fontWeight: "600",
  },

  name: {
    fontSize: 22,
    fontWeight: "600",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  placeholder: {
    fontSize: 20,
    fontWeight: "600",
  },

  subtext: {
    fontSize: 15,
    color: "#666",
    marginTop: 8,
  },
});
