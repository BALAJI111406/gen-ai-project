# AI-Based Smart Exam Seating Arrangement System

## 🎯 Project Overview
A production-ready web application that automatically generates optimal exam seating arrangements using AI-powered constraint satisfaction algorithms.

> **Note:** The frontend now provides both **Login** and **Register** forms. If you don't have an admin account yet, click the Register link from the login screen to create the first user.


## 🏗️ System Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   React.js  │ ◄─────► │  Express.js │ ◄─────► │   MongoDB   │
│  Frontend   │         │   Backend   │         │  Database   │
└─────────────┘         └─────────────┘         └─────────────┘
                               │
                               ▼
                        ┌─────────────┐
                        │   Python    │
                        │ AI Engine   │
                        └─────────────┘
```

## 📊 ER Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│    Admin     │       │   Student    │       │  ExamHall    │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ _id          │       │ _id          │       │ _id          │
│ username     │       │ registerNo   │       │ hallName     │
│ email        │       │ name         │       │ capacity     │
│ password     │       │ department   │       │ rows         │
│ createdAt    │       │ subject      │       │ columns      │
└──────────────┘       └──────────────┘       └──────────────┘
                               │                      │
                               └──────────┬───────────┘
                                          │
                                   ┌──────────────┐
                                   │ SeatingPlan  │
                                   ├──────────────┤
                                   │ _id          │
                                   │ examDate     │
                                   │ subject      │
                                   │ arrangement  │
                                   │ totalStudents│
                                   │ status       │
                                   └──────────────┘
```

## 🚀 Tech Stack

- **Frontend**: React.js + Tailwind CSS + Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **AI Engine**: Python (FastAPI)
- **Authentication**: JWT
- **PDF Generation**: PDFKit

## 📁 Project Structure

```
ai-exam-seating/
├── backend/
│   ├── config/          # Database & JWT config
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   ├── utils/           # PDF generator
│   └── server.js        # Main server
├── frontend/
│   └── src/
│       ├── components/  # React components
│       ├── services/    # API calls
│       └── App.jsx      # Main app
├── ai-engine/
│   ├── seating_algorithm.py  # AI logic
│   └── api.py                # FastAPI server
└── sample-students.csv
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- MongoDB (v6+)

### Backend Setup
```bash
cd backend
npm install
# Create .env file with your configuration
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### AI Engine Setup
```bash
cd ai-engine
pip install -r requirements.txt
python api.py
```

## 🔐 Environment Variables

Create `.env` in backend folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/exam-seating
JWT_SECRET=your_secret_key_here
AI_ENGINE_URL=http://localhost:8000
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Login admin

### Students
- `POST /api/students/upload` - Upload CSV
- `GET /api/students` - Get all students
- `DELETE /api/students/:id` - Delete student

### Halls
- `POST /api/halls` - Create hall
- `GET /api/halls` - Get all halls
- `PUT /api/halls/:id` - Update hall
- `DELETE /api/halls/:id` - Delete hall

### Seating
- `POST /api/seating/generate` - Generate plan
- `GET /api/seating` - Get all plans
- `GET /api/seating/:id` - Get plan by ID
- `GET /api/seating/:id/pdf` - Download PDF
- `PUT /api/seating/:id/override` - Manual override
- `GET /api/seating/stats/dashboard` - Get stats

## 🤖 AI Algorithm

### Constraint Satisfaction Approach

**Primary Constraints:**
1. No adjacent seats with same department
2. No consecutive roll numbers nearby
3. Even distribution of departments
4. Maximum space utilization

**Algorithm Flow:**
```
1. Shuffle students randomly
2. For each hall:
   a. Create grid layout
   b. For each position:
      - Check adjacency constraints
      - Check roll number constraints
      - Place student if valid
3. If constraints fail:
   - Retry with relaxed constraints
   - Use greedy allocation
```

**Key Features:**
- O(n*m) time complexity where n=students, m=seats
- Backtracking for constraint violations
- Automatic retry mechanism
- Optimized for large datasets

## 🎨 Features

✅ JWT-based authentication  
✅ CSV bulk upload  
✅ Dynamic hall management  
✅ AI-powered seating allocation  
✅ Real-time dashboard statistics  
✅ PDF export functionality  
✅ Manual override capability  
✅ Responsive UI design  
✅ Error handling & validation  

## 📊 Workflow

```
1. Admin Login
   ↓
2. Upload Student CSV
   ↓
3. Add Exam Halls
   ↓
4. Generate Seating (AI)
   ↓
5. View/Download Plan
   ↓
6. Manual Override (Optional)
```

## 🎓 Usage Guide

### Step 1: Register/Login
- Access the application at `http://localhost:3000`
- Login with admin credentials

### Step 2: Upload Students
- Navigate to "Upload Students"
- Select CSV file (format: registerNumber, name, department, subject)
- Upload file

### Step 3: Add Halls
- Go to "Manage Halls"
- Add hall details (name, capacity, rows, columns)

### Step 4: Generate Seating
- Click "Generate Seating"
- Select exam date and subject
- AI will allocate seats automatically

### Step 5: View & Download
- View seating arrangement
- Download PDF for printing

## 🔮 Future Enhancements

1. **AI Improvements**
   - Genetic algorithm implementation
   - Machine learning for pattern recognition
   - Multi-objective optimization

2. **Features**
   - Email notifications
   - QR code generation for seats
   - Mobile app
   - Real-time collaboration
   - Historical analytics

3. **Scalability**
   - Redis caching
   - Microservices architecture
   - Load balancing
   - Cloud deployment (AWS/Azure)

## 🚀 Deployment

### Backend (Node.js)
```bash
# Build
npm install --production

# Deploy to Heroku/AWS/DigitalOcean
# Set environment variables
# Start with PM2
pm2 start server.js
```

### Frontend (React)
```bash
# Build
npm run build

# Deploy to Vercel/Netlify
# Or serve with nginx
```

### AI Engine (Python)
```bash
# Deploy with Docker
docker build -t ai-engine .
docker run -p 8000:8000 ai-engine

# Or use Gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker api:app
```

### Database (MongoDB)
- Use MongoDB Atlas for cloud hosting
- Or self-host with proper backup strategy

## 📄 CSV Format

```csv
registerNumber,name,department,subject
2021001,John Doe,CSE,Mathematics
2021002,Jane Smith,ECE,Mathematics
```

## 🛡️ Security Features

- Password hashing (bcrypt)
- JWT token authentication
- CORS protection
- Input validation
- SQL injection prevention (NoSQL)

## 🐛 Troubleshooting

**MongoDB Connection Error:**
```bash
# Ensure MongoDB is running
mongod --dbpath /data/db
```

**AI Engine Not Responding:**
```bash
# Check if Python server is running
python ai-engine/api.py
```

**Port Already in Use:**
```bash
# Change port in .env file
PORT=5001
```

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Email: support@example.com

## 📜 License

MIT License - Free for educational and commercial use

## 👥 Contributors

- Your Name - Full Stack Developer

## 🎉 Acknowledgments

- Built for Final Year Engineering Project
- Suitable for college exam management
- Production-ready architecture

---

**Made with ❤️ for Smart Education**
#   g e n - a i - p r o j e c t  
 