"use client";

import Image from "next/image";
import { ProductZoomImage } from "@/components/ProductZoomImage";
import { useRef, useState } from "react";

export function ProductGallery({ images, name }) {
  const dialogRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const previousOverflow = useRef("");

  function open(index) {
    setSelected(index);
    previousOverflow.current = document.body.style.overflow;
    dialogRef.current.showModal();
    document.body.style.overflow = "hidden";
  }

  function move(step) {
    setSelected((index) => (index + step + images.length) % images.length);
  }

  if (!images.length) return null;

  return (
    <>
      <button
        type="button"
        className="detail-image-card gallery-main-image"
        aria-label={`Open ${name} gallery, view ${selected + 1}`}
        onClick={() => open(selected)}
      >
        <Image src={images[selected]} alt={`${name} view ${selected + 1}`} width={960} height={960} className="detail-image" priority />
        <span className="product-zoom-hint" aria-hidden="true">+</span>
      </button>
      <div className="detail-gallery">
        {images.map((image, index) => (
          <button
            type="button"
            key={image}
            className="detail-gallery-card detail-gallery-link"
            aria-label={`Show ${name}, view ${index + 1}`}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            <Image src={image} alt={`${name} view ${index + 1}`} width={400} height={400} className="detail-gallery-image" />
          </button>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="gallery-lightbox"
        aria-label={`${name} image gallery`}
        onClose={() => { document.body.style.overflow = previousOverflow.current; }}
        onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        }}
      >
        <div className="gallery-lightbox-content">
          <button type="button" className="gallery-close" autoFocus aria-label="Close image gallery" onClick={() => dialogRef.current.close()}>×</button>
          <ProductZoomImage key={images[selected]} src={images[selected]} alt={`${name} view ${selected + 1}`} className="gallery-zoom-image" />
          <div className="gallery-controls">
            <button type="button" aria-label="Previous image" onClick={() => move(-1)}>←</button>
            <span aria-live="polite">{selected + 1} / {images.length}</span>
            <button type="button" aria-label="Next image" onClick={() => move(1)}>→</button>
          </div>
        </div>
      </dialog>
    </>
  );
}
