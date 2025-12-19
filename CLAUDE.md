# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DigAgRu is a multilingual single-page website for a micro digital agency. It features:
- Frontend: Responsive single-page application with Tailwind CSS
- Backend: Node.js/Express server with SQLite database
- Admin Panel: CRM system for managing leads and testimonials
- Notifications: Email (Nodemailer) and Telegram integration
- Multilingual: Russian and English support
- Theming: Light and dark mode

## Commands

### Development
```bash
npm install              # Install dependencies
npm run dev             # Start server with nodemon (auto-reload)
npm start               # Start server in production mode
npm run build:css       # Build Tailwind CSS (optional)
```

### Testing
The project doesn't have automated tests yet. Manual testing through the web interface.

### Database
- Database is SQLite (file-based) stored in `data/agency.db`
- Created automatically on first run
- No migrations needed - schema is initialized in `server/database.js`

## Architecture

### Backend Structure
- **server/index.js**: Main Express server with all routes and middleware
  - Security middleware: helmet, rate limiting, input validation
  - Body parsing via built-in express.json() and express.urlencoded()
  - Handles authentication via express-session with enhanced security
  - Serves static files from `public/`
  - Renders EJS templates from `views/`
  - API endpoints for leads, testimonials, and statistics
  - Centralized error handling (404 and 500 errors)

- **server/database.js**: SQLite database setup and helper functions
  - Tables: leads, testimonials, admin_users
  - Helper functions for CRUD operations
  - Auto-initializes tables and default data
  - Connection error handling with process exit on failure
  - Auto-creates data directory if missing

- **server/notifications.js**: Notification system
  - Email notifications via Nodemailer (configurable)
  - Telegram notifications via node-telegram-bot-api (configurable)
  - Both are optional - gracefully handles missing configuration

### Frontend Structure
- **public/index.html**: Main single-page website
  - All content in one file with sections (Hero, About, Services, Advantages, Testimonials, Contact)
  - Uses Tailwind CSS via CDN for styling
  - Mobile-responsive with hamburger menu

- **public/js/app.js**: Frontend application logic
  - Language switching (RU/EN) with localStorage persistence
  - Theme switching (light/dark) with localStorage persistence
  - Contact form submission
  - Testimonials loading from API
  - All translations stored in JavaScript object

- **public/js/admin.js**: Admin panel logic
  - Tab switching (Leads, Testimonials, Statistics)
  - CRUD operations for leads and testimonials
  - Real-time status updates
  - Statistics dashboard

### Admin Panel
- **views/admin-login.ejs**: Simple login page
- **views/admin-dashboard.ejs**: Full admin interface with tabs
  - Leads management (view, update status, delete)
  - Testimonials management (add, edit, delete, toggle visibility)
  - Statistics dashboard (totals, status breakdown, time periods)

## Key Patterns

### Multilingual Support
- Translations are client-side in `public/js/app.js`
- Database stores both Russian and English versions of testimonials
- Language preference stored in localStorage
- All user-facing text has translation keys

### Theme System
- Uses Tailwind's dark mode with `class` strategy
- Theme preference stored in localStorage
- CSS classes toggle between light/dark variants
- Smooth transitions between themes

### Database Design
- **leads**: Customer inquiries with status tracking (new, in_progress, completed)
- **testimonials**: Client reviews with bilingual content and visibility toggle
- **admin_users**: Simple admin authentication (username/bcrypt password)

### Authentication
- Session-based authentication with express-session
  - Enhanced security: httpOnly, sameSite, secure cookies
  - Trust proxy support for production deployments
- Password hashing with bcryptjs (10 rounds)
- Rate limiting on login endpoint (5 attempts per 15 min)
- Input validation on login form
- Simple middleware `isAuthenticated()` protects admin routes
- Default admin created on first run (change password after!)

### Notifications
- Triggered when new lead is submitted via contact form
- Both email and Telegram are optional (check for configuration)
- Notifications include lead details and link to admin panel
- Graceful degradation if services not configured

## Configuration

All configuration is in `.env` file (see `.env.example`):
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default 3000)
- `SESSION_SECRET`: Session encryption key (CHANGE THIS! Min 32 chars)
- `ADMIN_USERNAME/PASSWORD`: Default admin credentials (CHANGE PASSWORD!)
- `EMAIL_*`: Email notification settings (optional)
- `TELEGRAM_*`: Telegram notification settings (optional)

### Production Environment Variables
```bash
NODE_ENV=production
SESSION_SECRET=your-very-long-random-secret-key-min-32-characters
ADMIN_PASSWORD=strong-unique-password
```

## Security Features

### Implemented Security Measures
- **Helmet**: Security HTTP headers to protect against common vulnerabilities
- **Rate Limiting**:
  - API endpoints: 100 requests per 15 minutes per IP
  - Login endpoint: 5 attempts per 15 minutes per IP (brute-force protection)
- **Input Validation**: express-validator for all form inputs with XSS protection
- **Session Security**:
  - httpOnly cookies (XSS protection)
  - sameSite: 'lax' (CSRF protection)
  - secure cookies in production (HTTPS only)
  - Trust proxy configuration for production
- **Error Handling**: Centralized error handler (hides details in production)
- **Database**: Connection error handling with graceful shutdown

### Security Best Practices
- Passwords hashed with bcryptjs (10 rounds)
- Parameterized SQL queries (SQL injection protection)
- Input sanitization and validation on all endpoints
- 404 handler for undefined routes
- Environment-based security settings

### Known Security Issues
- **node-telegram-bot-api dependencies**: Contains 6 vulnerabilities in transitive dependencies (form-data, tough-cookie, request)
  - These are low-risk in server-side context
  - Consider alternatives: telegraf library or disable Telegram notifications if not used

## Important Notes

### Security
- **CRITICAL**: Change SESSION_SECRET in production (minimum 32 characters)
- **CRITICAL**: Change ADMIN_PASSWORD immediately after first deployment
- SQLite database file should not be committed to git (.gitignore)
- Use HTTPS in production (configure reverse proxy)
- No password change functionality yet - edit database directly if needed
- Regular dependency updates: `npm audit` and `npm update`

### Styling
- Tailwind CSS loaded from CDN for simplicity
- Custom styles in `public/css/input.css`
- Can compile custom build with `npm run build:css`
- Uses Tailwind's JIT mode for development

### Data Persistence
- SQLite database file persists in `data/` directory
- No automatic backups - implement separately if needed
- Database file is in `.gitignore`

### Deployment Considerations
- Set `NODE_ENV=production` for production (enables secure cookies, hides error details)
- Change SESSION_SECRET and ADMIN_PASSWORD before deployment
- Consider using PM2 or similar for process management
- **REQUIRED**: Use reverse proxy (nginx/caddy) for SSL/HTTPS
  - Configure trust proxy: app already sets `trust proxy` for production
- Ensure `data/` directory is writable (auto-created if missing)
- Configure email/Telegram for production use
- Monitor logs and set up error alerting
- Regular security updates: `npm audit` and `npm update`
- Consider replacing node-telegram-bot-api with telegraf if concerned about dependencies

## Common Tasks

### Adding New Service
1. Add HTML in `public/index.html` services section
2. Add translations in `public/js/app.js` translations object
3. Update both RU and EN text

### Modifying Admin Panel
1. Update EJS template in `views/admin-dashboard.ejs`
2. Add corresponding JavaScript in `public/js/admin.js`
3. Add API endpoint in `server/index.js` if needed
4. Update database helper in `server/database.js` if needed

### Changing Colors/Theme
1. Edit `tailwind.config.js` for color palette
2. Update classes in HTML files
3. Rebuild CSS if using compiled version

### Adding New Language
1. Add translations to `public/js/app.js`
2. Update language switcher in `public/index.html`
3. Add language columns to testimonials table
4. Update admin forms for new language

## Technology Stack
- Backend: Node.js, Express, SQLite
- Frontend: Vanilla JavaScript, Tailwind CSS
- Authentication: express-session, bcryptjs
- Security: helmet, express-rate-limit, express-validator
- Notifications: Nodemailer, node-telegram-bot-api
- Templating: EJS (for admin panel only)
