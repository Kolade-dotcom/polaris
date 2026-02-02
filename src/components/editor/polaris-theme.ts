import { createTheme } from "@uiw/codemirror-themes";
import { tags } from "@lezer/highlight";

// Font stack with JetBrains Mono as primary
const jetbrainsMono = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

/**
 * Polaris Light Theme - Matches the site's warm, minimal aesthetic
 * Uses coral (#E07B53) as the accent color
 */
export const polarisLight = createTheme({
  theme: "light",
  settings: {
    background: "#FFFFFF",
    foreground: "#1C1917",
    caret: "#E07B53",
    selection: "rgba(224, 123, 83, 0.2)",
    selectionMatch: "rgba(224, 123, 83, 0.15)",
    lineHighlight: "rgba(245, 245, 244, 0.5)",
    gutterBackground: "#FAFAF9",
    gutterForeground: "#78716C",
    gutterActiveForeground: "#1C1917",
    fontFamily: jetbrainsMono,
  },
  styles: [
    { tag: tags.comment, color: "#A8A29E", fontStyle: "italic" },
    { tag: tags.keyword, color: "#0D9488", fontWeight: "600" },
    { tag: tags.operator, color: "#0D9488", fontWeight: "600" },
    { tag: tags.string, color: "#059669" },
    { tag: tags.number, color: "#E07B53" },
    { tag: tags.bool, color: "#E07B53", fontWeight: "600" },
    { tag: tags.null, color: "#E07B53", fontWeight: "600" },
    { tag: tags.variableName, color: "#1C1917" },
    { tag: tags.propertyName, color: "#7C3AED" },
    { tag: tags.function(tags.variableName), color: "#7C3AED" },
    { tag: tags.typeName, color: "#DC2626", fontWeight: "600" },
    { tag: tags.className, color: "#DC2626", fontWeight: "600" },
    { tag: tags.angleBracket, color: "#78716C" },
    { tag: tags.bracket, color: "#78716C" },
    { tag: tags.paren, color: "#78716C" },
    { tag: tags.brace, color: "#78716C" },
    { tag: tags.tagName, color: "#0D9488", fontWeight: "600" },
    { tag: tags.attributeName, color: "#7C3AED" },
    { tag: tags.attributeValue, color: "#059669" },
    { tag: tags.link, color: "#E07B53", textDecoration: "underline" },
    { tag: tags.heading, color: "#1C1917", fontWeight: "bold" },
    { tag: tags.emphasis, fontStyle: "italic" },
    { tag: tags.strong, fontWeight: "bold" },
    { tag: tags.invalid, color: "#DC2626", background: "rgba(220, 38, 38, 0.1)" },
  ],
});

/**
 * Polaris Dark Theme - Matches the site's dark mode
 * Uses coral (#E07B53) as the accent color
 */
export const polarisDark = createTheme({
  theme: "dark",
  settings: {
    background: "#1C1917",
    foreground: "#FAFAF9",
    caret: "#E07B53",
    selection: "rgba(224, 123, 83, 0.3)",
    selectionMatch: "rgba(224, 123, 83, 0.2)",
    lineHighlight: "rgba(41, 37, 36, 0.5)",
    gutterBackground: "#0C0A09",
    gutterForeground: "#A8A29E",
    gutterActiveForeground: "#FAFAF9",
    fontFamily: jetbrainsMono,
  },
  styles: [
    { tag: tags.comment, color: "#78716C", fontStyle: "italic" },
    { tag: tags.keyword, color: "#14B8A6", fontWeight: "600" },
    { tag: tags.operator, color: "#14B8A6", fontWeight: "600" },
    { tag: tags.string, color: "#34D399" },
    { tag: tags.number, color: "#E07B53" },
    { tag: tags.bool, color: "#E07B53", fontWeight: "600" },
    { tag: tags.null, color: "#E07B53", fontWeight: "600" },
    { tag: tags.variableName, color: "#FAFAF9" },
    { tag: tags.propertyName, color: "#A78BFA" },
    { tag: tags.function(tags.variableName), color: "#A78BFA" },
    { tag: tags.typeName, color: "#F87171", fontWeight: "600" },
    { tag: tags.className, color: "#F87171", fontWeight: "600" },
    { tag: tags.angleBracket, color: "#A8A29E" },
    { tag: tags.bracket, color: "#A8A29E" },
    { tag: tags.paren, color: "#A8A29E" },
    { tag: tags.brace, color: "#A8A29E" },
    { tag: tags.tagName, color: "#14B8A6", fontWeight: "600" },
    { tag: tags.attributeName, color: "#A78BFA" },
    { tag: tags.attributeValue, color: "#34D399" },
    { tag: tags.link, color: "#E07B53", textDecoration: "underline" },
    { tag: tags.heading, color: "#FAFAF9", fontWeight: "bold" },
    { tag: tags.emphasis, fontStyle: "italic" },
    { tag: tags.strong, fontWeight: "bold" },
    { tag: tags.invalid, color: "#F87171", background: "rgba(248, 113, 113, 0.1)" },
  ],
});

/**
 * One Dark Theme - Keep as alternative option
 */
export { oneDark } from "@codemirror/theme-one-dark";
