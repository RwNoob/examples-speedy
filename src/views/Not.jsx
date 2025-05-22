import { h, RouterLink } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3b5bfd',
    fontFamily:
      'Inter, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    background: 'linear-gradient(135deg, #f8faff 0%, #e0e7ff 100%)',
    borderRadius: '16px',
    boxShadow: '0 2px 12px #bcccff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: '2rem'
  },
  code: {
    fontSize: '5rem',
    fontWeight: 900,
    letterSpacing: '8px',
    marginBottom: '1.2rem',
    color: '#2541b2',
    textShadow: '0 2px 8px #b3c6ff'
  },
  msg: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '2rem',
    color: '#3b5bfd'
  },
  btn: {
    padding: '0.7em 2.2em',
    borderRadius: '8px',
    border: 'none',
    background: '#3b5bfd',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1.1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px #e0e7ff',
    transition: 'background .18s',
    textDecoration: 'none',
    '&:hover': {
      background: '#2541b2'
    }
  }
})

export default function Not() {
  return () => (
    <div classStyle={[styles.root]}>
      <div classStyle={[styles.code]}>404</div>
      <div classStyle={[styles.msg]}>页面未找到</div>
      <RouterLink classStyle={[styles.btn]} to="/layout/home">
        返回首页
      </RouterLink>
    </div>
  )
}
