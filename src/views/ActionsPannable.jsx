import { ref, directive } from 'speedy-jsx'
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
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#444'
  },
  paragraph: {
    marginBottom: '1rem',
    lineHeight: '1.6'
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
  demoBox: {
    padding: '1rem',
    border: '1px dashed #ced4da',
    borderRadius: '4px',
    marginBottom: '1rem',
    backgroundColor: 'white',
    position: 'relative',
    height: '300px',
    overflow: 'hidden'
  },
  coordinates: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    padding: '5px 10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    borderRadius: '4px',
    fontSize: '0.9rem',
    zIndex: 10
  },
  draggable: {
    position: 'absolute',
    userSelect: 'none',
    touchAction: 'none',
    cursor: 'grab',
    '&:active': {
      cursor: 'grabbing'
    }
  },
  circle: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)'
  },
  square: {
    width: '70px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)'
  },
  controls: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem'
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
    }
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem'
  }
})

// 注册 pannable 指令
directive('pannable-2', (el, update) => {
  let startX = 0
  let startY = 0
  let x = 0
  let y = 0
  let active = false
  let restrictToContainer = false
  let containerRect = null
  const eventName = 'pan-move'

  // 获取初始位置
  const initialTransform = el.style.transform
  const match = initialTransform.match(/translate\((\d+)px, (\d+)px\)/)
  if (match) {
    x = parseInt(match[1], 10)
    y = parseInt(match[2], 10)
  }

  // 确保元素可以移动
  if (getComputedStyle(el).position === 'static') {
    el.style.position = 'relative'
  }

  const handlePointerDown = e => {
    e.preventDefault()
    startX = e.clientX - x
    startY = e.clientY - y
    active = true

    el.style.cursor = 'grabbing'
    el.style.zIndex = 1000

    if (restrictToContainer) {
      const container = el.closest('[data-container]')
      if (container) {
        containerRect = container.getBoundingClientRect()
      }
    }

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
  }

  const handlePointerMove = e => {
    if (!active) return

    let newX = e.clientX - startX
    let newY = e.clientY - startY

    // 如果限制在容器内
    if (restrictToContainer && containerRect) {
      const elRect = el.getBoundingClientRect()

      // 限制水平移动
      if (newX < 0) {
        newX = Math.max(newX, 0)
      } else if (newX + elRect.width > containerRect.width) {
        newX = containerRect.width - elRect.width
      }

      // 限制垂直移动
      if (newY < 0) {
        newY = Math.max(newY, 0)
      } else if (newY + elRect.height > containerRect.height) {
        newY = containerRect.height - elRect.height
      }
    }

    x = newX
    y = newY

    el.style.transform = `translate(${x}px, ${y}px)`

    // 触发自定义事件
    const customEvent = new CustomEvent(eventName, {
      detail: { x, y, id: el.dataset.id },
      bubbles: true
    })
    el.dispatchEvent(customEvent)
  }

  const handlePointerUp = () => {
    active = false
    el.style.cursor = 'grab'
    el.style.zIndex = ''

    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
  }

  // 监听重置事件
  el.addEventListener('reset-position', e => {
    const { x: newX = 0, y: newY = 0 } = e.detail || {}
    x = newX
    y = newY
    el.style.transform = `translate(${x}px, ${y}px)`

    // 触发自定义事件通知位置已重置
    const customEvent = new CustomEvent(eventName, {
      detail: { x, y, id: el.dataset.id },
      bubbles: true
    })
    el.dispatchEvent(customEvent)
  })

  // 添加事件监听器
  el.addEventListener('pointerdown', handlePointerDown)

  // 更新参数
  update((oldValue, newValue) => {
    restrictToContainer = !!newValue
  })

  // 返回清理函数
  return () => {
    el.removeEventListener('pointerdown', handlePointerDown)
    el.removeEventListener('reset-position', () => {})
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
  }
})

export default function ActionsPannable() {
  const positions = ref({
    circle1: { x: 50, y: 50 },
    circle2: { x: 150, y: 100 },
    square: { x: 250, y: 150 }
  })
  const activeItem = ref(null)
  const restrictToContainer = ref(true)

  function handlePanMove(e) {
    const { x, y, id } = e.detail
    if (id && positions.value[id]) {
      positions.value = {
        ...positions.value,
        [id]: { x, y }
      }
      activeItem.value = id
    }
  }

  function resetPositions() {
    const initialPositions = {
      circle1: { x: 50, y: 50 },
      circle2: { x: 150, y: 100 },
      square: { x: 250, y: 150 }
    }

    positions.value = initialPositions

    // 重置所有元素的位置
    Object.keys(initialPositions).forEach(id => {
      const el = document.querySelector(`[data-id="${id}"]`)
      if (el) {
        const resetEvent = new CustomEvent('reset-position', {
          detail: initialPositions[id]
        })
        el.dispatchEvent(resetEvent)
      }
    })

    activeItem.value = null
  }

  function toggleRestriction() {
    restrictToContainer.value = !restrictToContainer.value
  }

  return () => (
    <div classStyle={[styles.container]}>
      <h2 classStyle={[styles.title]}>可拖拽元素示例</h2>

      <div classStyle={[styles.card]}>
        <div classStyle={[styles.paragraph]}>
          这个示例展示了如何创建可拖拽的元素，并跟踪它们的位置。你可以拖动下面的形状，观察它们的坐标变化。
        </div>

        <div classStyle={[styles.controls]}>
          <button classStyle={[styles.button]} onClick={resetPositions}>
            重置位置
          </button>

          <div classStyle={[styles.checkbox]}>
            <input
              type="checkbox"
              id="restrict"
              checked={restrictToContainer.value}
              onChange={toggleRestriction}
            />
            <label htmlFor="restrict">限制在容器内</label>
          </div>
        </div>

        <div classStyle={[styles.demoBox]} data-container>
          <div
            classStyle={[styles.draggable, styles.circle]}
            style={{
              backgroundColor: '#ff6b6b',
              transform: `translate(${positions.value.circle1.x}px, ${positions.value.circle1.y}px)`
            }}
            use-pannable-2={restrictToContainer.value}
            onPanMove={handlePanMove}
            data-id="circle1"
          >
            圆形1
          </div>

          <div
            classStyle={[styles.draggable, styles.circle]}
            style={{
              backgroundColor: '#339af0',
              transform: `translate(${positions.value.circle2.x}px, ${positions.value.circle2.y}px)`
            }}
            use-pannable-2={restrictToContainer.value}
            onPanMove={handlePanMove}
            data-id="circle2"
          >
            圆形2
          </div>

          <div
            classStyle={[styles.draggable, styles.square]}
            style={{
              backgroundColor: '#20c997',
              transform: `translate(${positions.value.square.x}px, ${positions.value.square.y}px)`
            }}
            use-pannable-2={restrictToContainer.value}
            onPanMove={handlePanMove}
            data-id="square"
          >
            方形
          </div>

          {activeItem.value && (
            <div classStyle={[styles.coordinates]}>
              {activeItem.value}: X:{' '}
              {Math.round(positions.value[activeItem.value].x)}px, Y:{' '}
              {Math.round(positions.value[activeItem.value].y)}px
            </div>
          )}
        </div>

        <div classStyle={[styles.section]}>
          <h3 classStyle={[styles.sectionTitle]}>实现细节</h3>

          <div classStyle={[styles.paragraph]}>
            这个示例使用了一个自定义指令{' '}
            <code classStyle={[styles.code]}>pannable</code>，它实现了以下功能：
          </div>

          <ul>
            <li>支持多个可拖拽元素</li>
            <li>通过自定义事件传递位置信息</li>
            <li>可选的容器边界限制</li>
            <li>支持通过事件重置元素位置</li>
            <li>拖动时提高元素的 z-index</li>
          </ul>

          <div classStyle={[styles.codeBlock]}>
            {`// 使用方式
<div 
  use-pannable-2={restrictToContainer}
  onPanMove={handlePanMove}
  data-id="uniqueId"
  style={{ transform: \`translate(\${x}px, \${y}px)\` }}
>
  可拖动元素
</div>`}
          </div>

          <div classStyle={[styles.paragraph]}>
            指令的核心是处理指针事件（pointer
            events），这使得它在触摸设备和鼠标设备上都能正常工作。
            当元素被拖动时，它会发出自定义事件，并携带位置信息和元素ID，这样我们就可以在组件中更新状态。
          </div>
        </div>
      </div>
    </div>
  )
}
