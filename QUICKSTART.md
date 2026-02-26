# Quick Start Guide - AI Exam Seating System

## 🚀 Get Started in 5 Minutes

### Prerequisites Check
```bash
node --version    # Should be v18 or higher
python --version  # Should be 3.9 or higher
mongod --version  # Should be 6.0 or higher
```

### Step 1: Clone/Download Project
```bash
cd C:\
# Your project is at: C:\ai-exam-seating
```

### Step 2: Start MongoDB
```bash
# Windows
mongod --dbpath C:\data\db

# Linux/Mac
sudo systemctl start mongodb
```

### Step 3: Setup Backend
```bash
cd C:\ai-exam-seating\backend
npm install
# Server will start on http://localhost:5000
npm run dev
```

### Step 4: Setup AI Engine
```bash
# Open new terminal
cd C:\ai-exam-seating\ai-engine
pip install -r requirements.txt
# AI Engine will start on http://localhost:8000
python api.py
```

### Step 5: Setup Frontend
```bash
# Open new terminal
cd C:\ai-exam-seating\frontend
npm install
# Frontend will start on http://localhost:3000
npm run dev
```

### Step 6: Access Application
Open browser: http://localhost:3000

---

## 📝 First Time Usage

### 1. Register Admin Account
- Click on the login page
- Use these credentials to register:
  - Username: admin
  - Email: admin@test.com
  - Password: admin123

### 2. Upload Students
- Navigate to "Upload Students"
- Use the provided `sample-students.csv` file
- Click Upload

### 3. Add Exam Hall
- Go to "Manage Halls"
- Add a hall:
  - Hall Name: Main Hall
  - Capacity: 60
  - Rows: 10
  - Columns: 6
- Click "Add Hall"

### 4. Generate Seating
- Click "Generate Seating"
- Select today's date
- Enter Subject: Mathematics
- Click "Generate with AI"
- Wait 2-3 seconds for AI processing

### 5. View Results
- Click "View Plans"
- Select the generated plan
- Click "PDF" to download

---

## 🔧 Troubleshooting

### MongoDB Not Starting
```bash
# Create data directory
mkdir C:\data\db

# Start MongoDB
mongod --dbpath C:\data\db
```

### Port Already in Use
```bash
# Kill process on port 5000 (Backend)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 3000 (Frontend)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Python Module Not Found
```bash
cd ai-engine
pip install --upgrade pip
pip install -r requirements.txt
```

### Cannot Connect to Backend
- Check if backend is running on port 5000
- Check if MongoDB is running
- Verify .env file exists in backend folder

---

## 📊 Test Data

### Sample CSV Format
```csv
registerNumber,name,department,subject
2021001,John Doe,CSE,Mathematics
2021002,Jane Smith,ECE,Mathematics
2021003,Mike Johnson,MECH,Mathematics
```

### Sample Hall Configuration
- **Small Hall**: 30 capacity, 5 rows, 6 columns
- **Medium Hall**: 60 capacity, 10 rows, 6 columns
- **Large Hall**: 100 capacity, 10 rows, 10 columns

---

## 🎯 Common Tasks

### Add More Students
1. Prepare CSV file with format above
2. Go to "Upload Students"
3. Upload file (replaces existing data)

### Add Multiple Halls
1. Go to "Manage Halls"
2. Add each hall one by one
3. Ensure unique hall names

### Regenerate Seating
1. Go to "Generate Seating"
2. Enter new date/subject
3. Generate new plan
4. Old plans are preserved

### Download PDF
1. Go to "View Plans"
2. Select plan from list
3. Click "PDF" button
4. File downloads automatically

---

## 📱 System URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **AI Engine**: http://localhost:8000
- **MongoDB**: mongodb://localhost:27017

---

## 🔐 Default Credentials

**Admin Account** (Create on first use)
- Email: admin@test.com
- Password: admin123

**Note**: Change password after first login in production!

---

## 📦 Project Structure Quick Reference

```
ai-exam-seating/
├── backend/          → Node.js API (Port 5000)
├── frontend/         → React UI (Port 3000)
├── ai-engine/        → Python AI (Port 8000)
├── sample-students.csv
└── README.md
```

---

## 🎓 Video Tutorial Steps

1. **00:00** - Introduction
2. **01:00** - Installation
3. **03:00** - Starting Services
4. **05:00** - Admin Registration
5. **07:00** - Upload Students
6. **09:00** - Add Halls
7. **11:00** - Generate Seating
8. **13:00** - View & Download PDF
9. **15:00** - Manual Override
10. **17:00** - Conclusion

---

## 💡 Pro Tips

1. **Keep MongoDB Running**: Start it first before other services
2. **Use PM2 in Production**: For automatic restarts
3. **Backup Database**: Regular backups prevent data loss
4. **Monitor Logs**: Check console for errors
5. **Test with Small Data**: Start with 10-20 students

---

## 🆘 Need Help?

### Check Logs
```bash
# Backend logs
cd backend
npm run dev

# AI Engine logs
cd ai-engine
python api.py

# Frontend logs
cd frontend
npm run dev
```

### Common Error Messages

**"MongoDB connection error"**
→ Start MongoDB service

**"Port 5000 already in use"**
→ Kill process or change port in .env

**"Module not found"**
→ Run npm install or pip install

**"Authentication failed"**
→ Check if token is valid, try logging in again

---

## 🎉 Success Checklist

- [ ] MongoDB running
- [ ] Backend API responding at :5000
- [ ] AI Engine responding at :8000
- [ ] Frontend loaded at :3000
- [ ] Admin account created
- [ ] Students uploaded
- [ ] Hall added
- [ ] Seating plan generated
- [ ] PDF downloaded

---

## 📞 Support

- **Documentation**: See README.md
- **Technical Details**: See TECHNICAL_DOCS.md
- **Deployment**: See DEPLOYMENT.md

---

**Happy Coding! 🚀**

Made with ❤️ for Smart Education
