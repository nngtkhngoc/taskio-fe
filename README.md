[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YHSq4TPZ)

# To-Do App – Preliminary Assignment Submission

⚠️ **Complete all sections marked with ✍️** — required for submission.

👀 Check **ASSIGNMENT.md** in this repository for assignment requirements.

---

## 🚀 Project Setup & Usage

**How to install and run your project:**  

```bash
# Clone repo
git clone https://github.com/nngtkhngoc/taskio-fe.git

# Move into project folder
cd taskio-fe

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔗 Deployed Web URL

[https://taskio-fe.vercel.app/](https://taskio-fe.vercel.app/)

---

## 🎥 Demo Video

**Demo video link (≤ 2 minutes):**  

📌 **Video Upload Guideline**: Set visibility to **Unlisted** on YouTube.  
- Can only be viewed by users with the link.  
- Won’t appear in search or on your channel.  
- Share the link in README so mentors can access it.  

✍️ [Paste your video link here]

---

## 💻 Project Introduction

### a. Overview

**Taskio** is a productivity app based on the **Eisenhower Matrix**, which categorizes tasks by urgency and importance:  

1. **Urgent & Important (Q1)** – tasks requiring immediate attention (deadlines, crises).  
2. **Not Urgent & Important (Q2)** – long-term value tasks (planning, personal growth, learning).  
3. **Urgent & Not Important (Q3)** – interruptions with little impact (unimportant calls, minor requests).  
4. **Not Urgent & Not Important (Q4)** – low-value activities (distractions, entertainment).  

Taskio’s **responsive design** ensures smooth usage across desktop, tablet, and mobile. It helps users **visualize and prioritize** tasks, while integrating **gamification** and **progress visualization tools** to reinforce productive behaviors.

---

### b. Key Features & Function Manual

- **Task Management**: Create, update, delete, and complete tasks seamlessly.  
- **Eisenhower Matrix Categorization**: Automatically guides users to classify tasks into quadrants of urgency and importance.  
- **Gamification**: Points, streaks, and badges to motivate task completion.  
- **Contribution Grid**: Visual productivity timeline inspired by GitHub’s activity heatmap.  
- **Immersive UI**: Neo-brutalist design with playful color blocks, bold typography, and drag-and-drop quadrants.

---

### c. Unique Features

- **Eisenhower Matrix in Action**: Embeds a proven productivity framework into daily practice.  
- **Gamification & Progress Visualization**: Turns productivity into a rewarding habit with streaks, badges, and dynamic contribution grids.  
- **Designed for Modern Users**: Sleek, neo-brutalist interface for students and professionals alike.

---

### d. Technology Stack

- **Frontend**: React, Typescript, Tanstack Query, TailwindCSS, Shadcn UI  
- **Backend**: ExpressJS, Prisma ORM  
- **Database**: PostgreSQL  
- **Deployment**: Vercel (Frontend), Render (Backend)

---

### e. Service Architecture & Database

**Architecture**:  

- Frontend ↔ Backend via RESTful APIs.  
- Backend handles authentication, task management, gamification logic, and data storage.  
- PostgreSQL with Prisma ORM for relational integrity and type-safety.  
- Microservice-inspired deployment: frontend on Vercel, backend on Render, CORS-enabled secure communication.

**Database Schema**:  

- **_User_**: Stores credentials, gamification progress, and relations.

```prisma
model user {
  id         String    @id @default(cuid())
  email      String    @unique
  password   String
  created_at DateTime  @default(now())
  xp         Int       @default(0)
  streaks    Int       @default(0)
  last_login DateTime? @default(now())
  tasks      task[]
  badges     badge[]
  notifications notification[]
  daily_task_record dailyTaskRecord[]
  level      level?  @relation(fields: [levelId], references: [id])
  levelId    String?
}
```

- **_Task_**: Single task with urgency/importance flags, deadlines, and relational connections.

```prisma
model task {
  id           String     @id @default(cuid())
  name         String
  note         String?
  category     String[]
  is_important Boolean    @default(false)
  is_urgent    Boolean    @default(false)
  deadline     DateTime
  completed_at DateTime?
  status       TaskStatus @default(NOT_DONE)
  created_at   DateTime   @default(now())
  user         user       @relation(fields: [user_id], references: [id], onDelete: Cascade)
  user_id      String
  subtasks     subtask[]
  reminder     reminder?
  dailyTaskRecordDate    DateTime? @db.Date
  dailyTaskRecord        dailyTaskRecord? @relation(fields: [dailyTaskRecordUser_id, dailyTaskRecordDate], references: [user_id, date])
  dailyTaskRecordUser_id String?
}
```

```prisma
enum TaskStatus {
  NOT_DONE
  COMPLETED
  OVERDUE
}
```

```prisma
model subtask {
  id           String   @id @default(cuid())
  name         String
  is_completed Boolean  @default(false)
  created_at   DateTime @default(now())

  task    task   @relation(fields: [task_id], references: [id], onDelete: Cascade)
  task_id String
}
```

```prisma
model reminder {
  id         String   @id @default(cuid())
  time       DateTime
  created_at DateTime @default(now())

  task    task   @relation(fields: [task_id], references: [id], onDelete: Cascade)
  task_id String @unique
}
```

```prisma
model notification {
  id         String   @id @default(cuid())
  content    String
  created_at DateTime @default(now())
  is_checked Boolean  @default(false)

  user    user?   @relation(fields: [user_id], references: [id], onDelete: Cascade)
  user_id String?
}
```
- **_Gamification Entities_**: Represent the components that drive user motivation and engagement, including badges, levels, XP, streaks, and daily task records, enabling reward-based progress tracking and behavioral reinforcement.

```prisma
model dailyTaskRecord {
  user_id String
  date    DateTime @db.Date

  user  user   @relation(fields: [user_id], references: [id], onDelete: Cascade)
  tasks task[]

  @@id([user_id, date])
}
```

```prisma
model badge {
  id             String @id @default(cuid())
  name           String
  icon           String
  description    String
  level_required Int

  users user[]
}
```

```prisma
model level {
  id          String @id @default(cuid())
  name        String
  xp_required Int

  users user[]
}
```

---

## 🧠 Reflection

### a. If you had more time, what would you expand?

**Purpose**: Enhance engagement, retention, and overall productivity, while making Taskio more social and adaptive.  

**Planned expansions**:  
- Advanced gamification: rewards, achievement tiers, personalized progress tracking.  
- Calendar integration (Google Calendar) for task sync.  
- Social features: friend connections, study group rooms, collaborative project management.  
- AI-driven analytics for task suggestions and optimized prioritization.

### b. If you integrate AI APIs

**Purpose**: Smarter task management, predictive insights, and personalized recommendations.  

**Potential features**:  
- Predictive deadline alerts.  
- Smart task prioritization suggestions.  
- AI-powered scheduling assistant.  
- Behavioral analytics for productivity insights.

---

## ✅ Checklist

- [x] Code executes without errors  
- [x] Core functionality implemented (add/edit/delete/complete tasks)  
- [x] All required sections completed
