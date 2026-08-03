import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('intgCanvas');
if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

  const MARKETPLACES = [
    { name: 'eBay',            logo: 'assets/logo-ebay.svg',        color: '#E53238', wide: true },
    { name: 'Amazon',          logo: 'assets/logo-amazon.svg',      color: '#FF9900', wide: true },
    { name: 'Shopify',         logo: 'assets/logo-shopify.svg',     color: '#95BF47' },
    { name: 'Facebook',        logo: 'assets/logo-facebook.svg',    color: '#1877F2' },
    { name: 'Google Shopping', logo: 'assets/logo-google.svg',      color: '#4285F4' },
    { name: 'Meta Shops',      logo: 'assets/logo-meta.svg',        color: '#0081AA' },
    { name: 'WooCommerce',     logo: 'assets/logo-woocommerce.svg', color: '#7F54B3' },
    { name: 'Gumtree',         logo: 'assets/logo-gumtree.svg',     color: '#72B541' },
    { name: 'Custom Website',  logo: 'assets/icon-globe.svg',       color: '#2563EB' },
  ];

  const wrap = canvas.parentElement;
  const labelsContainer = document.getElementById('intgLabels');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0.8, 12);

  const isMobile = window.innerWidth < 600;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile });
  renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));

  // ─── HUB CORE ───
  // Inner glowing sphere
  const hubCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x2563EB, transparent: true, opacity: 0.85 })
  );
  scene.add(hubCore);

  // Outer glow shell
  const hubGlow = new THREE.Mesh(
    new THREE.SphereGeometry(1.0, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x60A5FA, transparent: true, opacity: 0.2 })
  );
  scene.add(hubGlow);

  // Second glow layer
  const hubGlow2 = new THREE.Mesh(
    new THREE.SphereGeometry(1.4, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x93C5FD, transparent: true, opacity: 0.08 })
  );
  scene.add(hubGlow2);

  // Wireframe icosahedron (slowly rotating)
  const hubWire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.2, 1),
    new THREE.MeshBasicMaterial({ color: 0x2563EB, wireframe: true, transparent: true, opacity: 0.22 })
  );
  scene.add(hubWire);

  // Outer wireframe shell
  const hubWire2 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.7, 0),
    new THREE.MeshBasicMaterial({ color: 0x93C5FD, wireframe: true, transparent: true, opacity: 0.1 })
  );
  scene.add(hubWire2);

  // Pulse rings (expanding rings from center)
  const pulseRings = [];
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.5, 0.55, 64),
      new THREE.MeshBasicMaterial({ color: 0x2563EB, transparent: true, opacity: 0.2, side: THREE.DoubleSide })
    );
    ring.rotation.x = Math.PI * 0.35;
    ring.userData = { phase: i * (Math.PI * 2 / 3) };
    scene.add(ring);
    pulseRings.push(ring);
  }

  // ─── ORBIT RINGS ───
  const tiltAngle = Math.PI * 0.35;
  const nodeRadius = 4.5;

  // Main orbit track
  const orbitCurve = new THREE.EllipseCurve(0, 0, nodeRadius, nodeRadius, 0, Math.PI * 2, false);
  const orbitPoints = orbitCurve.getPoints(128);
  const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints.map(p => new THREE.Vector3(p.x, p.y * Math.sin(tiltAngle), p.y * Math.cos(tiltAngle))));
  const orbitLine = new THREE.Line(orbitGeo, new THREE.LineBasicMaterial({ color: 0x2563EB, transparent: true, opacity: 0.25 }));
  scene.add(orbitLine);

  // Dashed secondary orbit
  const orbit2Points = new THREE.EllipseCurve(0, 0, nodeRadius + 0.3, nodeRadius + 0.3, 0, Math.PI * 2, false).getPoints(128);
  const orbit2Geo = new THREE.BufferGeometry().setFromPoints(orbit2Points.map(p => new THREE.Vector3(p.x, p.y * Math.sin(tiltAngle), p.y * Math.cos(tiltAngle))));
  const orbit2Line = new THREE.Line(orbit2Geo, new THREE.LineDashedMaterial({ color: 0x93C5FD, transparent: true, opacity: 0.15, dashSize: 0.3, gapSize: 0.3 }));
  orbit2Line.computeLineDistances();
  scene.add(orbit2Line);

  // ─── MARKETPLACE NODES ───
  const nodes = [];
  const speeds = [0.048, 0.072, 0.055, 0.085, 0.042, 0.065, 0.092, 0.052, 0.078];

  MARKETPLACES.forEach((mp, i) => {
    const angle = (i / MARKETPLACES.length) * Math.PI * 2;
    const col = new THREE.Color(mp.color);

    // Core sphere
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 16, 16),
      new THREE.MeshBasicMaterial({ color: col, transparent: true })
    );

    // Glow shell
    mesh.add(new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 16, 16),
      new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.25 })
    ));

    // Outer glow
    mesh.add(new THREE.Mesh(
      new THREE.SphereGeometry(0.65, 16, 16),
      new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.1 })
    ));

    scene.add(mesh);
    nodes.push({ mesh, angle, mp, speed: speeds[i], col });
  });

  // ─── CONNECTION BEAMS (curved) ───
  const beamCurves = [];
  nodes.forEach((node) => {
    const points = [];
    for (let j = 0; j <= 20; j++) points.push(new THREE.Vector3());
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: node.col, transparent: true, opacity: 0.35 });
    const line = new THREE.Line(geo, mat);
    scene.add(line);
    beamCurves.push(line);
  });

  // ─── BEAM PARTICLES ───
  const PARTICLES_PER_BEAM = isMobile ? 2 : 4;
  const beamParticles = [];
  nodes.forEach((node) => {
    for (let p = 0; p < PARTICLES_PER_BEAM; p++) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 8, 8),
        new THREE.MeshBasicMaterial({ color: node.col, transparent: true, opacity: 0 })
      );
      scene.add(mesh);
      beamParticles.push({
        mesh, node,
        t: p / PARTICLES_PER_BEAM,
        speed: 0.2 + p * 0.08,
        direction: p % 2 === 0 ? 1 : -1
      });
    }
  });

  // ─── ORBIT TRAIL PARTICLES ───
  const trailCount = isMobile ? 30 : 80;
  const trailGeo = new THREE.BufferGeometry();
  const trailPos = new Float32Array(trailCount * 3);
  const trailColors = new Float32Array(trailCount * 3);
  const trailData = [];
  for (let i = 0; i < trailCount; i++) {
    const nodeIdx = i % nodes.length;
    const col = nodes[nodeIdx].col;
    trailColors[i * 3] = col.r;
    trailColors[i * 3 + 1] = col.g;
    trailColors[i * 3 + 2] = col.b;
    trailData.push({ nodeIdx, offset: -(Math.random() * 0.4 + 0.05), radOffset: (Math.random() - 0.5) * 0.3 });
  }
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
  trailGeo.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));
  const trails = new THREE.Points(trailGeo, new THREE.PointsMaterial({
    size: 0.06, transparent: true, opacity: 0.7, vertexColors: true, sizeAttenuation: true
  }));
  scene.add(trails);

  // ─── AMBIENT SPARKLES ───
  const sparkleCount = isMobile ? 25 : 70;
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPos = new Float32Array(sparkleCount * 3);
  const sparkSpeeds = [];
  for (let i = 0; i < sparkleCount; i++) {
    sparkPos[i * 3] = (Math.random() - 0.5) * 18;
    sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
    sparkSpeeds.push({ y: 0.001 + Math.random() * 0.003, x: (Math.random() - 0.5) * 0.001 });
  }
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
  scene.add(new THREE.Points(sparkGeo, new THREE.PointsMaterial({
    color: 0x93C5FD, size: 0.06, transparent: true, opacity: 0.5, sizeAttenuation: true
  })));

  // ─── HTML LABELS ───
  const labelEls = [];
  MARKETPLACES.forEach((mp) => {
    const el = document.createElement('div');
    el.className = 'intg-label';
    el.innerHTML = `
      <div class="intg-label-icon" style="background:${mp.color}12;border:1px solid ${mp.color}25">
        <img src="${mp.logo}" alt="${mp.name}" class="${mp.wide ? 'intg-logo-wide' : ''}">
      </div>
      <span class="intg-label-name">${mp.name}</span>
      <span class="intg-label-dot"></span>
    `;
    labelsContainer.appendChild(el);
    labelEls.push(el);
  });

  // ─── RESIZE ───
  function resize() {
    const rect = wrap.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    renderer.setSize(rect.width, rect.height);
    camera.aspect = rect.width / rect.height;
    // Push camera back on narrow screens so the orbit fits
    const baseZ = 12;
    if (rect.width < 600) {
      camera.position.z = baseZ + (600 - rect.width) * 0.025;
    } else {
      camera.position.z = baseZ;
    }
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // ─── HELPERS ───
  const tempVec = new THREE.Vector3();
  function toScreen(pos) {
    tempVec.copy(pos).project(camera);
    const rect = wrap.getBoundingClientRect();
    return { x: (tempVec.x * 0.5 + 0.5) * rect.width, y: (-tempVec.y * 0.5 + 0.5) * rect.height };
  }

  let mouseX = 0, mouseY = 0;
  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });
  wrap.addEventListener('mouseleave', () => { mouseX = 0; mouseY = 0; });

  let activeNode = null;
  labelEls.forEach((el, i) => {
    el.addEventListener('mouseenter', () => { activeNode = i; });
    el.addEventListener('mouseleave', () => { activeNode = null; });
  });

  // ─── ANIMATE ───
  let time = 0;
  let raf;

  function animate() {
    raf = requestAnimationFrame(animate);
    time += 0.007;

    // Camera follow
    camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.025;
    camera.position.y += (0.8 - mouseY * 0.4 - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);

    // Hub animations
    const hubPulse = 1 + Math.sin(time * 3) * 0.12;
    hubCore.scale.set(hubPulse, hubPulse, hubPulse);
    hubCore.material.opacity = 0.5 + Math.sin(time * 2) * 0.15;

    const glowPulse = 1 + Math.sin(time * 1.5) * 0.15;
    hubGlow.scale.set(glowPulse, glowPulse, glowPulse);

    hubWire.rotation.y += 0.003;
    hubWire.rotation.x += 0.0015;
    hubWire2.rotation.y -= 0.002;
    hubWire2.rotation.z += 0.001;

    // Pulse rings expand outward
    pulseRings.forEach((ring) => {
      const phase = (time * 1.2 + ring.userData.phase) % (Math.PI * 2);
      const t = phase / (Math.PI * 2);
      const scale = 1 + t * 8;
      ring.scale.set(scale, scale, scale);
      ring.material.opacity = (1 - t) * 0.25;
    });

    // Update nodes
    nodes.forEach((node, i) => {
      node.angle += node.speed * 0.01;
      const a = node.angle;
      const x = Math.cos(a) * nodeRadius;
      const rawY = Math.sin(a) * nodeRadius;
      const y = rawY * Math.sin(tiltAngle);
      const z = rawY * Math.cos(tiltAngle);

      // Subtle bob
      const bob = Math.sin(time * 2 + i) * 0.08;
      node.mesh.position.set(x, y + bob, z);

      // Node pulse
      const nodePulse = 1 + Math.sin(time * 3 + i * 0.7) * 0.1;
      node.mesh.scale.set(nodePulse, nodePulse, nodePulse);

      // Curved beam from hub to node
      const posAttr = beamCurves[i].geometry.attributes.position;
      for (let j = 0; j <= 20; j++) {
        const t = j / 20;
        const lift = Math.sin(t * Math.PI) * 0.3;
        posAttr.setXYZ(j, x * t, (y + bob) * t + lift, z * t);
      }
      posAttr.needsUpdate = true;

      // Depth-based opacity
      const depthFade = THREE.MathUtils.mapLinear(z, -nodeRadius, nodeRadius, 0.45, 1.0);
      node.mesh.material.opacity = depthFade;
      node.mesh.children[0].material.opacity = depthFade * 0.25;
      node.mesh.children[1].material.opacity = depthFade * 0.1;

      // Beam opacity
      const isActive = activeNode === i;
      const beamBase = THREE.MathUtils.mapLinear(z, -nodeRadius, nodeRadius, 0.15, 0.45);
      beamCurves[i].material.opacity = isActive ? 0.75 : beamBase;

      // Label
      const sp = toScreen(node.mesh.position);
      const label = labelEls[i];
      label.style.left = sp.x + 'px';
      label.style.top = sp.y + 'px';
      label.style.opacity = Math.max(depthFade, 0.55);
      const ls = THREE.MathUtils.mapLinear(z, -nodeRadius, nodeRadius, 0.82, 1.0);
      label.style.transform = `translate(-50%, -50%) scale(${ls})`;
      label.style.zIndex = Math.round(z * 10) + 50;
    });

    // Beam particles (bidirectional flow)
    beamParticles.forEach((p) => {
      p.t = (p.t + p.speed * 0.004 * p.direction + 1) % 1;
      const absT = p.direction > 0 ? p.t : 1 - p.t;
      const nx = p.node.mesh.position.x;
      const ny = p.node.mesh.position.y;
      const nz = p.node.mesh.position.z;
      const lift = Math.sin(absT * Math.PI) * 0.3;
      p.mesh.position.set(nx * absT, ny * absT + lift, nz * absT);
      const pulse = Math.sin(absT * Math.PI);
      p.mesh.material.opacity = pulse * 0.9;
      const s = 0.6 + pulse * 0.6;
      p.mesh.scale.set(s, s, s);
    });

    // Trail particles (follow behind nodes)
    const tp = trails.geometry.attributes.position.array;
    for (let i = 0; i < trailCount; i++) {
      const d = trailData[i];
      const node = nodes[d.nodeIdx];
      const trailAngle = node.angle + d.offset;
      const tx = Math.cos(trailAngle) * (nodeRadius + d.radOffset);
      const rawTy = Math.sin(trailAngle) * (nodeRadius + d.radOffset);
      tp[i * 3] = tx;
      tp[i * 3 + 1] = rawTy * Math.sin(tiltAngle);
      tp[i * 3 + 2] = rawTy * Math.cos(tiltAngle);
    }
    trails.geometry.attributes.position.needsUpdate = true;

    // Sparkle drift
    const sArr = sparkGeo.attributes.position.array;
    for (let i = 0; i < sparkleCount; i++) {
      sArr[i * 3] += sparkSpeeds[i].x;
      sArr[i * 3 + 1] += sparkSpeeds[i].y;
      if (sArr[i * 3 + 1] > 7) sArr[i * 3 + 1] = -7;
    }
    sparkGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  // Start on visibility
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        resize();
        if (!raf) animate();
      } else {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
      }
    });
  }, { threshold: 0.1 });
  io.observe(wrap);
}
