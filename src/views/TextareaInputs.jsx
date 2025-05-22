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
  textarea: {
    width: '100%',
    minHeight: '90px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    border: '1.5px solid #e0e7ff',
    padding: '0.8rem 1rem',
    resize: 'vertical',
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
    marginTop: '0.5rem',
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
    wordBreak: 'break-all'
  },
  count: {
    color: '#888',
    fontSize: '0.98rem',
    marginTop: '0.5rem',
    textAlign: 'right',
    width: '100%'
  }
})

export default function TextareaInputsDemo() {
  const content = ref('')
  const clear = () => {
    content.value = ''
  }

  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>多行文本输入（textarea）示例</div>
      <textarea
        classStyle={[styles.textarea]}
        value={content.value}
        onInput={e => (content.value = e.target.value)}
        placeholder="请输入内容..."
      />
      <button classStyle={[styles.btn]} onClick={clear}>
        清空内容
      </button>
      <div classStyle={[styles.count]}>字数：{content.value.length}</div>
      <div classStyle={[styles.preview]}>
        {content.value ? (
          content.value
        ) : (
          <span style={{ color: '#aaa' }}>（暂无内容）</span>
        )}
      </div>
    </div>
  )
}
