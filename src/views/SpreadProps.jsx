import { ref } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  container: {
    maxWidth: '440px',
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
  label: {
    fontSize: '1.1rem',
    color: '#333',
    minWidth: '3.5em',
    textAlign: 'left',
    flex: 1
  },
  input: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1.5px solid #e0e7ff',
    width: '120px',
    textAlign: 'center',
    transition: 'border .2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#3b5bfd'
    }
  },
  preview: {
    marginTop: '1.5rem',
    fontSize: '1.15rem',
    fontWeight: 700
  }
})

function Button(props) {
  // 支持 ...props 批量传递
  return () => (
    <button
      type={props.type || 'button'}
      style={{
        background: props.color || '#3b5bfd',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: props.size === 'large' ? '0.9rem 2.2rem' : '0.5rem 1.2rem',
        fontSize: props.size === 'large' ? '1.15rem' : '1rem',
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all .2s',
        boxShadow: '0 2px 8px 0 rgba(31,38,135,0.08)',
        ...props.style
      }}
      {...props}
    >
      {props.children || '按钮'}
    </button>
  )
}

export default function SpreadPropsDemo() {
  const color = ref('#3b5bfd')
  const size = ref('normal')
  const label = ref('按钮')
  const type = ref('button')
  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>Spread Props 示例</div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>type：</span>
        <input
          classStyle={[styles.input]}
          type="text"
          value={type.value}
          onInput={e => (type.value = e.target.value)}
          placeholder="button/submit"
        />
      </div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>color：</span>
        <input
          classStyle={[styles.input]}
          type="color"
          value={color.value}
          onInput={e => (color.value = e.target.value)}
        />
      </div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>size：</span>
        <select
          classStyle={[styles.input]}
          value={size.value}
          onInput={e => (size.value = e.target.value)}
        >
          <option value="normal">normal</option>
          <option value="large">large</option>
        </select>
      </div>
      <div classStyle={[styles.row]}>
        <span classStyle={[styles.label]}>label：</span>
        <input
          classStyle={[styles.input]}
          type="text"
          value={label.value}
          onInput={e => (label.value = e.target.value)}
          placeholder="按钮文本"
        />
      </div>
      <div classStyle={[styles.preview]}>
        <Button
          type={type.value}
          color={color.value}
          size={size.value}
          children={label.value}
        />
      </div>
      <div style={{ fontSize: '0.95rem', color: '#888', marginTop: '1rem' }}>
        <span>props 可批量传递，支持 ...props 展开</span>
      </div>
    </div>
  )
}
