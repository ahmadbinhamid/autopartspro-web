import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('networkCanvas');
if (!canvas) throw new Error('No canvas');

const isMobile = window.innerWidth < 768;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (isMobile || reducedMotion) {
  canvas.style.display = 'none';
} else {
  initScene();
}

function initScene() {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 18);

  const group = new THREE.Group();
  scene.add(group);

  const NODE_COUNT = 60;
  const EDGE_COUNT = 80;
  const PARTICLE_COUNT = 200;

  const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x818CF8, transparent: true, opacity: 0.7 });

  const nodePositions = [];
  const nodeMeshes = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    const mesh = new THREE.Mesh(nodeGeo, nodeMat.clone());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 4 + Math.random() * 6;
    mesh.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    nodePositions.push(mesh.position.clone());
    nodeMeshes.push(mesh);
    group.add(mesh);
  }

  const edgePositions = [];
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x6366F1, transparent: true, opacity: 0.08 });

  for (let i = 0; i < EDGE_COUNT; i++) {
    const a = Math.floor(Math.random() * NODE_COUNT);
    let b = Math.floor(Math.random() * NODE_COUNT);
    if (b === a) b = (a + 1) % NODE_COUNT;
    const geo = new THREE.BufferGeometry().setFromPoints([nodePositions[a], nodePositions[b]]);
    const line = new THREE.Line(geo, edgeMat.clone());
    edgePositions.push({ line, a, b });
    group.add(line);
  }

  const particleGeo = new THREE.BufferGeometry();
  const pPositions = new Float32Array(PARTICLE_COUNT * 3);
  const pSizes = new Float32Array(PARTICLE_COUNT);
  const pSpeeds = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    pPositions[i * 3] = (Math.random() - 0.5) * 30;
    pPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    pPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    pSizes[i] = Math.random() * 2 + 0.5;
    pSpeeds.push({
      vx: (Math.random() - 0.5) * 0.003,
      vy: (Math.random() - 0.5) * 0.003,
      vz: (Math.random() - 0.5) * 0.002,
    });
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));

  const particleMat = new THREE.PointsMaterial({
    color: 0xA78BFA,
    size: 0.04,
    transparent: true,
    opacity: 0.35,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  const glowNodes = [];
  const glowGeo = new THREE.SphereGeometry(0.2, 8, 8);
  for (let i = 0; i < 8; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: 0x818CF8, transparent: true, opacity: 0 });
    const mesh = new THREE.Mesh(glowGeo, mat);
    const idx = Math.floor(Math.random() * NODE_COUNT);
    mesh.position.copy(nodePositions[idx]);
    glowNodes.push({ mesh, idx, phase: Math.random() * Math.PI * 2 });
    group.add(mesh);
  }

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    group.rotation.y = t * 0.03 + mouseX * 0.15;
    group.rotation.x = mouseY * 0.08 + scrollY * 0.4;

    camera.position.z = 18 - scrollY * 6;
    camera.position.y = scrollY * 2;

    const posArr = particleGeo.attributes.position.array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posArr[i * 3] += pSpeeds[i].vx;
      posArr[i * 3 + 1] += pSpeeds[i].vy;
      posArr[i * 3 + 2] += pSpeeds[i].vz;
      if (Math.abs(posArr[i * 3]) > 15) pSpeeds[i].vx *= -1;
      if (Math.abs(posArr[i * 3 + 1]) > 15) pSpeeds[i].vy *= -1;
      if (Math.abs(posArr[i * 3 + 2]) > 10) pSpeeds[i].vz *= -1;
    }
    particleGeo.attributes.position.needsUpdate = true;

    for (const gn of glowNodes) {
      gn.phase += 0.02;
      const pulse = Math.sin(gn.phase) * 0.5 + 0.5;
      gn.mesh.material.opacity = pulse * 0.3;
      gn.mesh.scale.setScalar(1 + pulse * 0.8);
    }

    for (const edge of edgePositions) {
      const pulse = Math.sin(t * 0.8 + edge.a * 0.3) * 0.5 + 0.5;
      edge.line.material.opacity = 0.04 + pulse * 0.06;
    }

    renderer.render(scene, camera);
  }

  animate();
  canvas.classList.add('is-ready');
}
