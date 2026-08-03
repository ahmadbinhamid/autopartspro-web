(function() {
'use strict';

var canvas = document.getElementById('world');
if (!canvas || typeof THREE === 'undefined') return;

var isMobile = window.innerWidth < 768;

var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: !isMobile, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;

var scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.012);

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0, 30);

var ACCENT = 0x818CF8;
var BRIGHT = 0xA78BFA;
var RED    = 0xF87171;
var GREEN  = 0x34D399;
var DIM    = 0x2D3150;

// --- Stars ---
var STAR_COUNT = isMobile ? 600 : 1500;
var starGeo = new THREE.BufferGeometry();
var starPos = new Float32Array(STAR_COUNT * 3);
for (var i = 0; i < STAR_COUNT; i++) {
  starPos[i * 3]     = (Math.random() - 0.5) * 160;
  starPos[i * 3 + 1] = (Math.random() - 0.5) * 160;
  starPos[i * 3 + 2] = (Math.random() - 0.5) * 160;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
var stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
  color: 0x6366F1, size: 0.08, transparent: true, opacity: 0.5, sizeAttenuation: true
}));
scene.add(stars);

// --- Chaos particles ---
var CHAOS_COUNT = isMobile ? 100 : 300;
var chaosGeo = new THREE.BufferGeometry();
var chaosPositions = new Float32Array(CHAOS_COUNT * 3);
var chaosColors = new Float32Array(CHAOS_COUNT * 3);
var chaosBasePos = [];

for (var i = 0; i < CHAOS_COUNT; i++) {
  var cx = (Math.random() - 0.5) * 40;
  var cy = (Math.random() - 0.5) * 30;
  var cz = (Math.random() - 0.5) * 30;
  chaosPositions[i * 3] = cx;
  chaosPositions[i * 3 + 1] = cy;
  chaosPositions[i * 3 + 2] = cz;
  chaosBasePos.push({ x: cx, y: cy, z: cz });

  var isRed = Math.random() > 0.7;
  var col = new THREE.Color(isRed ? RED : DIM);
  chaosColors[i * 3]     = col.r;
  chaosColors[i * 3 + 1] = col.g;
  chaosColors[i * 3 + 2] = col.b;
}
chaosGeo.setAttribute('position', new THREE.BufferAttribute(chaosPositions, 3));
chaosGeo.setAttribute('color', new THREE.BufferAttribute(chaosColors, 3));

var chaosParticles = new THREE.Points(chaosGeo, new THREE.PointsMaterial({
  size: 0.12, vertexColors: true, transparent: true, opacity: 0.8, sizeAttenuation: true
}));
scene.add(chaosParticles);

// --- Core ---
var coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
var coreMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 });
var core = new THREE.Mesh(coreGeo, coreMat);
scene.add(core);

var coreGlowGeo = new THREE.IcosahedronGeometry(2.0, 2);
var coreGlowMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0, wireframe: true });
var coreGlow = new THREE.Mesh(coreGlowGeo, coreGlowMat);
scene.add(coreGlow);

var coreBloomGeo = new THREE.SphereGeometry(3.0, 32, 32);
var coreBloomMat = new THREE.MeshBasicMaterial({
  color: ACCENT, transparent: true, opacity: 0,
  blending: THREE.AdditiveBlending, depthWrite: false
});
var coreBloom = new THREE.Mesh(coreBloomGeo, coreBloomMat);
scene.add(coreBloom);

// --- Marketplace nodes ---
var mpData = [
  { name: 'eBay',        color: 0xE53238, angle: 0 },
  { name: 'Amazon',      color: 0xFF9900, angle: Math.PI * 0.4 },
  { name: 'Shopify',     color: 0x96BF48, angle: Math.PI * 0.8 },
  { name: 'WooCommerce', color: 0x7B51AD, angle: Math.PI * 1.2 },
  { name: 'Gumtree',     color: 0x72EF36, angle: Math.PI * 1.6 },
];

var MP_RADIUS = 8;
var mpNodeGeo = new THREE.SphereGeometry(0.4, 16, 16);
var mpNodes = [];

mpData.forEach(function(mp) {
  var mat = new THREE.MeshBasicMaterial({ color: mp.color, transparent: true, opacity: 0 });
  var mesh = new THREE.Mesh(mpNodeGeo, mat);
  var px = Math.cos(mp.angle) * MP_RADIUS;
  var pz = Math.sin(mp.angle) * MP_RADIUS;
  mesh.position.set(px, 0, pz);
  scene.add(mesh);

  var ringGeo = new THREE.RingGeometry(0.6, 0.8, 32);
  var ringMat = new THREE.MeshBasicMaterial({ color: mp.color, transparent: true, opacity: 0, side: THREE.DoubleSide });
  var ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.copy(mesh.position);
  ring.lookAt(0, 0, 0);
  scene.add(ring);

  var glowGeo = new THREE.SphereGeometry(1.0, 16, 16);
  var glowMat = new THREE.MeshBasicMaterial({
    color: mp.color, transparent: true, opacity: 0,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  var glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.copy(mesh.position);
  scene.add(glow);

  mpNodes.push({ mesh: mesh, ring: ring, glow: glow, mat: mat, ringMat: ringMat, glowMat: glowMat, angle: mp.angle });
});

// --- Beams ---
var beams = [];
mpNodes.forEach(function(node) {
  var pts = [new THREE.Vector3(0, 0, 0), node.mesh.position.clone()];
  var geo = new THREE.BufferGeometry().setFromPoints(pts);
  var mat = new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 });
  var line = new THREE.Line(geo, mat);
  scene.add(line);
  beams.push(line);
});

// --- Data streams ---
var STREAM_COUNT = isMobile ? 60 : 150;
var streamGeo = new THREE.BufferGeometry();
var streamPos = new Float32Array(STREAM_COUNT * 3);
var streamData = [];

for (var i = 0; i < STREAM_COUNT; i++) {
  var ni = i % mpNodes.length;
  var tgt = mpNodes[ni];
  var st = Math.random();
  streamPos[i * 3]     = tgt.mesh.position.x * st;
  streamPos[i * 3 + 1] = tgt.mesh.position.y * st;
  streamPos[i * 3 + 2] = tgt.mesh.position.z * st;
  streamData.push({ t: st, speed: 0.003 + Math.random() * 0.005, node: ni });
}
streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPos, 3));

var streamParticles = new THREE.Points(streamGeo, new THREE.PointsMaterial({
  color: BRIGHT, size: 0.06, transparent: true, opacity: 0, sizeAttenuation: true,
  blending: THREE.AdditiveBlending, depthWrite: false
}));
scene.add(streamParticles);

// --- Order boxes ---
var ORDER_COUNT = isMobile ? 15 : 40;
var boxGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
var orderBoxes = [];
for (var i = 0; i < ORDER_COUNT; i++) {
  var omat = new THREE.MeshBasicMaterial({ color: GREEN, transparent: true, opacity: 0 });
  var omesh = new THREE.Mesh(boxGeo, omat);
  var oangle = (i / ORDER_COUNT) * Math.PI * 2;
  var or = 3 + Math.random() * 6;
  omesh.position.set(Math.cos(oangle) * or, (Math.random() - 0.5) * 4, Math.sin(oangle) * or);
  omesh.userData = { angle: oangle, r: or, speed: 0.001 + Math.random() * 0.002, yOff: Math.random() * Math.PI * 2 };
  scene.add(omesh);
  orderBoxes.push(omesh);
}

// --- Analytics bars ---
var BAR_COUNT = 10;
var barGroup = new THREE.Group();
barGroup.position.set(-6, -2, 0);
barGroup.rotation.y = 0.3;
var barMeshes = [];
for (var i = 0; i < BAR_COUNT; i++) {
  var bh = 0.5 + Math.random() * 3;
  var bgeo = new THREE.BoxGeometry(0.4, bh, 0.4);
  var bmat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 });
  var bmesh = new THREE.Mesh(bgeo, bmat);
  bmesh.position.set(i * 0.7 - (BAR_COUNT * 0.35), bh / 2, 0);
  bmesh.userData = { targetH: bh };
  barGroup.add(bmesh);
  barMeshes.push(bmesh);
}
scene.add(barGroup);

// --- Orbit ring ---
var orbitRingGeo = new THREE.TorusGeometry(MP_RADIUS, 0.03, 8, 128);
var orbitRingMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 });
var orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
orbitRing.rotation.x = Math.PI / 2;
scene.add(orbitRing);

// ============================================================
// SCROLL
// ============================================================

var scrollProgress = 0;
var panels = document.querySelectorAll('.panel');
var progressBar = document.getElementById('progressBar');

var SCENES = [
  { id: 'hero',         start: 0,    end: 0.08  },
  { id: 'chaos',        start: 0.08, end: 0.17  },
  { id: 'chaos-stats',  start: 0.17, end: 0.25  },
  { id: 'solution',     start: 0.25, end: 0.35  },
  { id: 'sync',         start: 0.35, end: 0.45  },
  { id: 'orders',       start: 0.45, end: 0.55  },
  { id: 'analytics',    start: 0.55, end: 0.65  },
  { id: 'integrations', start: 0.65, end: 0.75  },
  { id: 'scale',        start: 0.75, end: 0.83  },
  { id: 'testimonial',  start: 0.83, end: 0.91  },
  { id: 'cta',          start: 0.91, end: 1.0   },
];

function getPanelOpacity(sceneId) {
  var s = null;
  for (var j = 0; j < SCENES.length; j++) {
    if (SCENES[j].id === sceneId) { s = SCENES[j]; break; }
  }
  if (!s) return 0;
  if (scrollProgress < s.start - 0.001 || scrollProgress > s.end + 0.001) return 0;
  if (sceneId === 'hero' && scrollProgress <= s.start + 0.015) return 1;
  var fadeIn = 0.015;
  var fadeOut = 0.015;
  var inP = Math.min((scrollProgress - s.start) / fadeIn, 1);
  var outP = Math.min((s.end - scrollProgress) / fadeOut, 1);
  return Math.min(inP, outP);
}

function getSceneProgress(sceneId) {
  var s = null;
  for (var j = 0; j < SCENES.length; j++) {
    if (SCENES[j].id === sceneId) { s = SCENES[j]; break; }
  }
  if (!s) return 0;
  return Math.max(0, Math.min(1, (scrollProgress - s.start) / (s.end - s.start)));
}

var mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', function(e) {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

var spacer = document.getElementById('scrollSpacer');
window.addEventListener('scroll', function() {
  var max = spacer.offsetHeight - window.innerHeight;
  scrollProgress = Math.max(0, Math.min(1, window.scrollY / max));
  if (progressBar) progressBar.style.width = (scrollProgress * 100) + '%';
});

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================================
// CAMERA
// ============================================================

function lerpV(a, b, t) { return a + (b - a) * t; }
function ss(t) { return t * t * (3 - 2 * t); }

function updateCamera(p) {
  var x = 0, y = 0, z = 30;

  if (p < 0.08) {
    var s = p / 0.08;
    z = lerpV(30, 22, ss(s));
    y = lerpV(2, 0, s);
  } else if (p < 0.25) {
    var s = (p - 0.08) / 0.17;
    z = lerpV(22, 16, ss(s));
    x = Math.sin(s * Math.PI * 0.5) * 8;
    y = lerpV(0, 3, ss(s));
  } else if (p < 0.35) {
    var s = (p - 0.25) / 0.1;
    x = lerpV(8, 0, ss(s));
    y = lerpV(3, 1, ss(s));
    z = lerpV(16, 10, ss(s));
  } else if (p < 0.45) {
    var s = (p - 0.35) / 0.1;
    z = lerpV(10, 18, ss(s));
    y = lerpV(1, 6, ss(s));
  } else if (p < 0.55) {
    var s = (p - 0.45) / 0.1;
    var a = s * Math.PI * 0.8 + Math.PI * 0.5;
    x = Math.cos(a) * 14;
    z = Math.sin(a) * 14;
    y = lerpV(6, 3, ss(s));
  } else if (p < 0.65) {
    var s = (p - 0.55) / 0.1;
    x = lerpV(0, -10, ss(s));
    z = lerpV(14, 8, ss(s));
    y = lerpV(3, 2, ss(s));
  } else if (p < 0.75) {
    var s = (p - 0.65) / 0.1;
    x = lerpV(-10, 0, ss(s));
    z = lerpV(8, 2, ss(s));
    y = lerpV(2, 16, ss(s));
  } else if (p < 0.83) {
    var s = (p - 0.75) / 0.08;
    y = lerpV(16, 4, ss(s));
    z = lerpV(2, 20, ss(s));
  } else if (p < 0.91) {
    var s = (p - 0.83) / 0.08;
    z = lerpV(20, 14, ss(s));
    y = lerpV(4, 1, ss(s));
  } else {
    var s = (p - 0.91) / 0.09;
    z = lerpV(14, 22, ss(s));
    y = lerpV(1, 3, ss(s));
  }

  x += mouseX * 0.5;
  y += mouseY * 0.3;
  camera.position.set(x, y, z);
  camera.lookAt(0, 0, 0);
}

// ============================================================
// LOOP
// ============================================================

var clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  var t = clock.getElapsedTime();
  var p = scrollProgress;

  updateCamera(p);

  panels.forEach(function(panel) {
    var sid = panel.dataset.scene;
    var op = getPanelOpacity(sid);
    panel.style.opacity = op;
    panel.style.pointerEvents = op > 0.3 ? 'auto' : 'none';
  });

  stars.rotation.y = t * 0.005 + p * 0.2;
  stars.rotation.x = t * 0.003;

  var chaosFade = p < 0.25 ? 1 : Math.max(0, 1 - (p - 0.25) / 0.1);
  chaosParticles.material.opacity = chaosFade * 0.8;
  if (chaosFade > 0) {
    var cArr = chaosGeo.attributes.position.array;
    for (var i = 0; i < CHAOS_COUNT; i++) {
      var b = chaosBasePos[i];
      cArr[i * 3]     = b.x + Math.sin(t * 0.5 + i * 0.1) * 0.3;
      cArr[i * 3 + 1] = b.y + Math.cos(t * 0.4 + i * 0.15) * 0.4;
      cArr[i * 3 + 2] = b.z + Math.sin(t * 0.3 + i * 0.2) * 0.2;
    }
    chaosGeo.attributes.position.needsUpdate = true;
  }

  var coreFade = p > 0.22 ? Math.min(1, (p - 0.22) / 0.08) : 0;
  coreMat.opacity = coreFade * 0.9;
  coreGlowMat.opacity = coreFade * 0.15;
  coreBloomMat.opacity = coreFade * 0.06;
  core.rotation.y = t * 0.3;
  core.rotation.x = t * 0.2;
  coreGlow.rotation.y = -t * 0.15;
  coreGlow.rotation.x = t * 0.1;
  var pulse = 1 + Math.sin(t * 2) * 0.05;
  core.scale.setScalar(pulse);
  coreGlow.scale.setScalar(pulse * 1.1);
  coreBloom.scale.setScalar(pulse * 1.3);

  var mpFade = p > 0.3 ? Math.min(1, (p - 0.3) / 0.1) : 0;
  for (var mi = 0; mi < mpNodes.length; mi++) {
    var nd = mpNodes[mi];
    nd.mat.opacity = mpFade * 0.9;
    nd.ringMat.opacity = mpFade * 0.3;
    nd.glowMat.opacity = mpFade * 0.08;
    if (p > 0.6) {
      var orbP = Math.min(1, (p - 0.6) / 0.15);
      var na = nd.angle + t * 0.2 * orbP;
      nd.mesh.position.x = Math.cos(na) * MP_RADIUS;
      nd.mesh.position.z = Math.sin(na) * MP_RADIUS;
      nd.ring.position.copy(nd.mesh.position);
      nd.glow.position.copy(nd.mesh.position);
    }
    nd.ring.rotation.z = t * 0.5;
    nd.ring.scale.setScalar(1 + Math.sin(t * 1.5 + mi) * 0.1);
  }

  var beamFade = p > 0.3 ? Math.min(1, (p - 0.3) / 0.08) : 0;
  for (var bi = 0; bi < beams.length; bi++) {
    beams[bi].material.opacity = beamFade * 0.5;
    var bpts = beams[bi].geometry.attributes.position.array;
    bpts[3] = mpNodes[bi].mesh.position.x;
    bpts[4] = mpNodes[bi].mesh.position.y;
    bpts[5] = mpNodes[bi].mesh.position.z;
    beams[bi].geometry.attributes.position.needsUpdate = true;
  }

  var stFade = p > 0.33 ? Math.min(1, (p - 0.33) / 0.08) : 0;
  streamParticles.material.opacity = stFade * 0.7;
  if (stFade > 0) {
    var sArr = streamGeo.attributes.position.array;
    for (var si = 0; si < STREAM_COUNT; si++) {
      var sd = streamData[si];
      sd.t += sd.speed;
      if (sd.t > 1) sd.t = 0;
      var sn = mpNodes[sd.node];
      sArr[si * 3]     = sn.mesh.position.x * sd.t;
      sArr[si * 3 + 1] = sn.mesh.position.y * sd.t + Math.sin(sd.t * Math.PI) * 0.5;
      sArr[si * 3 + 2] = sn.mesh.position.z * sd.t;
    }
    streamGeo.attributes.position.needsUpdate = true;
  }

  var oFade = (p > 0.43 && p < 0.58) ? Math.min(1, (p - 0.43) / 0.04, (0.58 - p) / 0.04) : 0;
  for (var oi = 0; oi < orderBoxes.length; oi++) {
    var ob = orderBoxes[oi];
    ob.material.opacity = oFade * 0.7;
    if (oFade > 0) {
      var ud = ob.userData;
      ud.angle += ud.speed;
      ob.position.x = Math.cos(ud.angle) * ud.r;
      ob.position.z = Math.sin(ud.angle) * ud.r;
      ob.position.y = Math.sin(t + ud.yOff) * 0.5;
      ob.rotation.x = t * 0.5;
      ob.rotation.y = t * 0.3;
    }
  }

  var bFade = (p > 0.53 && p < 0.68) ? Math.min(1, (p - 0.53) / 0.04, (0.68 - p) / 0.04) : 0;
  for (var bri = 0; bri < barMeshes.length; bri++) {
    var bar = barMeshes[bri];
    bar.material.opacity = bFade * 0.7;
    if (bFade > 0) {
      var gp = getSceneProgress('analytics');
      var bh = bar.userData.targetH * ss(Math.min(1, gp * 2));
      bar.scale.y = Math.max(0.01, bh / bar.userData.targetH);
      bar.position.y = (bar.userData.targetH * bar.scale.y) / 2;
    }
  }

  var rFade = p > 0.62 ? Math.min(1, (p - 0.62) / 0.05) * (p < 0.78 ? 1 : Math.max(0, 1 - (p - 0.78) / 0.05)) : 0;
  orbitRingMat.opacity = rFade * 0.4;
  orbitRing.rotation.z = t * 0.1;

  renderer.render(scene, camera);
}

animate();

})();
