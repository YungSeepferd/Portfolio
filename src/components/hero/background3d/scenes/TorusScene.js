import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/**
 * TorusScene
 * 
 * A scene featuring multiple interactive torus rings.
 */
class TorusScene {
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
    this.torusGroup = null;
    this.tori = [];
    
    // Interaction tracking
    this.isActive = true;
    this.isDragging = false;
    this.lastMousePosition = { x: 0, y: 0 };
    this.targetTorus = null;
    
    // Mouse position tracking for hover effects
    this.mouse = new THREE.Vector2(0, 0);
    this.raycaster = new THREE.Raycaster();
    
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
    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
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
    // Create a group to hold all tori
    this.torusGroup = new THREE.Group();
    this.scene.add(this.torusGroup);
    
    // Theme colors for tori
    const torusColors = [
      0x6366F1,  // Primary (Indigo)
      0x818CF8,  // Primary light
      0xEC4899,  // Secondary (Pink)
      0xF472B6   // Secondary light
    ];
    
    // Create multiple tori with different parameters
    const torusConfigs = [
      { radius: 3, tubeRadius: 0.5, color: torusColors[0], speed: 1 },
      { radius: 5, tubeRadius: 0.3, color: torusColors[1], speed: 0.7 },
      { radius: 7, tubeRadius: 0.2, color: torusColors[2], speed: 0.5 }
    ];
    
    torusConfigs.forEach(config => {
      const geometry = new THREE.TorusGeometry(
        config.radius,
        config.tubeRadius,
        16,
        100
      );
      
      const material = new THREE.MeshStandardMaterial({
        color: config.color,
        emissive: config.color,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2
      });
      
      const torus = new THREE.Mesh(geometry, material);
      
      // Store additional animation data
      torus.userData = {
        speed: config.speed,
        rotationSpeed: config.speed,
        originalRotationSpeed: config.speed,
        // Each torus has its own rotation axis
        rotationAxis: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize()
      };
      
      this.tori.push(torus);
      this.torusGroup.add(torus);
    });
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
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      this.mouse.x = (e.clientX / this.width) * 2 - 1;
      this.mouse.y = -(e.clientY / this.height) * 2 + 1;
      
      // Use raycaster to detect hover over tori
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.tori);
      
      if (intersects.length > 0) {
        canvas.style.cursor = 'pointer';
      } else {
        canvas.style.cursor = 'default';
      }
    });
    
    // Mouse down event
    canvas.addEventListener('mousedown', (e) => {
      // Check if we're clicking on a specific torus
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.tori);
      
      if (intersects.length > 0) {
        this.targetTorus = intersects[0].object;
        // Increase rotation speed when clicked
        this.targetTorus.userData.rotationSpeed = this.targetTorus.userData.originalRotationSpeed * 3;
      } else {
        this.targetTorus = null;
      }
      
      this.isDragging = true;
      this.lastMousePosition.x = e.clientX;
      this.lastMousePosition.y = e.clientY;
    });
    
    // Touch start event
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.lastMousePosition.x = e.touches[0].clientX;
        this.lastMousePosition.y = e.touches[0].clientY;
      }
    });
    
    // Mouse move event for rotation
    canvas.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      
      const deltaX = e.clientX - this.lastMousePosition.x;
      const deltaY = e.clientY - this.lastMousePosition.y;
      
      // If we're targeting a specific torus, rotate just that one
      if (this.targetTorus) {
        this.targetTorus.rotation.y += deltaX * 0.05;
        this.targetTorus.rotation.x += deltaY * 0.05;
      } else {
        // Otherwise rotate the whole group
        this.torusGroup.rotation.y += deltaX * 0.01;
        this.torusGroup.rotation.x += deltaY * 0.01;
      }
      
      this.lastMousePosition.x = e.clientX;
      this.lastMousePosition.y = e.clientY;
    });
    
    // Touch move event
    canvas.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      
      const deltaX = e.touches[0].clientX - this.lastMousePosition.x;
      const deltaY = e.touches[0].clientY - this.lastMousePosition.y;
      
      this.torusGroup.rotation.y += deltaX * 0.01;
      this.torusGroup.rotation.x += deltaY * 0.01;
      
      this.lastMousePosition.x = e.touches[0].clientX;
      this.lastMousePosition.y = e.touches[0].clientY;
    });
    
    // Mouse up event
    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      this.targetTorus = null;
    });
    
    // Touch end event
    window.addEventListener('touchend', () => {
      this.isDragging = false;
      this.targetTorus = null;
    });
    
    // Mouse leave event
    canvas.addEventListener('mouseleave', () => {
      this.isDragging = false;
      this.targetTorus = null;
    });
  }
  
  animate() {
    if (!this.isActive) return;
    
    requestAnimationFrame(this.animate.bind(this));
    
    // Follow mouse position for subtle movement when not dragging
    if (!this.isDragging) {
      // Smoothly move toward mouse position
      this.torusGroup.position.x += (this.mouse.x * 5 - this.torusGroup.position.x) * 0.05;
      this.torusGroup.position.y += (this.mouse.y * 5 - this.torusGroup.position.y) * 0.05;
    }
    
    // Animate individual tori
    this.tori.forEach(torus => {
      const { rotationSpeed, rotationAxis, originalRotationSpeed } = torus.userData;
      
      // Rotate around its own axis
      torus.rotation.x += rotationSpeed * 0.01 * rotationAxis.x;
      torus.rotation.y += rotationSpeed * 0.01 * rotationAxis.y;
      torus.rotation.z += rotationSpeed * 0.01 * rotationAxis.z;
      
      // Gradually return to normal speed if not the target
      if (torus !== this.targetTorus) {
        torus.userData.rotationSpeed += (originalRotationSpeed - torus.userData.rotationSpeed) * 0.05;
      }
      
      // Float position based on time
      if (!this.isDragging) {
        const time = Date.now() * 0.001;
        torus.position.x = Math.sin(time * 0.5) * 0.3;
        torus.position.y = Math.cos(time * 0.3) * 0.2;
      }
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
    
    // Dispose geometries and materials for tori
    this.tori.forEach(torus => {
      torus.geometry.dispose();
      torus.material.dispose();
    });
    
    // Remove the canvas from the container
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

export default TorusScene;
