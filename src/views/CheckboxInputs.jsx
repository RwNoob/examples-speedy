import { ref } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  container: {
    maxWidth: '440px',
    margin: '2rem auto',
    background: 'linear-gradient(120deg,#e0e7ff 0%,#f0f4ff 100%)',
    borderRadius: '16px',
    boxShadow: '0 4px 16px 0 rgba(31,38,135,0.08)',
    padding: '2.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'center'
  },
  title: {
    fontSize: '1.5rem',
    color: '#3b5bfd',
    fontWeight: 700,
    margin: 0
  },
  section: {
    width: '100%',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px 0 rgba(31,38,135,0.06)',
    padding: '1.2rem 1.5rem',
    marginBottom: '1rem'
  },
  label: {
    fontSize: '1.1rem',
    color: '#333',
    marginRight: '1.2em',
    cursor: 'pointer',
    userSelect: 'none'
  },
  checkbox: {
    marginRight: '0.5em',
    accentColor: '#3b5bfd',
    width: '1.1em',
    height: '1.1em',
    verticalAlign: 'middle'
  },
  preview: {
    marginTop: '1rem',
    fontSize: '1.1rem',
    color: '#2563eb',
    minHeight: '1.5em'
  }
})

const fruits = ['苹果', '香蕉', '橙子', '葡萄']

export default function CheckboxInputsDemo() {
  const checked = ref(false)
  const checkedFruits = ref([])

  const toggleFruit = fruit => {
    if (checkedFruits.value.includes(fruit)) {
      checkedFruits.value = checkedFruits.value.filter(f => f !== fruit)
    } else {
      checkedFruits.value = [...checkedFruits.value, fruit]
    }
  }

  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>复选框输入绑定示例</div>
      <div classStyle={[styles.section]}>
        <label classStyle={[styles.label]}>
          <input
            classStyle={[styles.checkbox]}
            type="checkbox"
            checked={checked.value}
            onInput={e => (checked.value = e.target.checked)}
          />
          是否同意协议
        </label>
        <div classStyle={[styles.preview]}>
          当前状态：{checked.value ? '已同意' : '未同意'}
        </div>
      </div>
      <div classStyle={[styles.section]}>
        <div style={{ marginBottom: '0.5em', color: '#333' }}>
          喜欢的水果（可多选）：
        </div>
        {fruits.map(fruit => (
          <label classStyle={[styles.label]} key={fruit}>
            <input
              classStyle={[styles.checkbox]}
              type="checkbox"
              checked={checkedFruits.value.includes(fruit)}
              onInput={() => toggleFruit(fruit)}
            />
            {fruit}
          </label>
        ))}
        <div classStyle={[styles.preview]}>
          已选：
          {checkedFruits.value.length === 0 ? (
            <span style={{ color: '#aaa' }}>无</span>
          ) : (
            checkedFruits.value.join('、')
          )}
        </div>
      </div>
    </div>
  )
}
