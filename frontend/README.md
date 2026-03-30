# 🎨 TalentFlow Frontend

Next.js 14 + TypeScript + Tailwind CSS application for the TalentFlow Learning Management System.

## 🌐 Live Demo
**Frontend**: [https://talentflow-eight-weld.vercel.app] (https://talentflow-eight-weld.vercel.app)

---

## 📱 Active Pages

TalentFlow features **8 main pages** organized by user access level:

### 🔓 Public Pages

| Page | Route | Description | Features |
|------|-------|-------------|----------|
| **Home** | `/` | Landing page showcasing platform | Hero section, featured courses, testimonials, CTA buttons |
| **Courses** | `/courses` | Browse all available courses | Grid layout, search bar, category filters, sorting options |
| **Course Details** | `/courses/[id]` | View course information | Course description, curriculum, instructor info, enroll button |
| **About** | `/about` | Platform information | Mission, vision, team members, statistics |
| **Contact** | `/contact` | Get in touch | Contact form, location map, support information |
| **Login** | `/login` | User authentication | Email/password login, social login options |
| **Register** | `/register` | Create new account | Registration form, role selection (Student/Instructor) |

### 🔒 Authenticated Pages

| Page | Route | Description | Features |
|------|-------|-------------|----------|
| **Dashboard** | `/dashboard` | Personalized user dashboard | Overview stats, enrolled courses, recent activity, recommendations |
| **My Learning** | `/my-learning` | Enrolled courses | Course cards, progress bars, continue learning buttons |
| **Course Player** | `/my-learning/[courseId]` | Course content viewer | Video player, lesson navigation, progress tracking, notes |
| **Profile** | `/profile` | User account management | Personal info, avatar upload, password change, preferences |
| **Settings** | `/settings` | Account settings | Notification preferences, privacy settings, theme toggle |
| **Instructor Dashboard** | `/instructor` | Course management (Instructors) | Course creation, analytics, student management |
| **Admin Panel** | `/admin` | Platform administration (Admins) | User management, course approval, platform analytics |

---

## 🎯 Interactive Features & Actions

### Navigation Actions
| Action | Destination | Description |
|--------|-------------|-------------|
| **Home** | `/` | Return to landing page |
| **Browse Courses** | `/courses` | View all available courses |
| **My Dashboard** | `/dashboard` | Access personalized dashboard |
| **My Learning** | `/my-learning` | View enrolled courses |
| **Profile** | `/profile` | Manage account settings |
| **Logout** | - | End user session |

### Course Actions
| Action | Description | API Endpoint |
|--------|-------------|--------------|
| **Enroll Now** | Enroll in a course | `POST /api/enrollments` |
| **Start Learning** | Begin course content | Navigate to course player |
| **Continue Learning** | Resume from last lesson | Load last watched position |
| **Track Progress** | View completion percentage | `GET /api/enrollments/{id}/progress` |
| **Save for Later** | Bookmark course | `POST /api/wishlist` |
| **Rate Course** | Submit rating and review | `POST /api/courses/{id}/ratings` |

### Search & Filter Actions
| Action | Options |
|--------|---------|
| **Search** | By title, instructor, keywords |
| **Filter by Category** | Development, Business, Design, Marketing, etc. |
| **Filter by Level** | Beginner, Intermediate, Advanced |
| **Filter by Price** | Free, Paid |
| **Sort by** | Newest, Popular, Rating, Price |

### User Actions
| Action | Description |
|--------|-------------|
| **Sign In** | Authenticate with email/password |
| **Sign Up** | Create new student or instructor account |
| **Forgot Password** | Reset password via email |
| **Update Profile** | Edit personal information |
| **Change Password** | Update account password |
| **Upload Avatar** | Set profile picture |
| **Dark Mode Toggle** | Switch between light/dark themes |

### Video Player Actions
| Action | Description |
|--------|-------------|
| **Play/Pause** | Control video playback |
| **Seek** | Navigate to specific timestamp |
| **Auto-save Progress** | Automatically save watch time |
| **Speed Control** | Adjust playback speed (0.5x - 2x) |
| **Picture-in-Picture** | Float video while browsing |
| **Fullscreen** | Expand video to full screen |
| **Download** | Download course materials (if enabled) |

---

## ✨ Key Features

### 🎨 UI/UX Features
- ✅ **Responsive Design** – Fully functional on mobile, tablet, and desktop
- ✅ **Dark Mode** – Automatic theme switching with system preference detection
- ✅ **Loading Skeletons** – Smooth loading states for better UX
- ✅ **Toast Notifications** – Real-time feedback for user actions
- ✅ **Breadcrumb Navigation** – Clear navigation hierarchy
- ✅ **Infinite Scroll** – Seamless course browsing
- ✅ **Smooth Animations** – Framer Motion for engaging transitions

### 📚 Course Management
- ✅ **Course Discovery** – Search, filter, and sort with real-time results
- ✅ **Video Lectures** – Embedded video player with progress tracking
- ✅ **Lesson Navigation** – Sidebar with lesson list and completion status
- ✅ **Course Progress** – Visual progress indicators for each course
- ✅ **Bookmarks** – Save courses for later
- ✅ **Ratings & Reviews** – Submit and view course ratings
- ✅ **Certificate Generation** – Auto-generate completion certificates (coming soon)

### 👤 User Experience
- ✅ **Authentication Flow** – Secure login, registration, and password recovery
- ✅ **Role-Based Views** – Different dashboards for students, instructors, admins
- ✅ **Personalized Recommendations** – AI-powered course suggestions
- ✅ **Activity Timeline** – Track recent course activity
- ✅ **Wishlist** – Save courses for future enrollment
- ✅ **Notes** – Take notes during lectures
- ✅ **Keyboard Shortcuts** – Quick navigation for power users

### 📊 Dashboard Features
- ✅ **Overview Stats** – Total courses, completed hours, certificates earned
- ✅ **Recent Courses** – Recently accessed courses
- ✅ **Upcoming Deadlines** – Assignment and quiz reminders
- ✅ **Achievement Badges** – Gamification elements
- ✅ **Learning Path** – Personalized course recommendations

### 🔧 Technical Features
- ✅ **Server-Side Rendering (SSR)** – Improved SEO and initial load performance
- ✅ **Static Site Generation (SSG)** – Pre-rendered pages for speed
- ✅ **Incremental Static Regeneration (ISR)** – Updated content without rebuild
- ✅ **Image Optimization** – Next.js Image component for lazy loading
- ✅ **Font Optimization** – Automatic font loading with next/font
- ✅ **API Route Handlers** – Serverless API endpoints
- ✅ **Middleware** – Authentication and route protection
- ✅ **Environment Variables** – Secure configuration management

---

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation Steps

```bash
# Clone repository
git clone https://github.com/your-username/talentflow.git
cd talentflow/frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Start development server
npm run dev
