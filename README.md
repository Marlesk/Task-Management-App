# 📝 Tasks Management App

[![Angular](https://img.shields.io/badge/Angular-20.3-red?style=flat&logo=angular&logoColor=white)](https://angular.io/) 
[![Angular Material](https://img.shields.io/badge/Angular%20Material-20.2-blue?style=flat&logo=angular&logoColor=white)](https://material.angular.io/) 
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) 
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

An **Angular Kanban-style project** for managing tasks.  
The application provides functionality to create, edit, delete, and categorize tasks, helping users organize their work efficiently.

---

## 🚀 Features

The app simulates a **virtual Kanban board**, where each task has a status and can be moved between different levels.  
Key features include:

✅ Display all user tasks  
🔍 Local task search  
➕ Create new tasks  
✏️ Edit existing tasks  
🗑️ Delete tasks  
🏷️ Tag support
🔄 Move tasks between different status levels
⏳ 4 Task Status Stages:
- **To Do**  
- **In Progress**  
- **In Review**  
- **Completed**

---

## 🧩 Tech Stack

- Angular 20
- TypeScript
- TailwindCSS
- Angular CDK Dialog
- Custom API backend

---

## 🔑 Environment Setup

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

## 📦 Installation & Setup

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
---

## ✨ API Configuration

A **Postman collection** is provided for testing API calls.

---

## 👨‍💻 Author

Developed by **Maria Leska**.
Feel free to connect or open issues in this repository.