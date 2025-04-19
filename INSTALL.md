
# CortejTech - Installation Guide

This document provides step-by-step instructions for setting up the CortejTech website on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)

## Installation Steps

### 1. Clone the Repository

```bash
# Clone the repository from GitHub
git clone <repository-url>

# Navigate to the project directory
cd cortejtech-website
```

### 2. Install Dependencies

```bash
# Install the project dependencies
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_url` and `your_supabase_anon_key` with your actual Supabase project credentials.

### 4. Start the Development Server

```bash
# Start the development server
npm run dev
```

This will start the local development server, typically at `http://localhost:5173`. Open this URL in your browser to view the website.

## Database Setup

The application uses Supabase as the backend. To set up the database:

1. Create a new project on [Supabase](https://supabase.com/)
2. Run the SQL scripts provided in the `database/migrations` directory in the SQL editor of your Supabase project
3. Update your environment variables with your Supabase project URL and anon key

## Admin Panel Access

To access the admin panel:

1. Navigate to `/ankit/admin` in your browser
2. Use the following credentials:
   - Username: Ankit@cortejtech#968511
   - Password: Ankit@968511565788#

## Building for Production

```bash
# Build the project for production
npm run build

# Preview the production build locally
npm run preview
```

## Troubleshooting

If you encounter any issues during installation or setup:

1. Make sure all prerequisites are installed correctly
2. Verify that your environment variables are correctly set
3. Check the browser console for any error messages
4. Ensure your Supabase project has the correct tables and policies set up

For more detailed information, refer to the [README.md](./README.md) file.
