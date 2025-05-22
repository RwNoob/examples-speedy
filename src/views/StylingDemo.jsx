import { ref } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    padding: '2.5rem 1rem'
  },
  box: {
    padding: '2rem 3rem',
    borderRadius: '12px',
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#fff',
    background: '#3b5bfd',
    boxShadow: '0 4px 16px 0 rgba(31,38,135,0.10)',
    transition: 'all .3s cubic-bezier(.4,0,.2,1)'
  },
  boxAlt: {
    background: 'linear-gradient(90deg,#ffb347 0%,#ffcc33 100%)',
    color: '#333',
    boxShadow: '0 4px 16px 0 rgba(255,204,51,0.10)'
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
  switch: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  }
})

const StyledCard = styled.div`
  padding: 2rem 3rem;
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(120deg, #3b5bfd 0%, #5ee7df 100%);
  box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.13);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 1rem;
  text-align: center;
  letter-spacing: 0.02em;
  border: 2px solid #e0e7ff;
  &:hover {
    border-color: #3b5bfd;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  }
`

export default function StylingDemo() {
  const alt = ref(false)
  const useStyled = ref(false)
  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.switch]}>
        {!useStyled.value && (
          <button
            classStyle={[styles.btn]}
            onClick={() => (alt.value = !alt.value)}
          >
            切换 Scope 样式
          </button>
        )}
        <button
          classStyle={[styles.btn]}
          onClick={() => (useStyled.value = !useStyled.value)}
        >
          切换 Styled Component
        </button>
      </div>
      {useStyled.value ? (
        <StyledCard>
          🧩 这是 styled component 风格的卡片
          <br />
          <span style={{ fontSize: '0.95rem', color: '#e0e7ff' }}>
            支持模板字符串、hover、渐变等高级特性
          </span>
        </StyledCard>
      ) : (
        <div classStyle={[styles.box, alt.value && styles.boxAlt]}>
          {alt.value ? '✨ 这是另一种 Scope 样式！' : '🎨 这是默认 Scope 样式'}
        </div>
      )}
    </div>
  )
}
