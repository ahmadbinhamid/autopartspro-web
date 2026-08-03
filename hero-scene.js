import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('heroCanvas');
if (canvas && window.innerWidth >= 768 && window.matchMedia('(prefers-reduced-motion: reduce)').matches === false) {
  const heroEl = document.querySelector('.hero');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  camera.position.set(0, 2, 14);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const system = new THREE.Group();
  scene.add(system);

  // ─── CENTRAL STAR (SUN) ───
  const sunCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.95 })
  );
  system.add(sunCore);

  const sunGlow1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.9, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.3 })
  );
  system.add(sunGlow1);

  const sunGlow2 = new THREE.Mesh(
    new THREE.SphereGeometry(1.3, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.12 })
  );
  system.add(sunGlow2);

  const sunGlow3 = new THREE.Mesh(
    new THREE.SphereGeometry(1.8, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xbfdbfe, transparent: true, opacity: 0.05 })
  );
  system.add(sunGlow3);

  // ─── ORBITAL RING PATHS ───
  const orbits = [
    { radius: 2.5, tiltX: 0.15, tiltZ: 0.05, color: 0x60a5fa, opacity: 0.2 },
    { radius: 3.8, tiltX: -0.1, tiltZ: 0.12, color: 0x3b82f6, opacity: 0.18 },
    { radius: 5.2, tiltX: 0.22, tiltZ: -0.08, color: 0x93c5fd, opacity: 0.15 },
    { radius: 6.8, tiltX: -0.05, tiltZ: 0.18, color: 0x60a5fa, opacity: 0.1 },
    { radius: 8.5, tiltX: 0.12, tiltZ: -0.15, color: 0xbfdbfe, opacity: 0.07 },
  ];

  const orbitLines = [];
  orbits.forEach((o) => {
    const curve = new THREE.EllipseCurve(0, 0, o.radius, o.radius * 0.92, 0, Math.PI * 2, false);
    const pts = curve.getPoints(128);
    const geo = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(p.x, 0, p.y)));
    const mat = new THREE.LineBasicMaterial({ color: o.color, transparent: true, opacity: o.opacity });
    const line = new THREE.Line(geo, mat);
    line.rotation.x = Math.PI / 2 + o.tiltX;
    line.rotation.z = o.tiltZ;
    system.add(line);
    orbitLines.push(line);
  });

  // ─── PLANETS ───
  const planetConfigs = [
    { orbitIdx: 0, size: 0.18, color: 0x60a5fa, glowColor: 0x93c5fd, speed: 0.6, startAngle: 0 },
    { orbitIdx: 1, size: 0.25, color: 0x3b82f6, glowColor: 0x60a5fa, speed: 0.4, startAngle: 1.2 },
    { orbitIdx: 1, size: 0.12, color: 0x93c5fd, glowColor: 0xbfdbfe, speed: 0.42, startAngle: 4.0 },
    { orbitIdx: 2, size: 0.3, color: 0x2563eb, glowColor: 0x3b82f6, speed: 0.28, startAngle: 2.5 },
    { orbitIdx: 3, size: 0.2, color: 0x60a5fa, glowColor: 0x93c5fd, speed: 0.18, startAngle: 0.8 },
    { orbitIdx: 3, size: 0.14, color: 0x93c5fd, glowColor: 0xbfdbfe, speed: 0.19, startAngle: 3.6 },
    { orbitIdx: 4, size: 0.22, color: 0x3b82f6, glowColor: 0x60a5fa, speed: 0.12, startAngle: 5.0 },
  ];

  const planets = [];
  planetConfigs.forEach((cfg) => {
    const orbit = orbits[cfg.orbitIdx];
    const group = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.SphereGeometry(cfg.size, 16, 16),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.9 })
    );
    group.add(body);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(cfg.size * 2, 16, 16),
      new THREE.MeshBasicMaterial({ color: cfg.glowColor, transparent: true, opacity: 0.2 })
    );
    group.add(glow);

    const glow2 = new THREE.Mesh(
      new THREE.SphereGeometry(cfg.size * 3.5, 16, 16),
      new THREE.MeshBasicMaterial({ color: cfg.glowColor, transparent: true, opacity: 0.06 })
    );
    group.add(glow2);

    system.add(group);
    planets.push({
      group, body, glow, orbit, cfg,
      angle: cfg.startAngle,
      tiltX: orbit.tiltX,
      tiltZ: orbit.tiltZ,
    });
  });

  // Saturn-like ring on the largest planet (index 3)
  const saturnRing = new THREE.Mesh(
    new THREE.RingGeometry(0.45, 0.7, 32),
    new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.25, side: THREE.DoubleSide })
  );
  saturnRing.rotation.x = Math.PI / 2.5;
  planets[3].group.add(saturnRing);

  // ─── COMET TRAILS ───
  const TRAIL_SEGMENTS = 20;
  const cometTrails = [];
  planets.forEach((planet, pi) => {
    if (pi > 4) return;
    const positions = new Float32Array(TRAIL_SEGMENTS * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: planet.cfg.glowColor, transparent: true, opacity: 0.15
    });
    const line = new THREE.Line(geo, mat);
    system.add(line);
    cometTrails.push({ line, planetIdx: pi, history: [] });
  });

  // ─── ORBIT DUST PARTICLES ───
  const dustCount = 120;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  const dustData = [];
  for (let i = 0; i < dustCount; i++) {
    const oi = i % orbits.length;
    const o = orbits[oi];
    const angle = Math.random() * Math.PI * 2;
    const r = o.radius + (Math.random() - 0.5) * 0.4;
    const rY = r * 0.92;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * rY;
    const cosT = Math.cos(o.tiltX);
    const sinT = Math.sin(o.tiltX);
    dustPos[i * 3] = x * Math.cos(o.tiltZ) - 0;
    dustPos[i * 3 + 1] = z * sinT;
    dustPos[i * 3 + 2] = z * cosT;
    dustData.push({ orbitIdx: oi, angle, speed: 0.02 + Math.random() * 0.04, radOffset: (Math.random() - 0.5) * 0.3 });
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustPoints = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0x93c5fd, size: 0.04, transparent: true, opacity: 0.5, sizeAttenuation: true
  }));
  system.add(dustPoints);

  // ─── STAR FIELD ───
  const starCount = 200;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  const starPhases = [];
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 40;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
    starPos[i * 3 + 2] = -5 - Math.random() * 20;
    starPhases.push(Math.random() * Math.PI * 2);
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    color: 0xbfdbfe, size: 0.06, transparent: true, opacity: 0.6, sizeAttenuation: true
  }));
  scene.add(stars);

  // ─── PULSE RINGS from sun ───
  const pulseRings = [];
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.3, 0.35, 64),
      new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.15, side: THREE.DoubleSide })
    );
    ring.rotation.x = Math.PI / 2;
    ring.userData = { phase: i * (Math.PI * 2 / 3) };
    system.add(ring);
    pulseRings.push(ring);
  }

  system.rotation.x = 0.3;
  system.position.set(0.5, -0.5, 0);

  let targetRotY = 0;
  let targetRotX = 0.3;
  let scrollProgress = 0;

  const resize = () => {
    const rect = heroEl.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    const baseZ = 14;
    if (rect.width < 900) {
      camera.position.z = baseZ + (900 - rect.width) * 0.01;
    } else {
      camera.position.z = baseZ;
    }
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('pointermove', (e) => {
    const rect = heroEl.getBoundingClientRect();
    if (e.clientY > rect.bottom) return;
    const px = (e.clientX / window.innerWidth) * 2 - 1;
    const py = (e.clientY / rect.height) * 2 - 1;
    targetRotY = px * 0.15;
    targetRotX = 0.3 + py * 0.08;
  });

  window.addEventListener('scroll', () => {
    const rect = heroEl.getBoundingClientRect();
    scrollProgress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
  }, { passive: true });

  let raf;
  let time = 0;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    time += 0.006;

    system.rotation.y += (targetRotY + scrollProgress * 0.8 - system.rotation.y) * 0.03;
    system.rotation.x += (targetRotX - system.rotation.x) * 0.03;
    system.rotation.y += 0.0006;

    // Sun pulse
    const sunPulse = 1 + Math.sin(time * 3) * 0.08;
    sunCore.scale.set(sunPulse, sunPulse, sunPulse);
    sunCore.material.opacity = 0.85 + Math.sin(time * 2) * 0.1;
    sunGlow1.scale.set(1 + Math.sin(time * 1.5) * 0.1, 1 + Math.sin(time * 1.5) * 0.1, 1 + Math.sin(time * 1.5) * 0.1);

    // Pulse rings
    pulseRings.forEach((ring) => {
      const phase = (time * 1.2 + ring.userData.phase) % (Math.PI * 2);
      const t = phase / (Math.PI * 2);
      const scale = 1 + t * 10;
      ring.scale.set(scale, scale, scale);
      ring.material.opacity = (1 - t) * 0.15;
    });

    // Planets orbit
    planets.forEach((p) => {
      p.angle += p.cfg.speed * 0.008;
      const r = p.orbit.radius;
      const rY = r * 0.92;
      const x = Math.cos(p.angle) * r;
      const z = Math.sin(p.angle) * rY;

      const cosT = Math.cos(p.tiltX);
      const sinT = Math.sin(p.tiltX);
      const cosZ = Math.cos(p.tiltZ);
      const sinZ = Math.sin(p.tiltZ);

      const px = x * cosZ;
      const py = z * sinT;
      const pz = z * cosT;

      p.group.position.set(px, py, pz);

      const pulse = 1 + Math.sin(time * 3 + p.cfg.startAngle) * 0.12;
      p.body.scale.set(pulse, pulse, pulse);
    });

    // Comet trails
    cometTrails.forEach((trail) => {
      const planet = planets[trail.planetIdx];
      const pos = planet.group.position;
      trail.history.push(pos.x, pos.y, pos.z);
      if (trail.history.length > TRAIL_SEGMENTS * 3) {
        trail.history.splice(0, 3);
      }
      const arr = trail.line.geometry.attributes.position.array;
      for (let i = 0; i < TRAIL_SEGMENTS; i++) {
        const hi = i * 3;
        if (hi < trail.history.length) {
          arr[i * 3] = trail.history[hi];
          arr[i * 3 + 1] = trail.history[hi + 1];
          arr[i * 3 + 2] = trail.history[hi + 2];
        }
      }
      trail.line.geometry.attributes.position.needsUpdate = true;
    });

    // Dust particles orbit
    const dArr = dustGeo.attributes.position.array;
    for (let i = 0; i < dustCount; i++) {
      const d = dustData[i];
      const o = orbits[d.orbitIdx];
      d.angle += d.speed * 0.008;
      const r = o.radius + d.radOffset;
      const rY = r * 0.92;
      const x = Math.cos(d.angle) * r;
      const z = Math.sin(d.angle) * rY;
      dArr[i * 3] = x * Math.cos(o.tiltZ);
      dArr[i * 3 + 1] = z * Math.sin(o.tiltX);
      dArr[i * 3 + 2] = z * Math.cos(o.tiltX);
    }
    dustGeo.attributes.position.needsUpdate = true;

    // Star twinkle
    stars.material.opacity = 0.5 + Math.sin(time * 0.8) * 0.15;

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
  }, { threshold: 0.05 });
  io.observe(heroEl);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(raf); raf = null; }
  });
}
