"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductZoomImage({ src, alt, priority = false }) {
  const [zoomed, setZoomed] = useState(false);

  function moveZoom(event) {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--zoom-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    event.currentTarget.style.setProperty("--zoom-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  }

  return (
    <button
      type="button"
      className="product-zoom detail-image-card"
      aria-label={`${zoomed ? "Zoom out of" : "Zoom in on"} ${alt}`}
      aria-pressed={zoomed}
      data-zoomed={zoomed}
      onPointerMove={moveZoom}
      onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty("--zoom-x");
        event.currentTarget.style.removeProperty("--zoom-y");
      }}
      onClick={() => setZoomed((value) => !value)}
      onBlur={() => setZoomed(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setZoomed(false);
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={960}
        height={960}
        className="detail-image"
        priority={priority}
      />
      <span className="product-zoom-hint" aria-hidden="true">{zoomed ? "−" : "+"}</span>
    </button>
  );
}
