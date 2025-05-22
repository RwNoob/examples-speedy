import { ref } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  container: {
    maxWidth: '420px',
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
  btn: {
    padding: '0.6rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: 'none',
    background: '#e0e7ff',
    color: '#3b5bfd',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all .2s',
    '&:hover': {
      background: '#3b5bfd',
      color: '#fff'
    }
  },
  input: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1.5px solid #e0e7ff',
    width: '180px',
    textAlign: 'center',
    transition: 'border .2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#3b5bfd'
    }
  },
  area: {
    marginTop: '1rem',
    width: '100%',
    minHeight: '60px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px 0 rgba(31,38,135,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    color: '#333',
    transition: 'background .2s'
  },
  highlight: {
    background: '#dbeafe',
    color: '#2563eb'
  }
})

export default function DomEventsDemo() {
  const count = ref(0)
  const inputVal = ref('')
  const hover = ref(false)

  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>DOM 事件示例</div>
      <button classStyle={[styles.btn]} onClick={() => count.value++}>
        点击计数：{count.value}
      </button>
      <input
        classStyle={[styles.input]}
        type="text"
        value={inputVal.value}
        onInput={e => (inputVal.value = e.target.value)}
        placeholder="输入内容实时显示"
      />
      <div style={{ color: '#888', fontSize: '1rem' }}>
        输入内容：{inputVal.value}
      </div>
      <div
        classStyle={[styles.area, hover.value && styles.highlight]}
        onMouseEnter={() => (hover.value = true)}
        onMouseLeave={() => (hover.value = false)}
      >
        {hover.value ? '鼠标移入区域' : '鼠标移出区域'}
      </div>
    </div>
  )
}
