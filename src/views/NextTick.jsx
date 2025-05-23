import { ref, nextTick } from 'speedy-jsx'
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
    },
    '&:disabled': {
      backgroundColor: '#adb5bd',
      cursor: 'not-allowed'
    }
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
    '&:hover': {
      backgroundColor: '#495057'
    }
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: '1rem 0',
    border: '1px solid #dee2e6',
    borderRadius: '4px'
  },
  listItem: {
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #dee2e6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  info: {
    color: '#495057',
    marginTop: '1rem',
    fontSize: '0.9rem',
    fontStyle: 'italic'
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
  highlight: {
    backgroundColor: '#fffde7',
    transition: 'background-color 0.5s',
    padding: '0.2rem'
  },
  paragraph: {
    marginBottom: '1rem',
    lineHeight: '1.6'
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '300px',
    fontSize: '1rem',
    marginTop: '0.5rem',
    marginBottom: '1rem'
  },
  badge: {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    backgroundColor: '#4263eb',
    color: 'white',
    borderRadius: '4px',
    fontSize: '0.8rem',
    marginLeft: '0.5rem'
  },
  textBlock: {
    padding: '1rem',
    backgroundColor: 'white',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    marginBottom: '1rem',
    maxHeight: '100px',
    overflowY: 'auto'
  },
  measureBox: {
    padding: '1rem',
    backgroundColor: 'white',
    border: '1px solid #dee2e6',
    borderRadius: '4px',
    marginBottom: '1rem',
    transition: 'all 0.3s'
  }
})

export default function NextTick() {
  const logs = ref([])
  const text = ref('初始文本')
  const boxHeight = ref(0)
  const boxRef = ref(null)
  const paragraphs = ref(1)
  const isUpdating = ref(false)
  const showHighlight = ref(false)

  function addLog(message) {
    const now = new Date()
    const timeString = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(
      now.getSeconds()
    ).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`

    logs.value = [...logs.value, { time: timeString, message }]
  }

  function clearLogs() {
    logs.value = []
    addLog('日志已清空')
  }

  function updateText() {
    isUpdating.value = true
    addLog('开始更新文本...')

    // 更新状态
    text.value = '更新后的文本 - ' + new Date().toLocaleTimeString()
    addLog('文本状态已更新，但DOM可能尚未更新')

    // 使用nextTick等待DOM更新后执行
    nextTick(() => {
      addLog('nextTick回调执行 - DOM已更新')
      if (boxRef.value) {
        boxHeight.value = boxRef.value.clientHeight
        addLog(`测量高度: ${boxHeight.value}px`)
      }
      isUpdating.value = false
    })
  }

  function updateWithoutTick() {
    isUpdating.value = true
    addLog('开始更新文本（不使用nextTick）...')

    // 更新状态
    text.value = '直接更新 - ' + new Date().toLocaleTimeString()
    addLog('文本状态已更新')

    // 直接测量DOM（可能不准确）
    if (boxRef.value) {
      boxHeight.value = boxRef.value.clientHeight
      addLog(`直接测量高度: ${boxHeight.value}px（可能不准确）`)
    }

    isUpdating.value = false
  }

  function addParagraph() {
    paragraphs.value++
    addLog('添加段落')

    // 不使用nextTick直接测量
    const heightBefore = boxRef.value ? boxRef.value.clientHeight : 0
    addLog(`添加段落前测量高度: ${heightBefore}px（不准确）`)

    // 使用nextTick等待DOM更新后再测量
    nextTick(() => {
      const heightAfter = boxRef.value ? boxRef.value.clientHeight : 0
      addLog(`nextTick后测量高度: ${heightAfter}px（准确）`)
      boxHeight.value = heightAfter

      // 添加高亮效果
      showHighlight.value = true
      setTimeout(() => {
        showHighlight.value = false
      }, 1000)
    })
  }

  function resetDemo() {
    text.value = '初始文本'
    paragraphs.value = 1
    boxHeight.value = 0
    addLog('重置演示')
  }

  return () => (
    <div classStyle={[styles.container]}>
      <h2 classStyle={[styles.title]}>nextTick 用法示例</h2>

      <div classStyle={[styles.card]}>
        <div classStyle={[styles.section]}>
          <h3>什么是 nextTick？</h3>
          <p classStyle={[styles.paragraph]}>
            <code classStyle={[styles.code]}>nextTick</code>{' '}
            是一个用于处理异步DOM更新的实用函数。
            当你更改响应式状态后，DOM更新不会立即发生，而是在下一个"tick"中批量执行。
            nextTick 让你可以等待DOM更新完成后再执行代码。
          </p>

          <div classStyle={[styles.codeBlock]}>
            {`// 更新状态
text.value = '新文本'

// 这里DOM可能还没更新
console.log(element.textContent) // 可能显示旧值

// 使用nextTick等待DOM更新
nextTick(() => {
  // 这里DOM已经更新完成
  console.log(element.textContent) // 显示新值
})`}
          </div>
        </div>

        <div classStyle={[styles.section]}>
          <h3>实时演示</h3>

          <div
            ref={boxRef}
            classStyle={[
              styles.measureBox,
              showHighlight.value && styles.highlight
            ]}
            style={{ minHeight: '50px' }}
          >
            {Array(paragraphs.value)
              .fill()
              .map((_, i) => (
                <p key={i}>
                  {text.value} {i > 0 ? `(段落 ${i + 1})` : ''}
                </p>
              ))}
          </div>

          <div>
            当前测量高度: <strong>{boxHeight.value}px</strong>
          </div>

          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}
          >
            <button
              classStyle={[styles.button]}
              onClick={updateText}
              disabled={isUpdating.value}
            >
              使用nextTick更新
            </button>

            <button
              classStyle={[styles.button, styles.buttonSecondary]}
              onClick={updateWithoutTick}
              disabled={isUpdating.value}
            >
              不使用nextTick更新
            </button>

            <button classStyle={[styles.button]} onClick={addParagraph}>
              添加段落
            </button>

            <button
              classStyle={[styles.button, styles.buttonSecondary]}
              onClick={resetDemo}
            >
              重置演示
            </button>
          </div>
        </div>
      </div>

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
