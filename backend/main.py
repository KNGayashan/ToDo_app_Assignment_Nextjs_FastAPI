from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from uuid import uuid4

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    id: str
    name: str

class Todo(BaseModel):
    id: str
    title: str
    completed: bool
    user_id: Optional[str] = None

# In-memory storage
users = [
    User(id="1", name="Alice"),
    User(id="2", name="Bob"),
    User(id="3", name="Charlie")
]

todos = []

@app.get("/todos", response_model=List[Todo])
async def get_todos():
    return todos

@app.post("/todos", response_model=Todo)
async def create_todo(todo: Todo):
    todo.id = str(uuid4())
    todos.append(todo)
    return todo

@app.put("/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: str, updated_todo: Todo):
    for todo in todos:
        if todo.id == todo_id:
            todo.title = updated_todo.title
            todo.completed = updated_todo.completed
            todo.user_id = updated_todo.user_id
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: str):
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            del todos[index]
            return {"message": "Todo deleted successfully"}
    raise HTTPException(status_code=404, detail="Todo not found")

@app.get("/users", response_model=List[User])
async def get_users():
    return users