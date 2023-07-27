/// <reference types="vitest" />
import { defineConfig } from "vite";

const inProduction = process.env["NODE_ENV"] == "production";
const testRootDirectory = inProduction ? "dist" : "src";
const testExtension = inProduction ? "js" : "ts";

export default defineConfig({
  test: {
    include: [`${testRootDirectory}/**/*.test.${testExtension}`],
    exclude: ["**/_*"],
    globals: true,
    setupFiles: ["testSetup.js"]
  }
});
