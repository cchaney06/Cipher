import { StyleSheet, Text, View } from "react-native";

export default function Conversations() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>

      <Text style={styles.subtitle}>Your conversations will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 70,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 8,
    color: "#666",
  },
});
