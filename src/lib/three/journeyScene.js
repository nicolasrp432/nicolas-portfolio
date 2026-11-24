import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createJourneyObjects } from './journeyObjects';
import { journeyPose } from './journeyPose';

/** One lazy canvas, painted only when scroll, size or visibility changes. */
export function createJourneyScene(host, onError) {
  let renderer, environment, room, pmrem, objects, ro, io;
  let disposed = false, visible = true, raf = 0, phase = 0, aspect = 1, mobile = false;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, .1, 40);
  camera.position.z = 15;

  function dispose() {
    if (disposed) return;
    disposed = true; cancelAnimationFrame(raf); ro?.disconnect(); io?.disconnect();
    document.removeEventListener('visibilitychange', visibility);
    renderer?.domElement.removeEventListener('webglcontextlost', lost);
    objects?.dispose(); environment?.dispose(); room?.dispose(); pmrem?.dispose();
    scene.clear(); renderer?.dispose(); renderer?.domElement.remove();
  }
  function fail() { dispose(); onError?.(); }
  function lost(event) { event.preventDefault(); fail(); }
  function visibility() { if (!document.hidden) schedule(); }
  function draw() {
    raf = 0;
    if (disposed || !visible || document.hidden) return;
    const pose = journeyPose(phase, mobile), traveller = objects.root;
    traveller.position.set((pose.x - .5) * 10 * aspect, (.5 - pose.y) * 10, 0);
    traveller.scale.setScalar(pose.size);
    traveller.rotation.set(.23, pose.turn, Math.sin(phase * Math.PI) * .1);
    objects.update(phase, pose.turn);
    try { renderer.render(scene, camera); } catch { fail(); }
  }
  function schedule() { if (!raf && !disposed && visible && !document.hidden) raf = requestAnimationFrame(draw); }
  function resize() {
    if (disposed) return;
    const { clientWidth: width, clientHeight: height } = host;
    if (!width || !height) return;
    aspect = width / height; mobile = width < 701;
    camera.left = -5 * aspect; camera.right = 5 * aspect; camera.updateProjectionMatrix();
    renderer.setPixelRatio(mobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.setSize(width, height); schedule();
  }

  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setClearColor(0, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = .95;
    renderer.domElement.style.pointerEvents = 'none';
    host.appendChild(renderer.domElement);
    pmrem = new THREE.PMREMGenerator(renderer); room = new RoomEnvironment();
    environment = pmrem.fromScene(room, .04); scene.environment = environment.texture;
    room.dispose(); room = null; pmrem.dispose(); pmrem = null;
    scene.add(new THREE.HemisphereLight('#fff0dd', '#482211', 1.6));
    const light = new THREE.DirectionalLight('#fff5e8', 3); light.position.set(-3, 6, 5); scene.add(light);
    const rim = new THREE.DirectionalLight('#ee8050', 4); rim.position.set(3, 1, -3); scene.add(rim);
    objects = createJourneyObjects(); scene.add(objects.root);
    ro = new ResizeObserver(resize); ro.observe(host);
    io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); }); io.observe(host);
    document.addEventListener('visibilitychange', visibility);
    renderer.domElement.addEventListener('webglcontextlost', lost);
    resize();
  } catch (error) {
    dispose();
    throw error;
  }
  return { update(value) { phase = value; schedule(); }, dispose };
}
