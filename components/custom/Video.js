import { useRef } from 'react'
import CSS from './Video.module.css'

function VideoPlayer({ src, autoPlay, loop, muted, controls }) {
  const VideoRef = useRef()
  function ClickPlayer() {
    if (VideoRef.current.paused) {
      VideoRef.current.play()
    } else {
      VideoRef.current.pause()
    }
  }
  return (
    <div className={CSS.videoPlayer} onClick={ClickPlayer}>
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
