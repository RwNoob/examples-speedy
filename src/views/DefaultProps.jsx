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
    width: '120px',
    textAlign: 'center',
    transition: 'border .2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#3b5bfd'
    }
  },
  preview: {
    marginTop: '1.5rem',
    fontSize: '1.3rem',
    fontWeight: 700
  }
})

function Welcome(props) {
  return () => {
    // props 默认值写法
    const name = props.name || '访客'
    const greeting = props.greeting || '欢迎光临'
    return (
      <div style={{ color: '#3b5bfd', transition: 'color .3s' }}>
        {greeting}，{name}！
      </div>
    )
  }
}

export default function DefaultPropsDemo() {
  const name = ref('')
  const greeting = ref('')
  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>Props 默认值示例</div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>name：</span>
        <input
          classStyle={[styles.input]}
          type="text"
          value={name.value}
          onInput={e => (name.value = e.target.value)}
          placeholder="输入名字"
        />
      </div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>greeting：</span>
        <input
          classStyle={[styles.input]}
          type="text"
          value={greeting.value}
          onInput={e => (greeting.value = e.target.value)}
          placeholder="输入问候语"
        />
      </div>
      <div classStyle={[styles.preview]}>
        <Welcome name={name.value} greeting={greeting.value} />
      </div>
      <div style={{ fontSize: '0.95rem', color: '#888', marginTop: '1rem' }}>
        <span>props 留空时自动使用默认值</span>
      </div>
    </div>
  )
}
