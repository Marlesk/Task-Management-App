# 📝 Tasks Management App

![Angular](https://img.shields.io/badge/Angular-15+-dd0031?style=flat&logo=angular&logoColor=white)
![Angular Material](https://img.shields.io/badge/Angular%20Material-Components-blue?style=flat&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?style=flat&logo=typescript&logoColor=white) 

An **Angular Kanban-style project** for managing tasks.  
The application provides functionality to create, edit, delete, and categorize tasks, helping users organize their work efficiently.

---

## 📋 Overview

The app simulates a **virtual Kanban board**, where each task has a status and can be moved between different levels.  
Key features include:

✅ Display all user tasks  
🔍 Local task search  
➕ Create new tasks  
✏️ Edit existing tasks  
🗑️ Delete tasks  
📦 Move tasks between different status levels

### ⏳ Task Status Levels

- **To Do**  
- **In Progress**  
- **In Review**  
- **Completed**

---

## ⚙️ Technical Specifications

### ✨ API Configuration

A **Postman collection** is provided for testing API calls.

---

### 🔑 Environments

The Angular project uses **environment files** for configuration:
- `src/environments/environment.ts` → for development
- `src/environments/environment.prod.ts` → for production

Example `environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'API_URL',
  apiKey: 'API_KEY',
  jwtToken: 'YOUR_JWT_HERE',
  userId: 'USER_ID'
};

```

---

## 💻 Installation & Setup

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

Install dependencies:

```bash
npm install
```

Run the app:

```bash
ng serve
```

## 👨‍💻 Author

Developed by **Maria Leska**.
Feel free to connect or open issues in this repository.