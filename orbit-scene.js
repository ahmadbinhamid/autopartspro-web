import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('orbitCanvas');
if (canvas && window.innerWidth >= 768 && window.matchMedia('(prefers-reduced-motion: reduce)').matches === false) {
  const sectionEl = canvas.closest('section');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 1.5, 13);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const system = new THREE.Group();
  system.position.set(-2.5, 0, 0);
  system.rotation.x = 0.35;
  scene.add(system);

  // ─── CENTRAL STAR ───
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.9 })
  );
  system.add(star);

  const starGlow1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.75, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.25 })
  );
  system.add(starGlow1);

  const starGlow2 = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.1 })
  );
  system.add(starGlow2);

  // ─── ENERGY PULSE RINGS ───
  const pulseRings = [];
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.35, 0.4, 64),
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.2, side: THREE.DoubleSide })
    );
    ring.rotation.x = Math.PI / 2;
    ring.userData = { phase: i * (Math.PI * 2 / 3) };
    system.add(ring);
    pulseRings.push(ring);
  }

  // ─── ORBITAL RINGS ───
  const orbitConfigs = [
    { radius: 2.2, eccentricity: 0.95, tiltY: 0, color: 0x60a5fa, opacity: 0.3, planetColor: 0x60a5fa, planetSize: 0.15, speed: 0.7 },
    { radius: 3.2, eccentricity: 0.9, tiltY: 0.5, color: 0x3b82f6, opacity: 0.25, planetColor: 0x3b82f6, planetSize: 0.22, speed: 0.45 },
    { radius: 4.2, eccentricity: 0.88, tiltY: 1.1, color: 0x93c5fd, opacity: 0.18, planetColor: 0x93c5fd, planetSize: 0.18, speed: 0.3 },
  ];

  const orbitMeshes = [];
  const orbitPlanets = [];

  orbitConfigs.forEach((cfg) => {
    // Orbit path
    const curve = new THREE.EllipseCurve(0, 0, cfg.radius, cfg.radius * cfg.eccentricity, 0, Math.PI * 2, false);
    const pts = curve.getPoints(128);
    const geo = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(p.x, 0, p.y)));
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({
      color: cfg.color, transparent: true, opacity: cfg.opacity
    }));
    line.rotation.y = cfg.tiltY;
    system.add(line);
    orbitMeshes.push(line);

    // Dashed echo ring
    const echo = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(
        new THREE.EllipseCurve(0, 0, cfg.radius + 0.12, cfg.radius * cfg.eccentricity + 0.12, 0, Math.PI * 2, false)
          .getPoints(128).map(p => new THREE.Vector3(p.x, 0, p.y))
      ),
      new THREE.LineDashedMaterial({ color: cfg.color, transparent: true, opacity: cfg.opacity * 0.4, dashSize: 0.2, gapSize: 0.2 })
    );
    echo.computeLineDistances();
    echo.rotation.y = cfg.tiltY;
    system.add(echo);

    // Planet
    const planetGroup = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(cfg.planetSize, 16, 16),
      new THREE.MeshBasicMaterial({ color: cfg.planetColor, transparent: true, opacity: 0.9 })
    );
    planetGroup.add(body);

    const pGlow = new THREE.Mesh(
      new THREE.SphereGeometry(cfg.planetSize * 2.2, 16, 16),
      new THREE.MeshBasicMaterial({ color: cfg.planetColor, transparent: true, opacity: 0.2 })
    );
    planetGroup.add(pGlow);

    const pGlow2 = new THREE.Mesh(
      new THREE.SphereGeometry(cfg.planetSize * 3.5, 16, 16),
      new THREE.MeshBasicMaterial({ color: cfg.planetColor, transparent: true, opacity: 0.07 })
    );
    planetGroup.add(pGlow2);

    system.add(planetGroup);
    orbitPlanets.push({ group: planetGroup, cfg, angle: Math.random() * Math.PI * 2 });
  });

  // Saturn ring on middle planet
  const miniRing = new THREE.Mesh(
    new THREE.RingGeometry(0.32, 0.5, 32),
    new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.2, side: THREE.DoubleSide })
  );
  miniRing.rotation.x = Math.PI / 2.8;
  orbitPlanets[1].group.add(miniRing);

  // ─── CONNECTION BEAMS (sun to planets) ───
  const beamLines = [];
  orbitPlanets.forEach((planet) => {
    const pts = [];
    for (let j = 0; j <= 12; j++) pts.push(new THREE.Vector3());
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.1 });
    const line = new THREE.Line(geo, mat);
    system.add(line);
    beamLines.push(line);
  });

  // ─── ORBIT TRAIL PARTICLES ───
  const trailCount = 50;
  const trailGeo = new THREE.BufferGeometry();
  const trailPos = new Float32Array(trailCount * 3);
  const trailData = [];
  for (let i = 0; i < trailCount; i++) {
    const oi = i % orbitConfigs.length;
    trailData.push({
      orbitIdx: oi,
      angle: Math.random() * Math.PI * 2,
      radOffset: (Math.random() - 0.5) * 0.25,
      yOffset: (Math.random() - 0.5) * 0.15
    });
  }
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
  const trailPoints = new THREE.Points(trailGeo, new THREE.PointsMaterial({
    color: 0x93c5fd, size: 0.05, transparent: true, opacity: 0.5, sizeAttenuation: true
  }));
  system.add(trailPoints);

  // ─── STAR FIELD ───
  const starCount = 80;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 20;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    starPos[i * 3 + 2] = -3 - Math.random() * 10;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
    color: 0xbfdbfe, size: 0.04, transparent: true, opacity: 0.4, sizeAttenuation: true
  })));

  const resize = () => {
    const rect = sectionEl.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    const baseZ = 13;
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

    // Star pulse
    const sp = 1 + Math.sin(t * 2.5) * 0.1;
    star.scale.set(sp, sp, sp);
    star.material.opacity = 0.8 + Math.sin(t * 2) * 0.1;
    starGlow1.scale.set(1 + Math.sin(t * 1.5) * 0.12, 1 + Math.sin(t * 1.5) * 0.12, 1 + Math.sin(t * 1.5) * 0.12);

    // Pulse rings
    pulseRings.forEach((ring) => {
      const phase = (t * 1.0 + ring.userData.phase) % (Math.PI * 2);
      const pt = phase / (Math.PI * 2);
      const scale = 1 + pt * 8;
      ring.scale.set(scale, scale, scale);
      ring.material.opacity = (1 - pt) * 0.2;
    });

    // Slow system rotation
    system.rotation.y = Math.sin(t * 0.1) * 0.15;

    // Planets orbit
    orbitPlanets.forEach((planet, i) => {
      planet.angle += planet.cfg.speed * 0.008;
      const cfg = orbitConfigs[i];
      const r = cfg.radius;
      const rY = r * cfg.eccentricity;

      const localX = Math.cos(planet.angle) * r;
      const localZ = Math.sin(planet.angle) * rY;

      const cosY = Math.cos(cfg.tiltY);
      const sinY = Math.sin(cfg.tiltY);
      const px = localX * cosY - localZ * sinY;
      const pz = localX * sinY + localZ * cosY;

      planet.group.position.set(px, 0, pz);

      const pulse = 1 + Math.sin(t * 3 + i * 2) * 0.12;
      planet.group.children[0].scale.set(pulse, pulse, pulse);

      // Beam from sun to planet
      const posAttr = beamLines[i].geometry.attributes.position;
      for (let j = 0; j <= 12; j++) {
        const bt = j / 12;
        const lift = Math.sin(bt * Math.PI) * 0.12;
        posAttr.setXYZ(j, px * bt, lift, pz * bt);
      }
      posAttr.needsUpdate = true;
      beamLines[i].material.opacity = 0.08 + Math.sin(t * 2 + i) * 0.04;
    });

    // Trail particles
    const tp = trailGeo.attributes.position.array;
    for (let i = 0; i < trailCount; i++) {
      const d = trailData[i];
      const cfg = orbitConfigs[d.orbitIdx];
      const planet = orbitPlanets[d.orbitIdx];
      d.angle += planet.cfg.speed * 0.006;
      const r = cfg.radius + d.radOffset;
      const rY = r * cfg.eccentricity;
      const lx = Math.cos(d.angle) * r;
      const lz = Math.sin(d.angle) * rY;
      const cosY = Math.cos(cfg.tiltY);
      const sinY = Math.sin(cfg.tiltY);
      tp[i * 3] = lx * cosY - lz * sinY;
      tp[i * 3 + 1] = d.yOffset;
      tp[i * 3 + 2] = lx * sinY + lz * cosY;
    }
    trailGeo.attributes.position.needsUpdate = true;

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
