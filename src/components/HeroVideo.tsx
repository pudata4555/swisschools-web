"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background video. The source clip does not loop cleanly on its own
 * (it ends and freezes on a blank final frame), so we force muted autoplay
 * and restart on 'ended' as a belt-and-suspenders loop.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.loop = true;
    const play = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    play();
    const onEnded = () => {
      v.currentTime = 0;
      play();
    };
    const onLoaded = () => play();
    v.addEventListener("ended", onEnded);
    v.addEventListener("loadeddata", onLoaded);
    return () => {
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("loadeddata", onLoaded);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/media/hero-poster.jpg"
    >
      <source src="/media/bannerVideo.mp4" type="video/mp4" />
    </video>
  );
}
