import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createKing } from './kingModel';
import { journeyPose } from './journeyPose';

/** Shared with the 3D workshop, but rendered only when the scroll pose changes. */
export function createJourneyScene(host, onError) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
  renderer.setClearColor(0, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .95;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, .1, 40);
  camera.position.z = 15;
  const pmrem = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, .04);
  scene.environment = environment.texture;
  room.dispose(); pmrem.dispose();
  scene.add(new THREE.HemisphereLight('#fff0dd', '#482211', 1.6));
  const light = new THREE.DirectionalLight('#fff5e8', 3); light.position.set(-3, 6, 5); scene.add(light);
  const rim = new THREE.DirectionalLight('#ee8050', 4); rim.position.set(3, 1, -3); scene.add(rim);
  const { root } = createKing(); root.position.y = -1.55;
  const traveller = new THREE.Group(); traveller.add(root); scene.add(traveller);
  root.traverse(object => { if (object.isMesh) { object.material.color.set('#b7552b'); object.material.transmission = .3; object.material.metalness = .4; object.material.envMapIntensity = .85; } });
  let disposed = false, visible = true, raf = 0, phase = 0, aspect = 1, mobile = false;
  const draw = () => {
    raf = 0;
    if (disposed || !visible || document.hidden) return;
    const pose = journeyPose(phase, mobile);
    traveller.position.set((pose.x - .5) * 10 * aspect, (.5 - pose.y) * 10, 0);
    traveller.scale.setScalar(pose.size);
    traveller.rotation.set(.23, pose.turn, Math.sin(phase * Math.PI) * .1);
    root.traverse(object => {
      if (object.userData.wire) { object.visible = pose.wire > .05; object.material.opacity = pose.wire * .65; }
      if (object.isMesh) object.material.wireframe = pose.wire > .9;
    });
    renderer.render(scene, camera);
  };
  const schedule = () => { if (!raf && !disposed && visible && !document.hidden) raf = requestAnimationFrame(draw); };
  const resize = () => {
    const { clientWidth: width, clientHeight: height } = host;
    if (!width || !height) return;
    aspect = width / height; mobile = width < 701;
    camera.left = -5 * aspect; camera.right = 5 * aspect; camera.updateProjectionMatrix();
    renderer.setSize(width, height); schedule();
  };
  const ro = new ResizeObserver(resize); ro.observe(host);
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); }); io.observe(host);
  const visibility = () => { if (!document.hidden) schedule(); };
  document.addEventListener('visibilitychange', visibility);
  const lost = event => { event.preventDefault(); onError(); };
  renderer.domElement.addEventListener('webglcontextlost', lost);
  resize();
  return {
    update(value) { phase = value; schedule(); },
    dispose() {
      disposed = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      const geometries = new Set(), materials = new Set();
      scene.traverse(object => { if (object.geometry) geometries.add(object.geometry); if (object.material) materials.add(object.material); });
      geometries.forEach(value => value.dispose()); materials.forEach(value => value.dispose());
      environment.dispose(); renderer.dispose(); renderer.domElement.remove();
    },
  };
}
