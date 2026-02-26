# Deployment Guide

## Local Development

### 1. Start MongoDB
```bash
mongod --dbpath C:\data\db
```

### 2. Start Backend
```bash
cd backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

### 3. Start AI Engine
```bash
cd ai-engine
pip install -r requirements.txt
python api.py
# AI Engine runs on http://localhost:8000
```

### 4. Start Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

## Production Deployment

### Option 1: Traditional VPS (DigitalOcean/AWS EC2)

#### Backend Deployment
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Deploy backend
cd backend
npm install --production
pm2 start server.js --name exam-backend
pm2 save
pm2 startup
```

#### AI Engine Deployment
```bash
# Install Python
sudo apt-get install python3 python3-pip

# Deploy AI engine
cd ai-engine
pip3 install -r requirements.txt
pm2 start "python3 api.py" --name ai-engine
```

#### Frontend Deployment
```bash
cd frontend
npm run build
# Serve with nginx or deploy to Vercel/Netlify
```

### Option 2: Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

#### AI Engine Dockerfile
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "api.py"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
  
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/exam-seating
    depends_on:
      - mongodb
  
  ai-engine:
    build: ./ai-engine
    ports:
      - "8000:8000"
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mongo-data:
```

### Option 3: Cloud Platform Specific

#### Heroku (Backend)
```bash
heroku create exam-seating-backend
heroku addons:create mongolab
git push heroku main
```

#### Vercel (Frontend)
```bash
cd frontend
vercel --prod
```

#### AWS Lambda (AI Engine)
Use Serverless Framework or AWS SAM

## Environment Configuration

### Production .env
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/exam-seating
JWT_SECRET=super_secure_random_string_here
AI_ENGINE_URL=https://your-ai-engine.com
NODE_ENV=production
```

## Security Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Enable HTTPS/SSL
- [ ] Set up firewall rules
- [ ] Enable MongoDB authentication
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for trusted domains
- [ ] Set up rate limiting
- [ ] Enable logging and monitoring

## Monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
```

### Health Check Endpoints
- Backend: `GET /`
- AI Engine: `GET /`

## Backup Strategy

### MongoDB Backup
```bash
mongodump --uri="mongodb://localhost:27017/exam-seating" --out=/backup
```

### Automated Backup Script
```bash
#!/bin/bash
DATE=$(date +%Y%m%d)
mongodump --uri="$MONGODB_URI" --out=/backup/$DATE
```

## Scaling Considerations

1. **Horizontal Scaling**: Use load balancer (nginx/AWS ALB)
2. **Database**: MongoDB Atlas with replica sets
3. **Caching**: Implement Redis for session management
4. **CDN**: Use CloudFront/Cloudflare for static assets

## Troubleshooting

### Check Service Status
```bash
pm2 status
systemctl status mongodb
```

### View Logs
```bash
pm2 logs exam-backend
tail -f /var/log/mongodb/mongod.log
```

### Restart Services
```bash
pm2 restart all
sudo systemctl restart mongodb
```
