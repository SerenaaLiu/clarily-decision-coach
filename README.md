# Clarily - Decision Making Dashboard

A modern web application that uses AI to analyze meeting transcripts and extract key decisions, helping teams track, manage, and learn from their strategic choices.

## Project info

**URL**: https://lovable.dev/projects/96ae88ad-7e81-41d3-ba71-f620f8edaa70

## Features

- 🤖 AI-powered meeting transcript analysis
- 📊 Decision tracking and management
- 👥 Team collaboration features
- 🔐 Secure authentication with Clerk
- 📱 Responsive design with modern UI
- ⚡ Real-time insights and analytics

## Setup Instructions

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

# Backend API (if needed)
VITE_API_URL=https://clarily-backend-temp.onrender.com
```

### Setting up Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy your publishable key from the API Keys section
4. Add the key to your `.env` file
5. Configure your sign-in and sign-up pages in the Clerk dashboard

### Installation

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Create a .env file with your Clerk publishable key

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/96ae88ad-7e81-41d3-ba71-f620f8edaa70) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Clerk (Authentication)
- React Router DOM
- TanStack Query
- Lucide React (Icons)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ProtectedRoute.tsx
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── LandingPage.tsx # Landing page
│   ├── DecisionDetail.tsx
│   └── NotFound.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx            # Main app component with routing
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/96ae88ad-7e81-41d3-ba71-f620f8edaa70) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
