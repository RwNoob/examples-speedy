import { RouterLink } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  nav: {
    display: 'flex',
    gap: '.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
    height: '100%',
    overflow: 'auto'
  },
  link: {
    color: '#666',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      color: '#333',
      backgroundColor: '#e9ecef'
    }
  },
  active: {
    color: '#007bff',
    backgroundColor: '#e7f1ff'
  }
})

export default function Nav() {
  return () => (
    <nav classStyle={[styles.nav]}>
      <RouterLink
        to="/layout/home"
        activeClass={styles.active.className}
        classStyle={[styles.link]}
      >
        首页
      </RouterLink>
      <RouterLink
        to="/layout/hello"
        activeClass={styles.active.className}
        classStyle={[styles.link]}
      >
        Hello World
      </RouterLink>
      <RouterLink
        to="/layout/dynamic"
        classStyle={[styles.link]}
        activeClass={styles.active.className}
      >
        动态属性
      </RouterLink>
      <RouterLink
        to="/layout/styling"
        classStyle={[styles.link]}
        activeClass={styles.active.className}
      >
        样式系统
      </RouterLink>
      <RouterLink
        to="/layout/nested"
        classStyle={[styles.link]}
        activeClass={styles.active.className}
      >
        嵌套组件
      </RouterLink>
      <RouterLink
        to="/layout/reactive"
        classStyle={[styles.link]}
        activeClass={styles.active.className}
      >
        响应式赋值
      </RouterLink>
      <RouterLink
        to="/layout/declaration"
        classStyle={[styles.link]}
        activeClass={styles.active.className}
      >
        响应式声明
      </RouterLink>
      <RouterLink
        to="/layout/statement"
        classStyle={[styles.link]}
        activeClass={styles.active.className}
      >
        响应式语句
      </RouterLink>
      <RouterLink
        to="/layout/props"
        classStyle={[styles.link]}
        activeClass={styles.active.className}
      >
        声明Props
      </RouterLink>
      <RouterLink
        to="/layout/defaults"
        classStyle={[styles.link]}
        activeClass={styles.active.className}
      >
        Props默认值
      </RouterLink>
      <RouterLink
        to="/layout/spread"
        classStyle={[styles.link]}
        activeClass={styles.active.className}
      >
        展开Props
      </RouterLink>
      <RouterLink
        to="/layout/if-blocks"
        classStyle={[styles.link]}
        activeClass={styles.active.className}
      >
        条件渲染
      </RouterLink>
      <RouterLink
        to="/layout/else-if-blocks"
        classStyle={[styles.link]}
        activeClass={styles.active.className}
      >
        else-if 条件渲染
      </RouterLink>
      <RouterLink
        to="/layout/for-blocks"
        classStyle={[styles.link]}
        activeClass={styles.active.className}
      >
        循环渲染
      </RouterLink>
      <RouterLink
        to="/layout/dom-events"
        classStyle={[styles.link]}
        activeClass={styles.active.className}
      >
        DOM事件
      </RouterLink>
    </nav>
  )
}
