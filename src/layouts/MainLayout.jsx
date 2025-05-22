import { RouterView } from 'speedy-jsx'
import { styled } from 'speedy-jsx'
import Nav from '../components/Nav'
import Title from '../components/Title'

const styles = styled.scope({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '1rem 2rem',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem'
  },
  title: {
    margin: 0,
    fontSize: '1.3rem',
    color: '#333',
    fontWeight: '600',
    userSelect: 'none'
  },
  main: {
    position: 'relative',
    padding: '2rem',
    paddingBottom: '3.3rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    height: '100%'
  },
  footer: {
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
    borderTop: '1px solid #e9ecef',
    marginTop: 'auto'
  },
  content: {
    padding: '2rem',
    height: '100%',
    overflow: 'auto',
    backgroundColor: '#f8f9fa'
  }
})

export default function MainLayout() {
  return () => (
    <div classStyle={[styles.container]}>
      <header classStyle={[styles.header]}>
        <h1 classStyle={[styles.title]}>Examples</h1>
        <Nav />
      </header>
      <main classStyle={[styles.main]}>
        <Title />
        <div classStyle={[styles.content]}>
          <RouterView />
        </div>
      </main>
      <footer classStyle={[styles.footer]}>
        <p>© 2025 Speedy-JSX Demo</p>
      </footer>
    </div>
  )
}
