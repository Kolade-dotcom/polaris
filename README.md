# Polaris Cloud IDE

A browser-based Cloud IDE with AI-powered coding assistance. Built with Next.js 16, React 19, TypeScript, and a modern tech stack.

![Polaris IDE](./public/screenshot.png)

## Features

- **AI-Powered Coding** - Intelligent code suggestions and chat powered by Gemini 2.0 Flash
- **Real-time Collaboration** - Work together with your team using Convex real-time database
- **Modern Editor** - CodeMirror 6 powered editor with syntax highlighting and IntelliSense
- **File Explorer** - Complete file management with folders, drag-and-drop, and context menus
- **Git Integration** - Built-in Git support with visual diff and branch management
- **Project Templates** - Start quickly with pre-configured templates

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- **Editor**: CodeMirror 6 with custom extensions
- **Database**: Convex (real-time)
- **Background Jobs**: Inngest
- **Auth**: Clerk (GitHub OAuth)
- **AI**: Gemini 2.0 Flash (Google)

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Convex account (for database)
- Clerk account (for authentication)
- Google AI API key (for AI features)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Kolade-dotcom/polaris.git
cd polaris
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Fill in your API keys in `.env.local`:

```bash
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database (Convex)
NEXT_PUBLIC_CONVEX_URL=https://[your-deployment].convex.cloud

# AI Provider
GOOGLE_GENERATIVE_AI_API_KEY=your-gemini-key
```

4. Start Convex dev server:

```bash
npx convex dev
```

5. Start the Next.js dev server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run
```

### Project Structure

```
polaris/
├── convex/              # Database schema and functions
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── api/        # API routes
│   │   ├── projects/   # Projects dashboard and IDE
│   │   └── page.tsx    # Landing page
│   ├── components/
│   │   ├── ui/         # shadcn/ui components
│   │   ├── landing/    # Landing page components
│   │   ├── ide/        # IDE layout
│   │   ├── file-explorer/
│   │   ├── editor/     # CodeMirror wrapper
│   │   └── ai/         # AI chat panel
│   ├── features/
│   │   └── editor/extensions/  # AI suggestions extension
│   ├── inngest/        # Background job functions
│   └── lib/            # Utilities
└── .env.local.example  # Environment variables template
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL | Yes |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini API key | For AI features |
| `SENTRY_DSN` | Sentry error tracking | Optional |

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Kolade-dotcom/polaris)

### Manual Deployment

1. Build the project:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Real-time sync by [Convex](https://convex.dev)
- Authentication by [Clerk](https://clerk.com)
- AI powered by [Google Gemini](https://ai.google.dev)
