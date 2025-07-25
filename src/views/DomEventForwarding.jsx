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
  status: {
    color: '#2563eb',
    fontSize: '1.1rem',
    marginTop: '1rem',
    minHeight: '1.5em'
  }
})

function ForwardInput(props) {
  // 透传所有事件和属性
  return () => <input classStyle={[styles.input]} {...props} />
}

export default function DomEventForwardingDemo() {
  const value = ref('')
  const status = ref('')

  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>DOM 事件转发示例</div>
      <ForwardInput
        value={value.value}
        placeholder="聚焦、输入、失焦试试"
        onFocus={() => (status.value = '获得焦点')}
        onBlur={() => (status.value = '失去焦点')}
        onInput={e => {
          value.value = e.target.value
          status.value = '输入中...'
        }}
      />
      <div classStyle={[styles.status]}>{status.value}</div>
      <div style={{ color: '#888', fontSize: '1rem', marginTop: '1rem' }}>
        当前输入内容：{value.value}
      </div>
    </div>
  )
}
