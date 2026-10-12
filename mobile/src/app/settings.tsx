import { useRouter } from "expo-router";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { mockCurrentUser } from "../constants/MockCurrentUser";

export default function Settings() {
  const router = useRouter();

  function handleLogout() {
    router.dismissAll();
    router.replace("/");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {mockCurrentUser.username.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.username}>@{mockCurrentUser.username}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Username</Text>
          <Text style={styles.rowValue}>{mockCurrentUser.username}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Security</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>End-to-end encryption</Text>
          <Text style={styles.warningValue}>Not enabled yet</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Server</Text>
          <Text style={styles.rowValue}>Local prototype</Text>
        </View>
      </View>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 4,
  },

  backText: {
    fontSize: 16,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 8,
  },

  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 28,
    fontWeight: "600",
  },

  username: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },

  section: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 12,
    textTransform: "uppercase",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  rowLabel: {
    fontSize: 16,
  },

  rowValue: {
    fontSize: 16,
    color: "#666",
  },

  warningValue: {
    fontSize: 16,
    color: "#b26a00",
  },

  logoutButton: {
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#c00",
    alignItems: "center",
  },

  logoutText: {
    color: "#c00",
    fontSize: 16,
    fontWeight: "600",
  },
});
