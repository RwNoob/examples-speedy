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
  label: {
    fontSize: '1.1rem',
    color: '#333',
    minWidth: '3.5em',
    textAlign: 'left',
    flex: 1
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
    justifyContent: 'space-between'
  }
})

function MyInput(props) {
  return () => (
    <input
      classStyle={[styles.input]}
      type="text"
      value={props.value}
      onInput={e => props.onChange && props.onChange(e.target.value)}
      placeholder={props.placeholder || '请输入内容'}
    />
  )
}

export default function ComponentEventsDemo() {
  const value = ref('')
  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>组件事件示例</div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>输入：</span>
        <MyInput value={value.value} onChange={val => (value.value = val)} />
      </div>
      <div style={{ color: '#888', fontSize: '1rem', marginTop: '1rem' }}>
        当前输入内容：{value.value}
      </div>
    </div>
  )
}
