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
    width: '180px',
    textAlign: 'center',
    transition: 'border .2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#3b5bfd'
    }
  },
  btn: {
    padding: '0.5rem 1.2rem',
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
    lineHeight: 1.8
  }
})

export default function TextInputsDemo() {
  const name = ref('')
  const email = ref('')
  const note = ref('')

  const clearAll = () => {
    name.value = ''
    email.value = ''
    note.value = ''
  }

  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>文本输入绑定示例</div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>姓名：</span>
        <input
          classStyle={[styles.input]}
          type="text"
          value={name.value}
          onInput={e => (name.value = e.target.value)}
          placeholder="请输入姓名"
        />
      </div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>邮箱：</span>
        <input
          classStyle={[styles.input]}
          type="email"
          value={email.value}
          onInput={e => (email.value = e.target.value)}
          placeholder="请输入邮箱"
        />
      </div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>备注：</span>
        <input
          classStyle={[styles.input]}
          type="text"
          value={note.value}
          onInput={e => (note.value = e.target.value)}
          placeholder="备注信息"
        />
      </div>
      <button classStyle={[styles.btn]} onClick={clearAll}>
        清空所有
      </button>
      <div classStyle={[styles.preview]}>
        <div>
          姓名：
          {name.value || <span style={{ color: '#aaa' }}>（未填写）</span>}
        </div>
        <div>
          邮箱：
          {email.value || <span style={{ color: '#aaa' }}>（未填写）</span>}
        </div>
        <div>
          备注：
          {note.value || <span style={{ color: '#aaa' }}>（未填写）</span>}
        </div>
      </div>
    </div>
  )
}
