
# CortejTech - Digital Agency Website

![CortejTech Logo](/lovable-uploads/d7a01dde-60db-4fae-8ffd-89c17c9acb29.jpg)

A modern, responsive website for CortejTech, a digital agency offering Web Development, App Development, Graphic Design, and UI/UX Design services.

## Project info

**URL**: https://lovable.dev/projects/7a84fcb2-0839-494f-9d74-d55d8402b5c6

## Features

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Dynamic Content Management**: Admin panel to manage all website content
- **Supabase Integration**: For backend functionality and data storage
- **Admin Panel**: Secure admin area to manage all aspects of the website
- **Multiple Pages**: Home, About, Services, Portfolio, Process, Blog, Contact, Testimonials, FAQ, and Career pages
- **Form Validation**: Contact form with client-side validation
- **Secure Authentication**: Admin login system with secure credentials

## Admin Login

- **URL**: /ankit/admin
- **Username**: Ankit@cortejtech#968511
- **Password**: Ankit@968511565788#

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn-ui
- **Backend**: Supabase for authentication, database, and storage
- **State Management**: React hooks and context
- **Routing**: React Router for navigation
- **Forms**: React Hook Form for validation
- **Icons**: Lucide React for consistent icons
- **UI Components**: Custom components built with shadcn/ui

## Database Tables

The project uses Supabase as the backend database with the following tables:

- **Settings**: Stores site configuration values (site name, logo URL, contact info)
- **Jobs**: Stores career/job listings
- **Contact Messages**: Stores form submissions from the contact page

## How to Use

### How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7a84fcb2-0839-494f-9d74-d55d8402b5c6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

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

## Project Structure

- `/src` - Source code
  - `/components` - Reusable UI components
  - `/hooks` - Custom React hooks
  - `/integrations` - Integration with external services like Supabase
  - `/pages` - Page components for different routes
  - `/lib` - Utility functions and helpers

## Deployment

Simply open [Lovable](https://lovable.dev/projects/7a84fcb2-0839-494f-9d74-d55d8402b5c6) and click on Share -> Publish.

## Connecting to Supabase

This project is configured to use Supabase for backend functionality. The connection is established in `src/integrations/supabase/client.ts`.

## Custom Domain Setup

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Development Roadmap

1. **Current Phase**: Initial website setup with dynamic content management and admin panel
2. **Next Phase**: Implement full CRUD functionality for all content sections
3. **Future Enhancements**: 
   - Add user management
   - Implement multiple admin roles
   - Add analytics dashboard
   - Integrate email notifications

## License

This project is proprietary and confidential.

## Credits

- Design and Development: CortejTech Team
- Built with [Lovable](https://lovable.dev)
