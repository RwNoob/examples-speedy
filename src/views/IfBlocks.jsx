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
  btn: {
    padding: '0.6rem 1.5rem',
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

export default function IfBlocksDemo() {
  const show = ref(true)
  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>条件渲染（if-blocks）示例</div>
      <button
        classStyle={[styles.btn]}
        onClick={() => (show.value = !show.value)}
      >
        {show.value ? '隐藏内容' : '显示内容'}
      </button>
      {show.value ? (
        <div classStyle={[styles.block]}>🎉 现在内容已显示！</div>
      ) : (
        <div classStyle={[styles.block]}>🙈 内容已隐藏</div>
      )}
    </div>
  )
}
