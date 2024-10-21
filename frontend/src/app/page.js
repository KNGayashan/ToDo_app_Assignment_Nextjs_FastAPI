"use client";

// Imports
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";

// Todo task count for page
const ITEMS_PER_PAGE = 5;

// Custom toast design
const CustomToast = ({ title, variant }) => (
  <div
    className={`px-4 py-2 rounded-md ${variant === "destructive" ? "bg-red-500" : "bg-green-500"
      }`}
  >
    <p className="text-white  text-2xl font-semibold">{title}</p>
  </div>
);

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTodo, setEditingTodo] = useState(null);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    fetchTodos();
    fetchUsers();
  }, []);

  // Fetch todo items from backend
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todos");
    const data = await response.json();
    setTodos(data);
  };

  // Fetch users from backend
  const fetchUsers = async () => {
    const response = await fetch("http://localhost:8000/users");
    const data = await response.json();
    setUsers(data);
  };

  // Submit todo
  const addTodo = async () => {
    if (!newTodoTitle.trim()) {
      toast({
        title: "Please enter a todo title",
        variant: "destructive",
        render: ({ title, variant }) => (
          <CustomToast title={title} variant={variant} />
        ),
      });
      return;
    }
    const response = await fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "",
        title: newTodoTitle,
        completed: false,
        user_id: selectedUser || null,
      }),
    });
    if (response.ok) {
      fetchTodos();
      setNewTodoTitle("");
      setSelectedUser("");
      toast({
        title: "Todo added successfully",
        variant: "success",
        duration: 3000,
        render: ({ title }) => <CustomToast title={title} variant={variant} />,
      });
    } else {
      toast({
        title: "Failed to add todo",
        variant: "destructive",
        duration: 3000,
        render: ({ title, variant }) => (
          <CustomToast title={title} variant={variant} />
        ),
      });
    }
  };

  // Update todo items
  const updateTodo = async (todo) => {
    const response = await fetch(`http://localhost:8000/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    if (response.ok) {
      fetchTodos();
      setEditingTodo(null);
      toast({
        title: "Todo updated successfully",
        variant: "success",
        duration: 3000,
        render: ({ title }) => <CustomToast title={title} variant={variant} />,
      });
    } else {
      toast({
        title: "Failed to update todo",
        variant: "destructive",
        duration: 3000,
        render: ({ title, variant }) => (
          <CustomToast title={title} variant={variant} />
        ),
      });
    }
  };

  // Delete todo item
  const deleteTodo = async (id) => {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchTodos();
      toast({
        title: "Todo deleted successfully",
        variant: "success",
        duration: 3000,
        render: ({ title }) => <CustomToast title={title} variant={variant} />,
      });
    } else {
      toast({
        title: "Failed to delete todo",
        variant: "destructive",
        duration: 3000,
        render: ({ title, variant }) => (
          <CustomToast title={title} variant={variant} />
        ),
      });
    }
  };

  // Switch todo item between complete and not complete
  const toggleTodoCompletion = async (todo) => {
    await updateTodo({ ...todo, completed: !todo.completed });
  };

  // Filters todo items
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "uncompleted") return !todo.completed;
    return true;
  });

  // Calculate total pages of todo items
  const totalPages = Math.ceil(filteredTodos.length / ITEMS_PER_PAGE);

  // Pagination controls
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="container mx-auto p-4">
        <Card className="mb-4">
          <CardHeader className="mb-4">
            <div className="flex justify-between">
              <CardTitle className="text-[30px]">Todo App</CardTitle>

              {/* Change theme */}
              <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
              
            </div>
          </CardHeader>
          <CardContent>

            <div className="xl:flex xl:p-3 grid">

              {/* Create todo item */}
              <div className="p-2 m-2 min-h-full flex justify-center items-center ">
                <div className="grid w-[500px] gap-6">
                  <Label htmlFor="name">
                    <strong className="text-[25px]">Create Todo Item</strong>
                  </Label>
                  <div className="flex flex-col space-y-4">
                    <Label htmlFor="name">
                      <strong className="text-[20px]">Title</strong>
                    </Label>
                    <Input
                      placeholder="Enter todo title"
                      value={newTodoTitle}
                      onChange={(e) => setNewTodoTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-4">
                    <Label htmlFor="name">
                      <strong className="text-[20px]">Assign to user</strong>
                    </Label>
                    <Select
                      value={selectedUser}
                      onValueChange={setSelectedUser}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select User" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={addTodo}>Add Todo</Button>
                </div>
              </div>

              {/* Display todo items */}
              <div className="xl:pl-20 m-2 w-full  flex-col">

                {/* Todo filter */}
                <div className="w-full flex justify-end">
                  <div className=" w-[125px] items-center mb-10">
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="uncompleted">Uncompleted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Todo table */}
                <div className="w-full justify-center">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <strong className="text-[18px]">Title</strong>
                        </TableHead>
                        <TableHead>
                          <strong className="text-[18px]">Assigned User</strong>
                        </TableHead>
                        <TableHead>
                          <strong className="text-[18px]">Status</strong>
                        </TableHead>
                        <TableHead>
                          <strong className="text-[18px] pl-20">Actions</strong>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedTodos.map((todo) => (
                        <TableRow key={todo.id}>
                          <TableCell>
                            {editingTodo?.id === todo.id ? (
                              <Input
                                value={editingTodo.title}
                                onChange={(e) =>
                                  setEditingTodo({
                                    ...editingTodo,
                                    title: e.target.value,
                                  })
                                }
                              />
                            ) : (
                              todo.title
                            )}
                          </TableCell>
                          <TableCell>
                            {editingTodo?.id === todo.id ? (
                              <Select
                                value={editingTodo.user_id || ""}
                                onValueChange={(value) =>
                                  setEditingTodo({
                                    ...editingTodo,
                                    user_id: value,
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Assign to user" />
                                </SelectTrigger>
                                <SelectContent>
                                  {users.map((user) => (
                                    <SelectItem key={user.id} value={user.id}>
                                      {user.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              users.find((user) => user.id === todo.user_id)
                                ?.name || "Unassigned"
                            )}
                          </TableCell>
                          <TableCell>
                            <Checkbox
                              checked={todo.completed}
                              onCheckedChange={() => toggleTodoCompletion(todo)}
                            />
                          </TableCell>
                          <TableCell className="flex justify-end">
                            {editingTodo?.id === todo.id ? (
                              <>
                                <Button
                                  onClick={() => updateTodo(editingTodo)}
                                  className="mr-2"
                                >
                                  Save
                                </Button>
                                <Button
                                  onClick={() => setEditingTodo(null)}
                                  variant="secondary"
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  onClick={() => setEditingTodo(todo)}
                                  className="mr-2"
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => deleteTodo(todo.id)}
                                >
                                  Delete
                                </Button>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  <div className="relative flex justify-between items-center mt-[55px]">
                    <Button
                      onClick={() =>
                        setCurrentPage((page) => Math.max(1, page - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      onClick={() =>
                        setCurrentPage((page) => Math.min(totalPages, page + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                  
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
