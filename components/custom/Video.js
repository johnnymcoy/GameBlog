import { useRef, useState } from 'react'
import CSS from './Video.module.css'

function VideoPlayer({ src, autoPlay, loop, muted, controls }) {
  const VideoRef = useRef()
  const [videoPaused, setVideoPaused] = useState(false)
  const Classes = videoPaused ? `${CSS.videoPlayer} ${CSS.paused}` : `${CSS.videoPlayer}`

  function ClickPlayer() {
    if (VideoRef.current.paused) {
      setVideoPaused(false)
      VideoRef.current.play()
    } else {
      VideoRef.current.pause()
      setVideoPaused(true)
    }
  }
  return (
    <div className={Classes} onClick={ClickPlayer}>
      {videoPaused && (
        <div className={CSS.pauseOverlay}>
          <div className={CSS.pauseIcon}>||</div>
        </div>
      )}
      <video
        ref={VideoRef}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        className={CSS.video}
        src={src}
        height={100}
        width={100}
      />
      {controls && (
        <div className={CSS.playerControls}>
          <div className={CSS.videoProgress}>
            <div className={CSS.videoProgressFilled}></div>
          </div>
          <button className={CSS.playButton}>▶</button>
          <input className={CSS.volumeSlider} type="range" min="0" max="1" step="0.01" value="1" />
          <div className={CSS.time}>
            <span>0:00</span> / <span>0:00</span>
          </div>
        </div>
      )}
    </div>
  )
}
export default VideoPlayer
