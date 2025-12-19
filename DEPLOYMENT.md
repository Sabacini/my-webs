# 🚀 Инструкция по деплою DigAgRu на VPS

Подробное руководство по развертыванию сайта на новом сервере (Ubuntu/Debian).

---

## 📋 Содержание

1. [Требования к серверу](#требования-к-серверу)
2. [Начальная настройка сервера](#начальная-настройка-сервера)
3. [Установка необходимого ПО](#установка-необходимого-по)
4. [Клонирование и настройка проекта](#клонирование-и-настройка-проекта)
5. [Настройка Nginx](#настройка-nginx)
6. [Настройка SSL (Let's Encrypt)](#настройка-ssl-lets-encrypt)
7. [Настройка PM2](#настройка-pm2)
8. [Настройка Firewall](#настройка-firewall)
9. [Резервное копирование](#резервное-копирование)
10. [Мониторинг и обслуживание](#мониторинг-и-обслуживание)
11. [Troubleshooting](#troubleshooting)

---

## Требования к серверу

### Минимальные характеристики:
- **OS**: Ubuntu 20.04/22.04 LTS или Debian 11/12
- **CPU**: 1 vCPU
- **RAM**: 1 GB
- **Диск**: 10 GB SSD
- **Сеть**: 100 Mbps

### Что понадобится:
- IP адрес сервера
- Доменное имя (например: `digagru.com`)
- SSH доступ с правами root или sudo

---

## Начальная настройка сервера

### 1. Подключитесь к серверу

```bash
ssh root@YOUR_SERVER_IP
```

### 2. Обновите систему

```bash
apt update && apt upgrade -y
```

### 3. Настройте часовой пояс

```bash
timedatectl set-timezone Europe/Moscow
```

### 4. Создайте пользователя для деплоя (опционально, но рекомендуется)

```bash
# Создать пользователя
adduser deploy

# Добавить в группу sudo
usermod -aG sudo deploy

# Переключиться на нового пользователя
su - deploy
```

---

## Установка необходимого ПО

### 1. Установите Node.js (LTS версия)

```bash
# Установить curl если нет
sudo apt install -y curl

# Добавить репозиторий NodeSource для Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Установить Node.js
sudo apt install -y nodejs

# Проверить установку
node --version  # должно быть v20.x.x
npm --version   # должно быть 10.x.x
```

### 2. Установите Git

```bash
sudo apt install -y git

# Настройте Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. Установите Nginx

```bash
sudo apt install -y nginx

# Проверить статус
sudo systemctl status nginx
```

### 4. Установите Certbot (для SSL)

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 5. Установите PM2 (Process Manager)

```bash
sudo npm install -g pm2

# Проверить установку
pm2 --version
```

---

## Клонирование и настройка проекта

### 1. Создайте директорию для проектов

```bash
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www
```

### 2. Клонируйте репозиторий

```bash
git clone https://github.com/Sabacini/my-webs.git digagru
cd digagru
```

### 3. Установите зависимости

```bash
npm install --production
```

### 4. Создайте .env файл

```bash
cp .env.example .env
nano .env
```

Настройте переменные окружения:

```env
# IMPORTANT: Измените эти значения!
NODE_ENV=production
PORT=3000

# Безопасность (ОБЯЗАТЕЛЬНО ИЗМЕНИТЬ!)
SESSION_SECRET=здесь-генерируйте-случайную-строку-минимум-32-символа
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ваш-сильный-пароль

# Email уведомления (опционально)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=notifications@yourdomain.com

# Telegram уведомления (опционально)
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id

# Настройки сайта
SITE_URL=https://yourdomain.com
AGENCY_NAME=DigAgRu
```

**Генерация SESSION_SECRET:**
```bash
# Способ 1: OpenSSL
openssl rand -base64 32

# Способ 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Проверьте запуск приложения

```bash
npm start
```

Откройте в браузере: `http://YOUR_SERVER_IP:3000`

Если все работает, нажмите `Ctrl+C` для остановки.

---

## Настройка Nginx

### 1. Создайте конфигурацию Nginx

```bash
sudo nano /etc/nginx/sites-available/digagru
```

Вставьте следующую конфигурацию:

```nginx
# Upstream для Node.js приложения
upstream nodejs_backend {
    server 127.0.0.1:3000;
    keepalive 64;
}

# HTTP сервер (редирект на HTTPS)
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Для Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    # Редирект на HTTPS (будет активирован после получения SSL)
    # location / {
    #     return 301 https://$server_name$request_uri;
    # }

    # Временный проброс на Node.js (для первоначальной настройки)
    location / {
        proxy_pass http://nodejs_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# HTTPS сервер (раскомментировать после получения SSL)
# server {
#     listen 443 ssl http2;
#     listen [::]:443 ssl http2;
#     server_name yourdomain.com www.yourdomain.com;
# 
#     # SSL сертификаты (Let's Encrypt автоматически заполнит)
#     ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
#     ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
# 
#     # SSL настройки
#     ssl_protocols TLSv1.2 TLSv1.3;
#     ssl_ciphers HIGH:!aNULL:!MD5;
#     ssl_prefer_server_ciphers on;
#     ssl_session_cache shared:SSL:10m;
#     ssl_session_timeout 10m;
# 
#     # Security headers
#     add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
#     add_header X-Frame-Options "SAMEORIGIN" always;
#     add_header X-Content-Type-Options "nosniff" always;
# 
#     # Статические файлы с кэшированием
#     location /images/ {
#         alias /var/www/digagru/public/images/;
#         expires 30d;
#         add_header Cache-Control "public, immutable";
#         access_log off;
#     }
# 
#     location /css/ {
#         alias /var/www/digagru/public/css/;
#         expires 7d;
#         add_header Cache-Control "public";
#     }
# 
#     location /js/ {
#         alias /var/www/digagru/public/js/;
#         expires 7d;
#         add_header Cache-Control "public";
#     }
# 
#     # Проксирование на Node.js
#     location / {
#         proxy_pass http://nodejs_backend;
#         proxy_http_version 1.1;
#         proxy_set_header Upgrade $http_upgrade;
#         proxy_set_header Connection 'upgrade';
#         proxy_set_header Host $host;
#         proxy_set_header X-Real-IP $remote_addr;
#         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#         proxy_set_header X-Forwarded-Proto $scheme;
#         proxy_cache_bypass $http_upgrade;
#         
#         # Timeouts
#         proxy_connect_timeout 60s;
#         proxy_send_timeout 60s;
#         proxy_read_timeout 60s;
#     }
# }
```

**ВАЖНО:** Замените `yourdomain.com` на ваш настоящий домен!

### 2. Активируйте конфигурацию

```bash
# Создать симлинк
sudo ln -s /etc/nginx/sites-available/digagru /etc/nginx/sites-enabled/

# Удалить дефолтную конфигурацию (опционально)
sudo rm /etc/nginx/sites-enabled/default

# Проверить конфигурацию
sudo nginx -t

# Перезапустить Nginx
sudo systemctl restart nginx
```

### 3. Проверьте работу

Откройте в браузере: `http://yourdomain.com`

---

## Настройка SSL (Let's Encrypt)

### 1. Убедитесь что домен направлен на сервер

Проверьте DNS записи:
```bash
dig yourdomain.com +short
# Должен вернуть IP вашего сервера
```

### 2. Получите SSL сертификат

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot автоматически:
- Получит сертификат
- Настроит Nginx
- Создаст автообновление

### 3. Обновите конфигурацию Nginx

```bash
sudo nano /etc/nginx/sites-available/digagru
```

Раскомментируйте секцию HTTPS и закомментируйте временный проброс в HTTP секции.

### 4. Проверьте и перезапустите Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Обновите .env файл

```bash
nano /var/www/digagru/.env
```

Измените `SITE_URL`:
```env
SITE_URL=https://yourdomain.com
```

### 6. Настройте автообновление сертификатов

```bash
# Проверить таймер автообновления
sudo systemctl status certbot.timer

# Протестировать обновление
sudo certbot renew --dry-run
```

---

## Настройка PM2

### 1. Создайте ecosystem файл

```bash
cd /var/www/digagru
nano ecosystem.config.js
```

Вставьте конфигурацию:

```javascript
module.exports = {
  apps: [{
    name: 'digagru',
    script: './server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    time: true
  }]
}
```

### 2. Создайте директорию для логов

```bash
mkdir -p /var/www/digagru/logs
```

### 3. Запустите приложение через PM2

```bash
pm2 start ecosystem.config.js

# Проверить статус
pm2 status

# Посмотреть логи
pm2 logs digagru

# Остановить логи: Ctrl+C
```

### 4. Настройте автозапуск

```bash
# Сохранить текущий список процессов
pm2 save

# Создать startup скрипт
pm2 startup

# PM2 выдаст команду, выполните её (примерно такую):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u deploy --hp /home/deploy
```

### 5. Полезные команды PM2

```bash
# Статус всех процессов
pm2 list

# Логи в реальном времени
pm2 logs digagru --lines 100

# Мониторинг
pm2 monit

# Перезапуск
pm2 restart digagru

# Остановка
pm2 stop digagru

# Удаление из списка PM2
pm2 delete digagru

# Очистка логов
pm2 flush
```

---

## Настройка Firewall

### 1. Установите UFW (если нет)

```bash
sudo apt install -y ufw
```

### 2. Настройте правила

```bash
# SSH (ВАЖНО: настроить до включения firewall!)
sudo ufw allow 22/tcp

# HTTP
sudo ufw allow 80/tcp

# HTTPS
sudo ufw allow 443/tcp

# Проверить правила
sudo ufw show added
```

### 3. Включите firewall

```bash
sudo ufw enable

# Проверить статус
sudo ufw status verbose
```

### 4. Дополнительная безопасность (опционально)

Установите Fail2Ban для защиты от брутфорса:

```bash
sudo apt install -y fail2ban

# Создайте локальную конфигурацию
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local

# Найдите секцию [sshd] и убедитесь что enabled = true

# Перезапустите
sudo systemctl restart fail2ban
sudo systemctl status fail2ban
```

---

## Резервное копирование

### 1. Создайте скрипт бэкапа

```bash
sudo mkdir -p /root/backups
sudo nano /root/backups/backup-digagru.sh
```

Вставьте скрипт:

```bash
#!/bin/bash

# Конфигурация
APP_DIR="/var/www/digagru"
BACKUP_DIR="/root/backups/digagru"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

# Создать директорию для бэкапов
mkdir -p $BACKUP_DIR

# Бэкап базы данных SQLite
if [ -f "$APP_DIR/data/agency.db" ]; then
    cp "$APP_DIR/data/agency.db" "$BACKUP_DIR/database_$DATE.db"
    echo "✓ Database backed up: database_$DATE.db"
fi

# Бэкап .env файла
if [ -f "$APP_DIR/.env" ]; then
    cp "$APP_DIR/.env" "$BACKUP_DIR/env_$DATE"
    echo "✓ .env backed up: env_$DATE"
fi

# Удалить старые бэкапы (старше RETENTION_DAYS дней)
find $BACKUP_DIR -name "database_*.db" -mtime +$RETENTION_DAYS -delete
find $BACKUP_DIR -name "env_*" -mtime +$RETENTION_DAYS -delete

echo "✓ Backup completed: $DATE"
echo "✓ Old backups cleaned (retention: $RETENTION_DAYS days)"
```

### 2. Сделайте скрипт исполняемым

```bash
sudo chmod +x /root/backups/backup-digagru.sh

# Протестируйте
sudo /root/backups/backup-digagru.sh
```

### 3. Настройте автоматический бэкап (cron)

```bash
sudo crontab -e
```

Добавьте строку (бэкап каждый день в 3:00 ночи):

```cron
0 3 * * * /root/backups/backup-digagru.sh >> /var/log/digagru-backup.log 2>&1
```

### 4. Восстановление из бэкапа

```bash
# Остановить приложение
pm2 stop digagru

# Восстановить базу данных
cp /root/backups/digagru/database_YYYYMMDD_HHMMSS.db /var/www/digagru/data/agency.db

# Восстановить .env (если нужно)
cp /root/backups/digagru/env_YYYYMMDD_HHMMSS /var/www/digagru/.env

# Запустить приложение
pm2 start digagru
```

---

## Мониторинг и обслуживание

### 1. Просмотр логов

```bash
# Логи приложения (PM2)
pm2 logs digagru --lines 100

# Логи Nginx (доступ)
sudo tail -f /var/log/nginx/access.log

# Логи Nginx (ошибки)
sudo tail -f /var/log/nginx/error.log

# Системные логи
sudo journalctl -u nginx -f
```

### 2. Мониторинг ресурсов

```bash
# PM2 мониторинг
pm2 monit

# Использование диска
df -h

# Использование памяти
free -h

# Топ процессов
htop  # или top
```

### 3. Обновление приложения

```bash
cd /var/www/digagru

# Остановить PM2
pm2 stop digagru

# Получить обновления
git pull origin main

# Установить новые зависимости (если есть)
npm install --production

# Перезапустить
pm2 restart digagru

# Проверить статус
pm2 status
pm2 logs digagru --lines 50
```

### 4. Настройка мониторинга uptime (опционально)

Используйте бесплатные сервисы:
- [UptimeRobot](https://uptimerobot.com) - бесплатный мониторинг (50 сайтов)
- [Pingdom](https://www.pingdom.com) - бесплатный план
- [StatusCake](https://www.statuscake.com) - бесплатный мониторинг

---

## Troubleshooting

### Проблема: Сайт не открывается

```bash
# 1. Проверить запущен ли Node.js
pm2 status

# 2. Проверить логи приложения
pm2 logs digagru --lines 50

# 3. Проверить Nginx
sudo systemctl status nginx
sudo nginx -t

# 4. Проверить firewall
sudo ufw status

# 5. Проверить порты
sudo netstat -tlnp | grep -E '(80|443|3000)'
```

### Проблема: База данных не создается

```bash
# Проверить права на директорию
ls -la /var/www/digagru/

# Создать директорию вручную
mkdir -p /var/www/digagru/data
chown -R $USER:$USER /var/www/digagru/data

# Перезапустить приложение
pm2 restart digagru
```

### Проблема: SSL сертификат не работает

```bash
# Проверить DNS
dig yourdomain.com +short

# Проверить certbot логи
sudo tail -f /var/log/letsencrypt/letsencrypt.log

# Пересоздать сертификат
sudo certbot delete -d yourdomain.com
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Проблема: 502 Bad Gateway

```bash
# Приложение не запущено или недоступно
pm2 restart digagru

# Проверить порт 3000
curl http://localhost:3000

# Проверить upstream в nginx
sudo nginx -t
```

### Проблема: Высокое использование памяти

```bash
# Ограничить память в PM2
pm2 restart digagru --max-memory-restart 300M

# Проверить утечки памяти
pm2 monit

# Очистить логи
pm2 flush
```

---

## 📝 Чеклист финального деплоя

После завершения всех шагов, проверьте:

- [ ] Node.js установлен и работает
- [ ] Проект склонирован и зависимости установлены
- [ ] .env файл настроен (SESSION_SECRET изменен!)
- [ ] Nginx настроен и запущен
- [ ] SSL сертификат получен и работает
- [ ] HTTPS редирект активирован
- [ ] PM2 запущен и автостарт настроен
- [ ] Firewall настроен (22, 80, 443 открыты)
- [ ] Резервное копирование настроено (cron)
- [ ] Сайт открывается по https://yourdomain.com
- [ ] Админ панель доступна: https://yourdomain.com/admin
- [ ] Cookie consent работает
- [ ] Форма контактов отправляет данные
- [ ] Email/Telegram уведомления работают (если настроены)

---

## 🎯 Полезные ссылки

- [Node.js документация](https://nodejs.org/docs/latest/api/)
- [PM2 документация](https://pm2.keymetrics.io/docs/)
- [Nginx документация](https://nginx.org/ru/docs/)
- [Let's Encrypt](https://letsencrypt.org/)
- [UFW руководство](https://help.ubuntu.com/community/UFW)

---

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте логи: `pm2 logs digagru`
2. Проверьте Nginx: `sudo tail -f /var/log/nginx/error.log`
3. Проверьте раздел Troubleshooting выше

---

**Автор:** DigAgRu Team  
**Дата обновления:** 2025-12-19  
**Версия:** 1.0

🤖 Сгенерировано с помощью [Claude Code](https://claude.com/claude-code)
