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
  section: {
    width: '100%',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px 0 rgba(31,38,135,0.06)',
    padding: '1.2rem 1.5rem',
    marginBottom: '1rem'
  },
  label: {
    fontSize: '1.1rem',
    color: '#333',
    marginRight: '1.2em',
    cursor: 'pointer',
    userSelect: 'none'
  },
  radio: {
    marginRight: '0.5em',
    accentColor: '#3b5bfd',
    width: '1.1em',
    height: '1.1em',
    verticalAlign: 'middle'
  },
  preview: {
    marginTop: '1rem',
    fontSize: '1.1rem',
    color: '#2563eb',
    minHeight: '1.5em'
  }
})
const Label = styled.div`
  margin-bottom: 0.5em;
  color: #333;
`

const colors = ['红色', '蓝色', '绿色', '黄色']

export default function GroupInputsDemo() {
  const selectedColor = ref('蓝色')

  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.title]}>分组输入（单选组）示例</div>
      <div classStyle={[styles.section]}>
        <Label>请选择你喜欢的颜色：</Label>
        {colors.map(color => (
          <label classStyle={[styles.label]}>
            <input
              classStyle={[styles.radio]}
              type="radio"
              value={color}
              checked={selectedColor.value === color}
              onInput={() => (selectedColor.value = color)}
            />
            {color}
          </label>
        ))}
        <div classStyle={[styles.preview]}>当前选择：{selectedColor.value}</div>
      </div>
    </div>
  )
}
