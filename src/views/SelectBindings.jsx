import { ref } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const fontFamily =
  'Inter, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'

const styles = styled.scope({
  card: {
    maxWidth: '480px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 12px #e0e7ff',
    border: '1.5px solid #e0e7ff',
    fontFamily
  },
  section: {
    marginBottom: '2rem',
    paddingBottom: '1.2rem',
    borderBottom: '1px solid #f1f5fa',
    background: '#f8faff',
    borderRadius: '10px',
    boxShadow: '0 1px 4px #e0e7ff',
    padding: '1.2rem',
    marginLeft: '-1.2rem',
    marginRight: '-1.2rem',
    marginTop: '0.5rem',
    fontFamily
  },
  label: {
    fontWeight: 700,
    color: '#2541b2',
    fontSize: '1.09rem',
    display: 'block',
    marginBottom: '10px',
    letterSpacing: '1px',
    fontFamily
  },
  select: {
    width: '100%',
    padding: '0.6rem 1.1rem',
    borderRadius: '8px',
    border: '1.5px solid #e0e7ff',
    fontSize: '.9rem',
    background: '#f8fafc',
    outline: 'none',
    marginBottom: '14px',
    transition: 'border .2s, box-shadow .2s',
    boxShadow: '0 1px 4px #e0e7ff',
    fontFamily,
    fontWeight: 500,
    color: '#222',
    '&:focus': {
      borderColor: '#3b5bfd',
      boxShadow: '0 2px 8px #b3c6ff'
    },
    '&:hover': {
      borderColor: '#3b5bfd'
    }
  },
  option: {
    fontFamily,
    fontSize: '.9rem',
    paddingBlock: '0.15em',
    color: '#2541b2',
    fontWeight: 500
  },
  result: {
    color: '#3b5bfd',
    fontWeight: 700,
    fontSize: '1.07rem',
    marginTop: '8px',
    minHeight: '28px',
    background: '#f4f7ff',
    borderRadius: '6px',
    padding: '0.5em 0.8em',
    boxShadow: '0 1px 4px #e0e7ff',
    display: 'flex',
    alignItems: 'center',
    fontFamily
  },
  title: {
    marginBottom: '2rem',
    color: '#3b5bfd',
    fontWeight: 800,
    letterSpacing: '1px',
    fontSize: '1.4rem',
    textAlign: 'center',
    fontFamily
  }
})

export default function SelectBindings() {
  const fruit = ref('apple')
  const colors = ref(['red'])

  function handleMultiChange(e) {
    colors.value = Array.from(e.target.selectedOptions).map(o => o.value)
  }

  return () => (
    <div classStyle={[styles.card]}>
      <h2 classStyle={[styles.title]}>下拉选择绑定</h2>
      <div classStyle={[styles.section]}>
        <label classStyle={[styles.label]}>单选下拉：</label>
        <select
          classStyle={[styles.select]}
          value={fruit.value}
          onChange={e => (fruit.value = e.target.value)}
        >
          <option value="apple" classStyle={[styles.option]}>
            苹果
          </option>
          <option value="banana" classStyle={[styles.option]}>
            香蕉
          </option>
          <option value="orange" classStyle={[styles.option]}>
            橙子
          </option>
        </select>
        <div classStyle={[styles.result]}>当前选择：{fruit.value}</div>
      </div>
      <div classStyle={[styles.section]}>
        <label classStyle={[styles.label]}>多选下拉：</label>
        <select
          classStyle={[styles.select]}
          multiple
          value={colors.value}
          onChange={handleMultiChange}
          style={{ minHeight: 80 }}
        >
          <option value="red" classStyle={[styles.option]}>
            红色
          </option>
          <option value="green" classStyle={[styles.option]}>
            绿色
          </option>
          <option value="blue" classStyle={[styles.option]}>
            蓝色
          </option>
        </select>
        <div classStyle={[styles.result]}>
          当前选择：{colors.value.length > 0 ? colors.value.join('，') : '无'}
        </div>
      </div>
    </div>
  )
}
