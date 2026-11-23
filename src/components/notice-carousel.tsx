"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Slide = {
  title: string;
  description: ReactNode;
  action?: { label: string; onClick: () => void };
  tone?: "warning";
};

export function StudioCarousel({ title, slides, onDismiss, selectedIndex, onIndexChange, className = "" }: {
  title: string;
  slides: readonly Slide[];
  onDismiss?: () => void;
  selectedIndex?: number;
  onIndexChange?: (index: number) => void;
  className?: string;
}) {
  const swiper = useRef<SwiperInstance | null>(null);
  const [current, setCurrent] = useState(selectedIndex ?? 0);
  const reducedMotion = usePrefersReducedMotion();
  const viewportId = useId();
  const speed = reducedMotion ? 0 : 320;
  const navigationName = onDismiss ? "Perhatian" : "Panel";

  useEffect(() => {
    if (selectedIndex !== undefined && swiper.current && swiper.current.activeIndex !== selectedIndex) {
      swiper.current.slideTo(selectedIndex, speed);
    }
  }, [selectedIndex, speed]);

  return (
    <Card as="section" className={`notice-carousel studio-carousel ${className}`} role="region" aria-roledescription="karusel" aria-label={title}>
      <div className="notice-header">
        <h2>{title}</h2>
        {onDismiss && <Button variant="ghost" size="icon" className="notice-dismiss" aria-label="Tutup perhatian" onClick={onDismiss}>
          <Icon name="close" size={16} />
        </Button>}
      </div>
      <Swiper
        id={viewportId}
        className="notice-viewport"
        onSwiper={(instance) => { swiper.current = instance; }}
        initialSlide={selectedIndex}
        onSlideChange={(instance) => {
          setCurrent(instance.activeIndex);
          onIndexChange?.(instance.activeIndex);
        }}
        speed={speed}
        rewind
        autoHeight
      >
        {slides.map((notice, index) => (
          <SwiperSlide key={notice.title}>
            <div
              className={`notice-slide${notice.tone === "warning" ? " warning" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} dari ${slides.length}`}
              aria-hidden={current !== index || undefined}
              inert={current !== index}
            >
              <div className="notice-copy"><strong>{notice.title}</strong><span>{notice.description}</span></div>
              {notice.action && <Button variant="ghost" className="notice-action" onClick={notice.action.onClick}>
                {notice.action.label} <Icon name="arrow" size={14} />
              </Button>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="notice-controls">
        <span className="notice-position" aria-hidden="true">{current + 1} / {slides.length}</span>
        <span className="sr-only" role="status" aria-atomic="true">
          {navigationName} {current + 1} dari {slides.length}. {slides[current]?.title}
        </span>
        <Button variant="ghost" size="icon" aria-label={`${navigationName} sebelumnya`} aria-controls={viewportId} onClick={() => swiper.current?.slidePrev()}><Icon name="chevron-left" size={16} /></Button>
        <Button variant="ghost" size="icon" aria-label={`${navigationName} berikutnya`} aria-controls={viewportId} onClick={() => swiper.current?.slideNext()}><Icon name="chevron-right" size={16} /></Button>
      </div>
    </Card>
  );
}

export function NoticeCarousel({ onAnalytics, onAssets, onDismiss }: {
  onAnalytics: () => void;
  onAssets: () => void;
  onDismiss: () => void;
}) {
  return <StudioCarousel title="Perhatian workspace" onDismiss={onDismiss} slides={[
    { title: "Snapshot Oktober 2026", description: "Contoh data GL & CO siap ditelusuri sampai transaksi sumber.", action: { label: "Buka analisis", onClick: onAnalytics } },
    { title: "Mapping equipment", description: "7 equipment belum punya mapping aset pada snapshot simulasi.", tone: "warning", action: { label: "Tinjau aset", onClick: onAssets } },
  ]} />;
}
