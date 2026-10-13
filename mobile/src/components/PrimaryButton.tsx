import { Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "../constants/Theme";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },

  text: {
    color: Colors.primaryText,
    fontWeight: "bold",
  },

  disabledButton: {
    opacity: 0.5,
  },
});
