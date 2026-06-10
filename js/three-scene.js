/* ============================================================
   APPLE TECH — Three.js 3D Background Scene
   Floating wireframe geometry, starfield, ambient glow
   ============================================================ */

import * as THREE from 'three';

class AntiGravityScene {
  constructor(container) {
    this.container = container;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.objects = [];
    this.clock = new THREE.Clock();
    this.init();
  }

  init() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x000000, 0.0008);

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    this.camera.position.set(0, 0, 30);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // Create elements
    this.createStarField();
    this.createFloatingGeometry();
    this.createAmbientGlow();

    // Events
    this.bindEvents();

    // Start
    this.animate();
  }

  createStarField() {
    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 500;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 500;
      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });

    this.stars = new THREE.Points(geometry, material);
    this.scene.add(this.stars);
  }

  createFloatingGeometry() {
    const geometries = [
      { geo: new THREE.IcosahedronGeometry(2, 0), pos: [-15, 8, -20], speed: 0.3 },
      { geo: new THREE.OctahedronGeometry(1.5, 0), pos: [12, -5, -15], speed: 0.4 },
      { geo: new THREE.TorusGeometry(2, 0.4, 8, 32), pos: [-8, -10, -25], speed: 0.2 },
      { geo: new THREE.TetrahedronGeometry(1.8, 0), pos: [18, 12, -30], speed: 0.35 },
      { geo: new THREE.IcosahedronGeometry(3, 1), pos: [0, -15, -40], speed: 0.15 },
      { geo: new THREE.DodecahedronGeometry(1.2, 0), pos: [-20, 5, -35], speed: 0.25 },
      { geo: new THREE.OctahedronGeometry(2, 0), pos: [22, -8, -22], speed: 0.3 },
      { geo: new THREE.TorusKnotGeometry(1.5, 0.3, 64, 8), pos: [-5, 18, -28], speed: 0.18 },
      { geo: new THREE.IcosahedronGeometry(1, 0), pos: [10, 15, -18], speed: 0.45 },
      { geo: new THREE.RingGeometry(1.5, 2.5, 32), pos: [-18, -12, -32], speed: 0.22 },
    ];

    geometries.forEach((item) => {
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.08 + Math.random() * 0.06,
      });

      const mesh = new THREE.Mesh(item.geo, material);
      mesh.position.set(...item.pos);
      mesh.userData.speed = item.speed;
      mesh.userData.initialPos = { x: item.pos[0], y: item.pos[1], z: item.pos[2] };
      mesh.userData.rotSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.005,
      };
      mesh.userData.floatOffset = Math.random() * Math.PI * 2;

      this.objects.push(mesh);
      this.scene.add(mesh);
    });

    // Add edge-highlighted versions for key shapes
    [0, 2, 7].forEach(idx => {
      const obj = this.objects[idx];
      const edges = new THREE.EdgesGeometry(obj.geometry);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x0071E3,
        transparent: true,
        opacity: 0.12,
      });
      const line = new THREE.LineSegments(edges, lineMat);
      obj.add(line);
    });
  }

  createAmbientGlow() {
    // Central glow sphere
    const glowGeo = new THREE.SphereGeometry(8, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x0071E3,
      transparent: true,
      opacity: 0.02,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.set(0, 0, -20);
    this.scene.add(glow);

    // Secondary glow
    const glow2Geo = new THREE.SphereGeometry(15, 32, 32);
    const glow2Mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.008,
      side: THREE.BackSide,
    });
    const glow2 = new THREE.Mesh(glow2Geo, glow2Mat);
    glow2.position.set(0, 0, -30);
    this.scene.add(glow2);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsed = this.clock.getElapsedTime();

    // Smooth mouse follow
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.02;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.02;

    // Camera subtle movement
    this.camera.position.x = this.mouseX * 3;
    this.camera.position.y = -this.mouseY * 2;
    this.camera.lookAt(0, 0, -10);

    // Stars slow rotation
    if (this.stars) {
      this.stars.rotation.y = elapsed * 0.02;
      this.stars.rotation.x = elapsed * 0.01;
    }

    // Floating geometry
    this.objects.forEach((obj) => {
      const { speed, initialPos, rotSpeed, floatOffset } = obj.userData;

      // Gentle floating motion
      obj.position.y = initialPos.y + Math.sin(elapsed * speed + floatOffset) * 3;
      obj.position.x = initialPos.x + Math.cos(elapsed * speed * 0.7 + floatOffset) * 1.5;

      // Rotation
      obj.rotation.x += rotSpeed.x;
      obj.rotation.y += rotSpeed.y;
      obj.rotation.z += rotSpeed.z;

      // Mouse influence (depth-based)
      const depthFactor = Math.abs(obj.position.z) / 40;
      obj.position.x += this.mouseX * depthFactor * 0.5;
      obj.position.y += -this.mouseY * depthFactor * 0.3;
    });

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.renderer.dispose();
    window.removeEventListener('resize', this.onResize);
  }
}

// Initialize when DOM is ready
function initThreeScene() {
  const container = document.querySelector('.three-canvas');
  if (container) {
    new AntiGravityScene(container);
  }
}

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThreeScene);
} else {
  initThreeScene();
}

export { AntiGravityScene };
