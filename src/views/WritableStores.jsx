import { defineStore, ref, computed } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  container: {
    padding: '1.5rem',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '0 auto'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#333',
    borderBottom: '1px solid #eee',
    paddingBottom: '0.75rem'
  },
  card: {
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    border: '1px solid #e9ecef'
  },
  section: {
    marginBottom: '1.5rem'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4263eb',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    marginRight: '0.5rem',
    '&:hover': {
      backgroundColor: '#364fc7'
    }
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
    '&:hover': {
      backgroundColor: '#495057'
    }
  },
  buttonReset: {
    backgroundColor: '#dc3545',
    '&:hover': {
      backgroundColor: '#c82333'
    }
  },
  counter: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#4263eb',
    textAlign: 'center',
    margin: '1rem 0'
  },
  code: {
    backgroundColor: '#f1f3f5',
    padding: '0.2rem 0.4rem',
    borderRadius: '3px',
    fontFamily: 'monospace',
    fontSize: '0.9rem'
  },
  codeBlock: {
    backgroundColor: '#f1f3f5',
    padding: '1rem',
    borderRadius: '6px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    overflowX: 'auto',
    border: '1px solid #dee2e6'
  },
  paragraph: {
    marginBottom: '1rem',
    lineHeight: '1.6'
  },
  componentBox: {
    padding: '1rem',
    border: '1px dashed #ced4da',
    borderRadius: '4px',
    marginBottom: '1rem',
    backgroundColor: 'white'
  },
  componentTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#495057'
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    borderBottom: '1px solid #e9ecef',
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  todoText: {
    flex: 1
  },
  todoInput: {
    padding: '0.5rem',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    width: '100%',
    marginRight: '0.5rem',
    fontSize: '1rem'
  },
  todoForm: {
    display: 'flex',
    marginBottom: '1rem'
  },
  completed: {
    textDecoration: 'line-through',
    color: '#6c757d'
  },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    backgroundColor: '#28a745',
    color: 'white',
    borderRadius: '4px',
    fontSize: '0.8rem',
    marginLeft: '0.5rem'
  }
})

// 创建一个计数器 store
const counterStore = defineStore(() => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
  }

  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
})

// 创建一个 todo 列表 store
const todoStore = defineStore(() => {
  const todos = ref([
    { id: 1, text: '学习 Speedy-JSX', completed: true },
    { id: 2, text: '创建 Store 示例', completed: false }
  ])
  const newTodo = ref('')

  const completedCount = computed(
    () => todos.value.filter(todo => todo.completed).length
  )

  const remainingCount = computed(
    () => todos.value.filter(todo => !todo.completed).length
  )

  function addTodo() {
    if (newTodo.value.trim() === '') return

    const id =
      todos.value.length > 0 ? Math.max(...todos.value.map(t => t.id)) + 1 : 1

    todos.value.unshift({
      id,
      text: newTodo.value,
      completed: false
    })

    newTodo.value = ''
  }

  function toggleTodo(id) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  function removeTodo(id) {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  function clearCompleted() {
    todos.value = todos.value.filter(t => !t.completed)
  }

  return {
    todos,
    newTodo,
    completedCount,
    remainingCount,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted
  }
})

// 计数器组件
function Counter() {
  const { count, doubleCount, increment, decrement, reset } = counterStore

  return () => (
    <div classStyle={[styles.componentBox]}>
      <h3 classStyle={[styles.componentTitle]}>计数器组件</h3>
      <div classStyle={[styles.counter]}>{count.value}</div>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        双倍值: {doubleCount.value}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
        <button classStyle={[styles.button]} onClick={increment}>
          增加
        </button>
        <button
          classStyle={[styles.button, styles.buttonSecondary]}
          onClick={decrement}
        >
          减少
        </button>
        <button
          classStyle={[styles.button, styles.buttonReset]}
          onClick={reset}
        >
          重置
        </button>
      </div>
    </div>
  )
}

// Todo 列表组件
function TodoList() {
  const {
    todos,
    newTodo,
    completedCount,
    remainingCount,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted
  } = todoStore

  return () => (
    <div classStyle={[styles.componentBox]}>
      <h3 classStyle={[styles.componentTitle]}>待办事项列表</h3>

      <form
        classStyle={[styles.todoForm]}
        onSubmit={e => {
          e.preventDefault()
          addTodo()
        }}
      >
        <input
          classStyle={[styles.todoInput]}
          type="text"
          placeholder="添加新任务..."
          value={newTodo.value}
          onInput={e => (newTodo.value = e.target.value)}
        />
        <button classStyle={[styles.button]} type="submit">
          添加
        </button>
      </form>

      <div>
        {todos.value.map(todo => (
          <div key={todo.id} classStyle={[styles.todoItem]}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '0.5rem' }}
              />
              <span
                classStyle={[
                  styles.todoText,
                  todo.completed && styles.completed
                ]}
              >
                {todo.text}
              </span>
            </label>
            <button
              classStyle={[styles.button, styles.buttonReset]}
              style={{ padding: '0.25rem 0.5rem' }}
              onClick={() => removeTodo(todo.id)}
            >
              删除
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1rem'
        }}
      >
        <div>
          已完成: {completedCount.value}
          <span classStyle={[styles.badge]}>
            {completedCount.value}/{todos.value.length}
          </span>
        </div>
        <button
          classStyle={[styles.button, styles.buttonSecondary]}
          onClick={clearCompleted}
          disabled={completedCount.value === 0}
        >
          清除已完成
        </button>
      </div>
    </div>
  )
}

// 状态显示组件
function StoreStatus() {
  const { count } = counterStore
  const { todos, completedCount, remainingCount } = todoStore

  return () => (
    <div classStyle={[styles.componentBox]}>
      <h3 classStyle={[styles.componentTitle]}>Store 状态</h3>
      <div classStyle={[styles.codeBlock]}>
        {`// 计数器 Store
{
  count: ${count.value},
  doubleCount: ${count.value * 2}
}

// Todo Store
{
  todos: [${todos.value.length} 项],
  completedCount: ${completedCount.value},
  remainingCount: ${remainingCount.value}
}`}
      </div>
    </div>
  )
}

export default function WritableStores() {
  return () => (
    <div classStyle={[styles.container]}>
      <h2 classStyle={[styles.title]}>状态管理 - Store</h2>

      <div classStyle={[styles.card]}>
        <div classStyle={[styles.section]}>
          <h3>什么是 Store?</h3>
          <p classStyle={[styles.paragraph]}>
            Store 是一种集中管理和共享状态的方式，使用{' '}
            <code classStyle={[styles.code]}>defineStore</code> 函数创建。 Store
            可以在不同组件之间共享状态，并保持响应式。
          </p>

          <div classStyle={[styles.codeBlock]}>
            {`// 创建一个 store
const counterStore = defineStore(() => {
  const count = ref(0)
  
  function increment() {
    count.value++
  }
  
  return { count, increment }
})

// 在组件中使用
function MyComponent() {
  const { count, increment } = counterStore
  
  return () => (
    <div>
      <p>计数: {count.value}</p>
      <button onClick={increment}>增加</button>
    </div>
  )
}`}
          </div>
        </div>

        <div classStyle={[styles.section]}>
          <h3>示例演示</h3>
          <p classStyle={[styles.paragraph]}>
            下面是两个独立的组件，它们共享同一个 Store
            中的状态。当一个组件更新状态时，另一个组件会自动更新。
          </p>

          <Counter />
          <TodoList />
          <StoreStatus />
        </div>
      </div>
    </div>
  )
}
