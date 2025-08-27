import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function AboutScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "tint");
  const iconColor = useThemeColor({}, "icon");

  const features = [
    {
      icon: "add-circle-outline",
      title: "Add Tasks",
      description: "Create new tasks with titles and optional descriptions",
    },
    {
      icon: "checkmark-circle-outline",
      title: "Mark Complete",
      description: "Check off tasks when completed with visual feedback",
    },
    {
      icon: "trash-outline",
      title: "Delete Tasks",
      description: "Remove tasks you no longer need with confirmation",
    },
    {
      icon: "filter-outline",
      title: "Filter Tasks",
      description: "View all, pending, or completed tasks separately",
    },
    {
      icon: "stats-chart-outline",
      title: "Task Statistics",
      description: "See your progress with task counts and completion stats",
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${tintColor}20` },
            ]}
          >
            <Ionicons name="information-circle" size={48} color={tintColor} />
          </View>
          <ThemedText type="title" style={styles.title}>
            Task Manager
          </ThemedText>
          <ThemedText style={[styles.subtitle, { color: iconColor }]}>
            A clean and intuitive task management app built with React Native
          </ThemedText>
        </View>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Features
          </ThemedText>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View
                style={[
                  styles.featureIcon,
                  { backgroundColor: `${tintColor}15` },
                ]}
              >
                <Ionicons
                  name={feature.icon as any}
                  size={24}
                  color={tintColor}
                />
              </View>
              <View style={styles.featureContent}>
                <ThemedText style={styles.featureTitle}>
                  {feature.title}
                </ThemedText>
                <ThemedText
                  style={[styles.featureDescription, { color: iconColor }]}
                >
                  {feature.description}
                </ThemedText>
              </View>
            </View>
          ))}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
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
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 16,
    textAlign: "center",
  },
});
