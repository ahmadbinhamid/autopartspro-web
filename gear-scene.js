import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('gearCanvas');
if (canvas && window.innerWidth >= 768 && window.matchMedia('(prefers-reduced-motion: reduce)').matches === false) {
  const sectionEl = canvas.closest('section');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 2, 14);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const system = new THREE.Group();
  system.position.set(2, 0, 0);
  system.rotation.x = 0.4;
  system.rotation.z = -0.1;
  scene.add(system);

  // ─── BINARY STAR SYSTEM (two central stars) ───
  const star1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.9 })
  );
  star1.position.set(-0.4, 0, 0);
  system.add(star1);

  const star1Glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.2 })
  );
  star1Glow.position.copy(star1.position);
  system.add(star1Glow);

  const star2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.85 })
  );
  star2.position.set(0.4, 0, 0);
  system.add(star2);

  const star2Glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.18 })
  );
  star2Glow.position.copy(star2.position);
  system.add(star2Glow);

  // Shared glow
  const sharedGlow = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.08 })
  );
  system.add(sharedGlow);

  // ─── ACCRETION DISK (flat ring of particles around binary) ───
  const diskCount = 80;
  const diskGeo = new THREE.BufferGeometry();
  const diskPos = new Float32Array(diskCount * 3);
  const diskData = [];
  for (let i = 0; i < diskCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 1.5 + Math.random() * 1.2;
    diskPos[i * 3] = Math.cos(angle) * r;
    diskPos[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
    diskPos[i * 3 + 2] = Math.sin(angle) * r * 0.85;
    diskData.push({ angle, r, speed: 0.3 / r });
  }
  diskGeo.setAttribute('position', new THREE.BufferAttribute(diskPos, 3));
  const diskPoints = new THREE.Points(diskGeo, new THREE.PointsMaterial({
    color: 0x60a5fa, size: 0.06, transparent: true, opacity: 0.45, sizeAttenuation: true
  }));
  system.add(diskPoints);

  // Disk ring lines
  [1.6, 2.2, 2.7].forEach((r, i) => {
    const curve = new THREE.EllipseCurve(0, 0, r, r * 0.85, 0, Math.PI * 2, false);
    const pts = curve.getPoints(96);
    const geo = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(p.x, 0, p.y)));
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({
      color: 0x60a5fa, transparent: true, opacity: 0.12 - i * 0.03
    }));
    system.add(line);
  });

  // ─── OUTER ORBITAL RINGS WITH PLANETS ───
  const orbitConfigs = [
    { radius: 3.5, eccentricity: 0.9, tiltY: 0.3, color: 0x60a5fa, planetSize: 0.16, speed: 0.35 },
    { radius: 4.8, eccentricity: 0.88, tiltY: -0.4, color: 0x3b82f6, planetSize: 0.22, speed: 0.22 },
    { radius: 6.0, eccentricity: 0.92, tiltY: 0.7, color: 0x93c5fd, planetSize: 0.14, speed: 0.15 },
  ];

  const orbitPlanets = [];

  orbitConfigs.forEach((cfg) => {
    // Orbit path
    const curve = new THREE.EllipseCurve(0, 0, cfg.radius, cfg.radius * cfg.eccentricity, 0, Math.PI * 2, false);
    const pts = curve.getPoints(96);
    const geo = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(p.x, 0, p.y)));
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({
      color: cfg.color, transparent: true, opacity: 0.15
    }));
    line.rotation.y = cfg.tiltY;
    system.add(line);

    // Planet
    const planetGroup = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(cfg.planetSize, 16, 16),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.85 })
    );
    planetGroup.add(body);

    const pGlow = new THREE.Mesh(
      new THREE.SphereGeometry(cfg.planetSize * 2.2, 16, 16),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.2 })
    );
    planetGroup.add(pGlow);

    const pGlow2 = new THREE.Mesh(
      new THREE.SphereGeometry(cfg.planetSize * 3.5, 16, 16),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.06 })
    );
    planetGroup.add(pGlow2);

    system.add(planetGroup);
    orbitPlanets.push({ group: planetGroup, cfg, angle: Math.random() * Math.PI * 2 });
  });

  // ─── COMET TRAILS ───
  const TRAIL_LEN = 16;
  const cometTrails = [];
  orbitPlanets.forEach((planet) => {
    const positions = new Float32Array(TRAIL_LEN * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({
      color: planet.cfg.color, transparent: true, opacity: 0.12
    }));
    system.add(line);
    cometTrails.push({ line, history: [] });
  });

  // ─── STAR FIELD ───
  const starCount = 100;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  const starPhases = [];
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 24;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
    starPos[i * 3 + 2] = -4 - Math.random() * 12;
    starPhases.push(Math.random() * Math.PI * 2);
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    color: 0xbfdbfe, size: 0.05, transparent: true, opacity: 0.45, sizeAttenuation: true
  }));
  scene.add(stars);

  // ─── PULSE RINGS ───
  const pulseRings = [];
  for (let i = 0; i < 2; i++) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.25, 0.3, 48),
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.15, side: THREE.DoubleSide })
    );
    ring.rotation.x = Math.PI / 2;
    ring.userData = { phase: i * Math.PI };
    system.add(ring);
    pulseRings.push(ring);
  }

  const resize = () => {
    const rect = sectionEl.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    const baseZ = 14;
    if (rect.width < 900) {
      camera.position.z = baseZ + (900 - rect.width) * 0.008;
    } else {
      camera.position.z = baseZ;
    }
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  let raf;
  const clock = new THREE.Clock();

  const animate = () => {
    raf = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Binary star orbit around each other
    const binaryAngle = t * 0.5;
    const binaryR = 0.4;
    star1.position.set(-Math.cos(binaryAngle) * binaryR, 0, -Math.sin(binaryAngle) * binaryR * 0.3);
    star1Glow.position.copy(star1.position);
    star2.position.set(Math.cos(binaryAngle) * binaryR, 0, Math.sin(binaryAngle) * binaryR * 0.3);
    star2Glow.position.copy(star2.position);

    // Star pulses
    const p1 = 1 + Math.sin(t * 3) * 0.1;
    star1.scale.set(p1, p1, p1);
    const p2 = 1 + Math.sin(t * 3 + 1) * 0.1;
    star2.scale.set(p2, p2, p2);
    sharedGlow.scale.set(1 + Math.sin(t * 1.5) * 0.1, 1 + Math.sin(t * 1.5) * 0.1, 1 + Math.sin(t * 1.5) * 0.1);

    // Pulse rings
    pulseRings.forEach((ring) => {
      const phase = (t * 1.0 + ring.userData.phase) % (Math.PI * 2);
      const pt = phase / (Math.PI * 2);
      const scale = 1 + pt * 7;
      ring.scale.set(scale, scale, scale);
      ring.material.opacity = (1 - pt) * 0.15;
    });

    // Accretion disk rotation
    const dArr = diskGeo.attributes.position.array;
    for (let i = 0; i < diskCount; i++) {
      const d = diskData[i];
      d.angle += d.speed * 0.008;
      dArr[i * 3] = Math.cos(d.angle) * d.r;
      dArr[i * 3 + 2] = Math.sin(d.angle) * d.r * 0.85;
    }
    diskGeo.attributes.position.needsUpdate = true;

    // Slow system rotation
    system.rotation.y = Math.sin(t * 0.08) * 0.12;

    // Planets orbit
    orbitPlanets.forEach((planet, i) => {
      planet.angle += planet.cfg.speed * 0.008;
      const cfg = planet.cfg;
      const r = cfg.radius;
      const rE = r * cfg.eccentricity;

      const lx = Math.cos(planet.angle) * r;
      const lz = Math.sin(planet.angle) * rE;

      const cosY = Math.cos(cfg.tiltY);
      const sinY = Math.sin(cfg.tiltY);
      const px = lx * cosY - lz * sinY;
      const pz = lx * sinY + lz * cosY;

      planet.group.position.set(px, 0, pz);

      const pulse = 1 + Math.sin(t * 3 + i * 2) * 0.1;
      planet.group.children[0].scale.set(pulse, pulse, pulse);

      // Comet trail
      const trail = cometTrails[i];
      const pos = planet.group.position;
      trail.history.push(pos.x, pos.y, pos.z);
      if (trail.history.length > TRAIL_LEN * 3) trail.history.splice(0, 3);
      const arr = trail.line.geometry.attributes.position.array;
      for (let j = 0; j < TRAIL_LEN; j++) {
        const hi = j * 3;
        if (hi < trail.history.length) {
          arr[j * 3] = trail.history[hi];
          arr[j * 3 + 1] = trail.history[hi + 1];
          arr[j * 3 + 2] = trail.history[hi + 2];
        }
      }
      trail.line.geometry.attributes.position.needsUpdate = true;
    });

    // Star twinkle
    stars.material.opacity = 0.35 + Math.sin(t * 0.7) * 0.1;

    renderer.render(scene, camera);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!raf) animate();
        canvas.classList.add('is-ready');
      } else {
        cancelAnimationFrame(raf);
        raf = null;
      }
    });
  }, { threshold: 0.1 });
  io.observe(sectionEl);
}
