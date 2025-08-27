import { TaskFilter } from "@/hooks/useTasks";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TaskStatsProps {
  total: number;
  completed: number;
  pending: number;
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  onClearCompleted: () => void;
}

export function TaskStats({
  total,
  completed,
  pending,
  filter,
  onFilterChange,
  onClearCompleted,
}: TaskStatsProps) {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");

  const filters: { key: TaskFilter; label: string; icon: string }[] = [
    { key: "all", label: "All", icon: "list-outline" },
    { key: "pending", label: "Pending", icon: "time-outline" },
    { key: "completed", label: "Done", icon: "checkmark-circle-outline" },
  ];

  const getFilterCount = (filterKey: TaskFilter): number => {
    switch (filterKey) {
      case "completed":
        return completed;
      case "pending":
        return pending;
      default:
        return total;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: tintColor }]}>{total}</Text>
          <Text style={[styles.statLabel, { color: iconColor }]}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: "#10B981" }]}>
            {completed}
          </Text>
          <Text style={[styles.statLabel, { color: iconColor }]}>Done</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: "#F59E0B" }]}>
            {pending}
          </Text>
          <Text style={[styles.statLabel, { color: iconColor }]}>Pending</Text>
        </View>
        {completed > 0 && (
          <TouchableOpacity
            style={[styles.clearButton, { borderColor: "#EF4444" }]}
            onPress={onClearCompleted}
          >
            <Ionicons name="trash-outline" size={16} color="#EF4444" />
            <Text style={[styles.clearButtonText, { color: "#EF4444" }]}>
              Clear
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filtersRow}>
        {filters.map((filterItem) => {
          const isActive = filter === filterItem.key;
          const count = getFilterCount(filterItem.key);

          return (
            <TouchableOpacity
              key={filterItem.key}
              style={[
                styles.filterButton,
                isActive && { backgroundColor: tintColor },
                !isActive && { backgroundColor: "rgba(100,100,100,0.1)" },
              ]}
              onPress={() => onFilterChange(filterItem.key)}
            >
              <Ionicons
                name={filterItem.icon as any}
                size={18}
                color={isActive ? "white" : iconColor}
              />
              <Text
                style={[
                  styles.filterLabel,
                  { color: isActive ? "white" : textColor },
                ]}
              >
                {filterItem.label}
              </Text>
              {count > 0 && (
                <View
                  style={[
                    styles.filterBadge,
                    {
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.3)"
                        : tintColor,
                    },
                  ]}
                >
                  <Text style={[styles.filterBadgeText, { color: "white" }]}>
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 20,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  filtersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "rgba(120,120,120,0.1)",
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  filterBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: "center",
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
