import { ref, onMounted, onUpdated, onUnmounted } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  card: {
    maxWidth: '540px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 12px #e0e7ff',
    border: '1.5px solid #e0e7ff',
    fontFamily:
      'Inter, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
  },
  title: {
    marginBottom: '2rem',
    color: '#3b5bfd',
    fontWeight: 800,
    letterSpacing: '1px',
    fontSize: '1.4rem',
    textAlign: 'center'
  },
  box: {
    width: '100%',
    minHeight: '120px',
    background: 'linear-gradient(135deg, #f8faff 0%, #e0e7ff 100%)',
    borderRadius: '10px',
    boxShadow: '0 1px 4px #e0e7ff',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: '#2541b2',
    position: 'relative',
    transition: 'all .2s',
    padding: '1.5rem',
    wordBreak: 'break-all'
  },
  dims: {
    color: '#3b5bfd',
    fontWeight: 700,
    fontSize: '1.08rem',
    marginBottom: '1.2rem',
    textAlign: 'center'
  },
  textarea: {
    width: '100%',
    minHeight: '60px',
    borderRadius: '6px',
    border: '1.5px solid #e0e7ff',
    fontSize: '1rem',
    padding: '0.7em 1em',
    background: '#f8fafc',
    color: '#2541b2',
    outline: 'none',
    marginBottom: '1.2rem',
    boxSizing: 'border-box',
    transition: 'border .2s',
    '&:focus': {
      borderColor: '#3b5bfd'
    }
  }
})

export default function Dimensions() {
  const boxRef = ref(null)
  const width = ref(0)
  const height = ref(0)
  const content = ref(
    '你可以输入内容，或调整窗口大小，实时查看盒子的宽高变化。'
  )

  function updateDims() {
    if (boxRef.value) {
      width.value = boxRef.value.clientWidth
      height.value = boxRef.value.clientHeight
    }
  }

  onMounted(() => {
    updateDims()
    window.addEventListener('resize', updateDims)
  })
  onUpdated(() => {
    updateDims()
  })
  onUnmounted(() => {
    window.removeEventListener('resize', updateDims)
  })

  return () => (
    <div classStyle={[styles.card]}>
      <h2 classStyle={[styles.title]}>元素尺寸绑定</h2>
      <div classStyle={[styles.dims]}>
        宽度：{width.value}px　高度：{height.value}px
      </div>
      <div ref={boxRef} classStyle={[styles.box]}>
        {content.value}
      </div>
      <textarea
        classStyle={[styles.textarea]}
        value={content.value}
        onInput={e => (content.value = e.target.value)}
        placeholder="输入内容，盒子会自适应高度..."
      />
    </div>
  )
}
