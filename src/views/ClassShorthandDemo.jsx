import { ref } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  container: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    maxWidth: '600px',
    margin: '0 auto'
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333'
  },
  box: {
    padding: '16px',
    borderRadius: '8px',
    margin: '16px 0',
    border: '1px solid #ddd',
    transition: 'all 0.3s ease'
  },
  bordered: {
    border: '2px solid #7b1fa2'
  },
  rounded: {
    borderRadius: '24px'
  },
  big: {
    padding: '24px',
    fontSize: '18px'
  },
  red: {
    backgroundColor: '#ffebee',
    color: '#c62828'
  },
  blue: {
    backgroundColor: '#e3f2fd',
    color: '#1565c0'
  },
  green: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32'
  },
  controls: {
    marginBottom: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#2196f3',
    color: 'white',
    transition: 'background-color 0.2s'
  },
  buttonActive: {
    backgroundColor: '#1565c0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  codeBlock: {
    background: '#f0f0f0',
    padding: '16px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    overflowX: 'auto',
    marginTop: '20px'
  }
})

export default function ClassShorthandDemo() {
  // 定义各种样式状态
  const isBordered = ref(true)
  const isRounded = ref(false)
  const isBig = ref(false)
  const color = ref('default') // 'default', 'red', 'blue', 'green'

  // 切换边框样式
  const toggleBordered = () => {
    isBordered.value = !isBordered.value
  }

  // 切换圆角样式
  const toggleRounded = () => {
    isRounded.value = !isRounded.value
  }

  // 切换大小样式
  const toggleSize = () => {
    isBig.value = !isBig.value
  }

  // 设置颜色样式
  const setColor = newColor => {
    color.value = newColor
  }

  return () => (
    <div classStyle={[styles.container]}>
      <h2 classStyle={[styles.title]}>类简写样式演示</h2>

      <div classStyle={[styles.controls]}>
        <button
          classStyle={[styles.button, isBordered.value && styles.buttonActive]}
          onClick={toggleBordered}
        >
          {isBordered.value ? '移除边框' : '添加边框'}
        </button>

        <button
          classStyle={[styles.button, isRounded.value && styles.buttonActive]}
          onClick={toggleRounded}
        >
          {isRounded.value ? '标准圆角' : '大圆角'}
        </button>

        <button
          classStyle={[styles.button, isBig.value && styles.buttonActive]}
          onClick={toggleSize}
        >
          {isBig.value ? '标准大小' : '大尺寸'}
        </button>
      </div>

      <div classStyle={[styles.controls]}>
        <button
          classStyle={[
            styles.button,
            color.value === 'default' && styles.buttonActive
          ]}
          onClick={() => setColor('default')}
        >
          默认颜色
        </button>

        <button
          classStyle={[
            styles.button,
            color.value === 'red' && styles.buttonActive
          ]}
          onClick={() => setColor('red')}
        >
          红色
        </button>

        <button
          classStyle={[
            styles.button,
            color.value === 'blue' && styles.buttonActive
          ]}
          onClick={() => setColor('blue')}
        >
          蓝色
        </button>

        <button
          classStyle={[
            styles.button,
            color.value === 'green' && styles.buttonActive
          ]}
          onClick={() => setColor('green')}
        >
          绿色
        </button>
      </div>

      {/* 使用条件类样式的演示框 */}
      <div
        classStyle={[
          styles.box,
          isBordered.value && styles.bordered,
          isRounded.value && styles.rounded,
          isBig.value && styles.big,
          color.value === 'red' && styles.red,
          color.value === 'blue' && styles.blue,
          color.value === 'green' && styles.green
        ]}
      >
        <h3>动态样式示例</h3>
        <p>这个元素的样式会根据上面的控制按钮动态变化。</p>
        <p>当前应用的样式:</p>
        <ul>
          <li>边框: {isBordered.value ? '是' : '否'}</li>
          <li>大圆角: {isRounded.value ? '是' : '否'}</li>
          <li>大尺寸: {isBig.value ? '是' : '否'}</li>
          <li>颜色: {color.value}</li>
        </ul>
      </div>

      <div classStyle={[styles.codeBlock]}>
        <h3>类简写语法</h3>
        <p>
          在Speedy-JSX中，我们使用classStyle属性的数组形式来实现类似Svelte的类简写指令：
        </p>
        <pre>
          {`<div classStyle={[
  styles.box,
  isBordered && styles.bordered,
  isRounded && styles.rounded,
  isBig && styles.big,
  color === 'red' && styles.red,
  color === 'blue' && styles.blue,
  color === 'green' && styles.green
]}>
  内容
</div>`}
        </pre>
        <p>这种写法允许我们根据条件动态添加和移除样式类。</p>
      </div>
    </div>
  )
}
