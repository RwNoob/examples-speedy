import { styled } from 'speedy-jsx'
const fadeIn = styled.keyframes({
  from: { opacity: 0, transform: 'translateY(40px)' },
  to: { opacity: 1, transform: 'none' }
})
const styles = styled.scope({
  bg: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%)',
    padding: '3rem 1rem'
  },
  card: {
    background: '#fff',
    borderRadius: '18px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
    padding: '3rem 2.5rem',
    maxWidth: '480px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: `${fadeIn} .8s cubic-bezier(.4,0,.2,1)`
  },
  title: {
    fontSize: '1.5rem',
    color: '#3b5bfd',
    fontWeight: 800,
    margin: 0,
    letterSpacing: '.05em'
  },
  desc: {
    fontSize: '1.15rem',
    color: '#444',
    marginTop: '1.5rem',
    marginBottom: 0,
    textAlign: 'center',
    lineHeight: 1.9
  }
})

const Home = () => {
  return () => (
    <div classStyle={[styles.bg]}>
      <div classStyle={[styles.card]}>
        <h1 classStyle={[styles.title]}>Speedy-JSX 示例项目</h1>
        <div classStyle={[styles.desc]}>
          <p>
            🌟 体验 <b>Speedy-JSX</b> 现代响应式前端开发。
            <br />
            本项目演示了响应式数据、组件化、动态属性、样式系统等核心特性。
            <br />
            点击上方导航，切换不同功能示例，感受高效与极简。
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
