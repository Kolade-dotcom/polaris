import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import { StateField, StateEffect, RangeSet } from "@codemirror/state";
import { Decoration, DecorationSet, WidgetType } from "@codemirror/view";

// Effect to set AI suggestions
export const setAISuggestion = StateEffect.define<{
  from: number;
  to: number;
  text: string;
} | null>();

// State field to track AI suggestions
export const aiSuggestionField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none;
  },
  update(suggestions, tr) {
    suggestions = suggestions.map(tr.changes);

    for (const effect of tr.effects) {
      if (effect.is(setAISuggestion)) {
        if (effect.value === null) {
          suggestions = Decoration.none;
        } else {
          const { from, to, text } = effect.value;
          const widget = new AISuggestionWidget(text);
          const decoration = Decoration.widget({
            widget,
            side: 1,
          }).range(to);
          suggestions = RangeSet.of([decoration]);
        }
      }
    }

    return suggestions;
  },
  provide: (f) => EditorView.decorations.from(f),
});

// Widget to display AI suggestion (ghost text)
class AISuggestionWidget extends WidgetType {
  constructor(private text: string) {
    super();
  }

  toDOM() {
    const span = document.createElement("span");
    span.className = "cm-ai-suggestion";
    span.textContent = this.text;
    span.style.cssText = `
      color: var(--muted-foreground);
      opacity: 0.6;
      pointer-events: none;
      user-select: none;
    `;
    return span;
  }

  eq(other: AISuggestionWidget) {
    return other.text === this.text;
  }
}

// Plugin to handle AI suggestions
export function aiSuggestionsPlugin() {
  return ViewPlugin.fromClass(
    class {
      private timeout: NodeJS.Timeout | null = null;

      constructor(private view: EditorView) {}

      update(update: ViewUpdate) {
        if (!update.docChanged) return;

        // Clear existing timeout
        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        // Debounce suggestion requests
        this.timeout = setTimeout(() => {
          this.requestSuggestion();
        }, 500);
      }

      private async requestSuggestion() {
        const state = this.view.state;
        const cursor = state.selection.main.head;
        const line = state.doc.lineAt(cursor);
        const lineText = line.text;
        const context = state.doc.toString();

        // Only request if at end of line and line is not empty
        if (cursor !== line.to || lineText.trim().length === 0) {
          this.clearSuggestion();
          return;
        }

        try {
          // Call the suggestion API
          const response = await fetch("/api/suggestion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              code: context,
              cursorPosition: cursor,
              line: lineText,
              language: "typescript",
            }),
          });

          if (!response.ok) return;

          const data = await response.json();

          if (data.suggestion) {
            this.view.dispatch({
              effects: setAISuggestion.of({
                from: cursor,
                to: cursor,
                text: data.suggestion,
              }),
            });
          }
        } catch (error) {
          console.error("Error fetching AI suggestion:", error);
        }
      }

      private clearSuggestion() {
        this.view.dispatch({
          effects: setAISuggestion.of(null),
        });
      }

      destroy() {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
      }
    }
  );
}

// Keymap to accept suggestions
import { keymap } from "@codemirror/view";

export const acceptSuggestionKeymap = keymap.of([
  {
    key: "Tab",
    run: (view) => {
      const suggestions = view.state.field(aiSuggestionField);
      let hasSuggestion = false;

      suggestions.between(
        view.state.selection.main.from,
        view.state.selection.main.to,
        () => {
          hasSuggestion = true;
          return false;
        }
      );

      if (hasSuggestion) {
        // Get the suggestion text from the widget
        // In a full implementation, we'd store the suggestion text
        // and insert it here
        view.dispatch({
          effects: setAISuggestion.of(null),
        });
        return true;
      }

      return false;
    },
  },
  {
    key: "Escape",
    run: (view) => {
      view.dispatch({
        effects: setAISuggestion.of(null),
      });
      return true;
    },
  },
]);

// Export complete extension
export function aiSuggestions() {
  return [aiSuggestionField, aiSuggestionsPlugin(), acceptSuggestionKeymap];
}
