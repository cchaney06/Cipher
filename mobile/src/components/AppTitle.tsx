import { StyleSheet, Text } from "react-native";

import { Colors } from "../constants/Theme";

export default function AppTitle() {
  return <Text style={styles.title}>Cipher</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.text,
  },
});
