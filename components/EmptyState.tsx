import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface EmptyStateProps {
  filter: "all" | "completed" | "pending";
  onAddTask?: () => void;
}

export function EmptyState({ filter, onAddTask }: EmptyStateProps) {
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");

  const getEmptyStateContent = () => {
    switch (filter) {
      case "completed":
        return {
          icon: "checkmark-circle-outline" as const,
          title: "No completed tasks",
          subtitle: "Complete some tasks to see them here",
          color: "#10B981",
        };
      case "pending":
        return {
          icon: "time-outline" as const,
          title: "No pending tasks",
          subtitle: "Great job! All your tasks are completed",
          color: "#F59E0B",
        };
      default:
        return {
          icon: "add-circle-outline" as const,
          title: "No tasks yet",
          subtitle: "Tap the + button to add your first task",
          color: tintColor,
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <View style={styles.container}>
      {filter === "all" && onAddTask ? (
        <TouchableOpacity
          style={[
            styles.iconContainer,
            { backgroundColor: `${content.color}15` },
          ]}
          onPress={onAddTask}
          activeOpacity={0.7}
        >
          <Ionicons name={content.icon} size={48} color={content.color} />
        </TouchableOpacity>
      ) : (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${content.color}15` },
          ]}
        >
          <Ionicons name={content.icon} size={48} color={content.color} />
        </View>
      )}
      <Text style={[styles.title, { color: textColor }]}>{content.title}</Text>
      <Text style={[styles.subtitle, { color: iconColor }]}>
        {content.subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    marginTop: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
});
