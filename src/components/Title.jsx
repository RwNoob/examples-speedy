import { styled, useRoute } from 'speedy-jsx'

const styles = styled.scope({
  title: {
    fontSize: '1.3rem',
    paddingLeft: '.5rem',
    color: '#333',
    margin: 0,
    userSelect: 'none'
  },
  container: {
    paddingBottom: '1.3rem',
    borderBottom: '4px solid #5a5a5a'
  }
})

export default function Title() {
  const route = useRoute()
  return () => (
    <div className={styles.container}>
      <h1 className={styles.title}>{route.value.meta.title}</h1>
    </div>
  )
}
