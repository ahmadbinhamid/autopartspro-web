/* ============================================================
   scene3d.js — ambient WebGL layer (Three.js UMD global)

   One fixed, full-viewport scene that sits BEHIND every section for
   the whole page: a slowly undulating field of points with faint
   connecting lines, in the brand palette.

   Deliberately abstract — no mechanical parts — and deliberately
   quiet: it lives at z-index 0 under translucent section
   backgrounds, so it reads as depth behind the content rather than
   competing with it. If WebGL or Three is unavailable, or the
   visitor prefers reduced motion, nothing renders and the page is
   unchanged.
   ============================================================ */
(function () {
  'use strict';

  var canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;
  if (typeof THREE === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Bail on browsers without WebGL rather than throwing
  try {
    var probe = document.createElement('canvas');
    if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) return;
  } catch (e) { return; }

  /* Brand palette — keep in step with styles.css */
  var COL_INDIGO = 0x4F46E5;
  var COL_BLUE   = 0x2563EB;
  var COL_SKY    = 0x60A5FA;

  var DPR = Math.min(window.devicePixelRatio || 1, 1.75);
  var reduced = window.innerWidth < 769;      // lighter mesh on phones

  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power'
  });
  renderer.setPixelRatio(DPR);
  renderer.setClearAlpha(0);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400);
  camera.position.set(0, 0, 70);

  var rig = new THREE.Group();
  rig.rotation.x = -0.55;          // lay the field back like a floor
  scene.add(rig);

  /* ---------- point field laid out on a grid ---------- */
  var COLS = reduced ? 26 : 46;
  var ROWS = reduced ? 16 : 28;
  var SPACING = 4.2;

  var count = COLS * ROWS;
  var positions = new Float32Array(count * 3);
  var colors = new Float32Array(count * 3);
  var base = new Float32Array(count * 2);      // grid coords for the wave

  var cA = new THREE.Color(COL_INDIGO);
  var cB = new THREE.Color(COL_BLUE);
  var cC = new THREE.Color(COL_SKY);
  var tmpCol = new THREE.Color();

  var i = 0;
  for (var r = 0; r < ROWS; r++) {
    for (var c = 0; c < COLS; c++) {
      var x = (c - (COLS - 1) / 2) * SPACING;
      var z = (r - (ROWS - 1) / 2) * SPACING;
      positions[i * 3] = x;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = z;
      base[i * 2] = c;
      base[i * 2 + 1] = r;

      // Blend the three brand colours across the field
      var t = c / (COLS - 1);
      tmpCol.copy(t < 0.5 ? cA.clone().lerp(cB, t * 2) : cB.clone().lerp(cC, (t - 0.5) * 2));
      colors[i * 3] = tmpCol.r;
      colors[i * 3 + 1] = tmpCol.g;
      colors[i * 3 + 2] = tmpCol.b;
      i++;
    }
  }

  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  var points = new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.7,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    depthWrite: false
  }));
  rig.add(points);

  /* ---------- faint lines along each row ---------- */
  var lineIdx = [];
  for (var rr = 0; rr < ROWS; rr++) {
    for (var cc = 0; cc < COLS - 1; cc++) {
      var a = rr * COLS + cc;
      lineIdx.push(a, a + 1);
    }
  }
  var lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3)); // shared buffer
  lineGeo.setIndex(lineIdx);
  var lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
    color: COL_SKY,
    transparent: true,
    opacity: 0.1,
    depthWrite: false
  }));
  rig.add(lines);

  /* ---------- sizing ---------- */
  function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Pull back on narrow screens so the field still fills the frame
    camera.position.z = w < 769 ? 92 : w < 1300 ? 78 : 70;
  }
  resize();

  /* ---------- animate ---------- */
  var posAttr = geo.getAttribute('position');
  var scrollY = window.pageYOffset || 0;
  window.addEventListener('scroll', function () {
    scrollY = window.pageYOffset || 0;
  }, { passive: true });

  var start = performance.now();
  var running = true;

  // Stop drawing when the tab is hidden — no point burning GPU
  document.addEventListener('visibilitychange', function () {
    running = !document.hidden;
    if (running) requestAnimationFrame(tick);
  });

  function tick(now) {
    if (!running) return;
    var t = (now - start) * 0.00042;

    for (var k = 0; k < count; k++) {
      var gc = base[k * 2];
      var gr = base[k * 2 + 1];
      // two crossing waves keep it from looking like a regular pulse
      posAttr.array[k * 3 + 1] =
        Math.sin(gc * 0.34 + t) * 2.1 +
        Math.cos(gr * 0.29 - t * 0.85) * 1.7;
    }
    posAttr.needsUpdate = true;
    lineGeo.attributes.position.needsUpdate = true;

    // Drift, plus a slow parallax tied to page scroll
    rig.rotation.y = Math.sin(t * 0.16) * 0.16 + scrollY * 0.00012;
    rig.position.y = -6 + Math.sin(t * 0.2) * 1.2;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      DPR = Math.min(window.devicePixelRatio || 1, 1.75);
      renderer.setPixelRatio(DPR);
      resize();
    }, 150);
  }, { passive: true });

})();
