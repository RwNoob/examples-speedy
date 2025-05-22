import { ref } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  container: {
    maxWidth: '420px',
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
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
    justifyContent: 'space-between'
  },
  input: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1.5px solid #e0e7ff',
    width: '180px',
    textAlign: 'center',
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
    '&:hover': {
      background: '#3b5bfd',
      color: '#fff'
    }
  },
  list: {
    width: '100%',
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7rem'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px 0 rgba(31,38,135,0.06)',
    padding: '0.8rem 1.2rem',
    fontSize: '1.1rem',
    color: '#333'
  },
  del: {
    marginLeft: '1rem',
    background: 'none',
    border: 'none',
    color: '#ff4d4f',
    fontWeight: 700,
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'color .2s',
    '&:hover': {
      color: '#d9363e'
    }
  }
})

export default function EachBlocksDemo() {
  const items = ref([
    { id: 1, text: '苹果' },
    { id: 2, text: '香蕉' },
    { id: 3, text: '橙子' }
  ])
  const input = ref('')
  let nextId = 4

  const addItem = () => {
    const val = input.value.trim()
    if (!val) return
    items.value = [{ id: nextId++, text: val }, ...items.value]
    input.value = ''
  }
  const removeItem = id => {
    items.value = items.value.filter(item => item.id !== id)
  }

  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>each blocks（列表渲染）示例</div>
      <div classStyle={[styles.row]}>
        <input
          classStyle={[styles.input]}
          type="text"
          value={input.value}
          onInput={e => (input.value = e.target.value)}
          placeholder="输入新项内容"
          onKeyDown={e => {
            if (e.key === 'Enter') addItem()
          }}
        />
        <button classStyle={[styles.btn]} onClick={addItem}>
          添加
        </button>
      </div>
      <div classStyle={[styles.list]}>
        {items.value.length === 0 ? (
          <div style={{ color: '#aaa', textAlign: 'center' }}>暂无数据</div>
        ) : (
          items.value.map(item => (
            <div classStyle={[styles.item]} key={item.id}>
              <span>{item.text}</span>
              <button
                classStyle={[styles.del]}
                onClick={() => removeItem(item.id)}
              >
                删除
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
