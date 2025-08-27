import { useThemeColor } from "@/hooks/useThemeColor";
import { Task } from "@/models/Task";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (task: Task) => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");

  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(task.id),
      },
    ]);
  };

  const formatDate = (date?: Date | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => onToggle(task.id)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
      >
        <View
          style={[
            styles.checkbox,
            task.completed && { backgroundColor: tintColor },
          ]}
        >
          {task.completed && (
            <Ionicons name="checkmark" size={16} color="white" />
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: textColor },
            task.completed && styles.completedText,
          ]}
          numberOfLines={2}
        >
          {task.title}
        </Text>

        {task.description ? (
          <Text
            style={[
              styles.description,
              { color: iconColor },
              task.completed && styles.completedText,
            ]}
            numberOfLines={2}
          >
            {task.description}
          </Text>
        ) : null}

        {task.due && (
          <View style={styles.dueDateContainer}>
            <Ionicons name="calendar-outline" size={14} color={iconColor} />
            <Text style={[styles.dueDate, { color: iconColor }]}>
              Due: {formatDate(task.due)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onEdit(task)}
            accessibilityLabel="Edit task"
          >
            <Ionicons name="create-outline" size={20} color={iconColor} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleDelete}
          accessibilityLabel="Delete task"
        >
          <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  checkboxContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  dueDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  dueDate: {
    fontSize: 12,
    marginLeft: 4,
  },
  completedText: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  actions: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
});
