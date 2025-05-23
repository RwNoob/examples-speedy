import { ref, onMounted, onUnmounted } from 'speedy-jsx'
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
  clockContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem'
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
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
    }
  },
  buttonSecondary: {
    backgroundColor: '#6c757d',
    '&:hover': {
      backgroundColor: '#495057'
    }
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
  digitalTime: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '1rem 0',
    fontFamily: 'monospace'
  },
  clockFace: {
    transition: 'fill 0.5s, stroke 0.5s'
  },
  clockMark: {
    transition: 'stroke 0.5s'
  },
  hourHand: {
    transition:
      'stroke 0.5s, transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
  },
  minuteHand: {
    transition:
      'stroke 0.5s, transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
  },
  secondHand: {
    transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
  },
  centerDot: {
    transition: 'fill 0.5s'
  },
  themeSwitch: {
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '30px',
    marginLeft: '0.5rem'
  },
  themeSwitchInput: {
    opacity: 0,
    width: 0,
    height: 0
  },
  themeSwitchSlider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ccc',
    transition: '0.4s',
    borderRadius: '34px',
    '&:before': {
      position: 'absolute',
      content: '""',
      height: '22px',
      width: '22px',
      left: '4px',
      bottom: '4px',
      backgroundColor: 'white',
      transition: '0.4s',
      borderRadius: '50%'
    }
  },
  themeSwitchActive: {
    backgroundColor: '#2196F3',
    '&:before': {
      transform: 'translateX(30px)'
    }
  },
  transitionContainer: {
    transition: 'background-color 0.5s',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '1rem'
  }
})

export default function SvgClock() {
  const time = ref(new Date())
  const running = ref(true)
  const timer = ref(null)
  const colorScheme = ref('light')
  const smooth = ref(true)
  const transitionSpeed = ref('normal')

  // 计算时钟指针的角度
  const hourAngle = () => {
    const hours = time.value.getHours() % 12
    const minutes = time.value.getMinutes()
    return 30 * hours + minutes / 2
  }

  const minuteAngle = () => {
    const minutes = time.value.getMinutes()
    const seconds = time.value.getSeconds()
    return 6 * minutes + seconds / 10
  }

  const secondAngle = () => {
    return 6 * time.value.getSeconds()
  }

  // 格式化数字，保证两位数
  const pad = num => {
    return num.toString().padStart(2, '0')
  }

  // 格式化数字时间
  const formatTime = () => {
    const hours = time.value.getHours()
    const minutes = time.value.getMinutes()
    const seconds = time.value.getSeconds()
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }

  // 启动时钟
  function startClock() {
    if (timer.value) return

    running.value = true
    timer.value = setInterval(() => {
      time.value = new Date()
    }, 1000)
  }

  // 停止时钟
  function stopClock() {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
    running.value = false
  }

  // 切换颜色方案
  function toggleColorScheme() {
    colorScheme.value = colorScheme.value === 'light' ? 'dark' : 'light'
  }

  // 切换平滑过渡
  function toggleSmooth() {
    smooth.value = !smooth.value
  }

  // 切换过渡速度
  function changeTransitionSpeed(speed) {
    transitionSpeed.value = speed
  }

  // 组件挂载时启动时钟
  onMounted(() => {
    startClock()
  })

  // 组件卸载时清理定时器
  onUnmounted(() => {
    if (timer.value) {
      clearInterval(timer.value)
    }
  })

  return () => {
    // 根据颜色方案设置样式
    const clockFace =
      colorScheme.value === 'light'
        ? { fill: '#f9f9f9', stroke: '#333' }
        : { fill: '#333', stroke: '#f9f9f9' }

    const clockMarks =
      colorScheme.value === 'light' ? { fill: '#333' } : { fill: '#f9f9f9' }

    const hourHand =
      colorScheme.value === 'light'
        ? { fill: '#333', stroke: '#333' }
        : { fill: '#f9f9f9', stroke: '#f9f9f9' }

    const minuteHand =
      colorScheme.value === 'light'
        ? { fill: '#666', stroke: '#666' }
        : { fill: '#ccc', stroke: '#ccc' }

    const secondHand = { fill: '#e74c3c', stroke: '#e74c3c' }

    // 根据过渡速度设置过渡时间
    const getTransitionStyle = baseClass => {
      if (!smooth.value) return {}

      let duration = '0.5s'
      if (transitionSpeed.value === 'slow') duration = '1s'
      if (transitionSpeed.value === 'fast') duration = '0.2s'

      return {
        transition: `stroke ${duration}, fill ${duration}, transform ${duration} cubic-bezier(0.4, 2.08, 0.55, 0.44)`
      }
    }

    const containerStyle = {
      backgroundColor: colorScheme.value === 'light' ? '#f8f9fa' : '#2d3436',
      color: colorScheme.value === 'light' ? '#333' : '#f9f9f9',
      transition: smooth.value ? 'background-color 0.5s, color 0.5s' : 'none'
    }

    return (
      <div classStyle={[styles.container]}>
        <h2 classStyle={[styles.title]}>SVG 时钟示例</h2>

        <div classStyle={[styles.transitionContainer]} style={containerStyle}>
          <div classStyle={[styles.section]}>
            <p classStyle={[styles.paragraph]}>
              这个示例展示了如何使用 SVG 创建一个实时动态时钟。 通过{' '}
              <code classStyle={[styles.code]}>setInterval</code>{' '}
              和响应式状态更新，
              时钟的指针会随着时间的变化而旋转。现在添加了平滑过渡效果。
            </p>

            <div classStyle={[styles.digitalTime]}>{formatTime()}</div>

            <div classStyle={[styles.clockContainer]}>
              <svg width="240" height="240" viewBox="-120 -120 240 240">
                {/* 时钟外圈 */}
                <circle
                  cx="0"
                  cy="0"
                  r="100"
                  fill={clockFace.fill}
                  stroke={clockFace.stroke}
                  stroke-width="2"
                  style={getTransitionStyle(styles.clockFace)}
                />

                {/* 时钟刻度 */}
                {[...Array(12)].map((_, i) => {
                  const angle = i * 30
                  const isHour = true
                  const length = isHour ? 10 : 5
                  const width = isHour ? 3 : 1
                  const x1 = 88 * Math.sin((angle * Math.PI) / 180)
                  const y1 = -88 * Math.cos((angle * Math.PI) / 180)
                  const x2 = (88 - length) * Math.sin((angle * Math.PI) / 180)
                  const y2 = -(88 - length) * Math.cos((angle * Math.PI) / 180)

                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={clockMarks.fill}
                      stroke-width={width}
                      style={getTransitionStyle(styles.clockMark)}
                    />
                  )
                })}

                {/* 时针 */}
                <line
                  y1="10"
                  y2="-50"
                  stroke={hourHand.stroke}
                  stroke-width="4"
                  stroke-linecap="round"
                  transform={`rotate(${hourAngle()})`}
                  style={getTransitionStyle(styles.hourHand)}
                />

                {/* 分针 */}
                <line
                  y1="10"
                  y2="-70"
                  stroke={minuteHand.stroke}
                  stroke-width="3"
                  stroke-linecap="round"
                  transform={`rotate(${minuteAngle()})`}
                  style={getTransitionStyle(styles.minuteHand)}
                />

                {/* 秒针 */}
                <line
                  y1="15"
                  y2="-80"
                  stroke={secondHand.stroke}
                  stroke-width="1"
                  stroke-linecap="round"
                  transform={`rotate(${secondAngle()})`}
                  style={
                    smooth.value
                      ? {
                          transition:
                            'transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)'
                        }
                      : {}
                  }
                />

                {/* 中心点 */}
                <circle
                  cx="0"
                  cy="0"
                  r="3"
                  fill={secondHand.fill}
                  style={getTransitionStyle(styles.centerDot)}
                />
              </svg>
            </div>

            <div classStyle={[styles.controls]}>
              {running.value ? (
                <button
                  classStyle={[styles.button, styles.buttonSecondary]}
                  onClick={stopClock}
                >
                  暂停
                </button>
              ) : (
                <button classStyle={[styles.button]} onClick={startClock}>
                  启动
                </button>
              )}

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>主题:</span>
                <label classStyle={[styles.themeSwitch]}>
                  <input
                    type="checkbox"
                    classStyle={[styles.themeSwitchInput]}
                    checked={colorScheme.value === 'dark'}
                    onChange={toggleColorScheme}
                  />
                  <span
                    classStyle={[
                      styles.themeSwitchSlider,
                      colorScheme.value === 'dark' && styles.themeSwitchActive
                    ]}
                  ></span>
                </label>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>过渡:</span>
                <label classStyle={[styles.themeSwitch]}>
                  <input
                    type="checkbox"
                    classStyle={[styles.themeSwitchInput]}
                    checked={smooth.value}
                    onChange={toggleSmooth}
                  />
                  <span
                    classStyle={[
                      styles.themeSwitchSlider,
                      smooth.value && styles.themeSwitchActive
                    ]}
                  ></span>
                </label>
              </div>
            </div>

            {smooth.value && (
              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>过渡速度:</span>
                <select
                  value={transitionSpeed.value}
                  onChange={e => changeTransitionSpeed(e.target.value)}
                  style={{
                    padding: '0.3rem',
                    borderRadius: '4px',
                    border: '1px solid #ced4da'
                  }}
                >
                  <option value="slow">慢速</option>
                  <option value="normal">正常</option>
                  <option value="fast">快速</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div classStyle={[styles.card]}>
          <div classStyle={[styles.section]}>
            <h3>SVG 时钟实现说明</h3>
            <p classStyle={[styles.paragraph]}>
              时钟使用 SVG 元素构建，包括表盘、刻度和三个指针。
              指针的旋转通过计算当前时间的角度，并使用 SVG 的{' '}
              <code classStyle={[styles.code]}>transform</code> 属性实现。
              现在添加了 CSS 过渡效果，使指针移动和主题切换更加平滑。
            </p>

            <div classStyle={[styles.codeBlock]}>
              {`// 为SVG元素添加过渡效果
<line
  y1="10"
  y2="-50"
  stroke={hourHand.stroke}
  stroke-width="4"
  stroke-linecap="round"
  transform={\`rotate(\${hourAngle()})\`}
  style={{ transition: 'stroke 0.5s, transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)' }}
/>`}
            </div>

            <p classStyle={[styles.paragraph]}>
              时钟的动画效果通过每秒更新时间状态实现，使用{' '}
              <code classStyle={[styles.code]}>setInterval</code> 定时器。
              在组件挂载时启动定时器，在组件卸载时清理定时器，确保不会造成内存泄漏。
              CSS 过渡属性使指针移动更加平滑，贝塞尔曲线提供了更自然的动画效果。
            </p>
          </div>
        </div>
      </div>
    )
  }
}
