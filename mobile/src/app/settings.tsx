import { useRouter } from "expo-router";

import { useEffect, useState } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { mockCurrentUser } from "../constants/MockCurrentUser";

import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "../constants/Theme";

import { getHealth, getUsers } from "../services/api";

export default function Settings() {
  const router = useRouter();

  const [backendStatus, setBackendStatus] = useState<
    "checking" | "connected" | "unavailable"
  >("checking");

  const [backendUserCount, setBackendUserCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadBackendStatus() {
      try {
        const [health, users] = await Promise.all([getHealth(), getUsers()]);

        if (cancelled) {
          return;
        }

        if (health.status === "ok" && health.database === "connected") {
          setBackendStatus("connected");
        } else {
          setBackendStatus("unavailable");
        }

        setBackendUserCount(users.length);
      } catch (error) {
        console.error("Failed to connect to Cipher API:", error);

        if (!cancelled) {
          setBackendStatus("unavailable");
          setBackendUserCount(null);
        }
      }
    }

    loadBackendStatus();

    return () => {
      cancelled = true;
    };
  }, []);

  const serverStatusText =
    backendStatus === "checking"
      ? "Checking..."
      : backendStatus === "connected"
        ? "Connected"
        : "Unavailable";

  function handleLogout() {
    router.dismissAll();
    router.replace("/");
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
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
          <Text style={styles.rowValue}>{serverStatusText}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Backend users</Text>

          <Text style={styles.rowValue}>
            {backendUserCount === null ? "—" : backendUserCount}
          </Text>
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Log out"
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
    backgroundColor: Colors.avatar,
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
    borderTopColor: Colors.border,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.secondaryText,
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
    color: Colors.secondaryText,
  },

  warningValue: {
    fontSize: 16,
    color: Colors.warning,
  },

  logoutButton: {
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.danger,
    alignItems: "center",
  },

  logoutText: {
    color: Colors.danger,
    fontSize: 16,
    fontWeight: "600",
  },
});
