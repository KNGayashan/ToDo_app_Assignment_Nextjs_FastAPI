# ToDo_app_Assignment_Nextjs_FastAPI
simple Todo application using Next.js for the frontend and FastAPI for the backend. The app allows creating todos and assigning them to users. The frontend uses Shadcn UI components for a consistent and modern look.

# Todo Application

This repository contains a full-stack Todo application with a React frontend and a FastAPI backend.

## Features

- Create, read, update, and delete todos
- Assign todos to users
- Filter todos by completion status
- Pagination
- Dark/Light mode toggle

## Tech Stack

- Frontend: React with Next.js
- Backend: FastAPI
- UI Components: Shadcn UI

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- Python (v3.7 or later)
- pip (Python package installer)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source venv/bin/activate
     ```

4. Install the required packages:
   ```
   pip install fastapi uvicorn
   ```

5. Start the backend server:
   ```
   uvicorn main:app --reload
   ```

The backend should now be running on `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the required packages:
   ```
   npm install
   ```

3. Install and set up Shadcn UI:
   ```
   npx shadcn-ui@latest init
   ```
   Follow the prompts to set up Shadcn UI. Choose the following options:
   - Would you like to use TypeScript? » Yes
   - Which style would you like to use? » Default
   - Which color would you like to use as base color? » Slate
   - Where is your global CSS file? » app/globals.css
   - Do you want to use CSS variables for colors? » Yes
   - Where is your tailwind.config.js located? » tailwind.config.js
   - Configure the import alias for components: » @/components
   - Configure the import alias for utils: » @/lib/utils
   - Are you using React Server Components? » Yes

4. Start the frontend development server:
   ```
   npm run dev
   ```

The frontend should now be running on `http://localhost:3000`.

## Usage

1. Open your web browser and go to `http://localhost:3000`.
2. You can now create, edit, delete, and filter todos.
3. Assign todos to users and toggle their completion status.
4. Use the dark/light mode toggle to switch between themes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


##Explanation 

todo application is a simple application with given instruction so I decided to develop all functionalities to single interface. it is completely responsive and user friendly application.

##Challenges

Nextjs, FastApi are the given technologies to develop the application. I was not much familiar with those technologies but I have studied and used some AI tools to learn and develop the application.
