# Polaris UI Design System - Claude-Inspired Minimalist IDE

## Design Philosophy

**Core Principles:**
- Clean, minimal, and uncluttered
- Illustration-based visual communication
- Warm, approachable color palette
- Subtle animations and micro-interactions
- Focus on content, reduce chrome
- Spacious layouts with breathing room
- Thoughtful typography hierarchy

**Inspiration:** Claude.ai's interface - soft colors, gentle gradients, minimalist icons, illustration elements

---

## Color System

### Primary Palette (Claude-Inspired)

```css
/* Warm Neutrals */
--background-primary: #FAFAF9;      /* Off-white, warm */
--background-secondary: #F5F4F2;    /* Slightly darker */
--background-tertiary: #EFEEED;     /* Sidebar, panels */

/* Text Colors */
--text-primary: #1F1F1F;            /* Near black, readable */
--text-secondary: #6B6B6B;          /* Medium gray */
--text-tertiary: #A3A3A3;           /* Light gray */

/* Accent Colors (Soft & Warm) */
--accent-primary: #E07B53;          /* Warm orange/coral */
--accent-secondary: #7B93DB;        /* Soft blue */
--accent-tertiary: #9B87C4;         /* Gentle purple */
--accent-success: #6EAA78;          /* Soft green */
--accent-warning: #E0A953;          /* Warm yellow */
--accent-error: #E06B6B;            /* Soft red */

/* AI-Specific Colors */
--ai-gradient-start: #E8D5C4;       /* Warm beige */
--ai-gradient-end: #D4C4E8;         /* Soft lavender */
--ai-glow: rgba(224, 123, 83, 0.1); /* Subtle orange glow */

/* Code Editor Theme (One Dark but Softer) */
--editor-background: #2B2D30;       /* Softer than pure black */
--editor-selection: rgba(224, 123, 83, 0.15);
--editor-line-number: #6B6B6B;
--editor-text: #E8E8E8;
```

### Semantic Colors

```css
/* Interactive States */
--hover-overlay: rgba(0, 0, 0, 0.04);
--active-overlay: rgba(0, 0, 0, 0.08);
--focus-ring: rgba(224, 123, 83, 0.3);

/* Borders & Dividers */
--border-subtle: #E8E8E8;
--border-medium: #D4D4D4;
--border-strong: #B8B8B8;

/* Shadows (Soft & Minimal) */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);
```

---

## Typography

### Font Stack

```css
/* Primary Font - Sans Serif */
--font-sans: 
  'Inter', 
  -apple-system, 
  BlinkMacSystemFont, 
  'Segoe UI', 
  sans-serif;

/* Monospace - Code */
--font-mono: 
  'JetBrains Mono', 
  'Fira Code', 
  'SF Mono', 
  Consolas, 
  monospace;

/* Optional - Headings */
--font-display: 
  'Cabinet Grotesk',
  'Inter',
  sans-serif;
```

### Type Scale (Fluid Typography)

```css
/* Headings */
--text-4xl: clamp(2rem, 5vw, 2.5rem);      /* 40px */
--text-3xl: clamp(1.75rem, 4vw, 2rem);     /* 32px */
--text-2xl: clamp(1.5rem, 3vw, 1.75rem);   /* 28px */
--text-xl: clamp(1.25rem, 2.5vw, 1.5rem);  /* 24px */
--text-lg: clamp(1.125rem, 2vw, 1.25rem);  /* 20px */

/* Body */
--text-base: 1rem;                          /* 16px */
--text-sm: 0.875rem;                        /* 14px */
--text-xs: 0.75rem;                         /* 12px */

/* Line Heights */
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

---

## Spacing System

```css
/* Based on 4px grid */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

---

## Component Design Specs

### 1. Landing Page

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│  [Logo] Polaris                    Sign In  Sign Up │ ← Minimal header
├─────────────────────────────────────────────────────┤
│                                                      │
│           ┌───────────────────────────┐             │
│           │  Soft gradient blob       │             │ ← Hero illustration
│           │  (AI brain/circuit)       │             │    (SVG, animated)
│           └───────────────────────────┘             │
│                                                      │
│        Code with Intelligence                       │ ← Large, serif headline
│        Built for Humans                             │
│                                                      │
│     [Start Building →]  [View Demo]                 │ ← Soft, rounded buttons
│                                                      │
│  ┌────────┐  ┌────────┐  ┌────────┐               │
│  │  Icon  │  │  Icon  │  │  Icon  │               │ ← Feature cards
│  │Feature │  │Feature │  │Feature │               │    with illustrations
│  └────────┘  └────────┘  └────────┘               │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Styling:**
- Background: Subtle gradient (warm beige to soft lavender)
- Hero illustration: Minimalist, line-based SVG with soft colors
- Generous whitespace (80px+ margins)
- Floating cards with soft shadows
- Gentle fade-in animations on scroll

---

### 2. Dashboard (Projects List)

**Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│  [☰] Polaris          Search...          [+] New Project  [👤]│
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Your Projects                                    [Grid|List] │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  🎨         │  │  ⚛️          │  │  📱         │         │
│  │             │  │             │  │             │         │
│  │ Portfolio   │  │ React App   │  │ Mobile UI   │         │
│  │ Website     │  │             │  │             │         │
│  │             │  │             │  │             │         │
│  │ 3 files     │  │ 12 files    │  │ 8 files     │         │
│  │ 2h ago      │  │ 1d ago      │  │ 3d ago      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│                                                               │
│  [Load More...]                                               │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

**Project Cards:**
```css
.project-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-subtle);
  transition: all 0.2s ease;
}

.project-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--accent-primary);
  transform: translateY(-2px);
}

/* Illustration placeholder */
.project-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--ai-gradient-start), var(--ai-gradient-end));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}
```

---

### 3. IDE Layout

**Main Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│ [Logo] Project Name    [⚙️ Settings] [👤]                      │ ← Header (50px)
├───┬────────────────────────────────────────────────┬───────────┤
│ F │ 📁 index.tsx              ×  📄 App.tsx    × │ 🤖 AI    │
│ i ├────────────────────────────────────────────────┤           │
│ l │                                                │   Chat    │
│ e │  1  import React from 'react'                 │           │
│ s │  2                                             │   [○○○]  │ ← AI avatar
│   │  3  export default function App() {           │           │
│ 📁│  4    return (                                 │   How can │
│ 📄│  5      <div className="app">                │   I help? │
│ 📄│  6        <h1>Hello World</h1>               │           │
│ 📂│  7      </div>                                │   ┌─────┐│
│   │  8    )                                       │   │Input││
│   │  9  }                                         │   └─────┘│
│   │                                                │   [Send] │
│   │                                                │          │
│   │  [↻ Cmd+K Quick Edit]                        │          │
├───┴────────────────────────────────────────────────┴──────────┤
│ ⚡ 0 errors   📊 Terminal   🔍 Search   ✨ AI Suggestions     │ ← Status bar
└────────────────────────────────────────────────────────────────┘
```

**Dimensions:**
- Sidebar: 240px (resizable 200-400px)
- AI Panel: 360px (resizable 300-600px)
- Editor: Flexible (remaining space)
- Header: 50px
- Status Bar: 32px

---

### 4. File Explorer

**Design:**
```
📁 Files
  ├─ 📂 src
  │   ├─ 📂 components
  │   │   ├─ 📄 Header.tsx
  │   │   └─ 📄 Footer.tsx
  │   ├─ 📂 pages
  │   │   └─ 📄 index.tsx
  │   └─ 📄 App.tsx
  ├─ 📂 public
  │   └─ 🖼️ logo.svg
  └─ 📄 package.json
```

**Styling:**
```css
.file-explorer {
  background: var(--background-tertiary);
  padding: var(--space-4);
  font-size: var(--text-sm);
}

.file-item {
  padding: var(--space-2) var(--space-3);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  transition: background 0.15s ease;
}

.file-item:hover {
  background: var(--hover-overlay);
}

.file-item.active {
  background: var(--accent-primary);
  color: white;
  font-weight: 500;
}

/* File icons - Minimalist, single color */
.file-icon {
  width: 16px;
  height: 16px;
  opacity: 0.7;
}
```

**File Icons (Minimalist):**
- JavaScript/TypeScript: `⬡` (hexagon, brand color)
- CSS: `🎨` (palette icon)
- HTML: `</>` (code brackets)
- JSON: `{ }` (curly braces)
- Markdown: `M↓` (stylized MD)
- Folder: `📁` (minimal folder outline)
- Image: `🖼️` (frame icon)

---

### 5. Code Editor Area

**Features:**
```
┌────────────────────────────────────────────┐
│ 📄 App.tsx                            × │ ← File tab
├────────────────────────────────────────────┤
│ 1  import React from 'react'              │ ← Line numbers (subtle)
│ 2                                          │
│ 3  export default function App() {        │
│ 4    return (                             │
│ 5      <div className="app">             │ ← Current line highlight
│ 6        <h1>Hello World</h1>            │    (very subtle)
│ 7      </div>                             │
│ 8    )  ← Add useState here              │ ← AI suggestion (ghost text)
│ 9  }                                      │    in italic, lighter color
│                                            │
│                                            │
│  [Cmd+K] Quick Edit                       │ ← Floating tooltip
└────────────────────────────────────────────┘
```

**Editor Styling:**
```css
.editor-container {
  background: var(--editor-background);
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.6;
  padding: var(--space-6);
}

/* Current line highlight - very subtle */
.cm-activeLine {
  background-color: rgba(255, 255, 255, 0.03);
}

/* Selection - uses accent color */
.cm-selectionBackground {
  background-color: rgba(224, 123, 83, 0.15) !important;
}

/* Line numbers - muted */
.cm-lineNumbers {
  color: var(--editor-line-number);
  padding-right: var(--space-4);
}

/* AI ghost text suggestion */
.cm-ai-suggestion {
  color: rgba(232, 232, 232, 0.5);
  font-style: italic;
}

/* Minimap - subtle, right side */
.cm-minimap {
  width: 80px;
  background: rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

### 6. AI Chat Panel

**Layout:**
```
┌──────────────────────────┐
│     🤖 AI Assistant      │ ← Panel header
├──────────────────────────┤
│                          │
│  [○○○] AI is typing...  │ ← AI avatar with pulse
│                          │
│  ┌────────────────────┐ │
│  │ How can I help you │ │ ← AI message bubble
│  │ write better code? │ │    (soft gradient bg)
│  └────────────────────┘ │
│                          │
│      ┌──────────────┐   │
│      │ Can you add  │   │ ← User message bubble
│      │ TypeScript?  │   │    (white bg)
│      └──────────────┘   │
│                          │
│  ┌────────────────────┐ │
│  │ Sure! Here's how:  │ │
│  │ ```typescript      │ │ ← Code blocks
│  │ interface Props {  │ │    in chat
│  │   name: string     │ │
│  │ }                  │ │
│  │ ```                │ │
│  │ [Apply to Editor]  │ │ ← Action button
│  └────────────────────┘ │
│                          │
├──────────────────────────┤
│ ┌────────────────────┐  │
│ │ Type a message...  │  │ ← Input area
│ └────────────────────┘  │
│         [Send →]         │
└──────────────────────────┘
```

**Styling:**
```css
.ai-panel {
  background: var(--background-primary);
  border-left: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* AI Avatar - Animated gradient blob */
.ai-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--ai-gradient-start), var(--ai-gradient-end));
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 var(--ai-glow); }
  50% { box-shadow: 0 0 0 8px transparent; }
}

/* AI Message Bubble */
.ai-message {
  background: linear-gradient(135deg, var(--ai-gradient-start), var(--ai-gradient-end));
  border-radius: 16px 16px 16px 4px;
  padding: var(--space-4);
  max-width: 80%;
  margin: var(--space-2) 0;
  box-shadow: var(--shadow-sm);
}

/* User Message Bubble */
.user-message {
  background: white;
  border: 1px solid var(--border-subtle);
  border-radius: 16px 16px 4px 16px;
  padding: var(--space-4);
  max-width: 80%;
  margin: var(--space-2) 0 var(--space-2) auto;
  box-shadow: var(--shadow-sm);
}

/* Code block in chat */
.message-code {
  background: var(--editor-background);
  border-radius: 8px;
  padding: var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  margin: var(--space-2) 0;
  overflow-x: auto;
}

/* Apply button - subtle, appears on hover */
.apply-code-btn {
  background: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  cursor: pointer;
  margin-top: var(--space-2);
  transition: all 0.2s ease;
}

.apply-code-btn:hover {
  background: #d06d43;
  box-shadow: var(--shadow-md);
}
```

---

### 7. Quick Edit Modal (Cmd+K)

**Design:**
```
        ┌─────────────────────────────────────────┐
        │                                         │
        │   ✨ Quick Edit                        │
        │                                         │
        │   ┌───────────────────────────────────┐│
        │   │ Add error handling...             ││ ← Input
        │   └───────────────────────────────────┘│
        │                                         │
        │   Selected Code:                        │
        │   ┌───────────────────────────────────┐│
        │   │ const data = await fetch(url)     ││ ← Preview
        │   └───────────────────────────────────┘│
        │                                         │
        │        [Cancel]  [Apply →]              │
        │                                         │
        └─────────────────────────────────────────┘
```

**Styling:**
```css
.quick-edit-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  background: white;
  border-radius: 20px;
  padding: var(--space-8);
  box-shadow: 
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0 20px 60px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.2s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translate(-50%, -48%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
}

.quick-edit-input {
  width: 100%;
  border: 2px solid var(--border-medium);
  border-radius: 12px;
  padding: var(--space-4);
  font-size: var(--text-base);
  transition: border-color 0.2s ease;
}

.quick-edit-input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--focus-ring);
}
```

---

### 8. Buttons & Interactive Elements

**Button Variants:**
```css
/* Primary - Accent color */
.btn-primary {
  background: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 12px;
  padding: var(--space-3) var(--space-6);
  font-weight: 500;
  font-size: var(--text-base);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #d06d43;
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

/* Secondary - Outline */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border-medium);
  border-radius: 12px;
  padding: var(--space-3) var(--space-6);
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: var(--hover-overlay);
}

/* Ghost - Minimal */
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: none;
  padding: var(--space-2) var(--space-4);
  border-radius: 8px;
  transition: all 0.15s ease;
}

.btn-ghost:hover {
  background: var(--hover-overlay);
  color: var(--text-primary);
}

/* Icon Button */
.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease;
}

.btn-icon:hover {
  background: var(--hover-overlay);
}
```

---

### 9. Illustrations & Icons

**Illustration Style:**
- Line-based, minimal
- Soft, rounded corners
- 2-3 colors max (from palette)
- Subtle gradients
- Geometric shapes (circles, rounded rectangles)
- Floating elements with soft shadows

**Icon System:**
```css
/* Use Lucide Icons with custom styling */
.icon {
  width: 20px;
  height: 20px;
  stroke-width: 1.5px;
  stroke: currentColor;
}

/* Icon with background */
.icon-badge {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--ai-gradient-start), var(--ai-gradient-end));
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**Example Illustrations:**

1. **Empty State (No Projects):**
```
       ┌─────────┐
       │  /\_/\  │   ← Simple cat illustration
       │ ( o.o ) │      (line-based, 2-color)
       │  > ^ <  │
       └─────────┘
    No projects yet
   Start creating!
```

2. **Loading State:**
```
    ● ● ●  ← Three dots bouncing
   (gradient colors, animated)
```

3. **AI Thinking:**
```
   ○ ○ ○
   (pulsing gradient circles)
```

---

### 10. Animations & Micro-interactions

**Loading Animations:**
```css
/* Skeleton loading */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--background-tertiary) 0%,
    var(--background-secondary) 50%,
    var(--background-tertiary) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Fade in elements */
.fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scale on hover */
.scale-hover {
  transition: transform 0.2s ease;
}

.scale-hover:hover {
  transform: scale(1.02);
}
```

**Interaction Feedback:**
```css
/* Button press effect */
.btn:active {
  transform: scale(0.98);
}

/* Ripple effect on click */
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: scale(0);
  pointer-events: none;
}

.ripple:active::after {
  animation: ripple 0.6s ease-out;
}
```

---

### 11. Status & Feedback Elements

**Toast Notifications:**
```css
.toast {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  background: white;
  border-radius: 12px;
  padding: var(--space-4) var(--space-6);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Success toast */
.toast.success {
  border-left: 4px solid var(--accent-success);
}

/* Error toast */
.toast.error {
  border-left: 4px solid var(--accent-error);
}
```

**Progress Indicators:**
```css
/* Circular progress */
.progress-ring {
  width: 40px;
  height: 40px;
}

.progress-ring-circle {
  stroke: var(--accent-primary);
  stroke-width: 3;
  fill: none;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
}

/* Linear progress bar */
.progress-bar {
  height: 4px;
  background: var(--background-tertiary);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  transition: width 0.3s ease;
}
```

---

### 12. Responsive Behavior

**Breakpoints:**
```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Mobile */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large Desktop */
--breakpoint-2xl: 1536px; /* Extra Large */
```

**Mobile Layout:**
```
┌──────────────────────┐
│ [☰] Polaris     [👤]│ ← Collapsed header
├──────────────────────┤
│                      │
│   Code Editor        │ ← Full width editor
│   (takes full space) │
│                      │
├──────────────────────┤
│ [📁] [🤖] [⚙️]      │ ← Bottom tab bar
└──────────────────────┘

Tap icons to switch between:
- 📁 Files (drawer from left)
- 🤖 AI Chat (drawer from right)
- ⚙️ Settings
```

---

## Component Library (shadcn/ui Customization)

**Custom Theme for shadcn/ui:**
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        border: "hsl(0 0% 89.8%)",
        input: "hsl(0 0% 89.8%)",
        ring: "hsl(24 100% 60% / 0.3)",
        background: "hsl(30 20% 98%)",
        foreground: "hsl(0 0% 12%)",
        primary: {
          DEFAULT: "hsl(17 76% 60%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(30 10% 94%)",
          foreground: "hsl(0 0% 12%)",
        },
        accent: {
          DEFAULT: "hsl(225 57% 68%)",
          foreground: "hsl(0 0% 100%)",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
    },
  },
}
```

---

## Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --background-primary: #FAFAF9;
  --background-secondary: #F5F4F2;
  --background-tertiary: #EFEEED;
  --text-primary: #1F1F1F;
  --text-secondary: #6B6B6B;
  --text-tertiary: #A3A3A3;
  --accent-primary: #E07B53;
  --accent-secondary: #7B93DB;
  --accent-tertiary: #9B87C4;
  
  /* Spacing */
  --space-unit: 4px;
  --space-xs: calc(var(--space-unit) * 1);
  --space-sm: calc(var(--space-unit) * 2);
  --space-md: calc(var(--space-unit) * 4);
  --space-lg: calc(var(--space-unit) * 6);
  --space-xl: calc(var(--space-unit) * 8);
  
  /* Typography */
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.08);
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
  
  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

---

## Accessibility Considerations

**Focus States:**
```css
/* Visible focus ring */
*:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Remove default focus for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}
```

**Minimum Touch Targets:**
```css
/* All interactive elements minimum 44x44px */
.btn, .link, .icon-btn {
  min-width: 44px;
  min-height: 44px;
}
```

**Color Contrast:**
- Text: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- Interactive elements: Minimum 3:1 ratio

**Screen Reader Support:**
```html
<!-- Semantic HTML -->
<nav aria-label="Main navigation">
  <button aria-label="Open file explorer">
    <FileIcon />
  </button>
</nav>

<!-- Status announcements -->
<div role="status" aria-live="polite">
  File saved successfully
</div>
```

---

## Final Design Checklist

**Visual Polish:**
- [ ] Consistent spacing (4px grid system)
- [ ] Soft shadows (not harsh)
- [ ] Rounded corners (8-16px)
- [ ] Subtle animations (<300ms)
- [ ] Warm, approachable colors
- [ ] Generous whitespace
- [ ] Minimal borders (light gray)

**UX Polish:**
- [ ] Hover states on all interactive elements
- [ ] Loading states for async actions
- [ ] Empty states with illustrations
- [ ] Error states with helpful messages
- [ ] Smooth transitions
- [ ] Keyboard navigation support
- [ ] Mobile-responsive layout

**Illustrations:**
- [ ] Line-based, minimal style
- [ ] 2-3 colors max
- [ ] Soft gradients
- [ ] Consistent stroke width (1.5-2px)
- [ ] Rounded shapes
- [ ] Floating/elevated feel

---

*Design inspired by Claude.ai's warm, minimal, and thoughtful interface*
