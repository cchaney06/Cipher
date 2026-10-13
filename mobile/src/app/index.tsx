import { useRouter } from "expo-router";
import { useState } from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import AppTitle from "../components/AppTitle";
import PrimaryButton from "../components/PrimaryButton";

import { Colors } from "../constants/Theme";

export default function Index() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    const trimmedUsername = username.trim();

    if (trimmedUsername === "") {
      setError("Please enter your username.");
      return;
    }

    if (password === "") {
      setError("Please enter your password.");
      return;
    }

    setError("");

    router.replace("/conversations");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <AppTitle />

          <Text style={styles.subtitle}>Sign in to continue.</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Username</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            {error !== "" && <Text style={styles.error}>{error}</Text>}

            <PrimaryButton title="Log in" onPress={handleLogin} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  subtitle: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 32,
    color: Colors.secondaryText,
  },

  form: {
    gap: 12,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 8,
  },

  error: {
    color: Colors.error,
    marginBottom: 4,
  },
});
