import { ref } from 'speedy-jsx'
import { styled } from 'speedy-jsx'

const fadeIn = styled.keyframes({
  '0%': { opacity: 0, transform: 'scale(0.98)' },
  '100%': { opacity: 1, transform: 'scale(1)' }
})
const fadeOut = styled.keyframes({
  '0%': { opacity: 1, transform: 'scale(1)' },
  '100%': { opacity: 0, transform: 'scale(0.98)' }
})

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
  section: {
    marginBottom: '2rem',
    padding: '1.2rem',
    background: '#f8faff',
    borderRadius: '10px',
    boxShadow: '0 1px 4px #e0e7ff'
  },
  label: {
    fontWeight: 800,
    color: '#2541b2',
    fontSize: '1.05rem',
    display: 'block',
    marginBottom: '10px',
    letterSpacing: '1px'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7em',
    margin: '1em 0',
    flexWrap: 'wrap',
    maxWidth: '100%',
    rowGap: '0.5em'
  },
  slider: {
    flex: 1,
    minWidth: '60px',
    maxWidth: '180px',
    margin: '0 0.5em',
    accentColor: '#3b5bfd',
    height: '4px',
    boxSizing: 'border-box',
    background: 'transparent',
    '::-webkit-slider-runnable-track': {
      height: '6px',
      background: '#e0e7ff',
      borderRadius: '6px',
      boxShadow: '0 1px 2px #e0e7ff',
      transition: 'background .2s'
    },
    '::-webkit-slider-thumb': {
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      background: '#3b5bfd',
      border: '2px solid #fff',
      boxShadow: '0 2px 6px #b3c6ff',
      cursor: 'pointer',
      marginTop: '-6px',
      transition: 'background .2s, box-shadow .2s'
    },
    '&:hover::-webkit-slider-thumb, &:focus::-webkit-slider-thumb': {
      background: '#2541b2',
      boxShadow: '0 2px 8px #3b5bfd'
    },
    '&:focus::-webkit-slider-runnable-track': {
      background: '#b3c6ff'
    },
    outline: 'none',
    border: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none'
  },
  time: {
    fontSize: '.95rem',
    color: '#2541b2',
    minWidth: '48px',
    textAlign: 'center',
    flexShrink: 0
  },
  playBtn: {
    background: '#3b5bfd',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 700,
    fontSize: '1rem',
    padding: '0.4em 1.2em',
    cursor: 'pointer',
    transition: 'background .18s',
    flexShrink: 0,
    '&:hover': { background: '#2541b2' }
  },
  title: {
    marginBottom: '2rem',
    color: '#3b5bfd',
    fontWeight: 800,
    letterSpacing: '1px',
    fontSize: '1.4rem',
    textAlign: 'center'
  },
  video: {
    width: '100%',
    maxWidth: '100%',
    borderRadius: '10px',
    margin: '1em 0',
    boxShadow: '0 1px 8px #e0e7ff'
  },
  loopBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5em',
    marginBottom: '0.7em',
    fontWeight: 500,
    color: '#2541b2',
    fontSize: '1rem',
    userSelect: 'none'
  },
  loopBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid #a9bcf7',
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'border .18s, background .18s',
    marginRight: '8px',
    fontSize: '18px',
    color: '#b3c6ff',
    '&:hover': {
      borderColor: '#3b5bfd',
      background: '#e0e7ff',
      color: '#3b5bfd'
    }
  },
  loopBtnActive: {
    borderColor: '#3b5bfd',
    background: '#e0e7ff',
    color: '#3b5bfd'
  },
  input: {
    padding: '0.5rem 1.1rem',
    borderRadius: '6px',
    border: '1.5px solid #e0e7ff',
    fontSize: '1rem',
    minWidth: '260px',
    maxWidth: '100%',
    outline: 'none',
    transition: 'border .2s',
    background: '#f8fafc',
    color: '#2541b2',
    boxSizing: 'border-box',
    marginRight: '12px',
    '&:focus': {
      borderColor: '#3b5bfd'
    }
  },
  linkBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: '2px solid #a9bcf7',
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'border .18s, background .18s',
    marginRight: '8px',
    fontSize: '18px',
    color: '#b3c6ff',
    '&:hover': {
      borderColor: '#3b5bfd',
      background: '#e0e7ff',
      color: '#3b5bfd'
    }
  },
  linkBtnActive: {
    borderColor: '#3b5bfd',
    background: '#e0e7ff',
    color: '#3b5bfd'
  },
  popInputWrap: {
    position: 'absolute',
    top: '40px',
    left: 0,
    right: 0,
    zIndex: 100,
    background: '#fff',
    border: '1.5px solid #e0e7ff',
    borderRadius: '8px',
    boxShadow: '0 4px 16px #e0e7ff',
    padding: '0.5em .6em',
    minWidth: '320px',
    maxWidth: '480px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    animation: `${fadeIn} .28s cubic-bezier(.4,1.2,.6,1)`,
    transition: 'min-width .22s, max-width .22s, opacity .22s'
  },
  popInputWrapFadeOut: {
    animation: `${fadeOut} .32s cubic-bezier(.4,1.2,.6,1)`
  },
  popInput: {
    padding: '0.5rem .8rem',
    borderRadius: '6px',
    border: '1.5px solid #e0e7ff',
    fontSize: '1rem',
    minWidth: '260px',
    maxWidth: '100%',
    width: '100%',
    outline: 'none',
    transition: 'border .2s',
    background: '#f8fafc',
    color: '#2541b2',
    boxSizing: 'border-box',
    '&:focus': {
      borderColor: '#3b5bfd'
    }
  },
  popMask: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 99,
    background: 'transparent'
  }
})

function formatTime(sec) {
  if (!isFinite(sec)) return '00:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

export default function MediaElements() {
  // 音频
  const audioRef = ref(null)
  const audioTime = ref(0)
  const audioDuration = ref(0)
  const audioPaused = ref(true)
  const audioVolume = ref(0.5)
  const audioLoop = ref(false)
  const audioSrc = ref('https://www.w3schools.com/html/horse.mp3')

  function onAudioLoaded() {
    audioDuration.value = audioRef.value?.duration || 0
    audioTime.value = audioRef.value?.currentTime || 0
    audioPaused.value = audioRef.value?.paused
    if (audioRef.value) audioRef.value.volume = audioVolume.value
    audioVolume.value = audioRef.value?.volume
  }
  function onAudioTime() {
    audioTime.value = audioRef.value?.currentTime || 0
  }
  function onAudioPlay() {
    audioPaused.value = false
  }
  function onAudioPause() {
    audioPaused.value = true
  }
  function onAudioVolume() {
    audioVolume.value = audioRef.value?.volume
  }

  // 视频
  const videoRef = ref(null)
  const videoTime = ref(0)
  const videoDuration = ref(0)
  const videoPaused = ref(true)
  const videoVolume = ref(0.5)
  const videoLoop = ref(false)
  const videoSrc = ref('https://www.w3schools.com/html/mov_bbb.mp4')

  function onVideoLoaded() {
    videoDuration.value = videoRef.value?.duration || 0
    videoTime.value = videoRef.value?.currentTime || 0
    videoPaused.value = videoRef.value?.paused
    if (videoRef.value) videoRef.value.volume = videoVolume.value
    videoVolume.value = videoRef.value?.volume
  }
  function onVideoTime() {
    videoTime.value = videoRef.value?.currentTime || 0
  }
  function onVideoPlay() {
    videoPaused.value = false
  }
  function onVideoPause() {
    videoPaused.value = true
  }
  function onVideoVolume() {
    videoVolume.value = videoRef.value?.volume
  }

  const audioLinkEdit = ref(false)
  const videoLinkEdit = ref(false)
  const audioInputRef = ref(null)
  const videoInputRef = ref(null)
  const audioLinkFade = ref(false)
  const videoLinkFade = ref(false)

  function openAudioEdit() {
    audioLinkEdit.value = true
    audioLinkFade.value = false
    setTimeout(() => {
      audioInputRef.value && audioInputRef.value.focus()
    }, 10)
  }
  function openVideoEdit() {
    videoLinkEdit.value = true
    videoLinkFade.value = false
    setTimeout(() => {
      videoInputRef.value && videoInputRef.value.focus()
    }, 10)
  }
  function closeAudioEdit() {
    audioLinkFade.value = true
    setTimeout(() => {
      audioLinkEdit.value = false
      audioLinkFade.value = false
    }, 320)
  }
  function closeVideoEdit() {
    videoLinkFade.value = true
    setTimeout(() => {
      videoLinkEdit.value = false
      videoLinkFade.value = false
    }, 320)
  }

  const isAudioValid = () => !!audioSrc.value.trim()
  const isVideoValid = () => !!videoSrc.value.trim()

  return () => (
    <div classStyle={[styles.card]}>
      <h2 classStyle={[styles.title]}>媒体元素绑定</h2>
      <div classStyle={[styles.section]}>
        <div classStyle={[styles.loopBox]} style={{ position: 'relative' }}>
          <label classStyle={[styles.label]}>音频播放器：</label>
          <button
            classStyle={[
              styles.linkBtn,
              audioLinkEdit.value && styles.linkBtnActive
            ]}
            title="编辑音频链接"
            type="button"
            onClick={openAudioEdit}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 10a2.5 2.5 0 0 1 2.5-2.5h2A2.5 2.5 0 0 1 14.5 10v0A2.5 2.5 0 0 1 12 12.5h-2A2.5 2.5 0 0 1 7.5 10v0"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M6 7V6A3 3 0 0 1 9 3h2a3 3 0 0 1 3 3v1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M14 13v1a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {audioLinkEdit.value && [
            <div classStyle={[styles.popMask]} onClick={closeAudioEdit}></div>,
            <div
              classStyle={[
                styles.popInputWrap,
                audioLinkFade.value && styles.popInputWrapFadeOut
              ]}
            >
              <input
                ref={audioInputRef}
                classStyle={[styles.popInput]}
                type="text"
                value={audioSrc.value}
                onInput={e => (audioSrc.value = e.target.value)}
                onBlur={closeAudioEdit}
                onKeyDown={e => {
                  if (e.key === 'Enter') closeAudioEdit()
                }}
                placeholder="输入音频链接..."
              />
            </div>
          ]}
          <button
            classStyle={[
              styles.loopBtn,
              audioLoop.value && styles.loopBtnActive
            ]}
            title="循环播放"
            type="button"
            onClick={() => (audioLoop.value = !audioLoop.value)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4v3.5a1 1 0 0 0 1 1H8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 16v-3.5a1 1 0 0 0-1-1h-3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 8A6.5 6.5 0 0 1 17 8.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M15.5 12A6.5 6.5 0 0 1 3 11.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div classStyle={[styles.controls]}>
          <button
            classStyle={[styles.playBtn]}
            onClick={() => {
              if (!isAudioValid()) return
              if (audioRef.value.paused) audioRef.value.play()
              else audioRef.value.pause()
            }}
            disabled={!isAudioValid()}
          >
            {isAudioValid() ? (audioPaused.value ? '播放' : '暂停') : '播放'}
          </button>
          <span classStyle={[styles.time]}>{formatTime(audioTime.value)}</span>
          <input
            type="range"
            min={0}
            max={audioDuration.value}
            step={0.01}
            value={audioTime.value}
            onInput={e => {
              if (!isAudioValid()) return
              audioRef.value.currentTime = +e.target.value
              audioTime.value = +e.target.value
            }}
            classStyle={[styles.slider]}
            disabled={!isAudioValid()}
          />
          <span classStyle={[styles.time]}>
            {formatTime(audioDuration.value)}
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={audioVolume.value}
            onInput={e => {
              if (!isAudioValid()) return
              audioRef.value.volume = +e.target.value
              audioVolume.value = +e.target.value
            }}
            classStyle={[styles.slider]}
            style={{ maxWidth: 80 }}
            disabled={!isAudioValid()}
          />
        </div>
        {isAudioValid() ? (
          <audio
            ref={audioRef}
            src={audioSrc.value}
            onLoadedMetadata={onAudioLoaded}
            onTimeUpdate={onAudioTime}
            onPlay={onAudioPlay}
            onPause={onAudioPause}
            onVolumeChange={onAudioVolume}
            loop={audioLoop.value}
          />
        ) : (
          <div style={{ color: '#b3c6ff', fontSize: '0.98rem', marginTop: 8 }}>
            请输入有效音频链接
          </div>
        )}
        <div style={{ color: '#a9bcf7', fontSize: '0.96rem', marginTop: 2 }}>
          当前链接：{audioSrc.value ? audioSrc.value : '（空）'}
        </div>
      </div>
      <div classStyle={[styles.section]}>
        <div classStyle={[styles.loopBox]} style={{ position: 'relative' }}>
          <label classStyle={[styles.label]}>视频播放器：</label>
          <button
            classStyle={[
              styles.linkBtn,
              videoLinkEdit.value && styles.linkBtnActive
            ]}
            title="编辑视频链接"
            type="button"
            onClick={openVideoEdit}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 10a2.5 2.5 0 0 1 2.5-2.5h2A2.5 2.5 0 0 1 14.5 10v0A2.5 2.5 0 0 1 12 12.5h-2A2.5 2.5 0 0 1 7.5 10v0"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M6 7V6A3 3 0 0 1 9 3h2a3 3 0 0 1 3 3v1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M14 13v1a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-1"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {videoLinkEdit.value && [
            <div classStyle={[styles.popMask]} onClick={closeVideoEdit}></div>,
            <div
              classStyle={[
                styles.popInputWrap,
                videoLinkFade.value && styles.popInputWrapFadeOut
              ]}
            >
              <input
                ref={videoInputRef}
                classStyle={[styles.popInput]}
                type="text"
                value={videoSrc.value}
                onInput={e => (videoSrc.value = e.target.value)}
                onBlur={closeVideoEdit}
                onKeyDown={e => {
                  if (e.key === 'Enter') closeVideoEdit()
                }}
                placeholder="输入视频链接..."
              />
            </div>
          ]}
          <button
            classStyle={[
              styles.loopBtn,
              videoLoop.value && styles.loopBtnActive
            ]}
            title="循环播放"
            type="button"
            onClick={() => (videoLoop.value = !videoLoop.value)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4v3.5a1 1 0 0 0 1 1H8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 16v-3.5a1 1 0 0 0-1-1h-3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 8A6.5 6.5 0 0 1 17 8.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M15.5 12A6.5 6.5 0 0 1 3 11.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div classStyle={[styles.controls]}>
          <button
            classStyle={[styles.playBtn]}
            onClick={() => {
              if (!isVideoValid()) return
              if (videoRef.value.paused) videoRef.value.play()
              else videoRef.value.pause()
            }}
            disabled={!isVideoValid()}
          >
            {isVideoValid() ? (videoPaused.value ? '播放' : '暂停') : '播放'}
          </button>
          <span classStyle={[styles.time]}>{formatTime(videoTime.value)}</span>
          <input
            type="range"
            min={0}
            max={videoDuration.value}
            step={0.01}
            value={videoTime.value}
            onInput={e => {
              if (!isVideoValid()) return
              videoRef.value.currentTime = +e.target.value
              videoTime.value = +e.target.value
            }}
            classStyle={[styles.slider]}
            disabled={!isVideoValid()}
          />
          <span classStyle={[styles.time]}>
            {formatTime(videoDuration.value)}
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={videoVolume.value}
            onInput={e => {
              if (!isVideoValid()) return
              videoRef.value.volume = +e.target.value
              videoVolume.value = +e.target.value
            }}
            classStyle={[styles.slider]}
            style={{ maxWidth: 80 }}
            disabled={!isVideoValid()}
          />
        </div>
        {isVideoValid() ? (
          <video
            ref={videoRef}
            src={videoSrc.value}
            classStyle={[styles.video]}
            onLoadedMetadata={onVideoLoaded}
            onTimeUpdate={onVideoTime}
            onPlay={onVideoPlay}
            onPause={onVideoPause}
            onVolumeChange={onVideoVolume}
            loop={videoLoop.value}
          />
        ) : (
          <div style={{ color: '#b3c6ff', fontSize: '0.98rem', marginTop: 8 }}>
            请输入有效视频链接
          </div>
        )}
        <div style={{ color: '#a9bcf7', fontSize: '0.96rem', marginTop: 2 }}>
          当前链接：{videoSrc.value ? videoSrc.value : '（空）'}
        </div>
      </div>
    </div>
  )
}
