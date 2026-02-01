import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// POST /api/suggestion - Get AI code suggestions
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { code, cursorPosition, line, language } = body;

    // TODO: Implement actual AI integration with Gemini 2.0 Flash
    // This would:
    // 1. Send the current code context to Gemini
    // 2. Get a completion suggestion
    // 3. Return the suggestion to the editor

    // For now, return a placeholder response
    const suggestions: Record<string, string[]> = {
      typescript: [
        " = useState()",
        " = useEffect(() => {}, [])",
        ".map((item) => ())",
        ".filter((item) => )",
        ".reduce((acc, curr) => acc + curr, 0)",
      ],
      javascript: [
        ".then((result) => {})",
        ".catch((error) => {})",
        ".forEach((item) => {})",
        "const ",
        "function ",
      ],
      python: [
        "def ",
        "if __name__ == '__main__':",
        ".append()",
        ".get()",
        "import ",
      ],
    };

    // Return a random suggestion for demo purposes
    const langSuggestions = suggestions[language] || suggestions.typescript;
    const randomSuggestion =
      langSuggestions[Math.floor(Math.random() * langSuggestions.length)];

    return NextResponse.json({
      suggestion: randomSuggestion,
      confidence: 0.85,
    });
  } catch (error) {
    console.error("Error generating suggestion:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
