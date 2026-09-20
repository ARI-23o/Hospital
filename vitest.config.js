import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    fileParallelism: false,
    testTimeout: 15000,
    setupFiles: ["./tests/setup.js"],
    include: ["tests/unit/**/*.test.{js,jsx}", "tests/integration/**/*.test.{js,jsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: [
        "server/src/**/*.js",
        "client/src/context/**/*.jsx",
        "client/src/translations/**/*.js",
        "client/src/data/**/*.js",
        "client/src/components/Footer.jsx",
        "client/src/components/MarqueeTicker.jsx",
        "client/src/components/KidneyHealthCalculator.jsx",
      ],
      exclude: [
        "node_modules/**",
        "client/dist/**",
        "server/data/**",
        "tests/**",
        "**/*.config.{js,cjs,mjs}",
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 60,
        statements: 70,
      },
    },
  },
  resolve: {
    alias: {
      react: path.resolve(import.meta.dirname, "./node_modules/react"),
      "react-dom": path.resolve(import.meta.dirname, "./node_modules/react-dom"),
      "framer-motion": path.resolve(import.meta.dirname, "./client/node_modules/framer-motion"),
      "@": path.resolve(import.meta.dirname, "./client/src"),
      "@server": path.resolve(import.meta.dirname, "./server/src"),
    },
  },
});
