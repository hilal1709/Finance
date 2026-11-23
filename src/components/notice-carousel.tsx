"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function NoticeCarousel({ onAnalytics, onAssets, onDismiss }: {
  onAnalytics: () => void;
  onAssets: () => void;
  onDismiss: () => void;
}) {
  const swiper = useRef<SwiperInstance | null>(null);
  const [current, setCurrent] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const viewportId = useId();
  const notices = [
    { title: "Snapshot Oktober 2026", description: "Contoh data GL & CO siap ditelusuri sampai transaksi sumber.", action: "Buka analisis", onAction: onAnalytics },
    { title: "Mapping equipment", description: "7 equipment belum punya mapping aset pada snapshot simulasi.", action: "Tinjau aset", onAction: onAssets },
  ];

  return (
    <Card as="section" className="notice-carousel" role="region" aria-roledescription="karusel" aria-label="Perhatian workspace">
      <div className="notice-header">
        <h2>Perhatian workspace</h2>
        <Button variant="ghost" size="icon" className="notice-dismiss" aria-label="Tutup perhatian" onClick={onDismiss}>
          <X size={16} aria-hidden="true" />
        </Button>
      </div>
      <Swiper
        id={viewportId}
        className="notice-viewport"
        onSwiper={(instance) => { swiper.current = instance; }}
        onSlideChange={(instance) => setCurrent(instance.activeIndex)}
        speed={reducedMotion ? 0 : 240}
        rewind
        autoHeight
      >
        {notices.map((notice, index) => (
          <SwiperSlide key={notice.title}>
            <div
              className={`notice-slide${index === 1 ? " warning" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} dari ${notices.length}`}
              aria-hidden={current !== index || undefined}
              inert={current !== index}
            >
              <div className="notice-copy"><strong>{notice.title}</strong><span>{notice.description}</span></div>
              <Button variant="ghost" className="notice-action" onClick={notice.onAction}>
                {notice.action} <ArrowRight size={14} aria-hidden="true" />
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="notice-controls">
        <span className="notice-position" aria-hidden="true">{current + 1} / {notices.length}</span>
        <span className="sr-only" role="status" aria-atomic="true">
          Perhatian {current + 1} dari {notices.length}. {notices[current].title}
        </span>
        <Button variant="ghost" size="icon" aria-label="Perhatian sebelumnya" aria-controls={viewportId} onClick={() => swiper.current?.slidePrev()}><ChevronLeft size={16} aria-hidden="true" /></Button>
        <Button variant="ghost" size="icon" aria-label="Perhatian berikutnya" aria-controls={viewportId} onClick={() => swiper.current?.slideNext()}><ChevronRight size={16} aria-hidden="true" /></Button>
      </div>
    </Card>
  );
}
