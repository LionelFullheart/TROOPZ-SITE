"use client";

import Image from "next/image";
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
      <div className="detail-gallery">
        {images.map((image, index) => (
          <button
            type="button"
            key={image}
            className="detail-gallery-card detail-gallery-link"
            aria-label={`Enlarge ${name}, view ${index + 1}`}
            onClick={() => open(index)}
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
          <Image src={images[selected]} alt={`${name} view ${selected + 1}`} width={1600} height={1600} className="gallery-full-image" />
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
