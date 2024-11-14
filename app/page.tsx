import { create } from 'zustand'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Checkbox } from '../components/ui/checkbox'
import { Trash, Edit } from 'lucide-react'

type Todo = {
  id: number
  text: string
  completed: boolean
}

type TodoStore = {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  updateTodo: (id: number) => void
  deleteTodo: (id: number) => void
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (text) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), text, completed: false }]
  }))

  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed })
  }))

  updateTodo: (id, text) => set((state) => ({
    todos: state.todos.map((todo) => todo.id === id ? { ...todo, text })
  }))
}))



export default function Home() {
  return (
  <></>
  );
}
