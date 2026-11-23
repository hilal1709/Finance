"use client";

import { useEffect, useRef, useState } from "react";
import { Lottie, type LottieHandle } from "lottie-react";
const descriptions = {
  ledger: "Dokumen sumber tersusun menjadi satu buku besar",
  import: "Kolom pada berkas sumber dipasangkan dengan kolom tujuan",
  asset: "Contoh hubungan satu aset dengan beberapa equipment",
  tasks: "Baki daftar pekerjaan kosong",
  period: "Dua periode kalender yang dibandingkan",
} as const;

export function AccountingIllustration({
  className,
  scene,
}: {
  className?: string;
  scene: keyof typeof descriptions;
}) {
  const animation = useRef<LottieHandle>(null);

  const frame = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!frame.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setLoaded(true);
    });
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  function updatePlayback() {
    const player = animation.current;
    if (!player) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      player.pause();
      player.seek({ frame: 54 });
    } else if (visible) {
      player.seek({ frame: 0 });
      player.play();
    } else {
      player.pause();
    }
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    function sync() {
      const player = animation.current;
      if (!player) return;
      if (media.matches || !visible) {
        player.pause();
        if (media.matches) player.seek({ frame: 54 });
      } else {
        player.play();
      }
    }
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [visible]);

  return (
    <div
      className={`accounting-illustration ${className ?? ""}`}
      ref={frame}
      onPointerEnter={updatePlayback}
      role="img"
      aria-label={descriptions[scene]}
      data-scene={scene}
    >
      {loaded && <Lottie
        key={scene}
        src={`/ledger/${scene}.json`}
        lottieRef={animation}
        loop
        autoplay={false}
        subscriptions={{ ready: updatePlayback }}
        aria-hidden="true"
        style={{ width: "100%", height: "100%" }}
      />}
    </div>
  );
}
