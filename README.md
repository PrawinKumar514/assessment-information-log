# 📊 Assessment Log – Student Assessment Management System

A modern Student Assessment Management System developed as a DBMS academic project using React and Vite. The application provides an interactive dashboard for managing students, courses, assessments, enrollments, and academic performance while demonstrating core database management concepts such as relational schema design, primary keys, foreign keys, normalization, and many-to-many relationships.

---

## 🚀 Project Overview

Assessment Log is designed to simplify the management and analysis of academic assessment data.

The system allows users to:

- Manage student records
- Manage courses and enrollments
- Create and manage assessments
- Record and analyze student scores
- Generate academic performance reports
- Visualize data through interactive dashboards
- Explore relational database schema and entity relationships

This project demonstrates how a real-world academic assessment platform can be designed using proper DBMS principles.

---

## 🎯 Objectives

- Centralize academic assessment management
- Demonstrate relational database design
- Apply DBMS concepts in a practical application
- Analyze student performance through reports and dashboards
- Provide a user-friendly interface for academic data management

---

## 🛠️ Tech Stack

### Frontend

- React 19
- Vite
- JavaScript (JSX)
- CSS

### Libraries

- React Router DOM
- Recharts
- Lucide React

### State Management

- React Context API

### Data Source

- Mock Data (In-Memory JavaScript Arrays)

---

## 📂 Project Structure

```text
Assessment_Log
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Modal.jsx
│   │   └── StatCard.jsx
│   │
│   ├── context/
│   │   └── DataContext.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Students.jsx
│   │   ├── Courses.jsx
│   │   ├── Assessments.jsx
│   │   ├── Scores.jsx
│   │   ├── Reports.jsx
│   │   └── Schema.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── App.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

# ✨ Features

## 📈 Dashboard Module

The dashboard provides a complete overview of academic performance.

### Features

- Total Students
- Total Courses
- Total Assessments
- Average Score Percentage
- Academic Performance Insights
- Assessment Distribution Analysis

### Visualizations

- Top Performing Students
- Assessment Type Distribution
- Average Score Analytics
- Academic Performance Summary

---

## 👨‍🎓 Student Management Module

Manage student information efficiently.

### Features

- Add Student
- Edit Student
- Delete Student
- Search Students
- View Student Details
- Enrollment Information
- Academic Progress Tracking

### Student Information

- Student ID
- First Name
- Last Name
- Email
- Phone Number
- Date of Birth
- Gender
- Department

---

## 📚 Course Management Module

Manage academic courses and related information.

### Features

- Add Course
- Edit Course
- Delete Course
- Semester Filtering
- Student Count Tracking
- Credit Hour Management

### Course Information

- Course Code
- Course Name
- Credit Hours
- Semester

---

## 📝 Assessment Management Module

Manage assessments conducted for courses.

### Assessment Types

- Exams
- Quizzes
- Assignments

### Features

- Add Assessment
- Edit Assessment
- Delete Assessment
- Filter Assessments by Course
- Track Assessment Statistics

### Assessment Fields

- Assessment Title
- Assessment Type
- Maximum Score
- Weight Percentage

---

## 🎯 Score Management Module

Track and analyze student performance.

### Student View

- View Student Scores
- Calculate Percentage
- Calculate Weighted Scores
- Pass/Fail Evaluation

### Course View

- Course Performance Ranking
- Student Comparison
- Performance Analysis

---

## 📊 Reports & Analytics Module

Provides insights into academic performance.

### Features

- Top Performers Report
- Assessment Type Analysis
- Score Distribution Analysis
- Student Performance Comparison
- Course Performance Reports

### Charts

- Bar Charts
- Pie Charts
- Radar Charts

---

## 🗄️ Database Schema Module

Visual representation of database structure.

### Features

- Table Structure Visualization
- Primary Keys
- Foreign Keys
- Relationship Mapping
- Normalization Explanation

---

# 🏗️ Database Design

The application is designed around five core entities.

## Students

| Field |
|---------|
| id |
| student_number |
| first_name |
| last_name |
| email |
| phone |
| dob |
| gender |
| department |

---

## Courses

| Field |
|---------|
| id |
| course_code |
| name |
| credit_hours |
| semester |

---

## Enrollments

| Field |
|---------|
| id |
| student_id |
| course_id |

---

## Assessments

| Field |
|---------|
| id |
| course_id |
| title |
| type |
| max_score |
| weight_percent |

---

## Scores

| Field |
|---------|
| id |
| student_id |
| assessment_id |
| score |

---

# 🔗 Entity Relationships

## Many-to-Many Relationship

```text
Students ↔ Courses
```

Implemented using:

```text
Enrollments
```

---

## One-to-Many Relationships

```text
Course → Assessments

Student → Scores

Assessment → Scores
```

---

## Relationship Diagram

```text
Students
    │
    │
Enrollments
    │
    │
Courses
    │
    │
Assessments
    │
    │
Scores
```

---

# 💡 DBMS Concepts Demonstrated

### CRUD Operations

- Create
- Read
- Update
- Delete

### Keys

- Primary Keys
- Foreign Keys

### Relationships

- One-to-Many
- Many-to-Many

### Normalization

- Reduced redundancy
- Organized relational schema

### Data Integrity

- Consistent relationship mapping

---

# ⚙️ How Performance is Calculated

Each assessment contains:

```text
max_score
weight_percent
```

Formula:

```text
Assessment Percentage =
(Student Score / Maximum Score) × 100
```

The application calculates:

- Weighted Scores
- Overall Percentage
- Student Rankings
- Pass/Fail Status

---

# 📸 Screenshots

## Dashboard
<img width="1902" height="883" alt="image" src="https://github.com/user-attachments/assets/90850fbe-5efc-4831-b7ad-73928dc421c2" />

---

## Students Management
<img width="1893" height="889" alt="image" src="https://github.com/user-attachments/assets/4cc8a89c-af33-4334-b179-877b17a8d8c3" />

<img width="1896" height="886" alt="image" src="https://github.com/user-attachments/assets/233d24ee-8fd9-4534-a022-382222149bba" />

---

## Courses Management
<img width="1901" height="885" alt="image" src="https://github.com/user-attachments/assets/b68431bc-1abe-46b5-b6f7-20f7260777a9" />

<img width="1903" height="887" alt="image" src="https://github.com/user-attachments/assets/89d52371-be9e-42ac-92a6-c80e9a488f15" />

---

## Assessments Management
<img width="1898" height="885" alt="image" src="https://github.com/user-attachments/assets/866c2afa-1317-49ea-bcb9-d90961f3ac6f" />

<img width="1904" height="888" alt="image" src="https://github.com/user-attachments/assets/1b5661a0-8222-4247-9edd-52a474a874c7" />

---

## Scores Module
<img width="1898" height="888" alt="image" src="https://github.com/user-attachments/assets/7dd940f0-9eaf-43ad-bb67-ca9fa42a6c95" />

---

## Reports & Analytics
<img width="1902" height="885" alt="image" src="https://github.com/user-attachments/assets/79c80f71-a004-40b6-b5f7-3b12753669b0" />

---

## Database Schema
<img width="1903" height="885" alt="image" src="https://github.com/user-attachments/assets/0aa74945-bb1c-46fa-8775-54dc69a85722" />

<img width="1896" height="885" alt="image" src="https://github.com/user-attachments/assets/1c2bfd78-e29b-4757-aec1-e33cc7244156" />

---

# 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/PrawinKumar514/assessment-information-log.git
```

Navigate to the project:

```bash
cd assessment-information-log
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# ⚠️ Current Limitations

The current version is a frontend academic prototype.

Not implemented:

- Authentication
- Backend API
- MySQL Database
- PostgreSQL Database
- Cloud Storage
- User Roles
- Real-Time Synchronization

Data is stored in mock JavaScript arrays and resets when the application refreshes.

---

# 🔮 Future Enhancements

- MySQL Integration
- PostgreSQL Integration
- Node.js Backend
- Authentication System
- Role-Based Access Control
- Faculty Dashboard
- Student Portal
- Attendance Tracking
- PDF Report Generation
- Email Notifications
- Cloud Deployment

---
# 👨‍💻 Developer

**Prawin Kumar C**

- Aspiring Full Stack Developer
- GitHub: https://github.com/PrawinKumar514
- linedin: https://www.linkedin.com/in/prawin-kumar-974a2334b

---

# ⭐ Project Summary

Assessment Log is a Student Assessment Management System built using React and Vite that demonstrates academic data management through student, course, assessment, enrollment, and score tracking. The project showcases key DBMS concepts such as relational database design, normalization, primary and foreign keys, CRUD operations, and many-to-many relationships while providing interactive dashboards and performance analytics.
