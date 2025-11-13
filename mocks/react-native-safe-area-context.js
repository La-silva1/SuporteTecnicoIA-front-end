// This is a mock for react-native-safe-area-context for web
// It prevents the "require is not defined" error by providing dummy exports.
import * as React from 'react'; // Need to import React for createContext

export const useSafeAreaFrame = () => ({ x: 0, y: 0, width: 0, height: 0 });
export const useSafeAreaInsets = () => ({ top: 0, bottom: 0, left: 0, right: 0 });
export const SafeAreaListener = {
  addEventListener: () => ({ remove: () => {} }),
  removeEventListener: () => {},
};
// Add other exports if needed by your app, e.g., SafeAreaProvider, SafeAreaView
export const SafeAreaProvider = ({ children }) => children;
export const SafeAreaView = ({ children }) => children;

// Added this line
export const SafeAreaInsetsContext = React.createContext({ top: 0, bottom: 0, left: 0, right: 0 });

export default {
  useSafeAreaFrame,
  useSafeAreaInsets,
  SafeAreaListener,
  SafeAreaProvider,
  SafeAreaView,
  SafeAreaInsetsContext, // Added this line
};
