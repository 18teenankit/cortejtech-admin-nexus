
# CortejTech Admin Panel - Installation Guide

## Prerequisites

Before you begin the installation process, make sure you have the following:

- [Node.js](https://nodejs.org/) (version 18 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/) for cloning the repository
- A [Supabase](https://supabase.com/) account for the backend database

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourorganization/cortejtech-admin.git
cd cortejtech-admin
```

## Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

## Step 3: Set Up Supabase

1. Create a new project in Supabase
2. Go to Settings > API to get your project URL and anon key
3. Run the following SQL in the SQL Editor to set up your database tables:

```sql
-- Create the about_us table
CREATE TABLE IF NOT EXISTS public.about_us (
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

-- Make sure the jobs table has the right structure
CREATE TABLE IF NOT EXISTS public.jobs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  salary TEXT,
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL,
  apply_link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Make sure the contact_messages table has the right structure
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Make sure the settings table has the right structure
CREATE TABLE IF NOT EXISTS public.settings (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL
);

-- Insert some initial settings
INSERT INTO public.settings (key, value)
VALUES 
  ('site_name', 'CortejTech'),
  ('logo_url', '/lovable-uploads/bd45910c-d0e8-4a45-a99f-6d7e6aad54ae.png'),
  ('no_jobs_message', 'No openings currently, check back later. Email careers@cortejtech.com.'),
  ('contact_email', 'info@cortejtech.com'),
  ('contact_phone', '+91 9868-555-0123'),
  ('contact_address', '123 Tech Park, Sector 42, Gurgaon, Haryana 122001, India')
ON CONFLICT (key) DO NOTHING;
```

## Step 4: Configure Environment Variables

Create a `.env` file in the project root with your Supabase credentials:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with the actual values from your Supabase project.

## Step 5: Run the Development Server

```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application should now be running at [http://localhost:5173](http://localhost:5173) (or another port if 5173 is already in use).

## Step 6: Access the Admin Panel

Navigate to `/ankit/admin` to access the admin login page. The default login credentials are:

- **Username**: `admin`
- **Password**: `admin123`

(Note: In a production environment, you should change these default credentials)

## Step 7: Deploy to Production

For production deployment:

1. Build the project:
```bash
npm run build
```

2. The build files will be in the `dist` directory. Deploy these files to your hosting provider.

3. Make sure to set up environment variables on your hosting provider with your Supabase credentials.

## Troubleshooting

If you encounter any issues during installation or setup:

1. Make sure your Node.js version is 18 or later
2. Ensure that your Supabase credentials are correct in the `.env` file
3. Check that all required database tables have been created in Supabase
4. Clear your browser cache and try again

For more detailed help, refer to the project documentation or create an issue in the GitHub repository.
