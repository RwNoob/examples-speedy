import { ref, watchEffect } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  container: {
    maxWidth: '400px',
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
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  label: {
    fontSize: '1.1rem',
    color: '#333',
    minWidth: '3.5em',
    textAlign: 'right'
  },
  input: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1.5px solid #e0e7ff',
    width: '80px',
    textAlign: 'center',
    transition: 'border .2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#3b5bfd'
    }
  },
  log: {
    fontSize: '1.1rem',
    color: '#007bff',
    background: '#f8fafc',
    borderRadius: '6px',
    padding: '0.7rem 1rem',
    minHeight: '2.2em',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 1px 4px 0 rgba(31,38,135,0.04)'
  }
})

export default function ReactiveStatements() {
  const count = ref(1)
  const log = ref('')

  watchEffect(() => {
    log.value = `count 变化为：${count.value}`
  })

  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>响应式语句示例</div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>count：</span>
        <input
          classStyle={[styles.input]}
          type="number"
          value={count.value}
          onInput={e => (count.value = e.target.value)}
        />
      </div>
      <div classStyle={[styles.log]}>{log.value}</div>
    </div>
  )
}
