import { ref } from 'speedy-jsx'
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
  select: {
    padding: '0.5rem 1.2rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1.5px solid #e0e7ff',
    color: '#3b5bfd',
    background: '#fff',
    fontWeight: 700,
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    cursor: 'pointer',
    transition: 'border .2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#3b5bfd'
    }
  },
  block: {
    fontSize: '1.2rem',
    color: '#333',
    background: '#fff',
    borderRadius: '8px',
    padding: '1.2rem 1.5rem',
    boxShadow: '0 2px 8px 0 rgba(31,38,135,0.06)',
    minWidth: '180px',
    textAlign: 'center',
    marginTop: '1rem'
  }
})

export default function ElseIfBlocksDemo() {
  const status = ref('loading')
  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>else-if 条件渲染示例</div>
      <select
        classStyle={[styles.select]}
        value={status.value}
        onInput={e => (status.value = e.target.value)}
      >
        <option value="loading">loading</option>
        <option value="success">success</option>
        <option value="error">error</option>
      </select>
      {(() => {
        if (status.value === 'loading') {
          return <div classStyle={[styles.block]}>⏳ 加载中...</div>
        } else if (status.value === 'success') {
          return <div classStyle={[styles.block]}>✅ 加载成功！</div>
        } else {
          return <div classStyle={[styles.block]}>❌ 加载失败</div>
        }
      })()}
    </div>
  )
}
