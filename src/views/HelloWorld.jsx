import { ref } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '2rem'
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    margin: 0,
    textAlign: 'center'
  },
  input: {
    padding: '0.8rem 1.2rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '2px solid #e9ecef',
    width: '100%',
    maxWidth: '300px',
    transition: 'all 0.3s ease',
    '&:focus': {
      outline: 'none',
      borderColor: '#007bff',
      boxShadow: '0 0 0 3px rgba(0,123,255,0.1)'
    },
    '&::placeholder': {
      color: '#adb5bd'
    }
  }
})

export default function HelloWorld() {
  const name = ref('world')

  return () => (
    <div classStyle={[styles.container]}>
      <h1 classStyle={[styles.title]}>Hello {name.value}!</h1>
      <input
        type="text"
        value={name.value}
        onInput={e => (name.value = e.target.value)}
        placeholder="输入名字"
        classStyle={[styles.input]}
      />
    </div>
  )
}
