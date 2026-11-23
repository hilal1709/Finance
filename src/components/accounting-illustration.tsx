"use client";

import { useEffect, useRef } from "react";
import { Lottie, type LottieHandle } from "lottie-react";
import accountingOrbit from "../../public/accounting-orbit.json";

export function AccountingIllustration({
  className,
  description = "Ilustrasi alur data tugas, biaya, dan pemetaan aset",
}: {
  className?: string;
  description?: string;
}) {
  const animation = useRef<LottieHandle>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      if (media.matches) {
        animation.current?.pause();
        animation.current?.seek({ frame: 44 });
      } else {
        animation.current?.play();
      }
    };

    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  return (
    <div
      className={`accounting-illustration ${className ?? ""}`}
      role="img"
      aria-label={description}
    >
      <Lottie
        src={accountingOrbit}
        lottieRef={animation}
        loop={false}
        autoplay={false}
        subscriptions={{
          ready: () => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
              animation.current?.seek({ frame: 44 });
            } else {
              animation.current?.play();
            }
          },
        }}
        aria-hidden="true"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
