# ☁️ Cloud Architecture — Contribase

## Database
**Platform:** Firebase  
**Database:** Cloud Firestore (NoSQL)

---

## Firestore Collections

### users
Stores all platform users (NGOs, contributors, admins).

### projects
Central registry of all projects (ongoing + completed).

### projectStages
Tracks project lifecycle stages:
Idea → Prototype → Testing → Deployment → Impact

### contributions
Defines contribution opportunities and participation.

### resources
Reusable modules to avoid duplicate work.

### impactReports
Real-world NGO impact linked to projects.

### badges
Gamification and contributor recognition.

---

## Design Principles
- One collection = one responsibility
- Lifecycle data separated from core project
- Reuse-first mindset
- Scales from MVP to production

---

## Initial Data Entry
All collections are initially populated manually via Firebase Console.
Frontend integration will follow.
