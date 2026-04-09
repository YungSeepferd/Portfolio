import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '@mui/material';
import * as THREE from 'three';

/**
 * OrbBackground
 * 
 * Three.js-based animated orb/lava lamp effect for the WhoAmI profile card.
 * Features a 3D sphere with iridescent material, proper lighting, and hover effects.
 * 
 * Inspired by React Bits Orb but optimized for profile card use.
 */

// Radial ring wave expanding outward in XY plane
const EnergyWave = ({ color, startTime, duration = 1.0, maxScale = 50, initialOpacity = 0.6 }) => {
  const meshRef = useRef();
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    const elapsed = (Date.now() - startTime) / 1000;
    const progress = Math.min(elapsed / duration, 1);
    
    // Expand based on maxScale parameter
    const scale = 1 + progress * maxScale;
    meshRef.current.scale.set(scale, scale, 1);
    
    // Linear fade with configurable initial opacity
    meshRef.current.material.opacity = (1 - progress) * initialOpacity;
  });
  
  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <ringGeometry args={[0.95, 1.05, 128]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.5}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

const Orb = ({ color, isActive, mousePos, clickWaves, easterEggMode, waveDuration = 1.0, waveScale = 30 }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const lightRef = useRef();
  const waveTimeRef = useRef(0);
  const [hoverWaves, setHoverWaves] = React.useState([]);
  const prevActiveRef = useRef(isActive);

  // Vertex shader with distortion and click waves
  const vertexShader = `
    uniform float uTime;
    uniform float uIntensity;
    uniform vec2 uMouse;
    uniform float uWaveTime;
    uniform float uWaveIntensity;
    uniform float uEasterEgg;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    // Noise function for organic distortion
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      vec3 pos = position;
      
      // Organic distortion
      float noise = snoise(pos * 2.0 + uTime * 0.3);
      float distortion = noise * 0.15 * uIntensity;
      
      // Mouse influence
      vec2 mouseInfluence = (uMouse - 0.5) * 2.0;
      distortion += length(mouseInfluence) * 0.1 * uIntensity;
      
      // Click wave effect - ripple from center
      if (uWaveTime > 0.0) {
        float dist = length(pos);
        float wave = sin(dist * 10.0 - uWaveTime * 15.0) * uWaveIntensity;
        wave *= exp(-uWaveTime * 2.0); // Decay over time
        distortion += wave * 0.3;
      }
      
      // Easter egg mode - crazy distortions
      if (uEasterEgg > 0.0) {
        float crazyNoise = snoise(pos * 5.0 + uTime * 2.0);
        distortion += crazyNoise * 0.4 * uEasterEgg;
        
        // Pulsing effect
        float pulse = sin(uTime * 10.0) * 0.2 * uEasterEgg;
        distortion += pulse;
      }
      
      pos += normal * distortion;
      
      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Fragment shader with enhanced glass/liquid material
  const fragmentShader = `
    uniform vec3 uColor;
    uniform float uTime;
    uniform float uIntensity;
    uniform float uWaveTime;
    uniform float uEasterEgg;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    void main() {
      // View direction for lighting calculations
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      
      // Enhanced Fresnel with adjustable power
      float fresnelPower = 2.5;
      float fresnel = pow(1.0 - max(dot(viewDirection, vNormal), 0.0), fresnelPower);
      
      // Subsurface scattering approximation
      float subsurface = pow(1.0 - abs(dot(viewDirection, vNormal)), 1.5) * 0.3;
      
      // Animated iridescence with multiple layers
      float irid1 = sin(vUv.x * 8.0 + uTime * 1.5) * 0.5 + 0.5;
      float irid2 = cos(vUv.y * 6.0 - uTime * 2.0) * 0.5 + 0.5;
      float iridescence = mix(irid1, irid2, 0.5);
      
      // Color shift based on viewing angle
      vec3 baseColor = uColor;
      vec3 shiftColor = vec3(
        uColor.r * 1.3,
        uColor.g * 1.1,
        uColor.b * 0.9
      );
      vec3 iridColor = mix(baseColor, shiftColor, iridescence * 0.6);
      
      // Click wave with chromatic effect
      if (uWaveTime > 0.0) {
        float dist = length(vPosition);
        float wave = sin(dist * 12.0 - uWaveTime * 18.0);
        wave *= exp(-uWaveTime * 2.5);
        
        // Chromatic wave colors
        vec3 waveColor = vec3(
          sin(wave * 3.14 + 0.0) * 0.5 + 0.5,
          sin(wave * 3.14 + 2.09) * 0.5 + 0.5,
          sin(wave * 3.14 + 4.18) * 0.5 + 0.5
        );
        iridColor += waveColor * wave * 0.4;
      }
      
      // Easter egg rainbow mode with shimmer
      if (uEasterEgg > 0.0) {
        float shimmer = sin(uTime * 5.0 + vUv.x * 10.0 + vUv.y * 10.0) * 0.5 + 0.5;
        vec3 rainbow = vec3(
          sin(uTime * 3.0 + vUv.x * 6.28) * 0.5 + 0.5,
          sin(uTime * 3.0 + vUv.x * 6.28 + 2.09) * 0.5 + 0.5,
          sin(uTime * 3.0 + vUv.x * 6.28 + 4.18) * 0.5 + 0.5
        );
        iridColor = mix(iridColor, rainbow * shimmer, uEasterEgg * 0.8);
      }
      
      // Enhanced rim lighting with color
      float rim = pow(1.0 - max(dot(viewDirection, vNormal), 0.0), 3.0);
      vec3 rimColor = mix(vec3(1.0, 0.9, 0.7), uColor * 2.0, 0.5) * rim;
      
      // Specular highlight
      vec3 lightDir = normalize(vec3(1.0, 1.0, 2.0));
      vec3 halfVector = normalize(lightDir + viewDirection);
      float specular = pow(max(dot(vNormal, halfVector), 0.0), 32.0);
      
      // Combine all effects
      vec3 finalColor = iridColor * (0.4 + fresnel * 0.6);
      finalColor += rimColor * 0.8;
      finalColor += subsurface * uColor * 0.3;
      finalColor += vec3(1.0) * specular * 0.5;
      finalColor *= (1.0 + uIntensity * 0.6);
      
      // Enhanced alpha with depth
      float alpha = 0.7 + fresnel * 0.3;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uWaveTime: { value: 0 },
      uWaveIntensity: { value: 1.0 },
      uEasterEgg: { value: 0 },
    }),
    [color]
  );

  // Detect hover ENTER only (not exit) and trigger cascading ghost waves
  React.useEffect(() => {
    // Only trigger on entering (false -> true), not exiting
    if (isActive && !prevActiveRef.current) {
      const now = Date.now();
      const waves = [];
      
      // Create 5 ghost waves with decreasing opacity and staggered delays
      for (let i = 0; i < 5; i++) {
        const delay = i * 50; // 50ms delay between each wave
        const opacity = 0.2 * Math.pow(0.5, i); // 70% reduction: 0.42, 0.21, 0.105, 0.0525, 0.02625
        
        setTimeout(() => {
          const ghostWave = {
            id: now + i,
            startTime: Date.now(),
            opacity: opacity,
          };
          setHoverWaves(prev => [...prev, ghostWave]);
          
          // Remove wave after animation
          setTimeout(() => {
            setHoverWaves(prev => prev.filter(w => w.id !== ghostWave.id));
          }, waveDuration * 1000 + 500);
        }, delay);
        
        waves.push({ id: now + i, delay, opacity });
      }
    }
    
    prevActiveRef.current = isActive;
  }, [isActive, waveDuration]);

  useFrame((state, delta) => {
    if (meshRef.current && materialRef.current) {
      // Update time
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smooth intensity transition
      const targetIntensity = isActive ? 1.5 : 0.5;
      materialRef.current.uniforms.uIntensity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uIntensity.value,
        targetIntensity,
        0.05
      );
      
      // Update mouse position
      if (mousePos) {
        materialRef.current.uniforms.uMouse.value.lerp(
          new THREE.Vector2(mousePos.x, mousePos.y),
          0.1
        );
      }
      
      // Handle click waves
      if (clickWaves && clickWaves.length > 0) {
        const latestWave = clickWaves[clickWaves.length - 1];
        waveTimeRef.current = latestWave.time;
        materialRef.current.uniforms.uWaveTime.value = latestWave.time;
        materialRef.current.uniforms.uWaveIntensity.value = latestWave.intensity;
      } else if (waveTimeRef.current > 0) {
        // Decay wave
        waveTimeRef.current += delta * 3;
        materialRef.current.uniforms.uWaveTime.value = waveTimeRef.current;
        if (waveTimeRef.current > 2) {
          waveTimeRef.current = 0;
          materialRef.current.uniforms.uWaveTime.value = 0;
        }
      }
      
      // Easter egg mode
      const targetEasterEgg = easterEggMode ? 1.0 : 0.0;
      materialRef.current.uniforms.uEasterEgg.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uEasterEgg.value,
        targetEasterEgg,
        0.1
      );
      
      // Rotate orb (faster in easter egg mode)
      const rotationSpeed = easterEggMode ? 0.03 : (isActive ? 0.01 : 0.003);
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.rotation.x += rotationSpeed * 0.5;
    }
    
    // Animate light (brighter in easter egg mode)
    if (lightRef.current) {
      const intensity = easterEggMode ? 3 : (isActive ? 2 : 0.8);
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        intensity,
        0.05
      );
    }
  });

  return (
    <group>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.4} color="#ffffff" />
      
      {/* Key light - main illumination */}
      <pointLight
        ref={lightRef}
        position={[2, 2, 3]}
        color={color}
        intensity={0.8}
        distance={8}
        decay={2}
      />
      
      {/* Fill light - softer secondary light */}
      <pointLight
        position={[-2, -1, 2]}
        color="#4fc3f7"
        intensity={0.4}
        distance={6}
        decay={2}
      />
      
      {/* Rim light - creates depth */}
      <pointLight
        position={[0, 0, -3]}
        color="#ffa726"
        intensity={0.3}
        distance={5}
        decay={2}
      />
      
      {/* Energy waves on hover in/out */}
      {hoverWaves.map(wave => (
        <EnergyWave
          key={wave.id}
          color={color}
          startTime={wave.startTime}
          duration={waveDuration}
          maxScale={waveScale}
          initialOpacity={wave.opacity || 0.6}
        />
      ))}
      
      {/* Main orb mesh with higher resolution */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

const OrbBackground = ({ 
  color = '#ff9800',
  isActive = false,
  enableMouseInteraction = false,
  onEasterEgg,
  waveDuration = 1.0,
  waveScale = 30
}) => {
  const theme = useTheme();
  const [mousePos, setMousePos] = React.useState({ x: 0.5, y: 0.5 });
  const [clickWaves, setClickWaves] = React.useState([]);
  const [easterEggMode, setEasterEggMode] = React.useState(false);
  const clickTimesRef = useRef([]);
  const containerRef = useRef();

  // Use theme color
  const threeColor = useMemo(() => {
    return color || theme.palette.accent.main;
  }, [color, theme]);

  const handleMouseMove = React.useCallback((e) => {
    if (!enableMouseInteraction || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    
    setMousePos({ x, y });
  }, [enableMouseInteraction]);

  const handleMouseLeave = React.useCallback(() => {
    setMousePos({ x: 0.5, y: 0.5 });
  }, []);

  const handleClick = React.useCallback(() => {
    const now = Date.now();
    
    // Add click wave
    setClickWaves(prev => [...prev, { time: 0.1, intensity: 1.0, id: now }]);
    
    // Clean up old waves after animation
    setTimeout(() => {
      setClickWaves(prev => prev.filter(w => w.id !== now));
    }, 2000);
    
    // Track click times for easter egg
    clickTimesRef.current.push(now);
    
    // Keep only clicks from last 4 seconds
    clickTimesRef.current = clickTimesRef.current.filter(
      time => now - time < 4000
    );
    
    // Check for easter egg (10+ clicks in 4 seconds)
    if (clickTimesRef.current.length >= 10 && !easterEggMode) {
      setEasterEggMode(true);
      if (onEasterEgg) onEasterEgg();
      
      // Reset after 10 seconds
      setTimeout(() => {
        setEasterEggMode(false);
        clickTimesRef.current = [];
      }, 10000);
    }
  }, [easterEggMode, onEasterEgg]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'auto',
        cursor: 'pointer',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Orb 
          color={threeColor}
          isActive={isActive}
          mousePos={mousePos}
          clickWaves={clickWaves}
          easterEggMode={easterEggMode}
          waveDuration={waveDuration}
          waveScale={waveScale}
        />
      </Canvas>
    </div>
  );
};

export default OrbBackground;
