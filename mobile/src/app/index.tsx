import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cipher</Text>
      <Text style={styles.subtitle}>Secure messaging starts here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
});
