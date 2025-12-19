# 🚀 Деплой на my-webs.ru

Готовые команды для деплоя проекта DigAgRu на домен **my-webs.ru**

---

## ✅ Предварительные требования

1. **DNS настроен:**
   ```bash
   # Проверьте что домен указывает на ваш сервер
   dig my-webs.ru +short
   # Должен вернуть IP вашего сервера
   ```

2. **SSH доступ к серверу:**
   ```bash
   ssh root@YOUR_SERVER_IP
   ```

---

## 🎯 Быстрый деплой (копируй-вставляй)

### 1️⃣ Установка ПО (5 минут)

```bash
# Обновление системы
apt update && apt upgrade -y

# Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Остальное ПО
apt install -y git nginx certbot python3-certbot-nginx

# PM2
npm install -g pm2

# Firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
```

### 2️⃣ Клонирование проекта (2 минуты)

```bash
# Создать директорию
mkdir -p /var/www && cd /var/www

# Клонировать
git clone https://github.com/Sabacini/my-webs.git digagru
cd digagru

# Установить зависимости
npm install --production
```

### 3️⃣ Настройка .env (1 минута)

```bash
# Создать .env
cp .env.example .env

# Редактировать
nano .env
```

**Обязательно измените:**
```env
NODE_ENV=production
SESSION_SECRET=ВАШ_СЛУЧАЙНЫЙ_КЛЮЧ_МИНИМУМ_32_СИМВОЛА
ADMIN_PASSWORD=ваш_сильный_пароль
SITE_URL=https://my-webs.ru
```

**Генерация SESSION_SECRET:**
```bash
openssl rand -base64 32
```

### 4️⃣ Nginx конфигурация (2 минуты)

```bash
cat > /etc/nginx/sites-available/digagru << 'NGINX'
upstream nodejs_backend {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name my-webs.ru www.my-webs.ru;

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
NGINX

# Активировать
ln -s /etc/nginx/sites-available/digagru /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Проверить и перезапустить
nginx -t && systemctl reload nginx
```

### 5️⃣ SSL сертификат (1 минута)

```bash
certbot --nginx -d my-webs.ru -d www.my-webs.ru --non-interactive --agree-tos --email your-email@gmail.com --redirect
```

**ВАЖНО:** Замените `your-email@gmail.com` на ваш реальный email!

### 6️⃣ Запуск приложения (1 минута)

```bash
cd /var/www/digagru

# Запустить через PM2
pm2 start server/index.js --name digagru

# Сохранить
pm2 save

# Автозапуск
pm2 startup
# Выполните команду которую выдаст PM2
```

### 7️⃣ Автобэкап базы данных (опционально)

```bash
mkdir -p /root/backups

cat > /root/backups/backup-digagru.sh << 'BACKUP'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups/digagru"
mkdir -p $BACKUP_DIR
cp /var/www/digagru/data/agency.db $BACKUP_DIR/database_$DATE.db
find $BACKUP_DIR -name "database_*.db" -mtime +7 -delete
echo "Backup completed: $DATE"
BACKUP

chmod +x /root/backups/backup-digagru.sh

# Добавить в cron (каждый день в 3:00)
(crontab -l 2>/dev/null; echo "0 3 * * * /root/backups/backup-digagru.sh >> /var/log/digagru-backup.log 2>&1") | crontab -
```

---

## ✅ Проверка

### Открыть в браузере:

- **Главная:** https://my-webs.ru
- **Админка:** https://my-webs.ru/admin
  - Логин: `admin` (или ваш из .env)
  - Пароль: из .env ADMIN_PASSWORD

### Проверить статус:

```bash
# PM2
pm2 status

# Логи приложения
pm2 logs digagru --lines 50

# Nginx
systemctl status nginx

# SSL
certbot certificates
```

---

## 🔄 Обновление проекта

```bash
cd /var/www/digagru

# Бэкап БД перед обновлением
cp data/agency.db /root/backups/manual_$(date +%Y%m%d_%H%M%S).db

# Остановить
pm2 stop digagru

# Обновить код
git pull origin main

# Обновить зависимости
npm install --production

# Перезапустить
pm2 restart digagru

# Проверить логи
pm2 logs digagru --lines 50
```

---

## 🔧 Полезные команды

```bash
# Перезапуск всех сервисов
pm2 restart digagru && systemctl reload nginx

# Просмотр логов в реальном времени
pm2 logs digagru

# Проверка порта 3000
curl http://localhost:3000

# Очистка логов PM2
pm2 flush

# Информация о SSL
certbot certificates

# Ручное обновление SSL
certbot renew

# Проверка DNS
dig my-webs.ru +short
```

---

## 📊 Мониторинг

### PM2 Dashboard
```bash
pm2 monit
```

### Использование ресурсов
```bash
# Диск
df -h

# Память
free -h

# Процессы
htop
```

---

## 🆘 Быстрое восстановление

### База данных не работает:
```bash
# Восстановить из бэкапа
ls -lh /root/backups/digagru/
cp /root/backups/digagru/database_YYYYMMDD_HHMMSS.db /var/www/digagru/data/agency.db
pm2 restart digagru
```

### Сайт не открывается:
```bash
# Проверить PM2
pm2 status
pm2 restart digagru

# Проверить Nginx
systemctl status nginx
systemctl reload nginx

# Проверить порты
netstat -tlnp | grep -E '(80|443|3000)'
```

### 502 Bad Gateway:
```bash
# Приложение не запущено
pm2 restart digagru

# Проверить логи
pm2 logs digagru --lines 100
```

---

## 📝 Важные пути

```
/var/www/digagru/              # Приложение
/var/www/digagru/.env          # Конфигурация
/var/www/digagru/data/         # База данных
/etc/nginx/sites-available/    # Nginx конфиг
/root/backups/digagru/         # Бэкапы
/var/log/nginx/                # Логи Nginx
```

---

## 🎯 Что дальше?

1. **Настроить Email/Telegram уведомления** в `.env`
2. **Подключить мониторинг** (UptimeRobot)
3. **Настроить Cloudflare** (опционально, для DDoS защиты)
4. **Изменить пароль админа** через админ-панель

---

## 📞 Проверка работоспособности

```bash
# Все ли работает?
pm2 status | grep digagru      # должно быть online
systemctl is-active nginx       # должно быть active
certbot certificates | grep my-webs.ru  # должен быть сертификат

# Тест HTTPS
curl -I https://my-webs.ru     # должно быть 200 OK
```

---

**Домен:** https://my-webs.ru  
**Репозиторий:** https://github.com/Sabacini/my-webs  
**Время деплоя:** ~15 минут

🤖 Автоматически сгенерировано для my-webs.ru
