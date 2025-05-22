import { styled } from 'speedy-jsx'

const styles = styled.scope({
  parent: {
    padding: '2rem',
    background: 'linear-gradient(120deg,#e0e7ff 0%,#f0f4ff 100%)',
    borderRadius: '16px',
    boxShadow: '0 4px 16px 0 rgba(31,38,135,0.08)',
    maxWidth: '500px',
    margin: '2rem auto',
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
  children: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  child: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px 0 rgba(31,38,135,0.06)',
    padding: '1rem 1.5rem',
    fontSize: '1.1rem',
    color: '#333',
    minWidth: '80px',
    textAlign: 'center',
    fontWeight: 500
  }
})

function Child(props) {
  return () => <div classStyle={[styles.child]}>👶 子组件：{props.label}</div>
}

function Parent() {
  const childrenData = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  return () => (
    <div classStyle={[styles.parent]}>
      <div classStyle={[styles.title]}>嵌套组件示例</div>
      <div classStyle={[styles.children]}>
        {childrenData.map(label => (
          <Child label={label} />
        ))}
      </div>
    </div>
  )
}

export default Parent
