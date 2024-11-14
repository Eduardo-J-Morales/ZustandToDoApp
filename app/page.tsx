"use client"

import { create } from 'zustand'
import React, { useState } from 'react'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo)
      setNewTodo('')
    }
  }

  const handleEdit = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const handleUpdate = (id: number) => {
    if (editText.trim()) {
      updateTodo(id, editText) 
      setEditingId(null)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Todo App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className='flex-grow'
          />
          <Button variant="default" type='submit'>Add</Button>
        </div>
      </form>
      <ul className="">
        {todos.map((todo) => (
          <li key={todo.id}>
            <Checkbox/>

            {editingId === todo.id ? (
              <Input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => handleUpdate(todo.id)}
                onKeyPress={(e) => e.key === 'Enter' && handleUpdate(todo.id)}
                className="flex-grow"
              />
            ) : (
              <label
                htmlFor={`todo-${todo.id}`}
                className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}
              >
                {todo.text}
              </label>
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleEdit(todo.id, todo.text)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
