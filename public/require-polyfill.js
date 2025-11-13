// public/require-polyfill.js
// This is a polyfill for the 'require' function in a browser environment.
// It's a workaround for modules that are not correctly transpiled by Webpack/Babel
// and still contain CommonJS 'require' calls.
// This should be loaded before any other application scripts.

if (typeof window.require === 'undefined') {
  window.require = function(moduleName) {
    console.warn(`Polyfilled 'require' called for module: ${moduleName}. This is a workaround for transpilation issues.`);

    if (moduleName === 'react-native-safe-area-context') {
      // Return the mock exports for react-native-safe-area-context
      // Import React if it's not globally available (e.g., if not loaded yet)
      const React = window.React || { createContext: (defaultValue) => ({ Provider: ({ children }) => children, Consumer: ({ children }) => children(defaultValue) }) };

      return {
        SafeAreaListener: {
          addEventListener: () => ({ remove: () => {} }),
          removeEventListener: () => {},
        },
        useSafeAreaFrame: () => ({ x: 0, y: 0, width: 0, height: 0 }),
        useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
        SafeAreaInsetsContext: React.createContext({ top: 0, bottom: 0, left: 0, right: 0 }),
        SafeAreaProvider: ({ children }) => children,
        SafeAreaView: ({ children }) => children,
      };
    }

    // Fallback for other modules: try to find them globally or throw an error
    if (typeof window[moduleName] !== 'undefined') {
      return window[moduleName];
    }

    console.error(`Polyfilled 'require' called for unknown module: ${moduleName}. This might indicate a missing dependency or a deeper transpilation issue.`);
    throw new Error(`Cannot find module '${moduleName}' via polyfilled 'require'`);
  };
}
