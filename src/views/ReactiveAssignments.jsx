import { ref, computed } from 'speedy-jsx'
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
    minWidth: '2.5em',
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
  sum: {
    fontSize: '1.3rem',
    color: '#007bff',
    fontWeight: 700
  }
})

export default function ReactiveAssignments() {
  const a = ref(1)
  const b = ref(2)
  const sum = computed(() => Number(a.value) + Number(b.value))

  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>响应式赋值示例</div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>a：</span>
        <input
          classStyle={[styles.input]}
          type="number"
          value={a.value}
          onInput={e => (a.value = e.target.value)}
        />
      </div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>b：</span>
        <input
          classStyle={[styles.input]}
          type="number"
          value={b.value}
          onInput={e => (b.value = e.target.value)}
        />
      </div>
      <div classStyle={[styles.sum]}>sum = {sum.value}</div>
    </div>
  )
}
