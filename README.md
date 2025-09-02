# lms-assessment

A Next.js and Supabase full-stack LMS feature allowing students to log in, view a dashboard of upcoming lessons, and mark lessons as complete. Completed as part of a practical take-home assessment.

# Student Lessons - Full Stack Feature

This project is a simplified LMS feature built for the Stage 2 take-home assessment.  
It allows a student to:

- Log in (Supabase Auth)
- View a dashboard of upcoming lessons
- Mark lessons as complete

---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ADNANPASHA217/lms-assessment.git
cd lms-assessment
```

### 2. Install Dependencies

yarn install

# or

npm install

### 3. Environment Variables

NEXT_PUBLIC_SUPABASE_URL=https://dqfykwftyuygfahbjxti.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsIn...

### 4. Project Structure

student-lessons/
├── db/│
│ └── full_dump.sql
├── src/
│ ├── app/
│ │ ├── login/ # Login page
│ │ ├── dashboard/ # Student dashboard
│ │ └── page.tsx # Root page
│ ├── lib/
│ │ └── supabaseClient.ts # Supabase client setup
│ └── globals.css
├── public/
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
