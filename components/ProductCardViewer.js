"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function createGlowTexture(color) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(256, 256, 20, 256, 256, 256);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.3, "rgba(255, 122, 26, 0.28)");
  gradient.addColorStop(0.6, "rgba(255, 122, 26, 0.08)");
  gradient.addColorStop(1, "rgba(255, 122, 26, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 512);
  return new THREE.CanvasTexture(canvas);
}

function buildTextureFallback(texture, alphaMap) {
  const group = new THREE.Group();
  const layers = [
    { z: -0.18, opacity: 0.18, scale: 0.95 },
    { z: -0.08, opacity: 0.38, scale: 0.975 },
    { z: 0.03, opacity: 1, scale: 1 },
  ];

  layers.forEach((layer) => {
    const geometry = new THREE.PlaneGeometry(2.45, 2.45);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      alphaMap,
      metalness: 0.02,
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

export function ProductCardViewer({ product }) {
  const mountRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return undefined;
    }

    let renderer;
    let controls;
    let frameId;
    let disposed = false;
    let autoRotate = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.6, 4.9);

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight("#ffffff", 1.5);
    const keyLight = new THREE.DirectionalLight("#ffe1c6", 1.8);
    keyLight.position.set(3, 4.5, 3);
    const rimLight = new THREE.DirectionalLight("#ff8e42", 1);
    rimLight.position.set(-2.4, 1.6, -1.6);
    const fillLight = new THREE.PointLight(product.viewer?.accentColor || "#ff7a1a", 6, 8, 2);
    fillLight.position.set(0, -1.1, 0.2);
    scene.add(ambientLight, keyLight, rimLight, fillLight);

    const haloTexture = createGlowTexture(product.viewer?.accentColor || "#ff7a1a");
    const haloMaterial = new THREE.SpriteMaterial({
      map: haloTexture,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    const halo = new THREE.Sprite(haloMaterial);
    halo.scale.set(3.8, 3.8, 1);
    halo.position.set(0, -1.1, 0);
    scene.add(halo);

    const root = new THREE.Group();
    scene.add(root);

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
          root.add(buildTextureFallback(texture, texture));
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
          const scale = 2.5 / Math.max(size.x, size.y, size.z || 1);
          model.scale.setScalar(scale);
          root.add(model);
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
    controls.autoRotateSpeed = 1;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minPolarAngle = Math.PI / 2.15;
    controls.maxPolarAngle = Math.PI / 1.9;
    controls.minAzimuthAngle = -0.35;
    controls.maxAzimuthAngle = 0.35;
    controls.target.set(0, 0, 0);

    const onEnter = () => {
      autoRotate = controls.autoRotate;
      controls.autoRotate = false;
    };

    const onLeave = () => {
      controls.autoRotate = autoRotate;
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
      root.position.y = Math.sin(elapsed * 1.2) * 0.05;
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

  if (failed) {
    return (
      <div className="product-card-viewer-fallback">
        <Image
          src={product.image}
          alt={product.name}
          width={720}
          height={720}
          className="product-image"
        />
      </div>
    );
  }

  return <div className="product-card-viewer" ref={mountRef} aria-label={`${product.name} rotating viewer`} />;
}
