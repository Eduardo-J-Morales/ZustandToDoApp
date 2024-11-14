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
    todo: [...state.todos, { id: Date.now(), text, completed: false }]
  }))
  
}))



export default function Home() {
  return (
  <></>
  );
}
