# ⚡ Быстрый деплой DigAgRu

Краткая шпаргалка для опытных пользователей. Полная инструкция: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🚀 За 10 минут

### 1. Подготовка сервера (Ubuntu 20.04+)

```bash
# Обновление системы
apt update && apt upgrade -y

# Установка Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx certbot python3-certbot-nginx

# Установка PM2
npm install -g pm2

# Настройка firewall
ufw allow 22/tcp && ufw allow 80/tcp && ufw allow 443/tcp && ufw enable
```

### 2. Деплой приложения

```bash
# Клонирование
mkdir -p /var/www && cd /var/www
git clone https://github.com/Sabacini/my-webs.git digagru
cd digagru

# Установка зависимостей
npm install --production

# Конфигурация
cp .env.example .env
nano .env  # Изменить SESSION_SECRET, ADMIN_PASSWORD, SITE_URL
```

### 3. Nginx конфиг

```bash
# Создать конфиг
cat > /etc/nginx/sites-available/digagru << 'NGINX'
upstream nodejs_backend {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
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
rm /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

### 4. SSL сертификат

```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 5. PM2 запуск

```bash
cd /var/www/digagru
pm2 start server/index.js --name digagru
pm2 save
pm2 startup  # Выполнить команду которую выдаст PM2
```

### 6. Автобэкап (опционально)

```bash
mkdir -p /root/backups
cat > /root/backups/backup.sh << 'BACKUP'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups/digagru"
mkdir -p $BACKUP_DIR
cp /var/www/digagru/data/agency.db $BACKUP_DIR/database_$DATE.db
find $BACKUP_DIR -name "database_*.db" -mtime +7 -delete
BACKUP

chmod +x /root/backups/backup.sh
(crontab -l 2>/dev/null; echo "0 3 * * * /root/backups/backup.sh") | crontab -
```

---

## ✅ Проверка

```bash
# Статус PM2
pm2 status

# Логи
pm2 logs digagru --lines 50

# Открыть в браузере
https://yourdomain.com
https://yourdomain.com/admin
```

---

## 🔄 Обновление

```bash
cd /var/www/digagru
pm2 stop digagru
git pull origin main
npm install --production
pm2 restart digagru
```

---

## 📝 Важные файлы

```
/var/www/digagru/.env              # Конфигурация
/var/www/digagru/data/agency.db    # База данных
/etc/nginx/sites-available/digagru # Nginx конфиг
/root/backups/digagru/             # Бэкапы
```

---

## 🆘 Быстрый фикс

```bash
# Перезапуск всего
pm2 restart digagru
systemctl reload nginx

# Очистка логов
pm2 flush

# Проверка портов
netstat -tlnp | grep -E '(80|443|3000)'
```

---

**💡 Совет:** Всегда делайте бэкап перед обновлением!

```bash
cp /var/www/digagru/data/agency.db /root/backups/manual_$(date +%Y%m%d_%H%M%S).db
```
