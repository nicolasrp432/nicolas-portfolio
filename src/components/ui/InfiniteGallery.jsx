import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;

const createClothMaterial = () => {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map:         { value: null },
      opacity:     { value: 1.0 },
      blurAmount:  { value: 0.0 },
      scrollForce: { value: 0.0 },
      time:        { value: 0.0 },
      isHovered:   { value: 0.0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vNormal = normal;
        vec3 pos = position;
        float curveIntensity = scrollForce * 0.3;
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;
        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float clothEffect = (ripple1 + ripple2) * abs(curveIntensity) * 2.0;
        float flagWave = 0.0;
        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          float dampening = smoothstep(-0.5, 0.5, pos.x);
          flagWave = waveAmplitude * dampening;
          float secondaryWave = sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;
          flagWave += secondaryWave;
        }
        pos.z -= (curve + clothEffect + flagWave);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vec4 color = texture2D(map, vUv);
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          // Safer 3x3 blur
          for (float x = -1.0; x <= 1.0; x += 1.0) {
            for (float y = -1.0; y <= 1.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * (blurAmount * 0.5);
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        float curveHighlight = abs(scrollForce) * 0.05;
        color.rgb += vec3(curveHighlight * 0.1);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
};

function GalleryScene({
  images,
  speed,
  visibleCount,
  fadeSettings,
  blurSettings,
  onContextLost
}) {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [autoPlay, setAutoPlay]             = useState(true);
  const lastInteraction                     = useRef(Date.now());

  const normalizedImages = useMemo(
    () => images.map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img)),
    [images]
  );

  const textures = useTexture(normalizedImages.map((i) => i.src));

  const materials = useMemo(
    () => Array.from({ length: visibleCount }, () => createClothMaterial()),
    [visibleCount]
  );

  const spatialPositions = useMemo(() => {
    return Array.from({ length: visibleCount }, (_, i) => {
      const hAngle = (i * 2.618) % (Math.PI * 2);
      const vAngle = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
      const hRadius = (i % 3) * 1.2;
      const vRadius = ((i + 1) % 4) * 0.8;
      return {
        x: (Math.sin(hAngle) * hRadius * MAX_HORIZONTAL_OFFSET) / 3,
        y: (Math.cos(vAngle) * vRadius * MAX_VERTICAL_OFFSET) / 4,
      };
    });
  }, [visibleCount]);

  const totalImages = normalizedImages.length;
  const depthRange  = DEFAULT_DEPTH_RANGE;

  const planesData = useRef(
    Array.from({ length: visibleCount }, (_, i) => ({
      index:      i,
      z:          visibleCount > 0 ? ((depthRange / visibleCount) * i) % depthRange : 0,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x:          spatialPositions[i]?.x ?? 0,
      y:          spatialPositions[i]?.y ?? 0,
    }))
  );

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    setScrollVelocity((prev) => prev + e.deltaY * 0.01 * speed);
    setAutoPlay(false);
    lastInteraction.current = Date.now();
  }, [speed]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      setScrollVelocity((prev) => prev - 2 * speed);
      setAutoPlay(false);
      lastInteraction.current = Date.now();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      setScrollVelocity((prev) => prev + 2 * speed);
      setAutoPlay(false);
      lastInteraction.current = Date.now();
    }
  }, [speed]);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, handleKeyDown]);

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - lastInteraction.current > 3000) setAutoPlay(true);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const planeRefs = useRef([]);

  useFrame((state, delta) => {
    if (autoPlay) setScrollVelocity((prev) => prev + 0.3 * delta);
    setScrollVelocity((prev) => prev * 0.95);

    const time = state.clock.getElapsedTime();
    materials.forEach((mat) => {
      if (mat?.uniforms) {
        mat.uniforms.time.value        = time;
        mat.uniforms.scrollForce.value = scrollVelocity;
      }
    });

    const imageAdvance = totalImages > 0 ? visibleCount % totalImages || totalImages : 0;

    planesData.current.forEach((plane, i) => {
      let newZ         = plane.z + scrollVelocity * delta * 10;
      let wrapsForward = 0;
      let wrapsBack    = 0;

      if (newZ >= depthRange) {
        wrapsForward = Math.floor(newZ / depthRange);
        newZ -= depthRange * wrapsForward;
      } else if (newZ < 0) {
        wrapsBack = Math.ceil(-newZ / depthRange);
        newZ += depthRange * wrapsBack;
      }

      if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0)
        plane.imageIndex = (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
      if (wrapsBack > 0 && imageAdvance > 0 && totalImages > 0) {
        const step = plane.imageIndex - wrapsBack * imageAdvance;
        plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
      }

      plane.z = ((newZ % depthRange) + depthRange) % depthRange;
      const worldZ = plane.z - depthRange / 2;
      
      if (planeRefs.current[i]) {
        planeRefs.current[i].position.set(plane.x, plane.y, worldZ);
        const currentTexture = textures[plane.imageIndex];
        if (materials[i].uniforms.map.value !== currentTexture) {
          materials[i].uniforms.map.value = currentTexture;
        }
      }

      const np = plane.z / depthRange;
      let opacity = 1;
      if      (np < fadeSettings.fadeIn.start)                                            opacity = 0;
      else if (np <= fadeSettings.fadeIn.end)                                             opacity = (np - fadeSettings.fadeIn.start)  / (fadeSettings.fadeIn.end  - fadeSettings.fadeIn.start);
      else if (np >= fadeSettings.fadeOut.start && np <= fadeSettings.fadeOut.end)        opacity = 1 - (np - fadeSettings.fadeOut.start) / (fadeSettings.fadeOut.end - fadeSettings.fadeOut.start);
      else if (np > fadeSettings.fadeOut.end)                                             opacity = 0;
      opacity = Math.max(0, Math.min(1, opacity));

      let blur = 0;
      if      (np < blurSettings.blurIn.start)                                            blur = blurSettings.maxBlur;
      else if (np <= blurSettings.blurIn.end)                                             blur = blurSettings.maxBlur * (1 - (np - blurSettings.blurIn.start) / (blurSettings.blurIn.end - blurSettings.blurIn.start));
      else if (np >= blurSettings.blurOut.start && np <= blurSettings.blurOut.end)        blur = blurSettings.maxBlur * ((np - blurSettings.blurOut.start) / (blurSettings.blurOut.end - blurSettings.blurOut.start));
      else if (np > blurSettings.blurOut.end)                                             blur = blurSettings.maxBlur;
      blur = Math.max(0, Math.min(blurSettings.maxBlur, blur));

      if (materials[i]?.uniforms) {
        materials[i].uniforms.opacity.value    = opacity;
        materials[i].uniforms.blurAmount.value = blur;
      }
    });
  });

  return (
    <>
      {planesData.current.map((plane, i) => {
        const texture  = textures[plane.imageIndex];
        const material = materials[i];
        if (!texture || !material) return null;
        const aspect = texture.image ? texture.image.width / texture.image.height : 1;
        const scale  = aspect > 1 ? [2 * aspect, 2, 1] : [2, 2 / aspect, 1];
        return (
          <mesh
            key={plane.index}
            ref={el => planeRefs.current[i] = el}
            position={[plane.x, plane.y, plane.z - depthRange / 2]}
            scale={scale}
            material={material}
            onPointerEnter={() => { if (material.uniforms) material.uniforms.isHovered.value = 1.0; }}
            onPointerLeave={() => { if (material.uniforms) material.uniforms.isHovered.value = 0.0; }}
          >
            <planeGeometry args={[1, 1, 16, 16]} />
          </mesh>
        );
      })}
    </>
  );
}

function FallbackGallery({ images }) {
  const normalized = useMemo(
    () => images.map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img)),
    [images]
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', height: '100%', overflow: 'hidden' }}>
      {normalized.slice(0, 6).map((img, i) => (
        <img key={i} src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
      ))}
    </div>
  );
}

const InfiniteGallery = ({
  images,
  style,
  speed        = 1,
  visibleCount = 8,
  fadeSettings = { fadeIn: { start: 0.02, end: 0.12 }, fadeOut: { start: 0.88, end: 0.98 } },
  blurSettings = { blurIn: { start: 0.0, end: 0.08 }, blurOut: { start: 0.92, end: 1.0 }, maxBlur: 4.0 },
}) => {
  const [webglOk, setWebglOk] = useState(true);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    try {
      const c  = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (!gl) setWebglOk(false);
    } catch { setWebglOk(false); }
  }, []);

  const containerStyle = { height: '100%', width: '100%', ...style };

  if (!webglOk || contextLost) {
    return <div style={containerStyle}><FallbackGallery images={images} /></div>;
  }

  return (
    <div style={containerStyle}>
      <Canvas
        camera={{ position: [0, 0, 0], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0, 0, 0, 0);
          scene.background = null;
          const canvas = gl.domElement;
          const handleLost = (e) => {
            e.preventDefault();
            setContextLost(true);
          };
          canvas.addEventListener('webglcontextlost', handleLost, false);
          return () => canvas.removeEventListener('webglcontextlost', handleLost);
        }}
      >
        <GalleryScene
          images={images}
          speed={speed}
          visibleCount={visibleCount}
          fadeSettings={fadeSettings}
          blurSettings={blurSettings}
        />
      </Canvas>
    </div>
  );
};

export default React.memo(InfiniteGallery);
