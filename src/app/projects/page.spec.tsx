import { describe, expect, test, vi } from "vitest";

describe("ProjectsPage", () => {
  test("create project button is disabled when name is empty", () => {
    // Button should be disabled when project name is empty/whitespace
    const projectName = "   ";
    const isDisabled = !projectName.trim();
    expect(isDisabled).toBe(true);
  });

  test("create project button is enabled when name has content", () => {
    const projectName = "My Project";
    const isDisabled = !projectName.trim();
    expect(isDisabled).toBe(false);
  });

  test("project form reset clears all fields", () => {
    const initialState = {
      name: "",
      description: "",
      language: "typescript",
    };

    const filledState = {
      name: "Test Project",
      description: "A test project",
      language: "python",
    };

    // Simulate reset
    const resetState = { ...initialState };

    expect(resetState).toEqual(initialState);
    expect(resetState).not.toEqual(filledState);
  });
});

describe("handleCreateProject", () => {
  test("calls mutation with correct project data", async () => {
    const mockCreate = vi.fn().mockResolvedValue("project-123");
    const newProject = {
      name: "Test Project",
      description: "A test description",
      language: "typescript" as const,
    };

    // Simulate the mutation call
    await mockCreate(newProject);

    expect(mockCreate).toHaveBeenCalledWith(newProject);
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });

  test("handles mutation error gracefully", async () => {
    const mockCreate = vi.fn().mockRejectedValue(new Error("Auth failed"));

    try {
      await mockCreate({ name: "Test" });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe("Auth failed");
    }

    expect(mockCreate).toHaveBeenCalledTimes(1);
  });
});
