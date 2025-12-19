const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../data/agency.db');

// Убедимся, что директория data существует
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Создаем подключение к базе данных с обработкой ошибок
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('CRITICAL: Failed to connect to database:', err);
    process.exit(1);
  }
  console.log('✓ Connected to SQLite database');
});

// Initialize database tables
db.serialize(() => {
  // Leads table
  db.run(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      contact TEXT NOT NULL,
      message TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Testimonials table
  db.run(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_ru TEXT NOT NULL,
      name_en TEXT NOT NULL,
      company_ru TEXT,
      company_en TEXT,
      text_ru TEXT NOT NULL,
      text_en TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      avatar TEXT,
      visible INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert default testimonials
  db.run(`
    INSERT OR IGNORE INTO testimonials (id, name_ru, name_en, company_ru, company_en, text_ru, text_en, rating)
    VALUES
      (1, 'Алексей Петров', 'Alexey Petrov', 'Интернет-магазин "Товары для дома"', 'Home Goods Store',
       'Отличная работа! Сделали сайт быстро и качественно. Особенно понравилась поддержка после запуска.',
       'Excellent work! They made the website quickly and with high quality. I especially liked the post-launch support.', 5),
      (2, 'Мария Иванова', 'Maria Ivanova', 'Салон красоты "Гармония"', 'Harmony Beauty Salon',
       'Профессиональный подход, адекватные цены. Теперь у нас красивый сайт и онлайн-запись клиентов работает отлично!',
       'Professional approach, reasonable prices. Now we have a beautiful website and online booking works great!', 5),
      (3, 'Дмитрий Соколов', 'Dmitry Sokolov', 'Строительная компания "СтройДом"', 'BuildHome Construction',
       'Помогли с настройкой рекламы и SEO. Количество заявок выросло в 3 раза за первый месяц!',
       'They helped with advertising and SEO setup. The number of inquiries tripled in the first month!', 5)
  `);

  // Admin users table
  db.run(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Database helper functions
const dbHelpers = {
  // Leads
  getAllLeads: (callback) => {
    db.all('SELECT * FROM leads ORDER BY created_at DESC', callback);
  },

  getLeadById: (id, callback) => {
    db.get('SELECT * FROM leads WHERE id = ?', [id], callback);
  },

  createLead: (data, callback) => {
    db.run(
      'INSERT INTO leads (name, contact, message) VALUES (?, ?, ?)',
      [data.name, data.contact, data.message],
      callback
    );
  },

  updateLeadStatus: (id, status, callback) => {
    db.run(
      'UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, id],
      callback
    );
  },

  deleteLead: (id, callback) => {
    db.run('DELETE FROM leads WHERE id = ?', [id], callback);
  },

  getLeadsStats: (callback) => {
    db.all(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_leads,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN DATE(created_at) = DATE('now') THEN 1 ELSE 0 END) as today,
        SUM(CASE WHEN DATE(created_at) >= DATE('now', '-7 days') THEN 1 ELSE 0 END) as this_week,
        SUM(CASE WHEN DATE(created_at) >= DATE('now', '-30 days') THEN 1 ELSE 0 END) as this_month
      FROM leads
    `, callback);
  },

  // Testimonials
  getAllTestimonials: (callback) => {
    db.all('SELECT * FROM testimonials WHERE visible = 1 ORDER BY created_at DESC', callback);
  },

  getTestimonialById: (id, callback) => {
    db.get('SELECT * FROM testimonials WHERE id = ?', [id], callback);
  },

  createTestimonial: (data, callback) => {
    db.run(
      `INSERT INTO testimonials (name_ru, name_en, company_ru, company_en, text_ru, text_en, rating, visible)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [data.name_ru, data.name_en, data.company_ru, data.company_en, data.text_ru, data.text_en, data.rating, data.visible],
      callback
    );
  },

  updateTestimonial: (id, data, callback) => {
    db.run(
      `UPDATE testimonials SET name_ru = ?, name_en = ?, company_ru = ?, company_en = ?,
       text_ru = ?, text_en = ?, rating = ?, visible = ? WHERE id = ?`,
      [data.name_ru, data.name_en, data.company_ru, data.company_en, data.text_ru, data.text_en, data.rating, data.visible, id],
      callback
    );
  },

  deleteTestimonial: (id, callback) => {
    db.run('DELETE FROM testimonials WHERE id = ?', [id], callback);
  },

  // Admin
  getAdminByUsername: (username, callback) => {
    db.get('SELECT * FROM admin_users WHERE username = ?', [username], callback);
  },

  createAdmin: (username, hashedPassword, callback) => {
    db.run(
      'INSERT INTO admin_users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      callback
    );
  }
};

module.exports = { db, dbHelpers };
