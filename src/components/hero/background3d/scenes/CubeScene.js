import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/**
 * CubeScene
 * 
 * An interactive 3D grid of cubes using three.js
 */
class CubeScene {
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
    this.cubeGroup = null;
    this.cubes = [];
    
    // Interaction tracking
    this.isActive = true;
    this.isDragging = false;
    this.lastMousePosition = { x: 0, y: 0 };
    this.autoRotate = true;
    
    // Mouse position tracking for hover effects
    this.mouse = new THREE.Vector2(0, 0);
    
    // Callback function
    this.onLoaded = null;
  }
  
  init() {
    this.initScene();
    this.initRenderer();
    this.initCamera();
    this.initLights();
    this.createObjects();
    this.initEffects();
    this.addEventListeners();
    this.animate();
    
    // Notify when loaded
    if (this.onLoaded) {
      this.onLoaded();
    }
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
    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 0, 15);
    this.camera.lookAt(0, 0, 0);
  }
  
  initLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambientLight);
    
    // Main point light
    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(10, 10, 10);
    this.scene.add(pointLight1);
    
    // Secondary point light
    const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
    pointLight2.position.set(-10, -10, -10);
    this.scene.add(pointLight2);
  }
  
  createObjects() {
    // Create a group to hold all cubes
    this.cubeGroup = new THREE.Group();
    this.scene.add(this.cubeGroup);
    
    // Create a 5x5 grid of cubes
    const dimensions = 5;
    const spacing = 2;
    const offset = (dimensions - 1) * spacing / 2;
    
    for (let i = 0; i < dimensions; i++) {
      for (let j = 0; j < dimensions; j++) {
        const x = i * spacing - offset;
        const y = j * spacing - offset;
        const size = 0.5 + Math.random() * 0.3; // Slightly randomize cube sizes
        
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshStandardMaterial({
          color: 0x6366F1, // Primary indigo color
          emissive: 0x6366F1,
          emissiveIntensity: 0.5,
          metalness: 0.8,
          roughness: 0.2
        });
        
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, 0);
        
        // Store row and column for color animation
        cube.userData = {
          row: i,
          col: j,
          originalSize: size,
          // Random phase offset for animation
          phaseOffset: (i + j) * 0.5
        };
        
        this.cubes.push(cube);
        this.cubeGroup.add(cube);
      }
    }
  }
  
  initEffects() {
    // Set up the render pass
    const renderPass = new RenderPass(this.scene, this.camera);
    
    // Set up the bloom pass
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.width, this.height),
      1.0,    // strength
      0.4,    // radius
      0.9     // threshold
    );
    
    // Create composer with passes
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderPass);
    this.composer.addPass(bloomPass);
  }
  
  addEventListeners() {
    const canvas = this.renderer.domElement;
    
    // Track mouse position for hover effects
    canvas.addEventListener('mousemove', (e) => {
      // Update normalized mouse coordinates (-1 to +1)
      this.mouse.x = (e.clientX / this.width) * 2 - 1;
      this.mouse.y = -(e.clientY / this.height) * 2 + 1;
    });
    
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
      
      this.cubeGroup.rotation.y += deltaX * 0.01;
      this.cubeGroup.rotation.x += deltaY * 0.01;
      
      this.lastMousePosition.x = e.clientX;
      this.lastMousePosition.y = e.clientY;
    });
    
    // Touch move event
    canvas.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      
      const deltaX = e.touches[0].clientX - this.lastMousePosition.x;
      const deltaY = e.touches[0].clientY - this.lastMousePosition.y;
      
      this.cubeGroup.rotation.y += deltaX * 0.01;
      this.cubeGroup.rotation.x += deltaY * 0.01;
      
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
    
    // Auto-rotate cube group if not being dragged
    if (this.autoRotate) {
      this.cubeGroup.rotation.y += 0.005;
      
      // Subtle wobble
      this.cubeGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.2;
    }
    
    // Follow mouse position for subtle movement when not dragging
    if (!this.isDragging) {
      // Smoothly move toward mouse position
      this.cubeGroup.position.x += (this.mouse.x * 2 - this.cubeGroup.position.x) * 0.05;
      this.cubeGroup.position.y += (this.mouse.y * 2 - this.cubeGroup.position.y) * 0.05;
    }
    
    // Animate individual cubes
    const time = Date.now() * 0.001;
    
    this.cubes.forEach(cube => {
      const { row, col, phaseOffset, originalSize } = cube.userData;
      
      // Calculate unique phase for this cube
      const phase = phaseOffset + time;
      
      // Pulse scale based on position and time
      const scale = 0.8 + Math.sin(phase) * 0.2;
      cube.scale.set(scale, scale, scale);
      
      // Update color based on position and time
      const hue = (0.1 * row + 0.1 * col + time * 0.1) % 1;
      const color = new THREE.Color().setHSL(hue, 0.7, 0.5);
      cube.material.color.copy(color);
      cube.material.emissive.copy(color).multiplyScalar(0.5);
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
    
    // Dispose geometries and materials for cubes
    this.cubes.forEach(cube => {
      cube.geometry.dispose();
      cube.material.dispose();
    });
    
    // Remove the canvas from the container
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

export default CubeScene;
