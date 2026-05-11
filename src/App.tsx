import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Todo = {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  const incompleteCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - incompleteCount
  const completionRate =
    todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100)

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const text = input.trim()
    if (!text) {
      return
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ])
    setInput('')
  }

  const toggleTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id),
    )
  }

  return (
    <main className="todo-app">
      <section className="todo-panel">
        <header className="app-header">
          <div>
            <p className="eyebrow">Today&apos;s Focus</p>
            <h1>Todo@MG</h1>
          </div>
          <div className="completion-badge">
            <span>{completionRate}%</span>
            <small>完了</small>
          </div>
        </header>

        <form className="todo-form" onSubmit={addTodo}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Todoを入力"
            aria-label="Todo"
          />
          <button type="submit">追加</button>
        </form>

        <div className="progress-track" aria-hidden="true">
          <div
            className="progress-bar"
            style={{ width: `${completionRate}%` }}
          />
        </div>

        <section className="stats" aria-label="Todoの状況">
          <div>
            <strong>{todos.length}</strong>
            <span>合計</span>
          </div>
          <div>
            <strong>{incompleteCount}</strong>
            <span>未完了</span>
          </div>
          <div>
            <strong>{completedCount}</strong>
            <span>完了</span>
          </div>
        </section>

        {todos.length === 0 ? (
          <div className="empty">
            <p>Todoはまだありません。</p>
            <span>最初のタスクを追加しましょう。</span>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                </label>
                <button type="button" onClick={() => deleteTodo(todo.id)}>
                  削除
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
