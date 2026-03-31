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
  gradient.addColorStop(0.3, "rgba(255, 122, 26, 0.30)");
  gradient.addColorStop(0.62, "rgba(255, 122, 26, 0.1)");
  gradient.addColorStop(1, "rgba(255, 122, 26, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 512);
  return new THREE.CanvasTexture(canvas);
}

function buildTextureObject(texture, alphaMap) {
  const group = new THREE.Group();
  const layers = [
    { z: -0.24, opacity: 0.16, scale: 0.95 },
    { z: -0.12, opacity: 0.3, scale: 0.975 },
    { z: -0.04, opacity: 0.58, scale: 0.992 },
    { z: 0.08, opacity: 1, scale: 1 },
  ];

  layers.forEach((layer) => {
    const geometry = new THREE.PlaneGeometry(3.2, 3.2);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      alphaMap,
      metalness: 0.04,
      roughness: 0.72,
      opacity: layer.opacity,
      depthWrite: layer.opacity > 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = layer.z;
    mesh.scale.setScalar(layer.scale);
    group.add(mesh);
  });

  group.rotation.x = -0.14;
  group.rotation.z = -0.04;
  return group;
}

export function FloatingItemViewer({ product, className = "" }) {
  const mountRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    let renderer;
    let frameId;
    let controls;
    let disposed = false;
    let rotateAfterHover = true;

    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.Fog("#050505", 6, 12);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.95, 6);

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight("#ffffff", 1.6);
    const keyLight = new THREE.DirectionalLight("#ffd2af", 2);
    keyLight.position.set(3.2, 4.5, 3.8);
    const rimLight = new THREE.DirectionalLight("#ff8e42", 1.1);
    rimLight.position.set(-3.2, 1.8, -2.2);
    const fillLight = new THREE.PointLight(product.viewer?.accentColor || "#ff7a1a", 9, 10, 2);
    fillLight.position.set(0, -1.2, 0.5);

    scene.add(ambientLight, keyLight, rimLight, fillLight);

    const haloTexture = createGlowTexture(product.viewer?.accentColor || "#ff7a1a");
    const haloMaterial = new THREE.SpriteMaterial({
      map: haloTexture,
      transparent: true,
      opacity: 1,
      depthWrite: false,
    });
    const halo = new THREE.Sprite(haloMaterial);
    halo.scale.set(5.1, 5.1, 1);
    halo.position.set(0, -1.38, 0);
    scene.add(halo);

    const platformGeometry = new THREE.CircleGeometry(1.96, 64);
    const platformMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(product.viewer?.accentColor || "#ff7a1a"),
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.rotation.x = -Math.PI / 2;
    platform.position.set(0, -1.44, 0);
    scene.add(platform);

    const objectRoot = new THREE.Group();
    scene.add(objectRoot);

    const textureLoader = new THREE.TextureLoader();
    const gltfLoader = new GLTFLoader();
    const textureUrl = product.viewer?.textureUrl || product.image;
    const modelUrl = product.viewer?.modelUrl;

    const loadFallback = () => {
      textureLoader.load(
        textureUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          objectRoot.add(buildTextureObject(texture, texture));
        },
        undefined,
        () => {
          if (!disposed) {
            setFailed(true);
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
          const scale = 3 / Math.max(size.x, size.y, size.z || 1);
          model.scale.setScalar(scale);
          objectRoot.add(model);
        },
        undefined,
        loadFallback
      );
    } else {
      loadFallback();
    }

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.05;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minPolarAngle = Math.PI / 2.18;
    controls.maxPolarAngle = Math.PI / 1.86;
    controls.minAzimuthAngle = -0.42;
    controls.maxAzimuthAngle = 0.42;
    controls.target.set(0, 0.1, 0);

    const onEnter = () => {
      rotateAfterHover = controls.autoRotate;
      controls.autoRotate = false;
    };

    const onLeave = () => {
      controls.autoRotate = rotateAfterHover;
    };

    mount.addEventListener("pointerenter", onEnter);
    mount.addEventListener("pointerleave", onLeave);

    const onResize = () => {
      const { clientWidth, clientHeight } = mount;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      objectRoot.position.y = Math.sin(elapsed * 1.2) * 0.07;
      halo.material.opacity = 0.88 + Math.sin(elapsed * 1.4) * 0.07;
      controls.update();
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("resize", onResize);
    onResize();
    animate();

    return () => {
      disposed = true;
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointerenter", onEnter);
      mount.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(frameId);
      controls.dispose();
      haloTexture.dispose();
      haloMaterial.dispose();
      platformGeometry.dispose();
      platformMaterial.dispose();
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
    <div className={`floating-item-viewer ${className}`.trim()} ref={mountRef}>
      {failed ? (
        <div className="floating-item-fallback">
          <img src={product.viewer?.textureUrl || product.image} alt={product.name} />
        </div>
      ) : null}
    </div>
  );
}
