
# CortejTech Admin Panel

A comprehensive admin panel for managing website content including About Us, Services, Portfolio, Blog, Careers, and more.

## Features

- Admin authentication
- Dashboard with overview statistics
- Content management sections for:
  - About Us
  - Services
  - Portfolio
  - Blog
  - Careers
  - Messages
- Settings management
- Responsive design

## Installation

### Prerequisites

- Node.js 18+ installed
- Git installed
- Supabase account (for the backend)

### Steps to Install

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cortejtech-admin.git
   cd cortejtech-admin
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Database setup:
   Run the following SQL in your Supabase SQL editor to create the required tables:

   ```sql
   -- Create the about_us table
   CREATE TABLE public.about_us (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     image_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
   );

   -- Make sure the services table has the right structure
   CREATE TABLE IF NOT EXISTS public.services (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     icon TEXT NOT NULL,
     is_featured BOOLEAN DEFAULT false,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
   );

   -- Make sure the portfolio_items table has the right structure
   CREATE TABLE IF NOT EXISTS public.portfolio_items (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     image_url TEXT NOT NULL,
     category TEXT NOT NULL,
     client TEXT,
     project_url TEXT,
     completion_date DATE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
   );

   -- Make sure the blog_posts table has the right structure
   CREATE TABLE IF NOT EXISTS public.blog_posts (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     content TEXT NOT NULL,
     author TEXT NOT NULL,
     slug TEXT NOT NULL UNIQUE,
     excerpt TEXT,
     featured_image TEXT,
     is_published BOOLEAN DEFAULT true,
     published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
   );
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Access the application:
   Open your browser and navigate to `http://localhost:3000`

## Login Information

- URL: `/ankit/admin`
- Username: The default username is set in the Login component
- Password: The default password is set in the Login component

## Production Deployment

1. Build the project:
   ```
   npm run build
   ```

2. Deploy the contents of the `dist` folder to your hosting provider.

## Technologies Used

- React with TypeScript
- Vite
- Tailwind CSS
- Shadcn UI components
- Supabase for backend
- React Router for routing
- Lucide for icons
- React Query for data fetching
