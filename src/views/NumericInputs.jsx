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
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
    justifyContent: 'center'
  },
  input: {
    padding: '0.5rem 1rem',
    fontSize: '1.2rem',
    borderRadius: '6px',
    border: '1.5px solid #e0e7ff',
    width: '100px',
    textAlign: 'center',
    transition: 'border .2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#3b5bfd'
    }
  },
  btn: {
    padding: '0.5rem 1.2rem',
    fontSize: '1.2rem',
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
  preview: {
    marginTop: '1.5rem',
    fontSize: '1.1rem',
    color: '#2563eb',
    width: '100%',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px 0 rgba(31,38,135,0.06)',
    padding: '1.2rem 1.5rem',
    minHeight: '60px',
    lineHeight: 1.8,
    textAlign: 'center'
  }
})

export default function NumericInputsDemo() {
  const value = ref(5)
  const min = 0
  const max = 10
  const step = 1

  const setValue = v => {
    let n = Number(v)
    if (isNaN(n)) n = min
    if (n < min) n = min
    if (n > max) n = max
    value.value = n
  }

  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>数字输入绑定示例</div>
      <div classStyle={[styles.row]}>
        <button
          classStyle={[styles.btn]}
          onClick={() => setValue(value.value - step)}
        >
          -
        </button>
        <input
          classStyle={[styles.input]}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value.value}
          onInput={e => setValue(e.target.value)}
        />
        <button
          classStyle={[styles.btn]}
          onClick={() => setValue(value.value + step)}
        >
          +
        </button>
      </div>
      <div classStyle={[styles.preview]}>
        当前数值：{value.value}（范围 {min} ~ {max}，步进 {step}）
      </div>
    </div>
  )
}
