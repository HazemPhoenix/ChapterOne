# Task Manager App

A modern, intuitive task management application built with React Native and Expo. This app provides a clean interface for managing your daily tasks with features like due dates, filtering, and progress tracking.

## 📱 Features

### Core Functionality

- ✅ **Add Tasks**: Create new tasks with titles, descriptions, and optional due dates
- ✅ **Mark Complete**: Toggle task completion status with visual feedback and haptic response
- ✅ **Delete Tasks**: Remove tasks with confirmation dialog
- ✅ **Due Date Support**: Set due dates for tasks using a native date picker
- ✅ **Task Filtering**: View all, pending, or completed tasks separately
- ✅ **Task Statistics**: Real-time progress tracking with completion counts
- ✅ **Clear Completed**: Remove all completed tasks at once

### User Experience

- 🎨 **Clean UI**: Modern, intuitive interface following platform design guidelines
- 🌙 **Dark/Light Mode**: Automatic theme support based on system preferences
- 📱 **Responsive Design**: Optimized for various screen sizes
- 🔄 **Haptic Feedback**: Tactile responses for user interactions
- 🎯 **Accessibility**: Built with accessibility best practices
- ⚡ **Performance**: Efficient state management and optimized rendering
- 💫 **Interactive Empty State**: Tap the plus icon when no tasks exist to add your first task

## 🚀 Getting Started

### Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or later) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo CLI** - Install globally: `npm install -g @expo/cli`
- **Mobile Development Environment**:
  - **For iOS**: Xcode and iOS Simulator (macOS only)
  - **For Android**: Android Studio and Android Emulator
  - **For Physical Device**: Expo Go app from App Store/Play Store

### Installation

1. **Clone the repository**

   ```bash
   git clone [https://github.com/HazemPhoenix/ChapterOne](https://github.com/HazemPhoenix/ChapterOne.git)
   cd ChapterOne
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

   or

   ```bash
   expo start
   ```

4. **Run on your preferred platform**

   After starting the development server, you'll see a QR code and several options:

   **Option A: Use Expo Go App (Recommended for beginners)**

   - Install Expo Go on your physical device
   - Scan the QR code with your camera (iOS) or Expo Go app (Android)

   **Option B: Use Simulators/Emulators**

   - Press `i` in the terminal to open iOS Simulator
   - Press `a` in the terminal to open Android Emulator
   - Press `w` in the terminal to open in web browser

   **Option C: Build and run natively**

   ```bash
   npm run ios       # For iOS
   npm run android   # For Android
   ```

## 📖 How to Use

### Adding Your First Task

1. When you open the app, you'll see an empty state with a plus icon
2. Tap the plus icon (either in the header or on the empty state icon) to create a new task
3. Fill in the task details:
   - **Title** (required): Enter a clear, actionable task title
   - **Description** (optional): Add additional details or notes
   - **Due Date** (optional): Tap the calendar icon to set a due date
4. Tap "Add Task" at the bottom of the form

### Managing Tasks

- **Complete a Task**: Tap the circular checkbox next to any task
- **Delete a Task**: Tap the trash icon and confirm deletion
- **View Task Details**: Task descriptions and due dates are displayed below the title

### Filtering and Organization

- **Filter Tasks**: Use the filter buttons at the top (All, Pending, Done)
- **View Statistics**: Check the stats card showing total, pending, and completed task counts
- **Clear Completed**: Use the "Clear" button in the stats to remove all completed tasks at once

### Visual Feedback

- Completed tasks are visually distinguished with checkmarks and strikethrough text
- Haptic feedback confirms your actions
- Color-coded filter badges show active selections

## 🛠 Technology Stack

### Core Framework

- **[React Native](https://reactnative.dev/)** - Cross-platform mobile app framework
- **[Expo](https://expo.dev/)** - Development platform and toolchain for React Native apps
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript for better development experience

### Navigation & UI

- **[Expo Router](https://docs.expo.dev/router/introduction/)** - File-based routing system for React Native
- **[React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)** - Handles safe areas across different devices
- **[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)** - Enhanced gesture support
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** - Smooth animations and transitions

### Icons & Visual Elements

- **[@expo/vector-icons](https://docs.expo.dev/guides/icons/)** - Comprehensive icon library with Ionicons
- **[Expo Symbols](https://docs.expo.dev/versions/latest/sdk/symbols/)** - Native symbol support for iOS

### User Experience

- **[Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)** - Tactile feedback for user interactions
- **[@react-native-community/datetimepicker](https://github.com/react-native-datetimepicker/datetimepicker)** - Native date picker component

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting with Expo configuration
- **[Babel](https://babeljs.io/)** - JavaScript compiler for React Native compatibility

## 📂 Project Structure

```
ChapterOne/
├── app/                    # Application screens (Expo Router)
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── _layout.tsx    # Tab layout configuration
│   │   ├── index.tsx      # Main task management screen
│   │   └── explore.tsx    # App information screen
│   ├── _layout.tsx        # Root layout with theme provider
│   └── +not-found.tsx     # 404 error page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── AddTaskModal.tsx  # Task creation modal
│   ├── EmptyState.tsx    # Empty state with interactive elements
│   ├── TaskItem.tsx      # Individual task component
│   ├── TaskStats.tsx     # Statistics and filtering component
│   └── ThemedText.tsx    # Themed text components
├── constants/            # App constants and configuration
│   └── Colors.ts         # Color scheme for light/dark themes
├── hooks/                # Custom React hooks
│   ├── useTasks.ts       # Task management state and operations
│   ├── useColorScheme.ts # Theme detection
│   └── useThemeColor.ts  # Dynamic color theming
├── models/               # TypeScript interfaces and types
│   └── Task.ts           # Task data structure
├── services/             # Business logic layer
│   └── TaskService.ts    # Task operations and validation
└── assets/               # Static assets
    ├── images/           # App icons and images
    └── fonts/            # Custom fonts
```

## ⚙️ Configuration

### Environment Setup

The app uses Expo's managed workflow, which handles most configuration automatically. Key configuration files:

- **`app.json`** - Expo app configuration
- **`package.json`** - Dependencies and scripts
- **`tsconfig.json`** - TypeScript configuration
- **`eslint.config.js`** - Code linting rules

### Customizing Colors

You can customize the app's appearance by modifying `constants/Colors.ts`:

```typescript
export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: "#0a7ea4", // Primary accent color
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#0a7ea4",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: "#1DA1F2", // Primary accent color for dark mode
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#1DA1F2",
  },
};
```

## 🧪 Available Scripts

```bash
# Development
npm start                # Start Expo development server
npm run android         # Launch on Android emulator
npm run ios             # Launch on iOS simulator
npm run web             # Launch in web browser

# Code Quality
npm run lint            # Run ESLint code linting

# Project Management
npm run reset-project   # Reset to clean project state
```

## 📱 Supported Platforms

- **iOS** 13.0+
- **Android** API 21+ (Android 5.0+)
- **Web** (Limited functionality)

## 🔧 Troubleshooting

### Common Issues

**Metro bundler cache issues:**

```bash
npm start -- --clear
```

**iOS simulator not starting:**

```bash
npx expo run:ios
```

**Android emulator issues:**

```bash
npx expo run:android
```

**Dependency conflicts:**

```bash
npm install --legacy-peer-deps
```

### Getting Help

- Check the [Expo Documentation](https://docs.expo.dev/)
- Visit [React Native Documentation](https://reactnative.dev/docs/getting-started)
- Review the `BUG_FIXES.md` file for known issues and solutions

## 🏗 Architecture

This app follows clean architecture principles with clear separation of concerns:

- **Models**: Define data structures (`Task` interface)
- **Services**: Handle business logic (`TaskService`)
- **Hooks**: Manage state and side effects (`useTasks`)
- **Components**: Reusable UI elements
- **Screens**: Main application views

---

**Happy Task Managing! 🚀**
