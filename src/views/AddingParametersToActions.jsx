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
    marginBottom: '0.5rem',
    '&:hover': {
      backgroundColor: '#364fc7'
    }
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    marginBottom: '1rem',
    width: '100%',
    maxWidth: '300px',
    fontSize: '1rem'
  },
  demoBox: {
    padding: '1rem',
    border: '1px dashed #ced4da',
    borderRadius: '4px',
    marginBottom: '1rem',
    backgroundColor: 'white'
  },
  colorPicker: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  colorOption: {
    width: '30px',
    height: '30px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'transform 0.2s, border-color 0.2s',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  colorSelected: {
    borderColor: '#333',
    transform: 'scale(1.1)'
  },
  rippleContainer: {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  ripple: {
    position: 'absolute',
    borderRadius: '50%',
    transform: 'scale(0)',
    animation: 'ripple-animation 0.6s linear',
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },
  '@keyframes ripple-animation': {
    to: {
      transform: 'scale(4)',
      opacity: 0
    }
  },
  pannable: {
    userSelect: 'none',
    touchAction: 'none',
    cursor: 'grab',
    '&:active': {
      cursor: 'grabbing'
    }
  },
  pannableBox: {
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4263eb',
    color: 'white',
    borderRadius: '8px',
    fontWeight: '600',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.2s'
  },
  pannableActive: {
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)'
  },
  coordinates: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#666'
  }
})

// 注册 ripple 指令
directive('ripple', (el, update) => {
  let rippleColor = 'rgba(255, 255, 255, 0.7)' // 默认颜色
  let disabled = false

  // 确保元素有相对定位
  if (getComputedStyle(el).position === 'static') {
    el.style.position = 'relative'
  }
  el.style.overflow = 'hidden'

  const createRipple = e => {
    if (disabled) return

    // 移除旧的涟漪效果
    const ripples = el.querySelectorAll('.ripple-effect')
    ripples.forEach(ripple => {
      if (ripple.parentNode === el) {
        el.removeChild(ripple)
      }
    })

    // 创建新的涟漪元素
    const ripple = document.createElement('span')
    ripple.className = 'ripple-effect'

    // 设置涟漪样式
    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    ripple.style.width = ripple.style.height = `${size}px`

    // 计算点击位置
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.position = 'absolute'
    ripple.style.top = `${y}px`
    ripple.style.left = `${x}px`
    ripple.style.borderRadius = '50%'
    ripple.style.transform = 'scale(0)'
    ripple.style.backgroundColor = rippleColor
    ripple.style.animation = 'ripple-animation 0.6s linear'

    // 添加动画关键帧
    const keyframes = `
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `

    // 添加样式表
    if (!document.querySelector('#ripple-keyframes')) {
      const style = document.createElement('style')
      style.id = 'ripple-keyframes'
      style.textContent = keyframes
      document.head.appendChild(style)
    }

    el.appendChild(ripple)

    // 动画结束后移除涟漪元素
    setTimeout(() => {
      if (ripple.parentNode === el) {
        el.removeChild(ripple)
      }
    }, 600)
  }

  // 添加事件监听器
  el.addEventListener('mousedown', createRipple)

  // 更新参数
  update((oldValue, newValue) => {
    // 只接收响应式数据的值
    rippleColor = newValue || 'rgba(255, 255, 255, 0.7)'
  })

  // 返回清理函数
  return () => {
    el.removeEventListener('mousedown', createRipple)
    const ripples = el.querySelectorAll('.ripple-effect')
    ripples.forEach(ripple => {
      if (ripple.parentNode === el) {
        el.removeChild(ripple)
      }
    })
  }
})

// 注册 pannable 指令
directive('pannable', (el, update) => {
  let startX = 0
  let startY = 0
  let x = 0
  let y = 0
  let active = false
  let restrictToParent = false
  let parentRect = null
  let eventName = 'pan-move' // 默认事件名

  // 确保元素可以移动
  if (getComputedStyle(el).position === 'static') {
    el.style.position = 'relative'
  }
  el.style.userSelect = 'none'
  el.style.touchAction = 'none'
  el.style.cursor = 'grab'

  const handlePointerDown = e => {
    e.preventDefault()
    startX = e.clientX - x
    startY = e.clientY - y
    active = true

    el.style.cursor = 'grabbing'

    if (restrictToParent && el.parentElement) {
      parentRect = el.parentElement.getBoundingClientRect()
    }

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
  }

  const handlePointerMove = e => {
    if (!active) return

    let newX = e.clientX - startX
    let newY = e.clientY - startY

    // 如果限制在父元素内
    if (restrictToParent && parentRect) {
      const elRect = el.getBoundingClientRect()

      // 限制水平移动
      if (newX < 0) {
        newX = Math.max(newX, 0)
      } else if (newX + elRect.width > parentRect.width) {
        newX = parentRect.width - elRect.width
      }

      // 限制垂直移动
      if (newY < 0) {
        newY = Math.max(newY, 0)
      } else if (newY + elRect.height > parentRect.height) {
        newY = parentRect.height - elRect.height
      }
    }

    x = newX
    y = newY

    el.style.transform = `translate(${x}px, ${y}px)`

    // 触发自定义事件
    const customEvent = new CustomEvent(eventName, {
      detail: { x, y },
      bubbles: true
    })
    el.dispatchEvent(customEvent)
  }

  const handlePointerUp = () => {
    active = false
    el.style.cursor = 'grab'

    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
  }

  // 监听重置事件
  el.addEventListener('reset-position', () => {
    x = 0
    y = 0
    el.style.transform = `translate(0px, 0px)`

    // 触发自定义事件通知位置已重置
    const customEvent = new CustomEvent(eventName, {
      detail: { x: 0, y: 0 },
      bubbles: true
    })
    el.dispatchEvent(customEvent)
  })

  // 添加事件监听器
  el.addEventListener('pointerdown', handlePointerDown)

  // 更新参数
  update((oldValue, newValue) => {
    // 只接收响应式数据的值
    restrictToParent = !!newValue
  })

  // 返回清理函数
  return () => {
    el.removeEventListener('pointerdown', handlePointerDown)
    el.removeEventListener('reset-position', () => {})
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
  }
})

// 注册 tooltip 指令
directive('tooltip-2', (el, update) => {
  let tooltipText = ''

  // 创建工具提示元素
  const tooltip = document.createElement('div')
  tooltip.style.position = 'absolute'
  tooltip.style.bottom = '125%'
  tooltip.style.left = '50%'
  tooltip.style.transform = 'translateX(-50%)'
  tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
  tooltip.style.color = 'white'
  tooltip.style.padding = '0.5rem 1rem'
  tooltip.style.borderRadius = '4px'
  tooltip.style.fontSize = '0.9rem'
  tooltip.style.whiteSpace = 'nowrap'
  tooltip.style.zIndex = '10'
  tooltip.style.opacity = '0'
  tooltip.style.visibility = 'hidden'
  tooltip.style.transition = 'opacity 0.3s, visibility 0.3s'

  // 创建箭头
  const arrow = document.createElement('div')
  arrow.style.position = 'absolute'
  arrow.style.top = '100%'
  arrow.style.left = '50%'
  arrow.style.marginLeft = '-5px'
  arrow.style.borderWidth = '5px'
  arrow.style.borderStyle = 'solid'
  arrow.style.borderColor =
    'rgba(0, 0, 0, 0.8) transparent transparent transparent'

  tooltip.appendChild(arrow)

  // 确保父元素有相对定位
  if (getComputedStyle(el).position === 'static') {
    el.style.position = 'relative'
  }

  el.appendChild(tooltip)

  const showTooltip = () => {
    tooltip.style.opacity = '1'
    tooltip.style.visibility = 'visible'
  }

  const hideTooltip = () => {
    tooltip.style.opacity = '0'
    tooltip.style.visibility = 'hidden'
  }

  // 添加事件监听器
  el.addEventListener('mouseenter', showTooltip)
  el.addEventListener('mouseleave', hideTooltip)
  el.addEventListener('focus', showTooltip)
  el.addEventListener('blur', hideTooltip)

  // 更新工具提示内容
  update((oldValue, newValue) => {
    tooltipText = newValue || ''
    tooltip.textContent = tooltipText
    tooltip.appendChild(arrow)
  })

  // 返回清理函数
  return () => {
    el.removeEventListener('mouseenter', showTooltip)
    el.removeEventListener('mouseleave', hideTooltip)
    el.removeEventListener('focus', showTooltip)
    el.removeEventListener('blur', hideTooltip)
    if (tooltip && tooltip.parentNode) {
      tooltip.parentNode.removeChild(tooltip)
    }
  }
})

export default function AddingParametersToActions() {
  const rippleColor = ref('rgba(255, 255, 255, 0.7)')
  const tooltipText = ref('这是一个工具提示!')
  const restrictToParent = ref(true)
  const panPosition = ref({ x: 0, y: 0 })

  function setRippleColor(color) {
    rippleColor.value = color
  }

  function updateTooltip(text) {
    tooltipText.value = text
  }

  function toggleRestriction() {
    restrictToParent.value = !restrictToParent.value
  }

  function handlePanMove(e) {
    panPosition.value = e.detail
  }

  function resetPosition() {
    panPosition.value = { x: 0, y: 0 }
    const pannableElement = document.querySelector('.pannable-element')
    if (pannableElement) {
      // 触发自定义重置事件
      const resetEvent = new CustomEvent('reset-position')
      pannableElement.dispatchEvent(resetEvent)
    }
  }

  return () => (
    <div classStyle={[styles.container]}>
      <h2 classStyle={[styles.title]}>向指令添加参数</h2>

      <div classStyle={[styles.card]}>
        <div classStyle={[styles.paragraph]}>
          指令可以接收响应式数据作为参数，这使得指令的行为可以随着数据的变化而动态更新。
          通过传递响应式数据，你可以实现更加灵活和交互性强的用户界面。
        </div>

        <div classStyle={[styles.section]}>
          <h3 classStyle={[styles.sectionTitle]}>1. Tooltip 指令</h3>
          <div classStyle={[styles.paragraph]}>
            当鼠标悬停在元素上时显示提示信息，提示内容可以是响应式数据。
          </div>

          <div classStyle={[styles.demoBox]}>
            <div>
              <button
                classStyle={[styles.button]}
                use-tooltip-2={tooltipText.value}
              >
                悬停查看提示
              </button>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>更改提示文本:</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  classStyle={[styles.button]}
                  onClick={() => updateTooltip('这是一个工具提示!')}
                >
                  默认文本
                </button>
                <button
                  classStyle={[styles.button]}
                  onClick={() => updateTooltip('响应式更新的提示!')}
                >
                  更改文本
                </button>
                <button
                  classStyle={[styles.button]}
                  onClick={() => updateTooltip('点击了第三个按钮!')}
                >
                  另一个文本
                </button>
              </div>
            </div>
          </div>

          <div classStyle={[styles.codeBlock]}>
            {`// 注册 tooltip 指令
directive('tooltip', (el, update) => {
  let tooltipText = ''
  
  // 创建工具提示元素
  const tooltip = document.createElement('div')
  // 设置样式...
  
  // 添加事件监听器
  el.addEventListener('mouseenter', showTooltip)
  el.addEventListener('mouseleave', hideTooltip)
  
  // 更新工具提示内容
  update((oldValue, newValue) => {
    tooltipText = newValue || ''
    tooltip.textContent = tooltipText
  })
  
  // 返回清理函数
  return () => {
    // 清理事件和元素...
  }
})`}
          </div>

          <div classStyle={[styles.paragraph]}>
            使用方式:{' '}
            <code classStyle={[styles.code]}>
              &lt;button
              use-tooltip-2=&#123;tooltipText.value&#125;&gt;悬停查看&lt;/button&gt;
            </code>
          </div>
        </div>

        <div classStyle={[styles.section]}>
          <h3 classStyle={[styles.sectionTitle]}>2. Ripple 效果指令</h3>
          <div classStyle={[styles.paragraph]}>
            点击时产生涟漪效果，颜色可以是响应式数据。
          </div>

          <div classStyle={[styles.demoBox]}>
            <div>
              <button
                classStyle={[styles.button]}
                use-ripple={rippleColor.value}
                style={{
                  backgroundColor:
                    rippleColor.value === 'rgba(255, 255, 255, 0.7)'
                      ? '#4263eb'
                      : '#333',
                  marginBottom: '1rem'
                }}
              >
                点击查看涟漪效果
              </button>
            </div>

            <div classStyle={[styles.colorPicker]}>
              <div
                classStyle={[
                  styles.colorOption,
                  rippleColor.value === 'rgba(255, 255, 255, 0.7)' &&
                    styles.colorSelected
                ]}
                style={{ backgroundColor: '#4263eb' }}
                onClick={() => setRippleColor('rgba(255, 255, 255, 0.7)')}
              ></div>
              <div
                classStyle={[
                  styles.colorOption,
                  rippleColor.value === 'rgba(255, 0, 0, 0.5)' &&
                    styles.colorSelected
                ]}
                style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)' }}
                onClick={() => setRippleColor('rgba(255, 0, 0, 0.5)')}
              ></div>
              <div
                classStyle={[
                  styles.colorOption,
                  rippleColor.value === 'rgba(0, 255, 0, 0.5)' &&
                    styles.colorSelected
                ]}
                style={{ backgroundColor: 'rgba(0, 255, 0, 0.5)' }}
                onClick={() => setRippleColor('rgba(0, 255, 0, 0.5)')}
              ></div>
              <div
                classStyle={[
                  styles.colorOption,
                  rippleColor.value === 'rgba(0, 0, 255, 0.5)' &&
                    styles.colorSelected
                ]}
                style={{ backgroundColor: 'rgba(0, 0, 255, 0.5)' }}
                onClick={() => setRippleColor('rgba(0, 0, 255, 0.5)')}
              ></div>
            </div>
          </div>

          <div classStyle={[styles.codeBlock]}>
            {`// 注册 ripple 指令
directive('ripple', (el, update) => {
  let rippleColor = 'rgba(255, 255, 255, 0.7)' // 默认颜色
  
  const createRipple = e => {
    // 创建涟漪效果...
    ripple.style.backgroundColor = rippleColor
  }

  // 添加事件监听器
  el.addEventListener('mousedown', createRipple)

  // 更新参数
  update((oldValue, newValue) => {
    // 只接收响应式数据的值
    rippleColor = newValue || 'rgba(255, 255, 255, 0.7)'
  })

  // 返回清理函数
  return () => {
    // 清理事件和元素...
  }
})`}
          </div>

          <div classStyle={[styles.paragraph]}>
            使用方式:{' '}
            <code classStyle={[styles.code]}>
              &lt;button
              use-ripple=&#123;rippleColor.value&#125;&gt;点击&lt;/button&gt;
            </code>
          </div>
        </div>

        <div classStyle={[styles.section]}>
          <h3 classStyle={[styles.sectionTitle]}>3. 可拖动指令</h3>
          <div classStyle={[styles.paragraph]}>
            使元素可以通过鼠标或触摸拖动，限制条件可以是响应式数据。
          </div>

          <div
            classStyle={[styles.demoBox]}
            style={{ height: '200px', position: 'relative' }}
          >
            <div
              classStyle={[styles.pannableBox]}
              use-pannable={restrictToParent.value}
              className="pannable-element"
              onPanMove={handlePanMove}
            >
              拖动我
            </div>

            <div classStyle={[styles.coordinates]}>
              位置: X: {Math.round(panPosition.value.x)}px, Y:{' '}
              {Math.round(panPosition.value.y)}px
            </div>

            <div style={{ marginTop: '1rem' }}>
              <button classStyle={[styles.button]} onClick={toggleRestriction}>
                {restrictToParent.value ? '取消限制' : '限制在父元素内'}
              </button>

              <button classStyle={[styles.button]} onClick={resetPosition}>
                重置位置
              </button>
            </div>
          </div>

          <div classStyle={[styles.codeBlock]}>
            {`// 注册 pannable 指令
directive('pannable', (el, update) => {
  let restrictToParent = false
  
  const handlePointerMove = e => {
    // 处理移动，可能限制在父元素内...
    if (restrictToParent) {
      // 限制在父元素内的逻辑...
    }
    
    // 触发自定义事件
    const customEvent = new CustomEvent('pan-move', {
      detail: { x, y },
      bubbles: true
    })
    el.dispatchEvent(customEvent)
  }

  // 添加事件监听器
  el.addEventListener('pointerdown', handlePointerDown)

  // 更新参数
  update((oldValue, newValue) => {
    // 只接收响应式数据的值
    restrictToParent = !!newValue
  })

  // 返回清理函数
  return () => {
    // 清理事件监听器...
  }
})`}
          </div>

          <div classStyle={[styles.paragraph]}>
            使用方式:{' '}
            <code classStyle={[styles.code]}>
              &lt;div use-pannable=&#123;restrictToParent.value&#125;
              onPanMove=&#123;handlePanMove&#125;&gt;拖动我&lt;/div&gt;
            </code>
          </div>
        </div>

        <div classStyle={[styles.section]}>
          <h3 classStyle={[styles.sectionTitle]}>响应式参数的优势</h3>
          <div classStyle={[styles.paragraph]}>
            使用响应式数据作为指令参数有以下优势：
          </div>
          <ul>
            <li>简化指令的设计和实现，参数类型单一</li>
            <li>与框架的响应式系统紧密集成</li>
            <li>当数据变化时，指令会自动更新</li>
            <li>代码更加简洁、可读性更强</li>
          </ul>

          <div classStyle={[styles.paragraph]}>
            在 <code classStyle={[styles.code]}>update</code>{' '}
            回调中，你可以直接使用参数值：
          </div>

          <div classStyle={[styles.codeBlock]}>
            {`update((oldValue, newValue) => {
  // newValue 是响应式数据的当前值
  myOption = newValue || defaultValue
})`}
          </div>
        </div>
      </div>
    </div>
  )
}
