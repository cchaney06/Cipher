import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "../constants/Theme";

interface MessageInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

export default function MessageInput({
  value,
  onChangeText,
  onSend,
}: MessageInputProps) {
  const canSend = value.trim().length > 0;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Message"
        value={value}
        onChangeText={onChangeText}
        multiline
        maxLength={2000}
      />

      <Pressable
        style={[styles.sendButton, !canSend && styles.disabledButton]}
        onPress={onSend}
        disabled={!canSend}
      >
        <Text style={styles.sendText}>Send</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
    gap: 8,
  },

  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 21,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },

  sendButton: {
    paddingHorizontal: 16,
    height: 42,
    justifyContent: "center",
  },

  disabledButton: {
    opacity: 0.4,
  },

  sendText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
});
