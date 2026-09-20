import { afterEach, beforeEach, describe, it } from "vitest";
import {
  cleanupTestDir,
  compareOutputs,
  createTestDir,
  setupFiles,
} from "./fixture-runner.js";

describe("rg options - Real Bash Comparison", () => {
  let testDir: string;

  beforeEach(async () => {
    testDir = await createTestDir();
  });

  afterEach(async () => {
    await cleanupTestDir(testDir);
  });

  it("supports explicit color control followed by an option terminator", async () => {
    const env = await setupFiles(testDir, {
      "input.ts": "const needle = true;\n",
    });

    await compareOutputs(
      env,
      testDir,
      "rg --line-number --heading --color never -- needle input.ts",
    );
  });

  it("allows a positional pattern to begin with a hyphen", async () => {
    const env = await setupFiles(testDir, {
      "input.txt": "-needle\nother\n",
    });

    await compareOutputs(env, testDir, "rg -- -needle input.txt");
  });
});
