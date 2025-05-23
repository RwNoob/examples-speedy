import { ref } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  card: {
    maxWidth: '540px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 12px #e0e7ff',
    border: '1.5px solid #e0e7ff',
    fontFamily:
      'Inter, Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
  },
  title: {
    marginBottom: '2rem',
    color: '#3b5bfd',
    fontWeight: 800,
    letterSpacing: '1px',
    fontSize: '1.4rem',
    textAlign: 'center'
  },
  section: {
    marginBottom: '2rem',
    padding: '1.2rem',
    background: '#f8faff',
    borderRadius: '10px',
    boxShadow: '0 1px 4px #e0e7ff'
  },
  label: {
    fontWeight: 700,
    color: '#2541b2',
    fontSize: '1.05rem',
    display: 'block',
    marginBottom: '10px',
    letterSpacing: '1px'
  },
  btn: {
    padding: '0.5em 1.3em',
    borderRadius: '6px',
    border: 'none',
    background: '#3b5bfd',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1rem',
    cursor: 'pointer',
    marginRight: '12px',
    marginTop: '8px',
    transition: 'background .18s',
    '&:hover': { background: '#2541b2' }
  },
  input: {
    padding: '0.5em 1em',
    borderRadius: '6px',
    border: '1.5px solid #e0e7ff',
    fontSize: '1rem',
    background: '#f8fafc',
    color: '#2541b2',
    outline: 'none',
    marginRight: '12px',
    marginBottom: '8px',
    transition: 'border .2s',
    '&:focus': { borderColor: '#3b5bfd' }
  },
  scrollBox: {
    width: '100%',
    height: '80px',
    overflow: 'auto',
    background: '#e0e7ff',
    borderRadius: '8px',
    margin: '1em 0',
    padding: '1em',
    color: '#2541b2',
    fontSize: '1.05rem',
    position: 'relative'
  },
  target: {
    background: '#3b5bfd',
    color: '#fff',
    borderRadius: '6px',
    padding: '0.5em 1em',
    margin: '1em 0',
    display: 'inline-block'
  },
  audio: {
    width: '100%',
    marginTop: '1em'
  }
})

export default function BindThis() {
  const inputRef = ref(null)
  const scrollBoxRef = ref(null)
  const targetRef = ref(null)
  const audioRef = ref(null)

  return (
    <div classStyle={[styles.card]}>
      <h2 classStyle={[styles.title]}>bind:this 用法</h2>
      <div classStyle={[styles.section]}>
        <label classStyle={[styles.label]}>1. 获取 input 并聚焦</label>
        <input
          classStyle={[styles.input]}
          ref={inputRef}
          placeholder="点击按钮自动聚焦"
        />
        <button
          classStyle={[styles.btn]}
          onClick={() => inputRef.value && inputRef.value.focus()}
        >
          聚焦输入框
        </button>
      </div>
      <div classStyle={[styles.section]}>
        <label classStyle={[styles.label]}>2. 获取元素并滚动到目标</label>
        <div ref={scrollBoxRef} classStyle={[styles.scrollBox]}>
          <div style={{ height: 40 }}>上方内容</div>
          <div ref={targetRef} classStyle={[styles.target]}>
            滚动到我
          </div>
          <div style={{ height: 40 }}>下方内容</div>
        </div>
        <button
          classStyle={[styles.btn]}
          onClick={() =>
            targetRef.value &&
            targetRef.value.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            })
          }
        >
          滚动到目标元素
        </button>
      </div>
      <div classStyle={[styles.section]}>
        <label classStyle={[styles.label]}>3. 获取 audio 并播放/暂停</label>
        <audio
          ref={audioRef}
          classStyle={[styles.audio]}
          src="https://www.w3schools.com/html/horse.mp3"
        />
        <button
          classStyle={[styles.btn]}
          onClick={() => audioRef.value && audioRef.value.play()}
        >
          播放
        </button>
        <button
          classStyle={[styles.btn]}
          onClick={() => audioRef.value && audioRef.value.pause()}
        >
          暂停
        </button>
      </div>
    </div>
  )
}
