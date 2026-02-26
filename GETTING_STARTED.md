# 🚀 Getting Started - AI Exam Seating System

## Welcome! 👋

This guide will help you get the AI Exam Seating System up and running in minutes.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- ✅ **Python** (v3.9 or higher) - [Download](https://www.python.org/)
- ✅ **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- ✅ **Git** (optional) - [Download](https://git-scm.com/)

### Check Your Installation

Open Command Prompt and run:

```bash
node --version
# Should show: v18.x.x or higher

python --version
# Should show: Python 3.9.x or higher

mongod --version
# Should show: db version v6.x.x or higher
```

---

## 🎯 Two Ways to Install

### Option 1: Automatic Installation (Recommended)

1. **Navigate to project folder**
   ```bash
   cd C:\ai-exam-seating
   ```

2. **Run installation script**
   ```bash
   install.bat
   ```
   
   This will automatically install all dependencies for:
   - Backend (Node.js packages)
   - Frontend (React packages)
   - AI Engine (Python packages)

3. **Wait for completion** (2-5 minutes depending on internet speed)

### Option 2: Manual Installation

#### Backend Setup
```bash
cd C:\ai-exam-seating\backend
npm install
```

#### Frontend Setup
```bash
cd C:\ai-exam-seating\frontend
npm install
```

#### AI Engine Setup
```bash
cd C:\ai-exam-seating\ai-engine
pip install -r requirements.txt
```

---

## 🚀 Running the Application

### Option 1: Automatic Startup (Recommended)

1. **Ensure MongoDB is running**
   ```bash
   mongod --dbpath C:\data\db
   ```
   
   (Keep this terminal open)

2. **Run startup script**
   ```bash
   cd C:\ai-exam-seating
   start.bat
   ```
   
   This will open 4 terminal windows:
   - MongoDB (if not already running)
   - Backend Server (Port 5000)
   - AI Engine (Port 8000)
   - Frontend (Port 3000)

3. **Access the application**
   
   Open your browser and go to: **http://localhost:3000**

### Option 2: Manual Startup

Open **4 separate terminal windows**:

#### Terminal 1 - MongoDB
```bash
mongod --dbpath C:\data\db
```

#### Terminal 2 - Backend
```bash
cd C:\ai-exam-seating\backend
npm run dev
```

#### Terminal 3 - AI Engine
```bash
cd C:\ai-exam-seating\ai-engine
python api.py
```

#### Terminal 4 - Frontend
```bash
cd C:\ai-exam-seating\frontend
npm run dev
```

---

## 🎓 First Time Usage

### Step 1: Register Admin Account

1. Open http://localhost:3000
2. You'll see the login page
3. Register a new admin account:
   - **Username**: admin
   - **Email**: admin@test.com
   - **Password**: admin123
4. Click "Register" (or use login if already registered)

### Step 2: Upload Students

1. Click **"Upload Students"** button on dashboard
2. Select the provided **sample-students.csv** file
3. Click **"Upload"**
4. You should see: "Success: 10 students uploaded"

### Step 3: Add Exam Hall

1. Click **"Manage Halls"** button
2. Fill in the form:
   - **Hall Name**: Main Hall
   - **Capacity**: 60
   - **Rows**: 10
   - **Columns**: 6
3. Click **"Add Hall"**

### Step 4: Generate Seating Plan

1. Click **"Generate Seating"** button
2. Fill in the form:
   - **Exam Date**: Select today's date
   - **Subject**: Mathematics
3. Click **"Generate with AI"**
4. Wait 2-3 seconds for AI processing
5. You'll see: "Seating plan generated successfully!"

### Step 5: View and Download

1. Click **"View Plans"** button
2. Select the generated plan from the list
3. View the seating arrangement
4. Click **"PDF"** to download the seating chart

---

## 📊 Understanding the Dashboard

When you login, you'll see:

### Statistics Cards
- **Total Students**: Number of students uploaded
- **Total Halls**: Number of exam halls configured
- **Seating Plans**: Number of plans generated

### Quick Action Buttons
- **Upload Students**: Add student data via CSV
- **Manage Halls**: Create/edit exam halls
- **Generate Seating**: Create new seating plan with AI
- **View Plans**: See all generated plans

---

## 📁 Project Structure Overview

```
ai-exam-seating/
├── backend/          → Node.js API Server
├── frontend/         → React User Interface
├── ai-engine/        → Python AI Algorithm
├── sample-students.csv → Test data
├── install.bat       → Installation script
├── start.bat         → Startup script
└── README.md         → Documentation
```

---

## 🔧 Configuration

### Backend Configuration

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/exam-seating
JWT_SECRET=your_secret_key_here
AI_ENGINE_URL=http://localhost:8000
```

### Frontend Configuration

The frontend automatically connects to:
- Backend: http://localhost:5000
- (Edit `frontend/src/services/api.js` to change)

---

## 🐛 Common Issues & Solutions

### Issue 1: MongoDB Connection Error

**Error**: "MongoDB connection error"

**Solution**:
```bash
# Create data directory
mkdir C:\data\db

# Start MongoDB
mongod --dbpath C:\data\db
```

### Issue 2: Port Already in Use

**Error**: "Port 5000 already in use"

**Solution**:
```bash
# Find process using port
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID_NUMBER> /F
```

### Issue 3: Module Not Found

**Error**: "Cannot find module..."

**Solution**:
```bash
# Reinstall dependencies
cd backend
npm install

cd ../frontend
npm install

cd ../ai-engine
pip install -r requirements.txt
```

### Issue 4: Python Not Found

**Error**: "'python' is not recognized"

**Solution**:
- Try using `python3` instead of `python`
- Or add Python to system PATH

### Issue 5: AI Engine Not Responding

**Error**: "AI generation failed"

**Solution**:
1. Check if AI Engine is running on port 8000
2. Visit http://localhost:8000 - should show: "AI Seating Engine Running"
3. Restart AI Engine if needed

---

## 📝 CSV File Format

Your CSV file should have these columns:

```csv
registerNumber,name,department,subject
2021001,John Doe,CSE,Mathematics
2021002,Jane Smith,ECE,Mathematics
2021003,Mike Johnson,MECH,Mathematics
```

**Important**:
- First row must be headers
- No spaces in column names
- Use comma as separator
- Save as UTF-8 encoding

---

## 🎨 Features Overview

### 1. Authentication
- Secure login/register
- JWT token-based
- Password encryption

### 2. Student Management
- Bulk CSV upload
- View all students
- Delete students

### 3. Hall Management
- Add exam halls
- Configure capacity and layout
- Edit/delete halls

### 4. AI Seating Generation
- Automatic seat allocation
- Constraint satisfaction
- Department distribution
- Roll number separation

### 5. Seating Plans
- View generated plans
- Hall-wise breakdown
- Student details
- PDF export

### 6. Dashboard
- Real-time statistics
- Quick navigation
- User-friendly interface

---

## 🔐 Security Notes

### Default Credentials
After registration, you can use:
- **Email**: admin@test.com
- **Password**: admin123

**⚠️ Important**: Change these in production!

### Security Features
- Passwords are hashed (bcrypt)
- JWT tokens expire in 7 days
- Protected API routes
- Input validation

---

## 📚 Additional Resources

### Documentation Files
- **README.md** - Complete project documentation
- **QUICKSTART.md** - Quick setup guide
- **TECHNICAL_DOCS.md** - Technical details
- **DEPLOYMENT.md** - Production deployment
- **PROJECT_PRESENTATION.md** - Academic presentation

### Sample Data
- **sample-students.csv** - 10 test students

### Scripts
- **install.bat** - Install all dependencies
- **start.bat** - Start all services

---

## 🎯 Next Steps

### For Development
1. Explore the code structure
2. Modify constraints in AI algorithm
3. Customize UI components
4. Add new features

### For Production
1. Read DEPLOYMENT.md
2. Configure environment variables
3. Set up proper database
4. Deploy to cloud platform

### For Presentation
1. Read PROJECT_PRESENTATION.md
2. Prepare demo
3. Understand AI algorithm
4. Practice explaining features

---

## 💡 Tips for Success

1. **Keep MongoDB Running**: Always start MongoDB first
2. **Check Ports**: Ensure ports 3000, 5000, 8000 are free
3. **Use Sample Data**: Test with sample-students.csv first
4. **Read Error Messages**: They usually tell you what's wrong
5. **Check Console Logs**: Look at terminal output for errors

---

## 🆘 Getting Help

### Check Documentation
1. README.md - Main documentation
2. QUICKSTART.md - Quick reference
3. TECHNICAL_DOCS.md - Deep dive

### Debug Steps
1. Check if all services are running
2. Look at terminal error messages
3. Verify MongoDB connection
4. Test API endpoints individually

### Common Commands
```bash
# Check if services are running
netstat -ano | findstr :3000
netstat -ano | findstr :5000
netstat -ano | findstr :8000

# Restart a service
# Close terminal and run start.bat again
```

---

## ✅ Verification Checklist

Before using the system, verify:

- [ ] MongoDB is running
- [ ] Backend responds at http://localhost:5000
- [ ] AI Engine responds at http://localhost:8000
- [ ] Frontend loads at http://localhost:3000
- [ ] Can register/login
- [ ] Can upload CSV
- [ ] Can add hall
- [ ] Can generate seating
- [ ] Can download PDF

---

## 🎉 You're Ready!

If you've completed all steps, you now have a fully functional AI-powered exam seating arrangement system!

### What You Can Do Now:
- ✅ Upload student data
- ✅ Configure exam halls
- ✅ Generate AI-based seating plans
- ✅ Download PDF reports
- ✅ Manage multiple exams

### Explore More:
- Customize the AI algorithm
- Modify the UI design
- Add new features
- Deploy to production

---

## 📞 Support

For issues or questions:
- Check documentation files
- Review error messages
- Test with sample data
- Verify all services are running

---

**Happy Learning! 🚀**

Made with ❤️ for Smart Education

---

**Quick Reference Card**

```
Installation:  install.bat
Start System:  start.bat
Access App:    http://localhost:3000
Backend API:   http://localhost:5000
AI Engine:     http://localhost:8000
Sample Data:   sample-students.csv
```
