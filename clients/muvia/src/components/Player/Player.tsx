"use client";
import "./style.scss";
import { useRef, useEffect, useState, useCallback } from "react";
import Hls from "hls.js";
import { Slider } from "@heroui/react";

type SliderValue = number | number[];


function ControlSlider({ video, parentTime }: { video: HTMLVideoElement, parentTime: { current: number } }) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState<SliderValue>(0);
  const lastUpdateTimeRef = useRef(0);

  const formatTime = useCallback((seconds: SliderValue) => {
    if (typeof seconds === "number") {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);

      const paddedHrs = hrs > 0 ? String(hrs).padStart(2, '0') + ':' : '';
      const paddedMins = String(mins).padStart(2, '0');
      const paddedSecs = String(secs).padStart(2, '0');

      return `${paddedHrs}${paddedMins}:${paddedSecs}`;
    }
  }, [])
  const handleChangeVideoValue = (value: SliderValue) => {
    setCurrentTime(value);
    if (video) {
      const time = parseFloat(value.toString());
      video.currentTime = time;
      parentTime.current = video.currentTime;
    }
  }
  const handleTimeUpdate = useCallback(() => {
    const now = Date.now();

    // Nếu đã hơn 1000ms kể từ lần cuối update, mới set lại state
    if (now - lastUpdateTimeRef.current >= 1000) {
      if (video) {
        setCurrentTime(video.currentTime);
      }
      lastUpdateTimeRef.current = now;
    }
  }, [])
  useEffect(() => {
    if (video) {
      setDuration(video.duration);
      video.addEventListener('timeupdate', handleTimeUpdate)
    }
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, [])
  return (
    <>
      {/* Slider control */}
      < div className="px-[20px] mt-[8px]" >
        <Slider
          aria-label="Player progress"
          className="w-full"
          color="warning"
          size="sm"
          // defaultValue={20}
          // hideThumb={true}
          maxValue={duration}
          minValue={0}
          step={0.1}
          value={currentTime}
          onChange={(value) => handleChangeVideoValue(value)}
        />
      </div >

      {/* Time */}
      < div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginTop: "4px" }
      }>
        <p className="time-video-wathing">{formatTime(currentTime)}</p>
        <p className="time-video-wathing">{formatTime(duration)}</p>
      </div >
    </>
  )
}

function Player({ src }: { src: string }) {
  console.log("src: ", src)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [volumeValue, setVolumeValue] = useState<SliderValue>(50);
  const [isOpenSpeed, setIsOpenSpeed] = useState(false);
  const currentTimeRef = useRef(0);


  // const speed = useRef(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play();
      }
    }
  }

  const fowardTime = () => {
    const time = currentTimeRef.current + 10;
    currentTimeRef.current = currentTimeRef.current + 10;
    const video = videoRef.current;
    if (video) {
      const timeDouble = parseFloat(time.toString());
      video.currentTime = timeDouble;
    }
  }

  const backTime = () => {
    const time = currentTimeRef.current - 10;
    currentTimeRef.current = currentTimeRef.current - 10;
    const video = videoRef.current;
    if (video) {
      const timeDouble = parseFloat(time.toString());
      video.currentTime = timeDouble;
    }
  }

  const changeSpeed = (value: number) => {
    const newSpeed = parseFloat(value.toString());
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
    setIsOpenSpeed(false);
  }

  const toggleMuteVolume = () => {
    if (isMute === false) {
      setVolumeValue(0);
      if (videoRef.current) {
        videoRef.current.volume = 0.0;
      }
    } else {
      setVolumeValue(50);
      if (videoRef.current) {
        videoRef.current.volume = 0.5;
      }
    }
    setIsMute(!isMute);
  }

  const handleChangeVolumeValue = (value: SliderValue) => {
    setVolumeValue(value);
    if (videoRef.current) {
      if (typeof value === "number") {
        videoRef.current.volume = value;
      }
    }
  }


  // const handleTimeUpdate = () => {
  //   const video = videoRef.current;
  //   if(video) {
  //     currentTimeRef.current = video.currentTime;
  //   }
  // }

  // console.log("re-render");

  const toggleFullScreen = () => {
    const elem = videoRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        console.error("Lỗi khi bật fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);

      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari hỗ trợ trực tiếp
        videoRef.current.src = src;
      }
    }
  }, [isLoading]);

  useEffect(() => {
    // let animationId: number;

    // const update = () => {
    //   if (videoRef.current) {
    //     currentTimeRef.current = videoRef.current.currentTime;
    //     // Không có setState ở đây => không gây re-render
    //   }
    //   animationId = requestAnimationFrame(update);
    // };

    // update(); // Start loop
    // return () => cancelAnimationFrame(animationId);
  }, [])

  if (isLoading) {
    return (
      <p className="text-white">Loading...</p>
    )
  }
  return (


    <>
      <div className="video--container">
        <video
          onClick={togglePlay}
          ref={videoRef}
          // controls
          className="video--item"
        // onTimeUpdate={handleTimeUpdate}
        />

      </div>

      {/* Video slider */}
      <div className="mt-[4px] bg-[#000] py-[10px] rounded-lg">

        {videoRef.current && <ControlSlider video={videoRef.current} parentTime={currentTimeRef} />}

        {/* Another control */}
        <div className="video-control--container">
          {/* Left part */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* play button */}
            <div
              onClick={togglePlay}
              style={{ border: "solid 4px #fff", padding: "8px", borderRadius: "50%", cursor: "pointer" }}>
              {
                !isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 text-white">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 text-white">
                  <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                </svg>
              }
            </div>

            {/* Tua button */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <svg onClick={backTime} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white cursor-pointer">
                <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
              </svg>
              <svg onClick={fowardTime} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white cursor-pointer">
                <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
              </svg>
            </div>

            {/* Volume */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                onClick={toggleMuteVolume}
                style={{ cursor: "pointer" }}>
                {
                  isMute ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white">
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
                  </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white">
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                    <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                  </svg>
                }

              </div>
              <Slider
                aria-label="Player progress"
                className="w-[120px]"
                color="warning"
                // defaultValue={20}
                hideThumb={true}
                step={0.1}
                maxValue={1.0}
                minValue={0.0}
                value={volumeValue}
                onChange={(value) => handleChangeVolumeValue(value)}
              />
            </div>

          </div>

          {/* right part */}
          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            {/* Speed */}
            <div style={{ position: "relative" }}>
              <svg onClick={() => setIsOpenSpeed(!isOpenSpeed)} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white">
                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
              </svg>
              <div style={{ position: "absolute", right: 0, bottom: "calc(100% + 8px)" }}>
                {isOpenSpeed && (
                  <div className="modal-setting-video--container">
                    <p style={{ color: "#fff", userSelect: "none" }}>Tốc độ</p>
                    <ul className="list-speed--modal">
                      <li onClick={() => changeSpeed(0.25)}>0.25</li>
                      <li onClick={() => changeSpeed(0.75)}>0.75</li>
                      <li onClick={() => changeSpeed(0.5)}>0.5</li>
                      <li onClick={() => changeSpeed(1)}>Chuẩn</li>
                      <li onClick={() => changeSpeed(1.25)}>1.25</li>
                      <li onClick={() => changeSpeed(1.5)}>1.5</li>
                      <li onClick={() => changeSpeed(1.75)}>1.75</li>
                      <li onClick={() => changeSpeed(2)}>2</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Zoom full */}
            <div
              onClick={toggleFullScreen}
              style={{ cursor: "pointer" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Player