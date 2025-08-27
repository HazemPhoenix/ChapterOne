import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string, description?: string, due?: Date) => Promise<void>;
}

export function AddTaskModal({ visible, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");

  const handleAdd = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a task title");
      return;
    }

    setIsLoading(true);
    try {
      await onAdd(title, description || undefined, dueDate || undefined);
      handleClose();
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to add task"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDueDate(null);
    setShowDatePicker(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={iconColor} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: textColor }]}>
            Add New Task
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: textColor }]}>Title *</Text>
            <TextInput
              style={[
                styles.titleInput,
                { color: textColor, borderColor: iconColor },
              ]}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title..."
              placeholderTextColor={iconColor}
              maxLength={100}
              multiline
              textAlignVertical="top"
              autoFocus
            />
            <Text style={[styles.charCount, { color: iconColor }]}>
              {title.length}/100
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: textColor }]}>
              Description
            </Text>
            <TextInput
              style={[
                styles.descriptionInput,
                { color: textColor, borderColor: iconColor },
              ]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter task description (optional)..."
              placeholderTextColor={iconColor}
              maxLength={500}
              multiline
              textAlignVertical="top"
              numberOfLines={4}
            />
            <Text style={[styles.charCount, { color: iconColor }]}>
              {description.length}/500
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: textColor }]}>Due Date</Text>
            <TouchableOpacity
              style={[
                styles.dueDateButton,
                {
                  borderColor: iconColor,
                  backgroundColor: dueDate ? `${tintColor}10` : "transparent",
                },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color={dueDate ? tintColor : iconColor}
              />
              <Text
                style={[
                  styles.dueDateText,
                  { color: dueDate ? tintColor : iconColor },
                ]}
              >
                {dueDate
                  ? dueDate.toLocaleDateString()
                  : "Set due date (optional)"}
              </Text>
              {dueDate && (
                <TouchableOpacity
                  onPress={() => setDueDate(null)}
                  style={styles.clearDateButton}
                >
                  <Ionicons name="close-circle" size={20} color={iconColor} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={dueDate || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDueDate(selectedDate);
                  }
                }}
                minimumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.tipContainer}>
            <Ionicons name="bulb-outline" size={16} color={tintColor} />
            <Text style={[styles.tipText, { color: iconColor }]}>
              Tip: Write clear, actionable task titles for better productivity
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleAdd}
            style={[
              styles.addButton,
              {
                backgroundColor:
                  !title.trim() || isLoading ? iconColor : tintColor,
                opacity: !title.trim() || isLoading ? 0.5 : 1,
              },
            ]}
            disabled={isLoading || !title.trim()}
          >
            <Text style={styles.addButtonText}>
              {isLoading ? "Adding..." : "Add Task"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
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
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  closeButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  addButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  headerSpacer: {
    width: 60,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 50,
    maxHeight: 100,
  },
  descriptionInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    maxHeight: 200,
  },
  charCount: {
    fontSize: 12,
    textAlign: "right",
    marginTop: 4,
  },
  tipContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F9FF",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  tipText: {
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  dueDateButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
  },
  dueDateText: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  clearDateButton: {
    marginLeft: 8,
  },
});
