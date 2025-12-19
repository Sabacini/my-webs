const nodemailer = require('nodemailer');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Email configuration
let emailTransporter = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  emailTransporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

// Telegram configuration
let telegramBot = null;

if (process.env.TELEGRAM_BOT_TOKEN) {
  telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
}

// Send email notification
async function sendEmailNotification(lead) {
  if (!emailTransporter) {
    console.log('Email not configured. Skipping email notification.');
    return { success: false, message: 'Email not configured' };
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    subject: `Новая заявка от ${lead.name}`,
    html: `
      <h2>Новая заявка с сайта ${process.env.AGENCY_NAME || 'DigAgRu'}</h2>
      <p><strong>Имя:</strong> ${lead.name}</p>
      <p><strong>Контакт:</strong> ${lead.contact}</p>
      <p><strong>Сообщение:</strong></p>
      <p>${lead.message || 'Не указано'}</p>
      <p><strong>Время:</strong> ${new Date().toLocaleString('ru-RU')}</p>
      <hr>
      <p><a href="${process.env.SITE_URL}/admin">Перейти в админ-панель</a></p>
    `
  };

  try {
    await emailTransporter.sendMail(mailOptions);
    console.log('Email notification sent successfully');
    return { success: true, message: 'Email sent' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: error.message };
  }
}

// Send Telegram notification
async function sendTelegramNotification(lead) {
  if (!telegramBot || !process.env.TELEGRAM_CHAT_ID) {
    console.log('Telegram not configured. Skipping Telegram notification.');
    return { success: false, message: 'Telegram not configured' };
  }

  const message = `
🔔 <b>Новая заявка</b>

👤 <b>Имя:</b> ${lead.name}
📞 <b>Контакт:</b> ${lead.contact}
💬 <b>Сообщение:</b> ${lead.message || 'Не указано'}
⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}

<a href="${process.env.SITE_URL}/admin">Перейти в админ-панель</a>
  `;

  try {
    await telegramBot.sendMessage(process.env.TELEGRAM_CHAT_ID, message, { parse_mode: 'HTML' });
    console.log('Telegram notification sent successfully');
    return { success: true, message: 'Telegram message sent' };
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return { success: false, message: error.message };
  }
}

// Send all notifications
async function sendNotifications(lead) {
  const results = {
    email: await sendEmailNotification(lead),
    telegram: await sendTelegramNotification(lead)
  };

  return results;
}

module.exports = {
  sendEmailNotification,
  sendTelegramNotification,
  sendNotifications
};
