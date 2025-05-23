import { ref, computed } from 'speedy-jsx'
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
  card: {
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease'
  },
  active: {
    backgroundColor: '#e0f7fa',
    borderLeft: '4px solid #00bcd4'
  },
  inactive: {
    backgroundColor: '#f5f5f5',
    opacity: 0.7
  },
  important: {
    fontWeight: 'bold',
    color: '#d32f2f'
  },
  warning: {
    backgroundColor: '#fff3e0',
    borderLeft: '4px solid #ff9800'
  },
  success: {
    backgroundColor: '#e8f5e9',
    borderLeft: '4px solid #4caf50'
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '8px',
    marginBottom: '8px',
    backgroundColor: '#2196f3',
    color: 'white',
    transition: 'background-color 0.2s'
  },
  buttonDisabled: {
    backgroundColor: '#bdbdbd',
    cursor: 'not-allowed'
  },
  controls: {
    marginBottom: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  }
})

function Card(props) {
  return children => {
    // 根据props动态计算应用的样式类
    const cardClasses = [styles.card]

    if (props.active) {
      cardClasses.push(styles.active)
    } else {
      cardClasses.push(styles.inactive)
    }

    if (props.type === 'warning') {
      cardClasses.push(styles.warning)
    } else if (props.type === 'success') {
      cardClasses.push(styles.success)
    }

    if (props.important) {
      cardClasses.push(styles.important)
    }

    return (
      <div
        classStyle={cardClasses}
        onClick={props.onClick}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </div>
    )
  }
}

export default function ClassesDemo() {
  const activeCard = ref(1)
  const isImportant = ref(false)
  const cardType = ref('default')

  const cards = [
    { id: 1, content: '第一张卡片' },
    { id: 2, content: '第二张卡片' },
    { id: 3, content: '第三张卡片' }
  ]

  // 计算按钮是否禁用
  const isDisabled = computed(() => activeCard.value === 0)

  // 切换活跃卡片
  const setActiveCard = id => {
    activeCard.value = id
  }

  // 切换重要标记
  const toggleImportant = () => {
    isImportant.value = !isImportant.value
  }

  // 设置卡片类型
  const setCardType = type => {
    cardType.value = type
  }

  // 重置所有设置
  const resetAll = () => {
    activeCard.value = 0
    isImportant.value = false
    cardType.value = 'default'
  }

  return () => (
    <div classStyle={[styles.container]}>
      <h2 classStyle={[styles.title]}>类样式演示</h2>

      <div classStyle={[styles.controls]}>
        <button
          classStyle={[
            styles.button,
            isDisabled.value && styles.buttonDisabled
          ]}
          onClick={resetAll}
          disabled={isDisabled.value}
        >
          重置
        </button>

        <button classStyle={[styles.button]} onClick={toggleImportant}>
          {isImportant.value ? '取消重要' : '标记为重要'}
        </button>

        <button
          classStyle={[styles.button]}
          onClick={() => setCardType('default')}
        >
          默认样式
        </button>

        <button
          classStyle={[styles.button]}
          onClick={() => setCardType('warning')}
        >
          警告样式
        </button>

        <button
          classStyle={[styles.button]}
          onClick={() => setCardType('success')}
        >
          成功样式
        </button>
      </div>

      {cards.map(card => (
        <Card
          key={card.id}
          active={activeCard.value === card.id}
          important={isImportant.value}
          type={cardType.value}
          onClick={() => setActiveCard(card.id)}
        >
          <h3>{card.content}</h3>
          <p>
            点击此卡片将其设为活跃状态。当前状态:{' '}
            {activeCard.value === card.id ? '活跃' : '非活跃'}
          </p>
          {isImportant.value && <p>这是一条重要信息!</p>}
        </Card>
      ))}

      <div style={{ marginTop: '20px' }}>
        <h3>类样式指令说明:</h3>
        <p>
          在Speedy-JSX中，我们使用classStyle属性来应用样式。可以传递一个样式对象数组，根据条件动态添加样式。
        </p>
        <pre
          style={{
            background: '#f0f0f0',
            padding: '10px',
            borderRadius: '4px'
          }}
        >
          {`<div classStyle={[
  styles.card,
  isActive && styles.active,
  type === 'warning' && styles.warning
]}>
  内容
</div>`}
        </pre>
      </div>
    </div>
  )
}
