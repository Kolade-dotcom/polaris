# Polaris - Cloud IDE Project Plan

## Project Overview

**Project Name:** Polaris  
**Type:** Browser-based Cloud IDE (Cursor AI Alternative)  
**Description:** A fully-featured cloud IDE with real-time collaborative code editing, AI-powered assistance, in-browser code execution, and GitHub integration.

**Key Inspiration:** Cursor AI and Orchids

**Design System:** See separate `polaris_ui_design_system.md` for complete UI/UX specifications

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui, Radix UI

### Code Editor
- **Editor Engine:** CodeMirror 6
  - **Purpose:** Powerful, extensible code editor library for the web
  - **Why Used:** Provides the core editing experience with syntax highlighting, autocompletion, and code intelligence
  - **Key Features:**
    - Modular architecture with language-specific packages
    - Built-in support for multiple programming languages (JS, TS, Python, CSS, HTML, JSON, Markdown)
    - Custom extensions for AI suggestions (ghost text)
    - Minimap, code folding, bracket matching
    - Multi-cursor editing and selection
    - Theme support (One Dark theme)
    - State management for undo/redo
  - **Integration:** Custom extensions built on top for AI-powered features like inline suggestions and quick edits

### Backend & Database
- **Database:** Convex (Real-time database)
  - **Purpose:** Real-time backend platform with built-in database
  - **Why Used:** Handles real-time synchronization of files, projects, and conversations across users
  - **Key Features:** Automatic syncing, TypeScript-first, serverless functions, optimistic updates
  
- **Background Jobs:** Inngest
  - **Purpose:** Event-driven background job processing and workflow orchestration
  - **Why Used:** Handles long-running AI operations without blocking the UI
  - **Key Use Cases:**
    - Processing AI requests asynchronously (conversations, code generation)
    - Managing rate limits for AI API calls
    - Handling retries for failed operations
    - Running scheduled tasks (cleanup, maintenance)
    - Processing file operations in the background
    - Event-driven workflows (e.g., when a user creates a project, trigger setup tasks)
  - **Benefits:** Non-blocking UI, automatic retries, built-in observability, local development server
  
- **Authentication:** Clerk (with GitHub OAuth)

### AI Integration
- **Primary AI:** Claude Sonnet 4 (Anthropic API)
- **Alternative AI:** Gemini 2.0 Flash (Google AI - free tier option)
- **Web Scraping:** Firecrawl
  - **Purpose:** Web scraping API that converts websites into LLM-ready markdown
  - **Why Used:** Teaches the AI about external documentation and libraries in real-time
  - **Key Use Cases:**
    - Scraping official documentation (React, Next.js, etc.) when user needs help
    - Fetching latest library information for AI context
    - Converting web content into structured data for AI processing
    - Keeping AI knowledge current with latest docs
  - **Benefits:** Clean markdown output, handles JavaScript-heavy sites, respects robots.txt, caching support

### Code Execution & Terminal
- **Runtime:** WebContainer API
- **Terminal:** xterm.js

### Monitoring & Error Tracking
- **Error Tracking:** Sentry (with LLM monitoring)
- **Code Review:** CodeRabbit (AI-powered)

---

## Key Technologies Deep Dive

### Why Each Technology Was Chosen

#### **CodeMirror 6 - The Code Editor**
CodeMirror is the heart of the IDE experience. Unlike simple textarea elements or basic Monaco editor setups, CodeMirror 6 offers:

**What it does:**
- Provides the actual text editing interface where users write code
- Handles syntax highlighting for multiple languages
- Manages cursor position, selections, and text manipulation
- Provides extensibility for custom features

**How it's used in Polaris:**
1. **Base Editor:** Sets up the editing surface with line numbers, syntax highlighting
2. **Custom Extensions:** 
   - AI suggestion extension (ghost text that appears as you type)
   - Quick edit extension (Cmd+K modal overlay)
   - Selection tooltip extension (shows AI actions when text is selected)
3. **Language Support:** Dynamically loads language packages based on file type
4. **Theme System:** Applies One Dark theme for consistent appearance

**Example workflow:**
```
User types code → CodeMirror detects changes → 
Triggers AI suggestion → Extension shows ghost text → 
User accepts → CodeMirror updates document
```

---

#### **Inngest - Background Job Processing**
Inngest prevents the UI from freezing during heavy operations, especially AI calls.

**What it does:**
- Runs code outside the main request/response cycle
- Manages retries, failures, and timeouts automatically
- Provides event-driven architecture for complex workflows

**How it's used in Polaris:**
1. **AI Message Processing:**
   ```
   User sends message → Inngest job triggered → 
   Calls AI API (takes 3-10 seconds) → 
   Streams response back → Updates database
   ```
   Without Inngest: User waits, UI frozen
   With Inngest: User continues working, gets notified when ready

2. **File Operations:**
   - Bulk file imports from GitHub
   - Project template generation
   - Large file processing

3. **Rate Limiting:**
   - Queues AI requests to stay within API limits
   - Prevents overwhelming external services

**Example workflow:**
```
User clicks "Generate with AI" → 
Frontend sends event to Inngest → 
User immediately gets feedback "Processing..." → 
Inngest job runs AI generation (30 seconds) → 
Convex database updated → 
Frontend auto-updates with result
```

**Key benefit:** Non-blocking UI = better user experience

---

#### **Firecrawl - Documentation Scraping**
Firecrawl makes the AI "smarter" by feeding it current documentation.

**What it does:**
- Scrapes websites and converts them to clean markdown
- Handles JavaScript-heavy documentation sites
- Provides structured data that LLMs can understand

**How it's used in Polaris:**
1. **Context Enrichment:**
   ```
   User asks: "How do I use React Server Components?"
   → Firecrawl scrapes latest Next.js docs
   → AI gets current information (not just training data)
   → Provides accurate, up-to-date answer
   ```

2. **Library Documentation:**
   - User imports a library → Firecrawl fetches its docs
   - AI can now answer questions about that specific library
   - Keeps recommendations current with latest versions

3. **Caching Layer:**
   - Stores scraped content in Convex
   - Avoids re-scraping same documentation
   - Reduces API costs

**Example workflow:**
```
User: "Show me Tailwind CSS grid examples"
→ System checks: Do we have Tailwind docs?
→ If no: Firecrawl scrapes tailwindcss.com/docs/grid
→ Converts to markdown
→ Feeds to AI as context
→ AI generates accurate grid examples using latest syntax
```

**Why it matters:** AI training data has a cutoff date. Firecrawl brings in fresh information.

---

### Technology Integration Flow

Here's how these technologies work together:

```
┌─────────────────────────────────────────────────────────────┐
│                         USER ACTION                          │
│              (Types code, asks AI question)                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      CODEMIRROR 6                            │
│  • Captures keystrokes                                       │
│  • Shows ghost text (AI suggestions)                         │
│  • Handles Cmd+K modal                                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      NEXT.JS API ROUTE                       │
│  • Receives request                                          │
│  • Validates user session (Clerk)                            │
│  • Determines if background job needed                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
┌──────────────────┐        ┌──────────────────┐
│ QUICK OPERATION  │        │ HEAVY OPERATION  │
│ (Instant)        │        │ (Inngest)        │
└────────┬─────────┘        └────────┬─────────┘
         │                           │
         │                           ▼
         │                  ┌──────────────────┐
         │                  │ Background Job:  │
         │                  │ 1. Firecrawl     │
         │                  │    scrapes docs  │
         │                  │ 2. Calls AI API  │
         │                  │ 3. Processes     │
         │                  └────────┬─────────┘
         │                           │
         └──────────┬────────────────┘
                    ▼
         ┌─────────────────────┐
         │   CONVEX DATABASE   │
         │  • Stores result    │
         │  • Triggers update  │
         └──────────┬──────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │  REAL-TIME UPDATE   │
         │  • Frontend syncs   │
         │  • CodeMirror shows │
         │  • User sees result │
         └─────────────────────┘
```

---

### When Each Technology is Used

| User Action | Technologies Involved | Flow |
|------------|----------------------|------|
| **Types code** | CodeMirror → Next.js API → AI → CodeMirror | Real-time suggestions |
| **Asks AI question** | Next.js → Inngest → Firecrawl → AI → Convex | Background processing |
| **Selects code + Cmd+K** | CodeMirror → Next.js API → AI → CodeMirror | Quick edit modal |
| **Opens file** | Convex → Next.js → CodeMirror | Load from database |
| **Saves file** | CodeMirror → Next.js → Convex | Auto-save with debounce |
| **Needs documentation** | Firecrawl → Cache in Convex → AI context | Smart AI responses |

---

## Technology Decision Guide

### Can You Skip These Technologies?

#### ❌ **CodeMirror 6 - CANNOT SKIP**
**Verdict:** Absolutely essential - this IS the code editor.

**Alternatives:**
1. **Monaco Editor** (VSCode's editor)
   - Pros: More features, VSCode compatibility
   - Cons: Larger bundle size (3-4x bigger), harder to customize
   - When to use: If you need exact VSCode experience
   
2. **Ace Editor**
   - Pros: Lightweight, simple
   - Cons: Older architecture, less active development
   - When to use: Simple projects, minimal requirements
   
3. **Build Custom**
   - Pros: Full control
   - Cons: 6+ months of work, reinventing the wheel
   - When to use: Never (unless you have very unique requirements)

**Recommendation:** Stick with CodeMirror 6 - it's the best balance of features, performance, and extensibility.

---

#### ⚠️ **Inngest - HIGHLY RECOMMENDED**

**Can you skip it?** Yes, but with significant tradeoffs.

**If you skip Inngest:**
- AI responses will block the UI (3-30 second freeze)
- No automatic retries on failures
- Manual queue management for rate limits
- Complex error handling
- Poor user experience

**Alternatives:**
1. **Vercel Background Functions**
   - Pros: Built into Vercel
   - Cons: Limited retries, less monitoring
   - Cost: Free tier available
   
2. **BullMQ + Redis**
   - Pros: Full control, self-hosted
   - Cons: More setup, need Redis server
   - Cost: Free (self-hosted)
   
3. **AWS Lambda + SQS**
   - Pros: Scalable, reliable
   - Cons: Complex setup, AWS lock-in
   - Cost: Pay per use
   
4. **Do Nothing (Direct API Calls)**
   - Pros: Simple, no extra service
   - Cons: UI freezes, no retries, bad UX
   - Cost: Free

**Recommendation:** Use Inngest. The free tier is generous (50k step runs/month), and it dramatically improves UX.

**Inngest Free Tier:**
- 50,000 step runs per month
- Unlimited functions
- Local development
- Basic monitoring

---

#### 💡 **Firecrawl - OPTIONAL BUT VALUABLE**

**Can you skip it?** Yes, and many projects do.

**If you skip Firecrawl:**
- AI will rely only on training data (outdated)
- Manual documentation pasting needed
- Less accurate suggestions for new frameworks
- Users must provide context themselves

**Alternatives:**
1. **Manual Context Injection**
   - Let users paste documentation
   - Pros: Free, simple
   - Cons: Manual work, poor UX
   
2. **Puppeteer/Playwright**
   - Scrape yourself
   - Pros: Full control, free
   - Cons: Complex setup, maintenance burden
   
3. **Static Documentation Bundles**
   - Pre-package common docs
   - Pros: Fast, reliable
   - Cons: Gets outdated, limited coverage
   
4. **RAG with Vector DB**
   - Use Pinecone/Weaviate for docs
   - Pros: Powerful search
   - Cons: Complex, additional cost

**Recommendation:** Start without Firecrawl. Add it later if AI quality is insufficient.

**Firecrawl Pricing:**
- Free: 500 credits/month (~500 pages)
- Starter: $16/month (3,000 credits)
- Standard: $79/month (20,000 credits)

---

### Cost Breakdown (Monthly)

**Minimum Viable Product:**
```
Clerk (Auth): Free (10,000 MAU)
Convex (DB): Free (1GB storage, unlimited dev)
Inngest (Jobs): Free (50k steps/month)
Anthropic API: ~$20-50 (Claude Sonnet 4)
  or Google AI: Free (Gemini 2.0 Flash)
Firecrawl: SKIP initially
Sentry: Free (5k events/month)
Hosting (Vercel): Free

TOTAL: $0-50/month (depending on AI usage)
```

**Production with Scale:**
```
Clerk: $25/month (Pro plan)
Convex: $25/month (Production plan)
Inngest: Free or $20/month (Starter)
Anthropic API: $100-500/month
Firecrawl: $16-79/month
Sentry: $29/month (Team plan)
Hosting: $20/month (Vercel Pro)

TOTAL: $215-675/month
```

---

### Development Time Impact

**With All Technologies:**
- Setup: 2-3 days
- Learning curve: 1-2 weeks
- Development: 8-12 weeks
- **Total:** 10-14 weeks

**Without Inngest:**
- Must build custom job queue
- **Adds:** 2-3 weeks

**Without Firecrawl:**
- Limited AI context
- **Saves:** 3-4 days setup
- **Costs:** Degraded AI quality

**Without CodeMirror (custom editor):**
- Build from scratch
- **Adds:** 6+ months (not recommended)

---

### When to Use Each Technology

#### Use **Inngest** when:
- ✅ AI operations take >2 seconds
- ✅ Building production app (not prototype)
- ✅ Need reliable background processing
- ✅ Want easy monitoring/debugging
- ❌ Skip only for: Quick MVPs, pure client-side apps

#### Use **Firecrawl** when:
- ✅ AI quality is critical
- ✅ Working with rapidly changing frameworks
- ✅ Users need help with external libraries
- ✅ Budget allows ($16+/month)
- ❌ Skip if: Tight budget, AI works well enough, niche languages

#### Use **CodeMirror** when:
- ✅ Building any code editor (always)
- ❌ Never skip this - it's the core editor

---

## Development Phases

### **PART 1: Foundation & Core Features (Chapters 1-12)**

#### **Phase 1: Foundation & Sponsor Technologies**

##### Chapter 1: Project Setup, UI Library & Theme
- Initialize Next.js 16 project with TypeScript
- Configure Tailwind CSS 4
- Set up shadcn/ui component library
- Implement One Dark theme
- Configure project structure and routing

##### Chapter 2: Clerk Authentication & Protected Routes
- Integrate Clerk authentication
- Set up GitHub OAuth provider
- Implement protected routes and middleware
- Create authentication UI (sign-in/sign-up)
- Configure session management

##### Chapter 3: Convex Database & Real-time Setup
- Initialize Convex project
- Define database schema (projects, files, conversations)
- Set up real-time subscriptions
- Create basic CRUD operations
- Configure Convex deployment

##### Chapter 4: Inngest - Background Jobs & Non-Blocking UI
- Set up Inngest client and dev server
- Create background job workflows
- Implement non-blocking operations for heavy tasks
- Configure event-driven architecture
- Set up job monitoring and retries

##### Chapter 5: Firecrawl - Teaching AI with Live Documentation
- Integrate Firecrawl API
- Implement documentation scraping functionality
- Create context enrichment for AI
- Set up caching for scraped content
- Build documentation search functionality

##### Chapter 6: Sentry - Error Tracking & LLM Monitoring
- Set up Sentry SDK
- Configure error boundaries
- Implement LLM call monitoring
- Set up performance tracking
- Create custom error alerts

##### Chapter 7: Projects Dashboard & Landing Page
- Build landing page with feature showcase
- Create projects dashboard
- Implement project listing and search
- Add project creation flow
- Design responsive layouts

---

#### **Phase 2: File System & Editor**

##### Chapter 8: Project IDE Layout & Resizable Panes
- Build split-pane layout system
- Implement resizable panels
- Create sidebar navigation
- Design responsive IDE layout
- Add keyboard shortcuts for navigation

##### Chapter 9: File Explorer - Full Implementation
- Build hierarchical file tree
- Implement file/folder CRUD operations
- Add VSCode-style file icons
- Create context menus (right-click)
- Implement drag-and-drop functionality
- Add file search/filtering

##### Chapter 10: Code Editor & State Management
- Integrate CodeMirror 6
- Configure syntax highlighting for multiple languages:
  - JavaScript, TypeScript
  - CSS, HTML
  - JSON, Markdown
  - Python
- Implement code folding
- Add line numbers and minimap
- Create tab-based file navigation
- Implement auto-save with debouncing
- Set up optimistic UI updates
- Create editor state management

---

#### **Phase 3: AI Features (Partial - Conversation System Only)**

##### Chapter 11: AI Suggestions & Quick Edit
- Implement AI-powered code suggestions
- Create ghost text preview for suggestions
- Build Cmd+K quick edit modal
- Add selection tooltip for quick actions
- Integrate with AI provider (Claude/Gemini)
- Create suggestion acceptance/rejection logic

##### Chapter 12: Conversation System
- Build AI conversation sidebar
- Implement message history
- Create conversation UI components
- Add markdown rendering for AI responses
- Implement streaming responses
- Create conversation persistence
- Add code block syntax highlighting in chat

---

### **PART 2: Advanced Features (Chapters 13-16) - Coming Soon**

#### **Phase 4: AI Agent & Tools**

##### Chapter 13: AI Agent & Tools (AgentKit, file management tools)
- Implement AI agent with file modification capabilities
- Create AgentKit integration
- Build file management tools for AI
- Implement tool calling architecture
- Add message cancellation functionality
- Create past conversations dialog
- Implement conversation management

---

#### **Phase 5: Code Execution & Preview**

##### Chapter 14: WebContainer, Terminal & Preview
- Integrate WebContainer API
- Set up in-browser Node.js runtime
- Implement terminal with xterm.js
- Create live preview pane
- Build process management (start/stop)
- Add console output capture
- Implement hot reload functionality

---

#### **Phase 6: GitHub Integration**

##### Chapter 15: GitHub Import & Export
- Implement GitHub OAuth integration
- Create repository import functionality
- Build export to GitHub feature
- Add commit and push capabilities
- Implement branch management
- Create pull request integration

---

#### **Phase 7: Final Features & Polish**

##### Chapter 16: AI Project Creation & Final Polish
- Build AI-powered project generation
- Create project templates
- Implement one-click deploy
- Add settings and preferences
- Final UI/UX improvements
- Performance optimization
- Documentation completion

---

## Feature Breakdown

### Core Editor Features
- [x] Syntax highlighting (JS, TS, CSS, HTML, JSON, MD, Python)
- [x] Line numbers and code folding
- [x] Minimap overview
- [x] Bracket matching and indentation guides
- [x] Multi-cursor editing
- [x] Tab-based navigation
- [x] Auto-save with debouncing

### AI Features (Part 1)
- [x] Real-time code suggestions with ghost text
- [x] Quick edit with Cmd+K
- [x] Selection tooltip for quick actions
- [x] Conversation sidebar
- [x] Message history
- [ ] AI agent file modifications (Part 2)
- [ ] Message cancellation (Part 2)
- [ ] Past conversations dialog (Part 2)

### File Management
- [x] File explorer with folder hierarchy
- [x] Create, rename, delete files/folders
- [x] VSCode-style file icons
- [x] Context menus
- [x] Optimistic UI updates

### Real-time Features
- [x] Convex-powered instant updates
- [x] Background job processing
- [x] Multi-user collaboration ready

### Execution & Preview (Part 2)
- [ ] WebContainer integration
- [ ] Terminal emulation
- [ ] Live code preview
- [ ] Process management
- [ ] Console output

### GitHub Integration (Part 2)
- [ ] Repository import
- [ ] Export to GitHub
- [ ] Commit/push
- [ ] Branch management
- [ ] Pull request creation

---

## Environment Variables Required

```bash
# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database
NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOYMENT=
POLARIS_CONVEX_INTERNAL_KEY=  # Generate random string

# AI Provider (choose one)
ANTHROPIC_API_KEY=  # Claude Sonnet 4 (preferred)
GOOGLE_GENERATIVE_AI_API_KEY=  # Gemini 2.0 Flash (free)

# Optional Services
FIRECRAWL_API_KEY=  # Web scraping
SENTRY_DSN=  # Error tracking
```

---

## Project Structure

```
polaris/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── messages/      # Conversation API
│   │   │   ├── suggestion/    # AI suggestions
│   │   │   └── quick-edit/    # Cmd+K editing
│   │   ├── projects/          # Project pages
│   │   └── (auth)/            # Auth routes
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   └── ai-elements/      # AI conversation UI
│   ├── features/
│   │   ├── auth/             # Authentication logic
│   │   ├── conversations/    # AI chat system
│   │   ├── editor/           # CodeMirror setup
│   │   │   └── extensions/   # Custom extensions
│   │   ├── preview/          # WebContainer (Part 2)
│   │   └── projects/         # Project management
│   ├── inngest/              # Inngest functions
│   └── lib/                  # Utilities
│
├── convex/
│   ├── schema.ts             # Database schema
│   ├── projects.ts           # Project operations
│   ├── files.ts              # File operations
│   ├── conversations.ts      # Conversation operations
│   └── system.ts             # Internal API
│
├── public/                    # Static assets
└── [config files]
```

---

## Database Schema (Convex)

### Projects Table
- `id` - string
- `name` - string
- `description` - string (optional)
- `userId` - string (Clerk user ID)
- `createdAt` - timestamp
- `updatedAt` - timestamp

### Files Table
- `id` - string
- `projectId` - string (foreign key)
- `name` - string
- `path` - string
- `content` - string
- `language` - string
- `isFolder` - boolean
- `parentId` - string (optional, for nested files)
- `createdAt` - timestamp
- `updatedAt` - timestamp

### Conversations Table
- `id` - string
- `projectId` - string (foreign key)
- `messages` - array of message objects
- `createdAt` - timestamp
- `updatedAt` - timestamp

### Messages Structure
```typescript
{
  role: 'user' | 'assistant',
  content: string,
  timestamp: number,
  metadata?: {
    suggestedCode?: string,
    fileContext?: string
  }
}
```

---

## API Routes

### `/api/messages`
- POST - Create new AI conversation message
- Handles streaming responses
- Integrates with Claude/Gemini

### `/api/suggestion`
- POST - Get AI code suggestions
- Returns suggested code changes
- Supports context-aware suggestions

### `/api/quick-edit`
- POST - Handle Cmd+K quick edits
- Takes selected code + instruction
- Returns modified code

---

## Key Dependencies

```json
{
  "dependencies": {
    "next": "16.x",
    "react": "19.x",
    "typescript": "^5.x",
    "@clerk/nextjs": "latest",
    "convex": "latest",
    "inngest": "latest",
    "@codemirror/state": "^6.x",
    "@codemirror/view": "^6.x",
    "@codemirror/lang-javascript": "^6.x",
    "@codemirror/lang-css": "^6.x",
    "@codemirror/lang-html": "^6.x",
    "@codemirror/lang-json": "^6.x",
    "@codemirror/lang-markdown": "^6.x",
    "@codemirror/lang-python": "^6.x",
    "@radix-ui/react-*": "latest",
    "tailwindcss": "4.x",
    "@sentry/nextjs": "latest",
    "xterm": "latest (Part 2)",
    "@webcontainer/api": "latest (Part 2)"
  }
}
```

---

## Development Workflow

### 1. Initial Setup
```bash
# Clone repository
git clone [your-repo-url]
cd polaris

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys
```

### 2. Development Servers
```bash
# Terminal 1: Convex dev server
npx convex dev

# Terminal 2: Next.js dev server
npm run dev

# Terminal 3: Inngest dev server
npx inngest-cli@latest dev
```

### 3. Build & Deploy
```bash
# Build for production
npm run build

# Start production server
npm run start
```

---

## Deployment Considerations

### Hosting Options
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Render**

### Database
- Convex (handles hosting automatically)

### Background Jobs
- Inngest Cloud (free tier available)

### Domain & DNS
- Configure custom domain
- Set up SSL/TLS certificates
- Configure environment variables in hosting platform

---

## Testing Strategy

### Unit Tests
- Component testing with React Testing Library
- Utility function tests with Jest
- CodeMirror extension tests

### Integration Tests
- API route testing
- Database operation tests
- AI provider integration tests

### E2E Tests
- File operations workflow
- AI conversation flow
- Code editing scenarios

---

## Performance Optimization

### Code Splitting
- Route-based code splitting (Next.js automatic)
- Dynamic imports for heavy components
- Lazy loading for CodeMirror extensions

### Caching
- Static asset caching
- API response caching
- CodeMirror state caching

### Real-time Optimization
- Debounced auto-save (reduce database writes)
- Optimistic UI updates
- WebSocket connection management

---

## Security Considerations

### Authentication
- Clerk session management
- Protected API routes
- CSRF protection

### Data Protection
- Environment variable security
- API key rotation
- User data isolation in Convex

### AI Safety
- Prompt injection prevention
- Rate limiting on AI calls
- Content filtering

---

## Future Enhancements (Post-Tutorial)

- [ ] Multi-language support
- [ ] Themes customization
- [ ] Extensions marketplace
- [ ] Advanced debugging tools
- [ ] Mobile app version
- [ ] Real-time collaboration (multi-cursor)
- [ ] AI model selection
- [ ] Custom AI prompts
- [ ] Project templates library
- [ ] Cloud storage integration (S3, etc.)

---

## Resources & Links

- **Tutorial:** [YouTube - Build Cursor AI Alternative](https://youtu.be/Xf9rHPNBMyQ)
- **Repository:** [github.com/code-with-antonio/polaris](https://github.com/code-with-antonio/polaris)
- **Live Demo:** [polaris-enra-doo.vercel.app](https://polaris-enra-doo.vercel.app)

### Service Documentation
- [Clerk Docs](https://clerk.com/docs)
- [Convex Docs](https://docs.convex.dev)
- [Inngest Docs](https://www.inngest.com/docs)
- [CodeMirror Docs](https://codemirror.net/docs/)
- [shadcn/ui](https://ui.shadcn.com)
- [Anthropic API](https://docs.anthropic.com)
- [Google AI Studio](https://aistudio.google.com)

---

## Quick Start Implementation Guide

### Step-by-Step Setup for Each Technology

#### 1. CodeMirror Setup (30 minutes)

```bash
# Install core packages
npm install @codemirror/state @codemirror/view @codemirror/commands

# Install language support
npm install @codemirror/lang-javascript @codemirror/lang-css \
  @codemirror/lang-html @codemirror/lang-json @codemirror/lang-markdown

# Install extensions
npm install @codemirror/autocomplete @codemirror/lint \
  @codemirror/search @codemirror/fold
```

**Basic Implementation:**
```typescript
// src/features/editor/CodeEditor.tsx
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';

const editor = new EditorView({
  extensions: [
    basicSetup,
    javascript(),
    // Add custom extensions here
  ],
  parent: document.getElementById('editor')
});
```

**Custom Extension Example (Ghost Text for AI):**
```typescript
// src/features/editor/extensions/ai-suggestions.ts
import { StateField, StateEffect } from '@codemirror/state';
import { Decoration, DecorationSet, EditorView } from '@codemirror/view';

export const showSuggestion = StateEffect.define<string>();

export const aiSuggestionsField = StateField.define<DecorationSet>({
  create() { return Decoration.none; },
  update(decorations, tr) {
    for (let e of tr.effects) {
      if (e.is(showSuggestion)) {
        // Create ghost text decoration
        const deco = Decoration.widget({
          widget: new GhostTextWidget(e.value),
          side: 1
        });
        return Decoration.set([deco.range(tr.state.selection.main.head)]);
      }
    }
    return decorations;
  },
  provide: f => EditorView.decorations.from(f)
});
```

---

#### 2. Inngest Setup (20 minutes)

```bash
# Install Inngest
npm install inngest
```

**Create Inngest Client:**
```typescript
// src/inngest/client.ts
import { Inngest } from 'inngest';

export const inngest = new Inngest({ 
  id: 'polaris',
  eventKey: process.env.INNGEST_EVENT_KEY 
});
```

**Create Background Function:**
```typescript
// src/inngest/functions/process-ai-message.ts
import { inngest } from '../client';

export const processAIMessage = inngest.createFunction(
  { id: 'process-ai-message' },
  { event: 'ai/message.created' },
  async ({ event, step }) => {
    // Step 1: Get message from database
    const message = await step.run('fetch-message', async () => {
      return await convex.query('getConversation', { id: event.data.conversationId });
    });

    // Step 2: Call AI API
    const response = await step.run('call-ai', async () => {
      return await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        messages: [{ role: 'user', content: message.content }],
        max_tokens: 4096,
      });
    });

    // Step 3: Save response
    await step.run('save-response', async () => {
      return await convex.mutation('addMessage', {
        conversationId: event.data.conversationId,
        role: 'assistant',
        content: response.content[0].text,
      });
    });

    return { success: true };
  }
);
```

**API Route to Trigger:**
```typescript
// src/app/api/messages/route.ts
import { inngest } from '@/inngest/client';

export async function POST(req: Request) {
  const { conversationId, message } = await req.json();
  
  // Send event to Inngest (non-blocking)
  await inngest.send({
    name: 'ai/message.created',
    data: { conversationId, message }
  });

  // Immediately return to user
  return Response.json({ status: 'processing' });
}
```

**Local Development:**
```bash
# Terminal 1: Run Inngest dev server
npx inngest-cli@latest dev

# Terminal 2: Run your Next.js app
npm run dev
```

---

#### 3. Firecrawl Setup (15 minutes)

```bash
# Install Firecrawl SDK
npm install @mendable/firecrawl-js
```

**Basic Implementation:**
```typescript
// src/lib/firecrawl.ts
import FirecrawlApp from '@mendable/firecrawl-js';

export const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY
});

export async function scrapeDocumentation(url: string) {
  try {
    const result = await firecrawl.scrapeUrl(url, {
      formats: ['markdown'],
      onlyMainContent: true
    });
    
    return result.markdown;
  } catch (error) {
    console.error('Firecrawl error:', error);
    return null;
  }
}
```

**Integration with AI:**
```typescript
// src/app/api/messages/route.ts
import { scrapeDocumentation } from '@/lib/firecrawl';

export async function POST(req: Request) {
  const { message } = await req.json();
  
  // Check if message mentions a framework
  const needsDocs = detectFrameworkMention(message); // e.g., "Next.js"
  
  let context = '';
  if (needsDocs) {
    // Scrape relevant docs
    context = await scrapeDocumentation('https://nextjs.org/docs');
  }
  
  // Send to AI with context
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    system: context ? `Here is documentation context:\n\n${context}` : '',
    messages: [{ role: 'user', content: message }],
  });
  
  return Response.json(response);
}
```

**Caching Strategy:**
```typescript
// src/lib/documentation-cache.ts
const cache = new Map<string, { markdown: string, timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function getCachedDocs(url: string) {
  const cached = cache.get(url);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.markdown;
  }
  
  const markdown = await scrapeDocumentation(url);
  cache.set(url, { markdown, timestamp: Date.now() });
  
  return markdown;
}
```

---

### Integration Testing Checklist

**CodeMirror:**
- [ ] Editor loads with syntax highlighting
- [ ] Can type and edit code
- [ ] Line numbers appear
- [ ] Syntax highlighting works for JS/TS/CSS/HTML
- [ ] Custom extensions load (ghost text, tooltips)
- [ ] Tab key indents properly
- [ ] Undo/redo works

**Inngest:**
- [ ] Local dev server starts (`npx inngest-cli dev`)
- [ ] Functions appear in Inngest dashboard
- [ ] Can trigger events from API routes
- [ ] Functions execute successfully
- [ ] Retries work on failure
- [ ] Can view function logs

**Firecrawl:**
- [ ] API key is valid
- [ ] Can scrape a simple webpage
- [ ] Markdown output is clean
- [ ] Handles errors gracefully
- [ ] Caching works (check logs)
- [ ] Respects rate limits

---

### Common Setup Issues & Solutions

#### CodeMirror Issues

**Problem:** "Module not found: @codemirror/lang-javascript"
```bash
# Solution: Install language packages
npm install @codemirror/lang-javascript @codemirror/lang-typescript
```

**Problem:** Editor is blank/not rendering
```typescript
// Solution: Ensure parent element has height
<div id="editor" style={{ height: '100vh' }}></div>
```

**Problem:** Syntax highlighting not working
```typescript
// Solution: Import and add language extension
import { javascript } from '@codemirror/lang-javascript';

extensions: [
  basicSetup,
  javascript({ jsx: true, typescript: true })
]
```

---

#### Inngest Issues

**Problem:** "Cannot connect to Inngest dev server"
```bash
# Solution: Start dev server first
npx inngest-cli@latest dev

# Then start Next.js in another terminal
npm run dev
```

**Problem:** Functions not appearing in dashboard
```typescript
// Solution: Make sure to export and register functions
// src/inngest/index.ts
export { processAIMessage } from './functions/process-ai-message';

// src/app/api/inngest/route.ts
import { serve } from 'inngest/next';
import { inngest } from '@/inngest/client';
import * as functions from '@/inngest';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: Object.values(functions),
});
```

**Problem:** "Event not triggering function"
```typescript
// Solution: Check event name matches exactly
await inngest.send({
  name: 'ai/message.created', // Must match function trigger
  data: { ... }
});
```

---

#### Firecrawl Issues

**Problem:** "403 Forbidden" or "API key invalid"
```bash
# Solution: Check API key in .env.local
FIRECRAWL_API_KEY=fc-your-actual-key-here
```

**Problem:** Scraping fails for certain sites
```typescript
// Solution: Some sites block scrapers, use waitFor option
const result = await firecrawl.scrapeUrl(url, {
  formats: ['markdown'],
  waitFor: 2000 // Wait 2 seconds for JS to load
});
```

**Problem:** Running out of credits quickly
```typescript
// Solution: Implement caching
// Cache docs for 24 hours to reduce API calls
const CACHE_DURATION = 24 * 60 * 60 * 1000;
```

---

### Performance Benchmarks

**Expected Performance:**

**CodeMirror:**
- Initial load: <100ms
- Syntax highlighting: <50ms per keystroke
- File switching: <200ms
- Large files (10k+ lines): May slow down (use virtualization)

**Inngest:**
- Event send: <10ms (non-blocking)
- Function execution: Depends on AI API (3-30 seconds)
- Retry delay: Exponential backoff (1s, 2s, 4s, etc.)

**Firecrawl:**
- Simple page: 2-5 seconds
- Heavy JS site: 5-15 seconds
- Documentation site: 10-30 seconds
- With caching: <100ms

---

## Notes

- This is Part 1 (Chapters 1-12) - functional but incomplete
- Part 2 will add AI Agent, WebContainer, and GitHub integration
- Focus on learning the architecture and patterns
- Customize design/styling as needed
- The codebase is production-ready for Part 1 features

---

## Success Metrics

- Working code editor with syntax highlighting
- Functional AI suggestions and quick edit
- Real-time file synchronization
- Conversation system with message history
- Responsive and intuitive UI
- Proper error handling and monitoring

---

## Timeline Estimate

**Part 1 (Chapters 1-12):** 6-8 weeks for experienced developers  
**Part 2 (Chapters 13-16):** 4-6 weeks additional

**Total:** ~3-4 months for full implementation (part-time)

---

*Last Updated: February 2026*
