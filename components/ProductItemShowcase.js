"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function createGlowTexture(color) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(256, 256, 28, 256, 256, 256);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.3, "rgba(255, 122, 26, 0.32)");
  gradient.addColorStop(0.6, "rgba(255, 122, 26, 0.12)");
  gradient.addColorStop(1, "rgba(255, 122, 26, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 512);
  return new THREE.CanvasTexture(canvas);
}

function buildTextureFallback(texture, alphaMap) {
  const group = new THREE.Group();
  const layers = [
    { z: -0.32, opacity: 0.16, scale: 0.96 },
    { z: -0.18, opacity: 0.3, scale: 0.98 },
    { z: -0.08, opacity: 0.58, scale: 0.99 },
    { z: 0.08, opacity: 1, scale: 1 },
  ];

  layers.forEach((layer) => {
    const geometry = new THREE.PlaneGeometry(3.4, 3.4);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      alphaMap,
      metalness: 0.05,
      roughness: 0.7,
      opacity: layer.opacity,
      depthWrite: layer.opacity > 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = layer.z;
    mesh.scale.setScalar(layer.scale);
    group.add(mesh);
  });

  group.rotation.x = -0.1;
  group.rotation.z = -0.04;
  return group;
}

export function ProductItemShowcase({ product, children }) {
  const mountRef = useRef(null);
  const [viewerFailed, setViewerFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    let renderer;
    let frameId;
    let controls;
    let disposed = false;
    let autoRotate = true;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050505");
    scene.fog = new THREE.Fog("#050505", 8, 15);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 1.1, 6.6);

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (error) {
      setViewerFailed(true);
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight("#ffffff", 1.8);
    const keyLight = new THREE.DirectionalLight("#ffd7b2", 2.1);
    keyLight.position.set(3.4, 5.5, 4.6);
    const rimLight = new THREE.DirectionalLight("#ff8e42", 1.3);
    rimLight.position.set(-3.2, 1.8, -2.4);
    const fillLight = new THREE.PointLight("#ff7a1a", 10, 10, 2);
    fillLight.position.set(0, -1.4, 0.6);

    scene.add(ambientLight, keyLight, rimLight, fillLight);

    const haloTexture = createGlowTexture(product.viewer?.accentColor || "#ff7a1a");
    const haloMaterial = new THREE.SpriteMaterial({
      map: haloTexture,
      transparent: true,
      opacity: 1,
      depthWrite: false,
    });
    const halo = new THREE.Sprite(haloMaterial);
    halo.scale.set(6.2, 6.2, 1);
    halo.position.set(0, -1.75, 0);
    scene.add(halo);

    const platformGeometry = new THREE.CircleGeometry(2.45, 64);
    const platformMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ff7a1a"),
      transparent: true,
      opacity: 0.13,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.rotation.x = -Math.PI / 2;
    platform.position.set(0, -1.8, 0);
    scene.add(platform);

    const objectRoot = new THREE.Group();
    scene.add(objectRoot);

    const textureLoader = new THREE.TextureLoader();
    const gltfLoader = new GLTFLoader();
    const fallbackTextureUrl = product.viewer?.textureUrl || product.image;
    const modelUrl = product.viewer?.modelUrl;

    const useTextureFallback = () => {
      textureLoader.load(
        fallbackTextureUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          const fallbackObject = buildTextureFallback(texture, texture);
          objectRoot.add(fallbackObject);
        },
        undefined,
        () => {
          if (!disposed) {
            setViewerFailed(true);
          }
        }
      );
    };

    if (modelUrl) {
      gltfLoader.load(
        modelUrl,
        (gltf) => {
          const model = gltf.scene;
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center);
          const scale = 3.2 / Math.max(size.x, size.y, size.z || 1);
          model.scale.setScalar(scale);
          objectRoot.add(model);
        },
        undefined,
        useTextureFallback
      );
    } else {
      useTextureFallback();
    }

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.15;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minPolarAngle = Math.PI / 2.15;
    controls.maxPolarAngle = Math.PI / 1.85;
    controls.minAzimuthAngle = -0.55;
    controls.maxAzimuthAngle = 0.55;
    controls.target.set(0, 0.15, 0);

    const handlePointerEnter = () => {
      autoRotate = controls.autoRotate;
      controls.autoRotate = false;
    };

    const handlePointerLeave = () => {
      controls.autoRotate = autoRotate;
    };

    mount.addEventListener("pointerenter", handlePointerEnter);
    mount.addEventListener("pointerleave", handlePointerLeave);

    const handleResize = () => {
      if (!mount) {
        return;
      }

      const { clientWidth, clientHeight } = mount;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      objectRoot.position.y = Math.sin(elapsed * 1.15) * 0.08;
      halo.material.opacity = 0.9 + Math.sin(elapsed * 1.4) * 0.08;
      controls.update();
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    animate();

    return () => {
      disposed = true;
      window.removeEventListener("resize", handleResize);
      mount.removeEventListener("pointerenter", handlePointerEnter);
      mount.removeEventListener("pointerleave", handlePointerLeave);
      window.cancelAnimationFrame(frameId);
      controls.dispose();
      haloTexture.dispose();
      platformGeometry.dispose();
      platformMaterial.dispose();
      haloMaterial.dispose();
      scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry?.dispose?.();

          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              material.map?.dispose?.();
              material.alphaMap?.dispose?.();
              material.dispose?.();
            });
          } else if (child.material) {
            child.material.map?.dispose?.();
            child.material.alphaMap?.dispose?.();
            child.material.dispose?.();
          }
        }
      });
      renderer.dispose();
      mount.querySelector("canvas")?.remove();
    };
  }, [product]);

  return (
    <section className="item-showcase">
      <div className="item-showcase-viewer-shell">
        <div className="item-showcase-badge">TROOPZ / ITEM VIEWER</div>
        <div className="item-showcase-controls">Auto-rotating collectible view</div>
        <div className="item-showcase-viewer" ref={mountRef}>
          {viewerFailed ? (
            <div className="item-viewer-fallback">
              <img src={product.viewer?.textureUrl || product.image} alt={product.name} />
              <p>3D viewer fallback active</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="item-showcase-card">
        <p className="eyebrow">Featured Product</p>
        <h1>{product.name}</h1>
        <p className="item-showcase-subtitle">{product.viewer?.subtitle || product.description}</p>
        <p className="detail-price">
          {product.price != null ? `$${product.price} USD` : product.priceLabel}
        </p>

        <div className="item-meta-grid">
          <div>
            <span>Item Type</span>
            <strong>{product.viewer?.itemType || product.category}</strong>
          </div>
          <div>
            <span>Edition</span>
            <strong>{product.viewer?.edition || "Core"}</strong>
          </div>
          <div>
            <span>Drop</span>
            <strong>{product.viewer?.drop || "Current"}</strong>
          </div>
        </div>

        <p className="section-copy">{product.details}</p>
        {children}
      </div>
    </section>
  );
}
