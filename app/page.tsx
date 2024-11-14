"use client"

import { create } from 'zustand'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Checkbox } from '../components/ui/checkbox'
import { Trash, Edit } from 'lucide-react'
import { todo } from 'node:test'

type Todo = {
  id: number
  text: string
  completed: boolean
}

type TodoStore = {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  updateTodo: (id: number, text: string) => void
  deleteTodo: (id: number) => void
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (text) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), text, completed: false }]
  })),

  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed }: todo)
  })),

  updateTodo: (id, text) => set((state) => ({
    todos: state.todos.map((todo) => todo.id === id ? { ...todo, text } : todo)
  })),

  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id)
  }))
}))



export default function Home() {

  const { todos, addTodo, toggleTodo, updateTodo, deleteTodo } = useTodoStore()
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const handleEdit = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Todo App</h1>
      <form className=""></form>
        <div className="">
          <Input
          type="text"
          value={newTodo}
          onChange={((e) => setNewTodo(e.target.value))}
          />
        
        </div>
    </div>
  );
}
