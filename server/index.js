const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const path = require('path');
require('dotenv').config();

const { db, dbHelpers } = require('./database');
const { sendNotifications } = require('./notifications');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false // Отключаем для совместимости с inline scripts
}));

// Rate limiting для API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов с одного IP
  message: 'Too many requests from this IP, please try again later.'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // максимум 5 попыток входа за 15 минут
  message: 'Too many login attempts, please try again later.'
});

app.use('/api/', apiLimiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/data', express.static(path.join(__dirname, '../data')));

// Trust proxy для production (необходимо для secure cookies за reverse proxy)
if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
}

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only в production
    httpOnly: true, // Защита от XSS
    sameSite: 'lax', // Защита от CSRF
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/admin/login');
}

// Initialize default admin user
bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10, (err, hash) => {
  if (err) {
    console.error('Error creating default admin:', err);
    return;
  }

  dbHelpers.createAdmin(process.env.ADMIN_USERNAME || 'admin', hash, (err) => {
    if (err && !err.message.includes('UNIQUE constraint failed')) {
      console.error('Error creating default admin:', err);
    } else if (!err) {
      console.log('Default admin user created');
    }
  });
});

// Routes

// Main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API: Get testimonials
app.get('/api/testimonials', (req, res) => {
  dbHelpers.getAllTestimonials((err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// API: Submit contact form
app.post('/api/contact', [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be less than 100 characters')
    .escape(),
  body('contact')
    .trim()
    .notEmpty().withMessage('Contact is required')
    .isLength({ max: 100 }).withMessage('Contact must be less than 100 characters')
    .escape(),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Message must be less than 1000 characters')
    .escape()
], async (req, res) => {
  // Проверка результатов валидации
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const { name, contact, message } = req.body;

  dbHelpers.createLead({ name, contact, message }, async function(err) {
    if (err) {
      console.error('Error creating lead:', err);
      return res.status(500).json({ error: 'Failed to save lead' });
    }

    const leadId = this.lastID;
    const lead = { id: leadId, name, contact, message };

    // Send notifications
    const notificationResults = await sendNotifications(lead);

    res.json({
      success: true,
      message: 'Your request has been received. We will contact you soon!',
      notifications: notificationResults
    });
  });
});

// Admin login page
app.get('/admin/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/admin');
  }
  res.render('admin-login');
});

// Admin login handler (с rate limiting)
app.post('/admin/login', authLimiter, [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], (req, res) => {
  // Проверка валидации
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const { username, password } = req.body;

  dbHelpers.getAdminByUsername(username, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      req.session.user = { id: user.id, username: user.username };
      res.json({ success: true, redirect: '/admin' });
    });
  });
});

// Admin logout
app.get('/admin/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

// Admin dashboard
app.get('/admin', isAuthenticated, (req, res) => {
  res.render('admin-dashboard', { user: req.session.user });
});

// API: Get all leads (admin)
app.get('/api/admin/leads', isAuthenticated, (req, res) => {
  dbHelpers.getAllLeads((err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// API: Update lead status (admin)
app.put('/api/admin/leads/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  dbHelpers.updateLeadStatus(id, status, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ success: true });
  });
});

// API: Delete lead (admin)
app.delete('/api/admin/leads/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;

  dbHelpers.deleteLead(id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ success: true });
  });
});

// API: Get statistics (admin)
app.get('/api/admin/stats', isAuthenticated, (req, res) => {
  dbHelpers.getLeadsStats((err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows[0]);
  });
});

// API: Get all testimonials (admin)
app.get('/api/admin/testimonials', isAuthenticated, (req, res) => {
  db.all('SELECT * FROM testimonials ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// API: Create testimonial (admin)
app.post('/api/admin/testimonials', isAuthenticated, (req, res) => {
  const data = req.body;
  dbHelpers.createTestimonial(data, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ success: true });
  });
});

// API: Update testimonial (admin)
app.put('/api/admin/testimonials/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const data = req.body;

  dbHelpers.updateTestimonial(id, data, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ success: true });
  });
});

// API: Delete testimonial (admin)
app.delete('/api/admin/testimonials/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;

  dbHelpers.deleteTestimonial(id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ success: true });
  });
});

// 404 handler - должен быть перед error handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.url} not found`
  });
});

// Централизованный error handling middleware (должен быть последним)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);

  // Не показываем детали ошибок в production
  const errorMessage = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(err.status || 500).json({
    error: errorMessage,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin`);
  console.log(`Default credentials: admin / admin123`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    }
    console.log('Database connection closed');
    process.exit(0);
  });
});
