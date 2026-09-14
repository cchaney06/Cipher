import { StyleSheet, Text } from "react-native";

export default function AppTitle() {
  return <Text style={styles.title}>Cipher</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
});
