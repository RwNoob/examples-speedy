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
    gap: '1rem',
    width: '100%',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: '1.1rem',
    color: '#333',
    minWidth: '3.5em',
    textAlign: 'left',
    flex: 1
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
  value: {
    fontSize: '1.2rem',
    color: '#007bff',
    fontWeight: 700,
    minWidth: '60px',
    textAlign: 'right'
  }
})

export default function ReactiveDeclarations() {
  const count = ref(1)
  const double = computed(() => Number(count.value) * 2)
  const triple = computed(() => Number(count.value) * 3)

  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>响应式声明示例</div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>count：</span>
        <input
          classStyle={[styles.input]}
          type="number"
          value={count.value}
          onInput={e => (count.value = e.target.value)}
        />
      </div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>double：</span>
        <span classStyle={[styles.value]}>{double.value}</span>
      </div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>triple：</span>
        <span classStyle={[styles.value]}>{triple.value}</span>
      </div>
    </div>
  )
}
