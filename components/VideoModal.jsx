"use client";
import { useEffect, useRef } from "react";
import Icon from "./ui/Icon";

// Video only: no title, no category, no details. Video element exists only while open.
export default function VideoModal({ src, title, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const prev = document.activeElement;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={title} onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div onClick={(e) => e.stopPropagation()} className="relative animate-pop">
        <button ref={closeRef} onClick={onClose} aria-label="إغلاق"
          className="absolute -top-11 end-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-brand hover:text-black">
          <Icon name="close" className="h-4 w-4" />
        </button>
        <video src={src} controls autoPlay playsInline preload="metadata"
          className="aspect-[9/16] max-h-[82vh] w-auto max-w-[92vw] rounded-2xl bg-black" />
      </div>
    </div>
  );
}
