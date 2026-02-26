# Technical Documentation - AI Exam Seating System

## Table of Contents
1. System Architecture
2. Database Schema
3. API Documentation
4. AI Algorithm Details
5. Frontend Components
6. Security Implementation
7. Testing Guide

---

## 1. System Architecture

### Three-Tier Architecture

**Presentation Layer (Frontend)**
- React.js with Tailwind CSS
- Component-based architecture
- State management with React hooks
- Axios for API communication

**Application Layer (Backend)**
- Express.js REST API
- JWT authentication middleware
- Multer for file uploads
- PDFKit for document generation

**Data Layer**
- MongoDB for persistent storage
- Mongoose ODM for schema validation
- Indexed queries for performance

**AI Processing Layer**
- Python FastAPI microservice
- Constraint satisfaction algorithm
- Independent scaling capability

### Communication Flow
```
User → React UI → Express API → MongoDB
                      ↓
                 Python AI Engine
```

---

## 2. Database Schema Details

### Admin Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  createdAt: Date (default: now)
}
```

### Student Collection
```javascript
{
  _id: ObjectId,
  registerNumber: String (unique, required),
  name: String (required),
  department: String (required),
  subject: String (required),
  uploadedAt: Date (default: now)
}
```

### ExamHall Collection
```javascript
{
  _id: ObjectId,
  hallName: String (unique, required),
  capacity: Number (required),
  rows: Number (required),
  columns: Number (required),
  isActive: Boolean (default: true),
  createdAt: Date (default: now)
}
```

### SeatingPlan Collection
```javascript
{
  _id: ObjectId,
  examDate: Date (required),
  subject: String (required),
  seatingArrangement: [{
    hallId: ObjectId (ref: ExamHall),
    hallName: String,
    seats: [{
      row: Number,
      column: Number,
      studentId: ObjectId (ref: Student),
      registerNumber: String,
      name: String,
      department: String
    }]
  }],
  totalStudents: Number (required),
  generatedAt: Date (default: now),
  status: String (enum: ['draft', 'finalized'])
}
```

---

## 3. API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register new admin user

**Request Body:**
```json
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "admin": {
    "id": "admin_id",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

#### POST /api/auth/login
Login admin user

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "admin": {
    "id": "admin_id",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

### Student Endpoints

#### POST /api/students/upload
Upload students via CSV (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body:**
- file: CSV file

**Response:**
```json
{
  "message": "Students uploaded successfully",
  "count": 50
}
```

#### GET /api/students
Get all students (requires authentication)

**Response:**
```json
[
  {
    "_id": "student_id",
    "registerNumber": "2021001",
    "name": "John Doe",
    "department": "CSE",
    "subject": "Mathematics"
  }
]
```

### Hall Endpoints

#### POST /api/halls
Create new exam hall (requires authentication)

**Request Body:**
```json
{
  "hallName": "Hall A",
  "capacity": 60,
  "rows": 10,
  "columns": 6
}
```

#### GET /api/halls
Get all halls (requires authentication)

### Seating Endpoints

#### POST /api/seating/generate
Generate seating plan using AI (requires authentication)

**Request Body:**
```json
{
  "examDate": "2024-06-15",
  "subject": "Mathematics"
}
```

**Response:**
```json
{
  "message": "Seating plan generated",
  "plan": {
    "_id": "plan_id",
    "examDate": "2024-06-15",
    "subject": "Mathematics",
    "seatingArrangement": [...],
    "totalStudents": 50
  }
}
```

#### GET /api/seating/:id/pdf
Download seating plan as PDF (requires authentication)

**Response:** PDF file download

---

## 4. AI Algorithm Details

### Constraint Satisfaction Problem (CSP)

**Variables:** Student positions in halls
**Domains:** Available seats in all halls
**Constraints:**
1. Adjacent seats must have different departments
2. Consecutive roll numbers cannot be adjacent
3. Each seat can have only one student
4. Students must fit within hall capacity

### Algorithm Pseudocode

```python
function allocate_seats(students, halls):
    shuffle(students)  # Randomize for better distribution
    allocation = []
    
    for each hall in halls:
        grid = create_empty_grid(hall.rows, hall.columns)
        positions = get_all_positions(grid)
        shuffle(positions)
        
        for each position in positions:
            if no_more_students():
                break
            
            student = get_next_student()
            
            if is_valid_placement(grid, position, student):
                place_student(grid, position, student)
                add_to_allocation(allocation, hall, position, student)
            else:
                continue  # Try next position
        
        if students_remaining():
            return retry_with_relaxed_constraints()
    
    return allocation

function is_valid_placement(grid, position, student):
    neighbors = get_adjacent_positions(position)
    
    for each neighbor in neighbors:
        if neighbor_occupied(grid, neighbor):
            neighbor_student = get_student_at(grid, neighbor)
            
            # Check department constraint
            if neighbor_student.department == student.department:
                return false
            
            # Check roll number constraint
            if is_consecutive_roll(neighbor_student, student):
                return false
    
    return true
```

### Time Complexity
- Best Case: O(n) where n = number of students
- Average Case: O(n * m) where m = average seats per hall
- Worst Case: O(n * m * k) where k = retry attempts

### Space Complexity
- O(n + h) where n = students, h = halls

---

## 5. Frontend Components

### Component Hierarchy
```
App
├── Login
└── Dashboard
    ├── StudentUpload
    ├── HallManagement
    ├── SeatingGeneration
    └── SeatingChart
```

### State Management
- Local state with useState
- No global state management (suitable for small-medium apps)
- Token stored in localStorage

### API Integration
- Centralized API service (services/api.js)
- Axios interceptors for authentication
- Error handling with try-catch

---

## 6. Security Implementation

### Authentication
- JWT tokens with 7-day expiration
- Bcrypt password hashing (10 rounds)
- Token stored in localStorage
- Authorization header for protected routes

### Input Validation
- Required field validation
- Email format validation
- File type validation (CSV only)
- Mongoose schema validation

### Security Headers
- CORS enabled with origin restrictions
- JSON body parser with size limits
- File upload size restrictions

---

## 7. Testing Guide

### Backend Testing

#### Test Admin Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@test.com","password":"test123"}'
```

#### Test Student Upload
```bash
curl -X POST http://localhost:5000/api/students/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@sample-students.csv"
```

#### Test Seating Generation
```bash
curl -X POST http://localhost:5000/api/seating/generate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"examDate":"2024-06-15","subject":"Mathematics"}'
```

### Frontend Testing
1. Open http://localhost:3000
2. Register/Login with admin credentials
3. Upload sample CSV file
4. Add exam halls
5. Generate seating plan
6. View and download PDF

### AI Engine Testing
```bash
curl -X POST http://localhost:8000/allocate \
  -H "Content-Type: application/json" \
  -d '{
    "students": [{"id":"1","registerNumber":"2021001","name":"John","department":"CSE"}],
    "halls": [{"id":"1","hallName":"Hall A","rows":5,"columns":6,"capacity":30}]
  }'
```

---

## Performance Optimization

### Backend
- Database indexing on frequently queried fields
- Connection pooling for MongoDB
- Async/await for non-blocking operations

### Frontend
- Code splitting with React.lazy
- Memoization with useMemo/useCallback
- Optimized re-renders

### AI Engine
- Efficient grid traversal
- Early termination on constraint satisfaction
- Randomization for better distribution

---

## Error Handling

### Backend Errors
- 400: Bad Request (validation errors)
- 401: Unauthorized (authentication failed)
- 404: Not Found (resource doesn't exist)
- 500: Internal Server Error (server issues)

### Frontend Error Display
- Toast notifications for user feedback
- Form validation messages
- API error handling with user-friendly messages

---

## Future Improvements

### Phase 1 (Short-term)
- Unit tests with Jest/Mocha
- Integration tests
- API documentation with Swagger
- Logging with Winston

### Phase 2 (Medium-term)
- Redis caching for performance
- WebSocket for real-time updates
- Email notifications
- Advanced analytics dashboard

### Phase 3 (Long-term)
- Machine learning for pattern optimization
- Mobile application (React Native)
- Multi-tenant support
- Microservices architecture

---

## Maintenance Guide

### Regular Tasks
- Database backup (daily)
- Log rotation (weekly)
- Security updates (monthly)
- Performance monitoring (continuous)

### Monitoring Metrics
- API response time
- Database query performance
- Error rates
- User activity

---

## Support & Contribution

### Reporting Issues
1. Check existing issues
2. Provide detailed description
3. Include error logs
4. Specify environment details

### Contributing
1. Fork repository
2. Create feature branch
3. Write tests
4. Submit pull request

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Maintained By:** Development Team
