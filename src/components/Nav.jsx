import { computed, ref, useRoute } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  nav: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '1rem 0',
    position: 'relative',
    zIndex: 10
  },
  dropdown: {
    // position: 'relative',
    width: '260px',
    marginLeft: 0
  },
  btn: {
    width: '100%',
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: '1.5px solid #e0e7ff',
    color: '#3b5bfd',
    background: '#fff',
    fontWeight: 700,
    boxShadow: '0 2px 8px 0 rgba(31,38,135,0.06)',
    transition: 'border .2s',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:focus': {
      outline: 'none',
      borderColor: '#3b5bfd'
    }
  },
  arrow: {
    marginLeft: '0.5em',
    fontSize: '1.1em',
    transition: 'transform .25s',
    userSelect: 'none'
  },
  menu: {
    position: 'absolute',
    top: '110%',
    left: 0,
    width: '100%',
    maxHeight: '320px',
    overflowY: 'auto',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 8px 32px 0 rgba(31,38,135,0.13)',
    margin: 0,
    listStyle: 'none',
    opacity: 0,
    pointerEvents: 'none',
    transform: 'translateY(-10px) scaleY(0.98)',
    transition: 'opacity .25s, transform .25s',
    zIndex: 100,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    padding: '0.5rem 0.5rem'
  },
  menuOpen: {
    opacity: 1,
    pointerEvents: 'auto',
    transform: 'translateY(0) scaleY(1)'
  },
  item: {
    padding: '0.6rem 1.2rem',
    color: '#3b5bfd',
    fontWeight: 500,
    fontSize: '1rem',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    borderRadius: '6px',
    transition: 'background .18s',
    '&:hover': {
      background: '#e0e7ff'
    }
  },
  active: {
    color: '#fff',
    background: '#3b5bfd'
  }
})

const routes = [
  { path: '/layout/home', label: '首页' },
  { path: '/layout/hello', label: 'Hello World' },
  { path: '/layout/dynamic', label: '动态属性' },
  { path: '/layout/styling', label: '样式系统' },
  { path: '/layout/nested', label: '嵌套组件' },
  { path: '/layout/reactive', label: '响应式赋值' },
  { path: '/layout/declaration', label: '响应式声明' },
  { path: '/layout/statement', label: '响应式语句' },
  { path: '/layout/props', label: '声明Props' },
  { path: '/layout/defaults', label: 'Props默认值' },
  { path: '/layout/spread', label: '展开Props' },
  { path: '/layout/if-blocks', label: '条件渲染' },
  { path: '/layout/else-if-blocks', label: 'else-if 条件渲染' },
  { path: '/layout/for-blocks', label: '循环渲染' },
  { path: '/layout/dom-events', label: 'DOM事件' },
  { path: '/layout/component-events', label: '组件事件' },
  { path: '/layout/dom-event-forwarding', label: 'DOM事件转发' },
  { path: '/layout/text-inputs', label: '文本输入' },
  { path: '/layout/numeric-inputs', label: '数字输入' },
  { path: '/layout/checkbox-inputs', label: '复选框输入' },
  { path: '/layout/group-inputs', label: '组选输入' },
  { path: '/layout/textarea-inputs', label: '多行文本输入' }
]

export default function Nav() {
  const open = ref(false)
  const current = useRoute()
  const currentLabel = computed(
    () => routes.find(r => r.path === current.value.path)?.label || '请选择页面'
  )
  // 点击外部关闭菜单
  if (typeof window !== 'undefined') {
    window.__speedy_nav_click__ = window.__speedy_nav_click__ || []
    if (!window.__speedy_nav_click__.includes('nav-close')) {
      window.addEventListener('click', () => {
        open.value = false
      })
      window.__speedy_nav_click__.push('nav-close')
    }
  }

  return () => (
    <nav classStyle={[styles.nav]}>
      <div classStyle={[styles.dropdown]} onClick={e => e.stopPropagation()}>
        <button
          classStyle={[styles.btn]}
          onClick={() => (open.value = !open.value)}
        >
          {currentLabel.value}
          <span
            classStyle={[styles.arrow]}
            style={{ transform: open.value ? 'rotate(180deg)' : 'none' }}
          >
            ▼
          </span>
        </button>
        <ul classStyle={[styles.menu, open.value && styles.menuOpen]}>
          {routes.map(r => (
            <li key={r.path}>
              <button
                class={[
                  styles.item,
                  current.value.path === r.path && styles.active
                ]}
                onClick={() => {
                  window.location.hash = r.path
                  open.value = false
                }}
              >
                {r.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
