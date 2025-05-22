import { h, ref } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const fadeIn = styled.keyframes({
  '0%': { opacity: 0, transform: 'scale(0.96)' },
  '100%': { opacity: 1, transform: 'scale(1)' }
})
const fadeOut = styled.keyframes({
  '0%': { opacity: 1, transform: 'scale(1)' },
  '100%': { opacity: 0, transform: 'scale(0.96)' }
})
const overlayFadeIn = styled.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})
const overlayFadeOut = styled.keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 }
})

const styles = styled.scope({
  card: {
    maxWidth: '480px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 2px 12px #e0e7ff',
    border: '1.5px solid #e0e7ff'
  },
  section: {
    marginBottom: '2rem',
    paddingBottom: '1.2rem',
    borderBottom: '1px solid #f1f5fa'
  },

  input: {
    display: 'none'
  },
  uploadBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5em',
    padding: '0.55rem 1.2rem',
    background: '#3b5bfd',
    color: '#fff',
    border: 'none',
    fontWeight: 700,
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background .18s',
    boxShadow: '0 2px 8px 0 rgba(31,38,135,0.08)',
    marginTop: '8px',
    marginBottom: '4px',
    borderRadius: '5px',
    '&:hover': {
      background: '#2541b2'
    },
    '&:active': {
      background: '#1a2a6c'
    }
  },
  uploadIcon: {
    fontSize: '.7em',
    marginRight: '4px',
    display: 'inline-block'
  },
  fileName: {
    marginTop: '10px',
    color: '#3b5bfd',
    fontSize: '0.8rem',
    background: '#f4f7ff',
    borderRadius: '6px',
    padding: '0.5em 0.8em',
    minHeight: '32px',
    display: 'flex',
    fontWeight: 800,
    alignItems: 'center'
  },

  fileItem: {
    fontSize: '0.8rem',
    padding: '2px 0',
    color: '#3b5bfd',
    fontWeight: 800
  },
  imgPreview: {
    display: 'block',
    marginTop: '10px',
    maxWidth: '120px',
    maxHeight: '120px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px #e0e7ff',
    objectFit: 'cover',
    border: '1px solid #e0e7ff',
    cursor: 'pointer',
    transition: 'box-shadow .2s',
    '&:hover': {
      boxShadow: '0 0px 16px #a9bfff'
    }
  },
  imgList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px'
  },
  overlay: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'zoom-out',
    background: 'rgba(0,0,0,0.7)',
    animation: `${overlayFadeIn} .52s cubic-bezier(.4,1.2,.6,1)`
  },
  overlayFadeOut: {
    animation: `${overlayFadeOut} .8s cubic-bezier(.4,1.2,.6,1)`
  },
  bigImg: {
    maxWidth: '90vw',
    borderRadius: '12px',
    boxShadow: '0 0px 10px #ced7fc',
    background: '#fff',
    objectFit: 'contain',
    border: '2px solid #fff',
    transition: 'box-shadow .2s',
    animation: `${fadeIn} .52s cubic-bezier(.4,1.2,.6,1)`
  },
  bigImgFadeOut: {
    animation: `${fadeOut} .58s cubic-bezier(.4,1.2,.6,1)`
  },
  title: {
    marginBottom: '2rem',
    color: '#3b5bfd',
    fontWeight: 800,
    letterSpacing: '1px',
    fontSize: '1.4rem',
    textAlign: 'center'
  }
})

export default function FileInputs() {
  const singleFile = ref(null)
  const multiFiles = ref([])
  const singleInputRef = ref(null)
  const multiInputRef = ref(null)
  const singleImgUrl = ref('')
  const multiImgUrls = ref([])
  const previewUrl = ref('')
  const overlayFade = ref(false)

  function handleSingleChange(e) {
    const file = e.target.files[0] || null
    singleFile.value = file
    if (file && file.type.startsWith('image/')) {
      singleImgUrl.value = URL.createObjectURL(file)
    } else {
      singleImgUrl.value = ''
    }
  }
  function handleMultiChange(e) {
    const files = Array.from(e.target.files)
    multiFiles.value = files
    multiImgUrls.value = files
      .filter(f => f.type.startsWith('image/'))
      .map(f => URL.createObjectURL(f))
  }

  function handleImgClick(url) {
    previewUrl.value = url
    overlayFade.value = false
  }
  function closePreview() {
    overlayFade.value = true
    setTimeout(() => {
      previewUrl.value = ''
      overlayFade.value = false
    }, 480)
  }

  return () => (
    <div classStyle={[styles.card]}>
      <h2 classStyle={[styles.title]}>文件输入</h2>
      <div classStyle={[styles.section]}>
        <input
          type="file"
          ref={singleInputRef}
          onChange={handleSingleChange}
          classStyle={[styles.input]}
        />
        <button
          classStyle={[styles.uploadBtn]}
          onClick={() => singleInputRef.value && singleInputRef.value.click()}
          type="button"
        >
          <span classStyle={[styles.uploadIcon]}>📤 单文件选择</span>
        </button>
        <div classStyle={[styles.fileName]}>
          {singleFile.value ? `已选择：${singleFile.value.name}` : '未选择文件'}
        </div>
        {singleImgUrl.value && (
          <img
            src={singleImgUrl.value}
            classStyle={[styles.imgPreview]}
            alt="预览"
            onClick={() => handleImgClick(singleImgUrl.value)}
          />
        )}
      </div>
      <div>
        <input
          type="file"
          multiple
          ref={multiInputRef}
          onChange={handleMultiChange}
          classStyle={[styles.input]}
        />
        <button
          classStyle={[styles.uploadBtn]}
          onClick={() => multiInputRef.value && multiInputRef.value.click()}
          type="button"
        >
          <span classStyle={[styles.uploadIcon]}>📤 多文件选择</span>
        </button>
        <div classStyle={[styles.fileName]}>
          {multiFiles.value.length > 0 ? (
            <ul>
              {multiFiles.value.map(f => (
                <li key={f.name} classStyle={[styles.fileItem]}>
                  {f.name}
                </li>
              ))}
            </ul>
          ) : (
            '未选择文件'
          )}
        </div>
        {multiImgUrls.value.length > 0 && (
          <div classStyle={[styles.imgList]}>
            {multiImgUrls.value.map((url, i) => (
              <img
                src={url}
                classStyle={[styles.imgPreview]}
                alt={`预览${i + 1}`}
                key={url}
                onClick={() => handleImgClick(url)}
              />
            ))}
          </div>
        )}
      </div>
      {previewUrl.value && (
        <div
          classStyle={[
            styles.overlay,
            overlayFade.value && styles.overlayFadeOut
          ]}
          onClick={closePreview}
        >
          <img
            src={previewUrl.value}
            classStyle={[
              styles.bigImg,
              overlayFade.value && styles.bigImgFadeOut
            ]}
            alt="大图预览"
          />
        </div>
      )}
    </div>
  )
}
