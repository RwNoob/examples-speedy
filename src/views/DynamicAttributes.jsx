import { ref } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const styles = styled.scope({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '2rem',
    alignItems: 'center'
  },

  controls: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3'
    }
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    objectFit: 'cover'
  }
})

export default function DynamicAttributes() {
  const src = ref('https://avatars.githubusercontent.com/u/1323659')
  const alt = ref('随机图片')
  const width = ref(200)
  const height = ref(300)

  const changeImage = () => {
    width.value = Math.floor(Math.random() * 200) + 20000
    height.value = Math.floor(Math.random() * 200) + 2000
    src.value = `https://avatars.githubusercontent.com/u/${width.value + height.value}`
  }

  return () => (
    <div classStyle={[styles.container]}>
      <div classStyle={[styles.controls]}>
        <button classStyle={[styles.button]} onClick={changeImage}>
          更换图片
        </button>
      </div>
      <img
        src={src.value}
        alt={alt.value}
        width={500}
        height={500}
        classStyle={[styles.image]}
      />
    </div>
  )
}
