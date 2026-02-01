import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock system time for consistent tests
vi.useFakeTimers({
  shouldAdvanceTime: true,
});
