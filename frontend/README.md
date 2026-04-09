<div align="center">
  <img src="./public/img/logo.png" width="100" height="auto" alt="TalentFlow Logo"/>
  <h1>🌊 TalentFlow Frontend Framework</h1>
  <p><i>The next-generation Learning Management System built for seamless performance and engaging UX.</i></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js%2014-Black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
  </p>
</div>

---

## 🚀 Live Environment
Experience the live application here: **[TalentFlow LMS Platform](https://talentflow-eight-weld.vercel.app)**

---

## 🌟 What Makes TalentFlow Unique?

TalentFlow breaks away from traditional rigid LMS structures by offering a highly dynamic, localized, and aesthetically immersive learning environment.

* **🎨 Smart Image Hashing**: Even if backend data lacks imagery, TalentFlow's engine deterministically hashes course parameters to assign unique, persistent, stunning front covers automatically.
* **🎭 Seamless Authentication**: From multi-tiered OTP registration flows to complex nested token-based password recoveries—all elegantly handled with zero latency perception.
* **💫 Glassmorphism & Micro-Interactions**: Features a bespoke dark mode, sidebar transitioning, and dynamic loading overlays utilizing rich UI/UX patterns (Framer motion, dynamic charts).

---

## 🗺️ Completed Page Architecture

Our meticulously crafted routing structure handles all layers of user interaction securely.

### 🛡️ Public/Authentication Hub
- **Home (`/`)** — Immersive hero landing with dynamic course showcases and responsive metrics.
- **Login (`/login`)** — Robust session validation handling split legacy endpoints and nested JSON schemas.
- **Register (`/register`)** — Unified onboarding capturing user roles (Student/Instructor) directly into state.
- **Verify OTP (`/verify-otp`)** — Deeply integrated one-time-password resolution bridging local caching and secure backend token retrieval.
- **Forgot/Reset Password** — Highly fault-tolerant reset gateways validating tokens and dual-key signatures securely.

### 📚 Learning Dashboard
- **Main Dashboard (`/dashboard`)** — Aggregates progress metrics natively, featuring greeting hydration strictly tied to full-name configurations and intelligent 'First Time User' views.
- **Course Catalog (`/dashboard/courses`)** — Live grid of system courses. Beautiful thumbnail tracking, categorical filtering, search arrays natively processed.
- **Course Viewer (`/dashboard/courses/[courseId]`)** — Deep dive syllabus breakdown. Displays conditional enrollment actions, dynamic video lessons mapping, and duration parsers.
- **Lesson Player (`/dashboard/courses/[courseId]/lessons/[lessonId]`)** — Isolated secure video playback module preventing skipping. Features next/prev progression trackers.
- **Task & Assignments (`/dashboard/task`)** — Visual timeline charts rendering Recharts tracking overdue, submitted, and pending coursework elegantly dynamically.

---

## 🛠 Features Breakdown

### Deep Technical Polish
- **Advanced State Persistence**: Overhauled local state hooks preserving User Fullname, AuthTokens, Role statuses cross-session.
- **API Response Mapper**: Custom interceptors cleanly parsing legacy models vs modern database models dynamically.
- **Theme Manager**: Custom embedded Dark/Light toggle hidden smartly within responsive mobile drawers alongside system preferences.
- **Recharts Integration**: Visually tracking user assignment efficiency via rendered dynamic BarCharts.

### Intelligent Error Handling
- **Graceful Loading Skeletons**: Employs suspense boundaries spanning every individual route protecting users from screen flashes.
- **Toast Overlay Network**: Floating success/failure notifications handling API catches securely.

---

## 💻 Developer Setup Guide

Ready to dive into the codebase? It's optimized for rapid deployment.

### Prerequisites
- Node.js 18+  (Tested against latest LTS)
- npm / yarn / pnpm

### Quick Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/talentflow.git
cd talentflow/frontend

# 2. Install dependencies securely
npm install

# 3. Setup your Local Environment
cp .env.example .env.local

# 4. Fire up the development environment
npm run dev
```

---s
<div align="center">
  <sub>Built with ❤️ by Team India Frontend Team</sub>
</div>
