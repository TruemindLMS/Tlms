# 🎓 TalentFlow - Learning Management System

> A modern, full-stack learning platform empowering educators and learners worldwide.

## 🌐 Live Demo
**Frontend**: [https://talentflow-eight-weld.vercel.app](https://talentflow-eight-weld.vercel.app)

---

## 📦 Repository Structure

This is a **monorepo** containing both frontend and backend applications:
 
| Directory | Tech Stack | Documentation |
|-----------|------------|---------------|
| **[frontend/](./frontend)** | Next.js 14, TypeScript, Tailwind CSS | [Frontend README](./frontend/README.md) |
| **[backend/](./backend)** | .NET 8, C#, SQL Server | [Backend README](./backend/README.md) |

---

## 🚀 Quick Overview

**TalentFlow** delivers:
- 📚 **Course Management** – Create, browse, and enroll in courses
- 👥 **User Roles** – Students, Instructors, and Administrators
- 📊 **Progress Tracking** – Real-time lesson completion
- 🔐 **Secure Auth** – JWT-based authentication
- 📱 **Responsive Design** – Works on all devices

---

## 🛠️ Tech Stack at a Glance

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: TanStack Query + Zustand

### Backend
- **Framework**: ASP.NET Core 8
- **Language**: C#
- **Database**: SQL Server / PostgreSQL
- **ORM**: Entity Framework Core

---

## 🏃‍♂️ Running the Project

### Prerequisites
- Node.js 18+
- .NET 8 SDK
- SQL Server or PostgreSQL

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/talentflow.git
cd talentflow

# Set up backend
cd backend
# Follow instructions in backend/README.md

# Set up frontend (new terminal)
cd ../frontend
# Follow instructions in frontend/README.md