import { onMounted, onUnmounted, onUpdated, ref } from 'speedy-jsx'
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
  content: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#555'
  },
  card: {
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    marginBottom: '1rem',
    border: '1px solid #e9ecef'
  },
  logs: {
    backgroundColor: '#f1f3f5',
    padding: '1rem',
    borderRadius: '6px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    maxHeight: '200px',
    overflowY: 'auto',
    marginTop: '1rem'
  },
  log: {
    margin: '0.25rem 0',
    padding: '0.25rem 0',
    borderBottom: '1px dashed #dee2e6'
  },
  timeStamp: {
    color: '#6c757d',
    marginRight: '0.5rem',
    fontSize: '0.85rem'
  },
  message: {
    color: '#212529'
  },
  buttons: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem'
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
    '&:hover': {
      backgroundColor: '#364fc7'
    },
    '&:disabled': {
      backgroundColor: '#adb5bd',
      cursor: 'not-allowed'
    }
  },
  counter: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#4263eb',
    marginTop: '1rem',
    display: 'block'
  },
  info: {
    color: '#495057',
    marginTop: '1rem',
    fontSize: '0.9rem',
    fontStyle: 'italic'
  },
  tabs: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  tab: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e9ecef',
    color: '#495057',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: '#dee2e6'
    }
  },
  activeTab: {
    backgroundColor: '#4263eb',
    color: 'white'
  },
  section: {
    marginBottom: '1.5rem'
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '300px',
    fontSize: '1rem',
    marginTop: '0.5rem'
  },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    backgroundColor: '#4263eb',
    color: 'white',
    borderRadius: '4px',
    fontSize: '0.8rem',
    marginLeft: '0.5rem'
  }
})

export default function OnMount() {
  const logs = ref([])
  const timer = ref(null)
  const counter = ref(0)
  const mounted = ref(false)
  const updateCount = ref(0)
  const inputText = ref('')
  const activeTab = ref('mount')
  const simulateUnmount = ref(false)

  function addLog(message) {
    const now = new Date()
    const timeString = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(
      now.getSeconds()
    ).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`

    logs.value = [...logs.value, { time: timeString, message }]
  }

  function startTimer() {
    if (timer.value) return

    addLog('开始计时器')
    timer.value = setInterval(() => {
      counter.value++
      addLog(`计数器更新: ${counter.value}`)
    }, 1000)
  }

  function stopTimer() {
    if (!timer.value) return

    clearInterval(timer.value)
    timer.value = null
    addLog('停止计时器')
  }

  function resetCounter() {
    counter.value = 0
    addLog('重置计数器')
  }

  function clearLogs() {
    logs.value = []
    addLog('日志已清空')
  }

  onMounted(() => {
    mounted.value = true
    addLog('组件已挂载 (onMounted)')
    addLog('可以在此处执行副作用，如数据获取、DOM操作等')
  })

  onUpdated(() => {
    updateCount.value++
    console.log(1)
    addLog(`组件已更新 (onUpdated) - 更新次数: ${updateCount.value}`)
  })

  onUnmounted(() => {
    if (timer.value) {
      clearInterval(timer.value)
    }
    addLog('组件即将卸载 (onUnmounted)')
    addLog('可以在此处执行清理工作，如清除定时器、取消订阅等')
  })

  return () =>
    simulateUnmount.value ? null : (
      <div classStyle={[styles.container]}>
        <h2 classStyle={[styles.title]}>生命周期钩子示例</h2>

        <div classStyle={[styles.tabs]}>
          <button
            classStyle={[
              styles.tab,
              activeTab.value === 'mount' && styles.activeTab
            ]}
            onClick={() => {
              activeTab.value = 'mount'
              addLog('切换到 Mount 标签')
            }}
          >
            onMounted
          </button>
          <button
            classStyle={[
              styles.tab,
              activeTab.value === 'update' && styles.activeTab
            ]}
            onClick={() => {
              activeTab.value = 'update'
              addLog('切换到 Update 标签')
            }}
          >
            onUpdated
          </button>
          <button
            classStyle={[
              styles.tab,
              activeTab.value === 'unmount' && styles.activeTab
            ]}
            onClick={() => {
              activeTab.value = 'unmount'
              addLog('切换到 Unmount 标签')
            }}
          >
            onUnmounted
          </button>
        </div>

        {activeTab.value === 'mount' && (
          <div classStyle={[styles.card]}>
            <div classStyle={[styles.content]}>
              <h3>onMounted 钩子</h3>
              <p>组件首次渲染到DOM后执行，适合进行：</p>
              <ul>
                <li>数据获取</li>
                <li>DOM元素操作</li>
                <li>添加事件监听</li>
                <li>设置定时器</li>
              </ul>

              <div classStyle={[styles.info]}>
                组件挂载状态: {mounted.value ? '已挂载' : '未挂载'}
              </div>

              <span classStyle={[styles.counter]}>计数器: {counter.value}</span>

              <div classStyle={[styles.buttons]}>
                <button
                  classStyle={[styles.button]}
                  onClick={startTimer}
                  disabled={!!timer.value}
                >
                  开始计时
                </button>
                <button
                  classStyle={[styles.button]}
                  onClick={stopTimer}
                  disabled={!timer.value}
                >
                  停止计时
                </button>
                <button classStyle={[styles.button]} onClick={resetCounter}>
                  重置计数器
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab.value === 'update' && (
          <div classStyle={[styles.card]}>
            <div classStyle={[styles.content]}>
              <h3>onUpdated 钩子</h3>
              <p>组件更新后执行，适合在DOM更新后进行操作：</p>
              <ul>
                <li>访问更新后的DOM</li>
                <li>根据新状态执行副作用</li>
                <li>测量或计算DOM元素</li>
              </ul>

              <div classStyle={[styles.section]}>
                <div>
                  更新次数:{' '}
                  <span classStyle={[styles.badge]}>{updateCount.value}</span>
                </div>
                <p>修改下方输入框内容将触发组件更新：</p>
                <input
                  type="text"
                  classStyle={[styles.input]}
                  value={inputText.value}
                  onInput={e => {
                    inputText.value = e.target.value
                    addLog(`输入框内容变更: ${e.target.value}`)
                  }}
                  placeholder="输入文本触发更新..."
                />
              </div>

              <div classStyle={[styles.buttons]}>
                <button
                  classStyle={[styles.button]}
                  onClick={() => {
                    counter.value++
                    addLog('通过计数器触发更新')
                  }}
                >
                  触发更新
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab.value === 'unmount' && (
          <div classStyle={[styles.card]}>
            <div classStyle={[styles.content]}>
              <h3>onUnmounted 钩子</h3>
              <p>组件从DOM移除前执行，适合进行清理工作：</p>
              <ul>
                <li>清除定时器</li>
                <li>取消网络请求</li>
                <li>解除事件监听</li>
                <li>释放资源</li>
              </ul>

              <div classStyle={[styles.info]}>
                点击下方按钮模拟组件卸载，将触发 onUnmounted 钩子
              </div>

              <div classStyle={[styles.buttons]}>
                <button
                  classStyle={[styles.button]}
                  onClick={() => {
                    addLog('准备卸载组件...')
                    setTimeout(() => {
                      simulateUnmount.value = true
                    }, 500)
                  }}
                >
                  模拟卸载
                </button>
                {timer.value && (
                  <button classStyle={[styles.button]} onClick={stopTimer}>
                    停止计时器
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div classStyle={[styles.logs]}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}
          >
            <div>执行日志:</div>
            <button
              onClick={clearLogs}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#6c757d',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              清空日志
            </button>
          </div>
          {logs.value.map((log, index) => (
            <div key={index} classStyle={[styles.log]}>
              <span classStyle={[styles.timeStamp]}>{log.time}</span>
              <span classStyle={[styles.message]}>{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    )
}
