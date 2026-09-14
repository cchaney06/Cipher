import { StyleSheet, Text, View } from "react-native";

import AppTitle from "../components/AppTitle";
import PrimaryButton from "../components/PrimaryButton";

export default function Index() {
  function handleContinue() {
    console.log("Continue pressed");
  }

  return (
    <View style={styles.container}>
      <AppTitle />

      <Text style={styles.subtitle}>
        Private conversations. Protected messages.
      </Text>

      <PrimaryButton title="Continue" onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 20,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
});
