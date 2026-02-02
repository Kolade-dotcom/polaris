import { createTheme } from "@uiw/codemirror-themes";

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
  },
  styles: [
    { tag: ["comment", "lineComment", "blockComment"], color: "#A8A29E", fontStyle: "italic" },
    { tag: ["keyword", "operator", "operatorKeyword"], color: "#0D9488", fontWeight: "600" },
    { tag: ["definitionKeyword", "controlKeyword"], color: "#0D9488", fontWeight: "600" },
    { tag: ["string", "regexp", "character"], color: "#059669" },
    { tag: ["number", "float", "integer"], color: "#E07B53" },
    { tag: ["bool", "null", "atom"], color: "#E07B53", fontWeight: "600" },
    { tag: ["variableName", "name"], color: "#1C1917" },
    { tag: ["definition", "propertyName", "function"], color: "#7C3AED" },
    { tag: ["typeName", "className"], color: "#DC2626", fontWeight: "600" },
    { tag: ["angleBracket", "bracket", "brace", "paren"], color: "#78716C" },
    { tag: ["tagName", "labelName"], color: "#0D9488", fontWeight: "600" },
    { tag: ["attributeName", "property"], color: "#7C3AED" },
    { tag: ["attributeValue"], color: "#059669" },
    { tag: ["contentSeparator"], color: "#E7E5E4" },
    { tag: ["heading"], color: "#1C1917", fontWeight: "bold" },
    { tag: ["link"], color: "#E07B53", textDecoration: "underline" },
    { tag: ["emphasis"], fontStyle: "italic" },
    { tag: ["strong"], fontWeight: "bold" },
    { tag: ["strikethrough"], textDecoration: "line-through" },
    { tag: ["url"], color: "#E07B53", textDecoration: "underline" },
    { tag: ["invalid"], color: "#DC2626", background: "rgba(220, 38, 38, 0.1)" },
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
  },
  styles: [
    { tag: ["comment", "lineComment", "blockComment"], color: "#78716C", fontStyle: "italic" },
    { tag: ["keyword", "operator", "operatorKeyword"], color: "#14B8A6", fontWeight: "600" },
    { tag: ["definitionKeyword", "controlKeyword"], color: "#14B8A6", fontWeight: "600" },
    { tag: ["string", "regexp", "character"], color: "#34D399" },
    { tag: ["number", "float", "integer"], color: "#E07B53" },
    { tag: ["bool", "null", "atom"], color: "#E07B53", fontWeight: "600" },
    { tag: ["variableName", "name"], color: "#FAFAF9" },
    { tag: ["definition", "propertyName", "function"], color: "#A78BFA" },
    { tag: ["typeName", "className"], color: "#F87171", fontWeight: "600" },
    { tag: ["angleBracket", "bracket", "brace", "paren"], color: "#A8A29E" },
    { tag: ["tagName", "labelName"], color: "#14B8A6", fontWeight: "600" },
    { tag: ["attributeName", "property"], color: "#A78BFA" },
    { tag: ["attributeValue"], color: "#34D399" },
    { tag: ["contentSeparator"], color: "#292524" },
    { tag: ["heading"], color: "#FAFAF9", fontWeight: "bold" },
    { tag: ["link"], color: "#E07B53", textDecoration: "underline" },
    { tag: ["emphasis"], fontStyle: "italic" },
    { tag: ["strong"], fontWeight: "bold" },
    { tag: ["strikethrough"], textDecoration: "line-through" },
    { tag: ["url"], color: "#E07B53", textDecoration: "underline" },
    { tag: ["invalid"], color: "#F87171", background: "rgba(248, 113, 113, 0.1)" },
  ],
});

/**
 * One Dark Theme - Keep as alternative option
 */
export { oneDark } from "@codemirror/theme-one-dark";
