import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/**
 * SphereScene
 * 
 * A three.js scene featuring an interactive sphere with particles.
 */
class SphereScene {
  constructor(container, width, height) {
    // DOM container
    this.container = container;
    
    // Dimensions
    this.width = width;
    this.height = height;
    
    // Three.js objects
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.composer = null;
    
    // Scene objects
    this.mainSphere = null;
    this.particles = [];
    
    // Interaction tracking
    this.isActive = true;
    this.isDragging = false;
    this.lastMousePosition = { x: 0, y: 0 };
    this.autoRotate = true;
    
    // Callback function
    this.onLoaded = null;
    
    // Textures
    this.normalMap = null;
  }
  
  init() {
    this.initScene();
    this.initRenderer();
    this.initCamera();
    this.initLights();
    this.initEffects();
    
    // Load textures then create objects
    this.loadTextures().then(() => {
      this.createObjects();
      this.addEventListeners();
      this.animate();
      
      // Notify when loaded
      if (this.onLoaded) {
        this.onLoaded();
      }
    });
  }
  
  initScene() {
    this.scene = new THREE.Scene();
  }
  
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x0F172A, 1);
    this.container.appendChild(this.renderer.domElement);
  }
  
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 0, 8);
    this.camera.lookAt(0, 0, 0);
  }
  
  initLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);
    
    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    this.scene.add(directionalLight);
    
    // Secondary blue light for accent
    const blueLight = new THREE.DirectionalLight(0x6366F1, 0.5);
    blueLight.position.set(-10, -10, -5);
    this.scene.add(blueLight);
  }
  
  initEffects() {
    // Set up the render pass
    const renderPass = new RenderPass(this.scene, this.camera);
    
    // Set up the bloom pass
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.width, this.height),
      0.5,    // strength
      0.4,    // radius
      0.9     // threshold
    );
    
    // Create composer with passes
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderPass);
    this.composer.addPass(bloomPass);
  }
  
  async loadTextures() {
    return new Promise((resolve) => {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        '/assets/textures/normal-map.jpg',
        (texture) => {
          this.normalMap = texture;
          resolve();
        },
        undefined,
        (error) => {
          console.error('Error loading texture:', error);
          // Proceed without the texture
          resolve();
        }
      );
    });
  }
  
  createObjects() {
    // Create main sphere
    this.createMainSphere();
    
    // Create particles
    this.createParticles();
    
    // Add stars to the scene
    this.createStars();
  }
  
  createMainSphere() {
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Create shader material for the main sphere
    const material = new THREE.MeshStandardMaterial({
      color: 0x6366F1,      // Indigo
      metalness: 0.7,
      roughness: 0.2,
      normalMap: this.normalMap,
      normalScale: new THREE.Vector2(0.3, 0.3),
    });
    
    this.mainSphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.mainSphere);
  }
  
  createParticles() {
    // Theme colors for particles
    const particleColors = [
      0x6366F1,  // Primary (Indigo)
      0x818CF8,  // Primary light
      0xEC4899,  // Secondary (Pink)
      0xF472B6   // Secondary light
    ];
    
    // Create 15 smaller particle spheres
    for (let i = 0; i < 15; i++) {
      const radius = Math.random() * 0.2 + 0.05;
      const geometry = new THREE.SphereGeometry(radius, 8, 8);
      
      // Get random color from theme colors
      const colorIndex = Math.floor(Math.random() * particleColors.length);
      const color = particleColors[colorIndex];
      
      const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.7
      });
      
      const particle = new THREE.Mesh(geometry, material);
      
      // Random position in a sphere around the main sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = Math.random() * 8 + 3;
      
      particle.position.x = r * Math.sin(phi) * Math.cos(theta);
      particle.position.y = r * Math.sin(phi) * Math.sin(theta);
      particle.position.z = r * Math.cos(phi);
      
      // Store additional animation data
      particle.userData = {
        speed: Math.random() * 0.3 + 0.1,
        offset: Math.random() * 100,
        originalPosition: particle.position.clone()
      };
      
      this.particles.push(particle);
      this.scene.add(particle);
    }
  }
  
  createStars() {
    // Create a geometry for all stars
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    
    // Fill positions and sizes arrays with random values
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Random position in a larger sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = Math.random() * 50 + 20;
      
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);
      
      sizes[i] = Math.random() * 2; // Random size
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create material for the stars
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xEC4899, // Secondary pink color
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      size: 0.5
    });
    
    // Create and add the stars to the scene
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    this.scene.add(stars);
  }
  
  addEventListeners() {
    const canvas = this.renderer.domElement;
    
    // Mouse down event
    canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMousePosition.x = e.clientX;
      this.lastMousePosition.y = e.clientY;
      this.autoRotate = false;
    });
    
    // Touch start event
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.lastMousePosition.x = e.touches[0].clientX;
        this.lastMousePosition.y = e.touches[0].clientY;
        this.autoRotate = false;
      }
    });
    
    // Mouse move event for rotation
    canvas.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      
      const deltaX = e.clientX - this.lastMousePosition.x;
      const deltaY = e.clientY - this.lastMousePosition.y;
      
      this.mainSphere.rotation.y += deltaX * 0.01;
      this.mainSphere.rotation.x += deltaY * 0.01;
      
      this.lastMousePosition.x = e.clientX;
      this.lastMousePosition.y = e.clientY;
    });
    
    // Touch move event
    canvas.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      
      const deltaX = e.touches[0].clientX - this.lastMousePosition.x;
      const deltaY = e.touches[0].clientY - this.lastMousePosition.y;
      
      this.mainSphere.rotation.y += deltaX * 0.01;
      this.mainSphere.rotation.x += deltaY * 0.01;
      
      this.lastMousePosition.x = e.touches[0].clientX;
      this.lastMousePosition.y = e.touches[0].clientY;
    });
    
    // Mouse up event
    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      // Resume auto-rotation after 2 seconds of inactivity
      setTimeout(() => {
        if (!this.isDragging) {
          this.autoRotate = true;
        }
      }, 2000);
    });
    
    // Touch end event
    window.addEventListener('touchend', () => {
      this.isDragging = false;
      // Resume auto-rotation after 2 seconds of inactivity
      setTimeout(() => {
        if (!this.isDragging) {
          this.autoRotate = true;
        }
      }, 2000);
    });
    
    // Mouse leave event
    canvas.addEventListener('mouseleave', () => {
      this.isDragging = false;
    });
  }
  
  animate() {
    if (!this.isActive) return;
    
    requestAnimationFrame(this.animate.bind(this));
    
    // Animate main sphere (slow auto-rotation if not being dragged)
    if (this.autoRotate) {
      this.mainSphere.rotation.y += 0.001;
      
      // Subtle wobble
      this.mainSphere.rotation.x = Math.sin(Date.now() * 0.0002) * 0.1;
    }
    
    // Animate particles
    this.particles.forEach(particle => {
      const { speed, offset, originalPosition } = particle.userData;
      const time = Date.now() * 0.001 * speed + offset;
      
      // Update position with orbital motion
      particle.position.x = originalPosition.x + Math.sin(time) * 0.3;
      particle.position.y = originalPosition.y + Math.cos(time * 0.7) * 0.2;
      particle.position.z = originalPosition.z + Math.sin(time * 0.5) * 0.3;
      
      // Rotate particle
      particle.rotation.x = time * 0.5;
      particle.rotation.y = time * 0.3;
    });
    
    // Render scene with composer for effects
    this.composer.render();
  }
  
  resize(width, height) {
    this.width = width;
    this.height = height;
    
    // Update camera
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    // Update renderer and composer
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);
  }
  
  dispose() {
    this.isActive = false;
    
    // Dispose geometries and materials for main sphere
    if (this.mainSphere) {
      this.mainSphere.geometry.dispose();
      this.mainSphere.material.dispose();
    }
    
    // Dispose particles
    this.particles.forEach(particle => {
      particle.geometry.dispose();
      particle.material.dispose();
    });
    
    // Dispose textures
    if (this.normalMap) {
      this.normalMap.dispose();
    }
    
    // Remove event listeners from canvas
    const canvas = this.renderer.domElement;
    // ... (would need to specifically remove the event listeners added in addEventListeners)
    
    // Remove the canvas from the container
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

export default SphereScene;
