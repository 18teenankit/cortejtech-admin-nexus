
-- Create the about_us table if it doesn't exist
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

-- Insert some initial settings if they don't exist
INSERT INTO public.settings (key, value)
VALUES 
  ('site_name', 'CortejTech'),
  ('logo_url', '/lovable-uploads/bd45910c-d0e8-4a45-a99f-6d7e6aad54ae.png'),
  ('no_jobs_message', 'No openings currently, check back later. Email careers@cortejtech.com.'),
  ('contact_email', 'info@cortejtech.com'),
  ('contact_phone', '+91 9868-555-0123'),
  ('contact_address', '123 Tech Park, Sector 42, Gurgaon, Haryana 122001, India')
ON CONFLICT (key) DO NOTHING;
