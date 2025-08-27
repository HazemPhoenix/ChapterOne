import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddTaskModal } from "@/components/AddTaskModal";
import { EmptyState } from "@/components/EmptyState";
import { TaskItem } from "@/components/TaskItem";
import { TaskStats } from "@/components/TaskStats";
import { ThemedText } from "@/components/ThemedText";
import { useTasks } from "@/hooks/useTasks";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Task } from "@/models/Task";

export default function TaskManagerScreen() {
  const {
    tasks,
    filter,
    taskStats,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    setFilter,
  } = useTasks();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");

  const handleAddTask = async (
    title: string,
    description?: string,
    due?: Date
  ) => {
    try {
      await addTask(title, description, due);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      throw error; // Re-throw to let the modal handle the error display
    }
  };

  const handleToggleTask = async (taskId: string) => {
    try {
      await toggleTask(taskId);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      Alert.alert("Error", "Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      Alert.alert("Error", "Failed to delete task");
    }
  };

  const handleClearCompleted = async () => {
    if (taskStats.completed === 0) return;

    Alert.alert(
      "Clear Completed Tasks",
      `Are you sure you want to delete all ${taskStats.completed} completed tasks?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            try {
              await clearCompleted();
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
            } catch {
              Alert.alert("Error", "Failed to clear completed tasks");
            }
          },
        },
      ]
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh - in a real app, this might sync with a server
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggle={handleToggleTask}
      onDelete={handleDeleteTask}
    />
  );

  const renderHeader = () => (
    <TaskStats
      total={taskStats.total}
      completed={taskStats.completed}
      pending={taskStats.pending}
      filter={filter}
      onFilterChange={setFilter}
      onClearCompleted={handleClearCompleted}
    />
  );

  const renderEmptyList = () => (
    <EmptyState filter={filter} onAddTask={() => setIsAddModalVisible(true)} />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="default" />

      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          My Tasks
        </ThemedText>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: tintColor }]}
          onPress={() => setIsAddModalVisible(true)}
          accessibilityLabel="Add new task"
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          tasks.length === 0 && styles.emptyListContent,
        ]}
      />

      <AddTaskModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAdd={handleAddTask}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    flex: 1,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyListContent: {
    flexGrow: 1,
  },
});
