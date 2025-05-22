import { h, ref } from 'speedy-jsx'
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
  const audioVolume = ref(1)

  function onAudioLoaded() {
    audioDuration.value = audioRef.value?.duration || 0
    audioTime.value = audioRef.value?.currentTime || 0
    audioPaused.value = audioRef.value?.paused
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
  const videoVolume = ref(1)

  function onVideoLoaded() {
    videoDuration.value = videoRef.value?.duration || 0
    videoTime.value = videoRef.value?.currentTime || 0
    videoPaused.value = videoRef.value?.paused
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

  return () => (
    <div classStyle={[styles.card]}>
      <h2 classStyle={[styles.title]}>媒体元素绑定</h2>
      <div classStyle={[styles.section]}>
        <label classStyle={[styles.label]}>音频播放器：</label>
        <audio
          ref={audioRef}
          src="https://www.w3schools.com/html/horse.mp3"
          onLoadedMetadata={onAudioLoaded}
          onTimeUpdate={onAudioTime}
          onPlay={onAudioPlay}
          onPause={onAudioPause}
          onVolumeChange={onAudioVolume}
        />
        <div classStyle={[styles.controls]}>
          <button
            classStyle={[styles.playBtn]}
            onClick={() => {
              if (audioRef.value.paused) audioRef.value.play()
              else audioRef.value.pause()
            }}
          >
            {audioPaused.value ? '播放' : '暂停'}
          </button>
          <span classStyle={[styles.time]}>{formatTime(audioTime.value)}</span>
          <input
            type="range"
            min={0}
            max={audioDuration.value}
            step={0.01}
            value={audioTime.value}
            onInput={e => {
              audioRef.value.currentTime = +e.target.value
              audioTime.value = +e.target.value
            }}
            classStyle={[styles.slider]}
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
              audioRef.value.volume = +e.target.value
              audioVolume.value = +e.target.value
            }}
            classStyle={[styles.slider]}
            style={{ maxWidth: 80 }}
          />
        </div>
      </div>
      <div classStyle={[styles.section]}>
        <label classStyle={[styles.label]}>视频播放器：</label>
        <video
          ref={videoRef}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          classStyle={[styles.video]}
          onLoadedMetadata={onVideoLoaded}
          onTimeUpdate={onVideoTime}
          onPlay={onVideoPlay}
          onPause={onVideoPause}
          onVolumeChange={onVideoVolume}
        />
        <div classStyle={[styles.controls]}>
          <button
            classStyle={[styles.playBtn]}
            onClick={() => {
              if (videoRef.value.paused) videoRef.value.play()
              else videoRef.value.pause()
            }}
          >
            {videoPaused.value ? '播放' : '暂停'}
          </button>
          <span classStyle={[styles.time]}>{formatTime(videoTime.value)}</span>
          <input
            type="range"
            min={0}
            max={videoDuration.value}
            step={0.01}
            value={videoTime.value}
            onInput={e => {
              videoRef.value.currentTime = +e.target.value
              videoTime.value = +e.target.value
            }}
            classStyle={[styles.slider]}
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
              videoRef.value.volume = +e.target.value
              videoVolume.value = +e.target.value
            }}
            classStyle={[styles.slider]}
            style={{ maxWidth: 80 }}
          />
        </div>
      </div>
    </div>
  )
}
