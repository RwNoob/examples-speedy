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
  tooltip: {
    position: 'relative',
    display: 'inline-block'
  },
  tooltipContent: {
    position: 'absolute',
    bottom: '125%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap',
    zIndex: 10,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 0.3s, visibility 0.3s',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: '50%',
      marginLeft: '-5px',
      borderWidth: '5px',
      borderStyle: 'solid',
      borderColor: 'rgba(0, 0, 0, 0.8) transparent transparent transparent'
    }
  },
  tooltipVisible: {
    opacity: 1,
    visibility: 'visible'
  },
  longpress: {
    userSelect: 'none',
    touchAction: 'none'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '0.5rem'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4263eb',
    borderRadius: '4px',
    transition: 'width 0.1s linear'
  },
  demoBox: {
    padding: '1rem',
    border: '1px dashed #ced4da',
    borderRadius: '4px',
    marginBottom: '1rem',
    backgroundColor: 'white'
  },
  clickOutsideBox: {
    padding: '1rem',
    border: '1px solid #4263eb',
    borderRadius: '4px',
    marginBottom: '1rem',
    backgroundColor: 'white',
    transition: 'background-color 0.3s'
  },
  clickOutsideActive: {
    backgroundColor: '#e7f5ff'
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

// 注册 tooltip 指令
directive('tooltip', (el, update) => {
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
    let content = newValue || ''
    tooltip.textContent = content
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

// 注册 longpress 指令
directive('longpress', (el, update) => {
  let timer = null
  let progress = 0
  let duration = 1000 // 默认长按时间 1 秒
  let eventName = 'longpress-complete'
  let progressBar = null
  let progressFill = null

  // 创建进度条
  const createProgressBar = () => {
    progressBar = document.createElement('div')
    progressBar.style.width = '100%'
    progressBar.style.height = '4px'
    progressBar.style.backgroundColor = '#e9ecef'
    progressBar.style.borderRadius = '4px'
    progressBar.style.overflow = 'hidden'
    progressBar.style.marginTop = '0.5rem'
    progressBar.style.position = 'absolute'
    progressBar.style.bottom = '0'
    progressBar.style.left = '0'

    progressFill = document.createElement('div')
    progressFill.style.height = '100%'
    progressFill.style.backgroundColor = '#4263eb'
    progressFill.style.borderRadius = '4px'
    progressFill.style.width = '0%'
    progressFill.style.transition = 'width 0.1s linear'

    progressBar.appendChild(progressFill)

    // 确保父元素有相对定位
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative'
    }

    el.appendChild(progressBar)
  }

  createProgressBar()

  const startPress = e => {
    e.preventDefault()
    progress = 0
    progressFill.style.width = '0%'

    const startTime = Date.now()
    timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      progress = Math.min((elapsed / duration) * 100, 100)
      progressFill.style.width = `${progress}%`

      if (progress >= 100) {
        clearInterval(timer)
        // 触发自定义事件
        const customEvent = new CustomEvent(eventName, {
          detail: { originalEvent: e },
          bubbles: true
        })
        el.dispatchEvent(customEvent)
      }
    }, 10)
  }

  const endPress = () => {
    clearInterval(timer)
    progressFill.style.width = '0%'
  }

  // 添加事件监听器
  el.addEventListener('mousedown', startPress)
  el.addEventListener('mouseup', endPress)
  el.addEventListener('mouseleave', endPress)
  el.addEventListener('touchstart', startPress)
  el.addEventListener('touchend', endPress)

  // 防止文本选择
  el.style.userSelect = 'none'
  el.style.touchAction = 'none'

  // 更新持续时间参数
  update((oldValue, newValue) => {
    // 如果提供了新的持续时间，则使用它
    duration = newValue || 1000
  })

  // 返回清理函数
  return () => {
    clearInterval(timer)
    el.removeEventListener('mousedown', startPress)
    el.removeEventListener('mouseup', endPress)
    el.removeEventListener('mouseleave', endPress)
    el.removeEventListener('touchstart', startPress)
    el.removeEventListener('touchend', endPress)
    if (progressBar && progressBar.parentNode) {
      progressBar.parentNode.removeChild(progressBar)
    }
  }
})

// 注册 clickOutside 指令
directive('clickOutside', (el, update) => {
  const eventName = 'click-outside' // 固定事件名

  const handleClick = e => {
    if (el && !el.contains(e.target)) {
      // 创建自定义事件
      const customEvent = new CustomEvent(eventName, {
        detail: { originalEvent: e },
        bubbles: true
      })
      // 触发自定义事件
      el.dispatchEvent(customEvent)
    }
  }

  // 添加事件监听器
  document.addEventListener('click', handleClick)

  // 更新启用状态
  update((oldValue, newValue) => {
    // 使用 newValue 表示是否启用，不做任何操作
    // 保留 update 回调以便与其他指令保持一致
  })

  // 返回清理函数
  return () => {
    document.removeEventListener('click', handleClick)
  }
})

export default function CustomActions() {
  const tooltipText = ref('这是一个工具提示!')
  const longpressCount = ref(0)
  const longpressDuration = ref(1000)
  const isBoxActive = ref(false)
  const message = ref('点击外部区域来关闭')

  function handleLongpress() {
    longpressCount.value++
  }

  function changeDuration(newDuration) {
    longpressDuration.value = newDuration
  }

  function toggleBox() {
    isBoxActive.value = true
  }

  function closeBox() {
    isBoxActive.value = false
  }

  function updateTooltip(newText) {
    tooltipText.value = newText
  }

  function handleClickOutside(e) {
    closeBox()
  }

  return () => (
    <div classStyle={[styles.container]}>
      <h2 classStyle={[styles.title]}>自定义指令示例</h2>

      <div classStyle={[styles.card]}>
        <div classStyle={[styles.paragraph]}>
          自定义指令是一种复用与 DOM 元素交互逻辑的方式。使用{' '}
          <code classStyle={[styles.code]}>directive</code> 函数注册指令，
          然后通过 <code classStyle={[styles.code]}>use-指令名</code>{' '}
          语法在元素上使用。
        </div>

        <div classStyle={[styles.section]}>
          <h3 classStyle={[styles.sectionTitle]}>1. Tooltip 指令</h3>
          <div classStyle={[styles.paragraph]}>
            当鼠标悬停在元素上时显示提示信息。
          </div>

          <div classStyle={[styles.demoBox]}>
            <div>
              <button
                classStyle={[styles.button]}
                use-tooltip={tooltipText.value}
              >
                悬停查看提示
              </button>

              <button classStyle={[styles.button]} use-tooltip="另一个提示!">
                不同的提示
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
  // 创建工具提示元素
  const tooltip = document.createElement('div')
  // 设置样式...
  
  // 添加事件监听器
  el.addEventListener('mouseenter', showTooltip)
  el.addEventListener('mouseleave', hideTooltip)
  
  // 更新工具提示内容
  update((oldValue, newValue) => {
    let content = newValue || ''
    tooltip.textContent = content
  })
  
  // 返回清理函数
  return () => {
    // 清理事件监听器和DOM元素
  }
})`}
          </div>

          <div classStyle={[styles.paragraph]}>
            使用方式:{' '}
            <code classStyle={[styles.code]}>
              &lt;button
              use-tooltip=&#123;tooltipText.value&#125;&gt;悬停查看&lt;/button&gt;
            </code>
          </div>
        </div>

        <div classStyle={[styles.section]}>
          <h3 classStyle={[styles.sectionTitle]}>2. 长按指令</h3>
          <div classStyle={[styles.paragraph]}>
            长按元素一段时间触发事件，包含进度条反馈。
          </div>

          <div classStyle={[styles.demoBox]}>
            <div>
              <button
                classStyle={[styles.button, styles.longpress]}
                use-longpress={longpressDuration.value}
                onLongpressComplete={handleLongpress}
              >
                长按此按钮 ({longpressDuration.value / 1000}秒)
              </button>

              <span classStyle={[styles.badge]}>
                计数: {longpressCount.value}
              </span>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>更改长按时间:</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  classStyle={[styles.button]}
                  onClick={() => changeDuration(500)}
                >
                  0.5秒
                </button>
                <button
                  classStyle={[styles.button]}
                  onClick={() => changeDuration(1000)}
                >
                  1秒
                </button>
                <button
                  classStyle={[styles.button]}
                  onClick={() => changeDuration(2000)}
                >
                  2秒
                </button>
              </div>
            </div>
          </div>

          <div classStyle={[styles.codeBlock]}>
            {`// 注册 longpress 指令
directive('longpress', (el, update) => {
  let timer = null
  let progress = 0
  let duration = 1000 // 默认长按时间
  
  // 创建进度条...
  
  const startPress = e => {
    // 开始计时和更新进度条
    // 当达到指定时间时触发事件
    if (progress >= 100) {
      const customEvent = new CustomEvent('longpress-complete', {
        detail: { originalEvent: e },
        bubbles: true
      })
      el.dispatchEvent(customEvent)
    }
  }
  
  // 添加事件监听器
  el.addEventListener('mousedown', startPress)
  el.addEventListener('mouseup', endPress)
  
  // 更新持续时间
  update((oldValue, newValue) => {
    duration = newValue || 1000
  })
  
  // 返回清理函数
  return () => {
    // 清理事件监听器和DOM元素
  }
})`}
          </div>

          <div classStyle={[styles.paragraph]}>
            使用方式:{' '}
            <code classStyle={[styles.code]}>
              &lt;button use-longpress=&#123;duration.value&#125;
              onLongpressComplete=&#123;handleLongpress&#125;&gt;长按&lt;/button&gt;
            </code>
          </div>
        </div>

        <div classStyle={[styles.section]}>
          <h3 classStyle={[styles.sectionTitle]}>3. 点击外部指令</h3>
          <div classStyle={[styles.paragraph]}>
            当用户点击元素外部区域时触发自定义事件，常用于下拉菜单、模态框等。
          </div>

          <div classStyle={[styles.demoBox]}>
            <button
              classStyle={[styles.button]}
              onClick={toggleBox}
              style={{ display: isBoxActive.value ? 'none' : 'inline-block' }}
            >
              显示框
            </button>

            {isBoxActive.value && (
              <div
                classStyle={[styles.clickOutsideBox, styles.clickOutsideActive]}
                use-clickOutside={true}
                onClickOutside={handleClickOutside}
              >
                <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  {message.value}
                </div>
                <button
                  classStyle={[styles.button]}
                  onClick={e => {
                    e.stopPropagation()
                    message.value = '你点击了内部按钮'
                  }}
                >
                  内部按钮
                </button>
              </div>
            )}
          </div>

          <div classStyle={[styles.codeBlock]}>
            {`// 注册 clickOutside 指令
directive('clickOutside', (el, update) => {
  const eventName = 'click-outside' // 固定事件名
  
  const handleClick = (e) => {
    if (el && !el.contains(e.target)) {
      // 创建自定义事件
      const customEvent = new CustomEvent(eventName, {
        detail: { originalEvent: e },
        bubbles: true
      })
      // 触发自定义事件
      el.dispatchEvent(customEvent)
    }
  }
  
  // 添加事件监听器
  document.addEventListener('click', handleClick)
  
  // 返回清理函数
  return () => {
    document.removeEventListener('click', handleClick)
  }
})`}
          </div>

          <div classStyle={[styles.paragraph]}>
            使用方式:{' '}
            <code classStyle={[styles.code]}>
              &lt;div use-clickOutside=&#123;true&#125;
              onClickOutside=&#123;handleClickOutside&#125;&gt;内容&lt;/div&gt;
            </code>
          </div>
        </div>
      </div>

      <div classStyle={[styles.card]}>
        <h3 classStyle={[styles.sectionTitle]}>自定义指令的生命周期</h3>
        <div classStyle={[styles.paragraph]}>
          自定义指令有一个简单的生命周期：
        </div>
        <ol>
          <li>初始化：指令首次应用到元素时执行</li>
          <li>更新：当指令的值发生变化时，通过 update 回调处理</li>
          <li>清理：当元素被卸载或指令被移除时执行返回的清理函数</li>
        </ol>

        <div classStyle={[styles.paragraph]}>
          自定义指令是处理 DOM
          操作、事件监听和第三方库集成的强大工具。它们可以帮助你保持组件逻辑的清晰，同时提供可复用的
          DOM 交互功能。
        </div>
      </div>
    </div>
  )
}
